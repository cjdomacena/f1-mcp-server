import { config } from "dotenv";
import { build } from "esbuild";
import { tsconfigPathsPlugin } from "esbuild-plugin-tsconfig-paths";

config();

build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  target: "node22",
  format: "cjs",
  outfile: "dist/index.cjs",
  minify: true,
  plugins: [
    tsconfigPathsPlugin({
      cwd: process.cwd(),
      tsconfig: "./tsconfig.json",
      // which files will be transformed
      filter: /\.ts$/,
      extensions: [".ts"],
    }),
  ],
  external: ["express"],
  define: {
    "process.env.PORT": JSON.stringify(process.env.PORT),
  },
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
