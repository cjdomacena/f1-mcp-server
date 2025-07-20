import { mcpServer } from "@mcp/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { config } from "dotenv";
import express, { Request, Response } from "express";

config();
const app = express();
const port = process.env.PORT;

const transportMap = new Map<string, SSEServerTransport>();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

app.get("/sse", async (req: Request, res: Response) => {
  const transport = new SSEServerTransport("/messages", res);
  transportMap.set(transport.sessionId, transport);
  await mcpServer.connect(transport);
});

app.post("/messages", (req: Request, res: Response) => {
  const sessionId = req.query.sessionId as string;
  if (!sessionId) {
    console.error("No session ID");
    res.status(400).json({ error: "No session id found" });
    return;
  }

  const transportForSessionId = transportMap.get(sessionId);

  if (!transportForSessionId) {
    console.error("No session ID");
    res.status(400).json({ error: "No session id found" });
    return;
  }

  transportForSessionId.handlePostMessage(req, res);
});

app.listen(port, () => {
  console.log(`RUnning on port ${port}`);
});
