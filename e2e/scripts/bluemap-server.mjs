#!/usr/bin/env node
// Starts a second Next.js dev server from an isolated copy of the app so that
// NEXT_PUBLIC_BLUEMAP_URL=https://map.example.test is inlined at compile time.
// This lets the Playwright suite exercise the "configured BlueMap" state without
// touching the default server (whose BlueMap URL is unset).
import { spawn } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync, symlinkSync } from "node:fs";
import { join, resolve } from "node:path";

const root = process.cwd();
const target = resolve(root, ".e2e", "bluemap-server");
const port = process.env.BLUEMAP_PORT ?? "3200";

// Fresh copy of the app source every run so the env var is always inlined fresh.
rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });

const copyItems = [
  "src",
  "public",
  "next.config.ts",
  "tsconfig.json",
  "postcss.config.mjs",
  "package.json",
  "package-lock.json",
  ".npmrc",
];
for (const item of copyItems) {
  const from = join(root, item);
  if (existsSync(from)) cpSync(from, join(target, item), { recursive: true });
}

if (!existsSync(join(target, "node_modules"))) {
  symlinkSync(join(root, "node_modules"), join(target, "node_modules"), "dir");
}

const child = spawn("npx", ["next", "dev", "--webpack", "-p", port], {
  cwd: target,
  env: { ...process.env, NEXT_PUBLIC_BLUEMAP_URL: "https://map.example.test" },
  stdio: "inherit",
});

child.on("exit", (code) => process.exit(code ?? 0));
