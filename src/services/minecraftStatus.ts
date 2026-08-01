import type { StatusApiResponse } from "@/types/status-api";
import type { ServerStatus } from "@/types/server";
import { siteConfig } from "@/config/site";

export type { StatusApiResponse };

export async function fetchServerStatus(signal?: AbortSignal): Promise<StatusApiResponse> {
  const res = await fetch("/api/status", { signal });
  if (!res.ok && res.status >= 500) {
    const body = await res.json().catch(() => null);
    return body ?? { ok: false, error: "provider_unavailable" };
  }
  return res.json();
}

/** Convert API response to the legacy ServerStatus shape used by UI components. */
export function toLegacyStatus(response: StatusApiResponse): ServerStatus {
  if (response.ok) {
    return {
      online: response.server.online,
      playersOnline: response.server.playersOnline,
      playersMax: response.server.playersMax ?? 0,
      version: response.server.version,
      address: response.server.address,
    };
  }
  return {
    online: false,
    playersOnline: 0,
    playersMax: 0,
    version: "—",
    address: siteConfig.serverDisplayAddress,
  };
}
