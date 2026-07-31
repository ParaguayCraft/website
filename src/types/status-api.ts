export type StatusApiSuccess = {
  ok: true;
  server: {
    online: boolean;
    playersOnline: number;
    playersMax: number | null;
    version: string;
    address: string;
    latency?: number;
  };
};

export type StatusApiFailure = {
  ok: false;
  error: "provider_unavailable" | "invalid_provider_response";
};

export type StatusApiResponse = StatusApiSuccess | StatusApiFailure;
