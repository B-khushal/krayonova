import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("out");
const distDir = path.resolve("dist");

if (!fs.existsSync(outDir)) {
  console.error("Static output directory out/ was not found. Ensure next.config.ts has output: 'export'.");
  process.exit(1);
}

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}

fs.mkdirSync(distDir, { recursive: true });
fs.cpSync(outDir, distDir, { recursive: true });

console.log("Copied static site output from out/ to dist/.");
