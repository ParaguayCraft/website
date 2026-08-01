import type { StatusApiResponse, StatusApiSuccess } from "@/types/status-api";

type ProviderRecord = Record<string, unknown>;

function isRecord(value: unknown): value is ProviderRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidCount(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function sanitizeCount(value: unknown, fallback: number): number {
  return isValidCount(value) ? Math.floor(value) : fallback;
}

function fallbackString(value: unknown, fallback: string): string {
  if (typeof value !== "string") {
    return fallback;
  }

  const normalized = value.trim();
  return normalized || fallback;
}

function invalidProviderResponse(): StatusApiResponse {
  return {
    ok: false,
    error: "invalid_provider_response",
  };
}

export function normalizeProviderResponse(
  data: unknown,
  fallbackVersion: string,
  fallbackAddress: string,
): StatusApiResponse {
  if (!isRecord(data) || typeof data.online !== "boolean") {
    return invalidProviderResponse();
  }

  if (data.players !== undefined && !isRecord(data.players)) {
    return invalidProviderResponse();
  }

  const players = data.players as ProviderRecord | undefined;
  const playersOnline = players?.online;
  const playersMax = players?.max;

  if (
    (playersOnline !== undefined && !isValidCount(playersOnline)) ||
    (playersMax !== undefined && !isValidCount(playersMax))
  ) {
    return invalidProviderResponse();
  }

  if (
    (data.version !== undefined && typeof data.version !== "string") ||
    (data.hostname !== undefined && typeof data.hostname !== "string")
  ) {
    return invalidProviderResponse();
  }

  const normalizedMax = sanitizeCount(playersMax, 0);
  const success: StatusApiSuccess = {
    ok: true,
    server: {
      online: data.online,
      playersOnline: sanitizeCount(playersOnline, 0),
      playersMax: normalizedMax > 0 ? normalizedMax : null,
      version: fallbackString(data.version, fallbackVersion),
      address: fallbackString(data.hostname, fallbackAddress),
    },
  };

  return success;
}
