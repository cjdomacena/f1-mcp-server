import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getSeasons } from "./utils/endpoint_helpers.js";
import { z } from "zod";
import makeF1Request from "./helpers/api.js";

const server = new McpServer({
  name: "F1 MCP Server",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool("get_seasons", "Get list of seasons", async () => {
  const url = new URL(getSeasons());
  url.searchParams.set("format", "json");

  const data: any = await makeF1Request(getSeasons());

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data),
      },
    ],
    structuredContent: data,
  };
});

server.tool(
  "get_season",
  "Get specific information of a season",
  {
    season: z
      .number()
      .optional()
      .describe("If empty, it will default to current season"),
  },
  async ({ season }) => {
    const data: any = await makeF1Request(getSeasons(season));

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data),
        },
      ],
      structuredContent: data,
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("F1 MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main(): ", error);
  process.exit(1);
});
