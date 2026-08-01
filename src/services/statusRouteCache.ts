import type { StatusApiResponse } from "@/types/status-api";

const CACHE_TTL_MS = 20_000;

export type CachedStatusResponse = {
  data: StatusApiResponse;
  status: 200 | 502;
  at: number;
};

let cachedResponse: CachedStatusResponse | null = null;

export function getCachedStatusResponse(now: number): CachedStatusResponse | null {
  if (cachedResponse && now - cachedResponse.at < CACHE_TTL_MS) {
    return cachedResponse;
  }

  return null;
}

export function cacheStatusResponse(
  data: StatusApiResponse,
  status: CachedStatusResponse["status"],
  at: number,
): void {
  cachedResponse = { data, status, at };
}

export function resetStatusCacheForTests(): void {
  cachedResponse = null;
}
