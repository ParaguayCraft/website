import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // `output: "standalone"` is only needed for the production deployment;
  // applying it in dev is unnecessary and contributes to Turbopack dev loops
  // (https://github.com/vercel/next.js/issues/94915).
  ...(isProduction ? { output: "standalone" as const } : {}),
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
