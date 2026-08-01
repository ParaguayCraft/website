import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { normalizeProviderResponse } from "@/services/statusProviderContract";
import {
  cacheStatusResponse,
  getCachedStatusResponse,
} from "@/services/statusRouteCache";
import type { StatusApiResponse } from "@/types/status-api";

function cacheAndRespond(
  data: StatusApiResponse,
  status: 200 | 502,
  at: number,
): NextResponse<StatusApiResponse> {
  cacheStatusResponse(data, status, at);
  return NextResponse.json(data, { status });
}

export async function GET(): Promise<NextResponse<StatusApiResponse>> {
  const now = Date.now();
  const cachedResponse = getCachedStatusResponse(now);

  if (cachedResponse) {
    return NextResponse.json(cachedResponse.data, {
      status: cachedResponse.status,
    });
  }

  try {
    const host = `${siteConfig.serverHost}:${siteConfig.serverQueryPort}`;
    const res = await fetch(
      `https://api.mcsrvstat.us/3/${encodeURIComponent(host)}`,
      { signal: AbortSignal.timeout(5000) },
    );

    if (!res.ok) {
      return cacheAndRespond(
        {
          ok: false,
          error: "provider_unavailable",
        },
        502,
        now,
      );
    }

    let providerData: unknown;
    try {
      providerData = await res.json();
    } catch {
      return cacheAndRespond(
        {
          ok: false,
          error: "invalid_provider_response",
        },
        502,
        now,
      );
    }

    const response = normalizeProviderResponse(
      providerData,
      siteConfig.supportedVersion,
      siteConfig.serverDisplayAddress,
    );

    return response.ok
      ? cacheAndRespond(response, 200, now)
      : cacheAndRespond(response, 502, now);
  } catch {
    return cacheAndRespond(
      {
        ok: false,
        error: "provider_unavailable",
      },
      502,
      now,
    );
  }
}
