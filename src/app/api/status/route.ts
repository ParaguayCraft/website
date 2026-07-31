import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import type { StatusApiResponse } from "@/types/status-api";

interface McSrvStatResponse {
  online: boolean;
  ip?: string;
  port?: number;
  hostname?: string;
  debug?: { ping: boolean };
  players?: { online: number; max: number };
  version?: string;
  motd?: { raw: string[] };
}

const CACHE_TTL_MS = 20_000;

let cachedResponse: { data: StatusApiResponse; at: number } | null = null;

export async function GET(): Promise<NextResponse<StatusApiResponse>> {
  const now = Date.now();

  if (cachedResponse && now - cachedResponse.at < CACHE_TTL_MS) {
    return NextResponse.json(cachedResponse.data);
  }

  try {
    const host = `${siteConfig.serverHost}:${siteConfig.serverQueryPort}`;
    const res = await fetch(
      `https://api.mcsrvstat.us/3/${encodeURIComponent(host)}`,
      { signal: AbortSignal.timeout(5000) },
    );

    if (!res.ok) {
      const failure: StatusApiResponse = {
        ok: false,
        error: "provider_unavailable",
      };
      cachedResponse = { data: failure, at: now };
      return NextResponse.json(failure, { status: 502 });
    }

    const data: McSrvStatResponse = await res.json();

    // Validate response shape
    if (typeof data.online !== "boolean") {
      const failure: StatusApiResponse = {
        ok: false,
        error: "invalid_provider_response",
      };
      cachedResponse = { data: failure, at: now };
      return NextResponse.json(failure, { status: 502 });
    }

    const playersMax =
      data.players?.max && data.players.max > 0
        ? data.players.max
        : null;

    const success: StatusApiResponse = {
      ok: true,
      server: {
        online: data.online,
        playersOnline: data.players?.online ?? 0,
        playersMax,
        version: data.version ?? siteConfig.supportedVersion,
        address: data.hostname ?? siteConfig.serverDisplayAddress,
      },
    };

    cachedResponse = { data: success, at: now };
    return NextResponse.json(success);
  } catch {
    const failure: StatusApiResponse = {
      ok: false,
      error: "provider_unavailable",
    };
    cachedResponse = { data: failure, at: now };
    return NextResponse.json(failure, { status: 502 });
  }
}
