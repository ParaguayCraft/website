import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

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

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const host = `${siteConfig.serverHost}:${siteConfig.serverQueryPort}`;
    const res = await fetch(`https://api.mcsrvstat.us/3/${encodeURIComponent(host)}`, {
      next: { revalidate: 0 },
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) throw new Error(`mcsrvstat.us returned ${res.status}`);

    const data: McSrvStatResponse = await res.json();

    return NextResponse.json({
      online: data.online,
      playersOnline: data.players?.online ?? 0,
      playersMax: data.players?.max ?? 0,
      version: data.version ?? "—",
      address: data.hostname ?? siteConfig.serverIp,
      latency: data.debug?.ping ? undefined : undefined,
    });
  } catch {
    return NextResponse.json({
      online: false,
      playersOnline: 0,
      playersMax: 0,
      version: "—",
      address: siteConfig.serverIp,
    });
  }
}
