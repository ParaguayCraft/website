"use client";

import { createContext, useContext, useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { fetchServerStatus, toLegacyStatus } from "@/services/minecraftStatus";
import type { ServerStatus } from "@/types/server";
import type { StatusApiResponse } from "@/types/status-api";

export type StatusState = "initial" | "loading" | "refreshing" | "online" | "offline" | "provider-unavailable";

interface StatusContextValue {
  status: ServerStatus | null;
  state: StatusState;
  isInitial: boolean;
}

const StatusContext = createContext<StatusContextValue>({
  status: null,
  state: "initial",
  isInitial: true,
});

const POLL_INTERVAL = 30_000;

export function ServerStatusProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [state, setState] = useState<StatusState>("initial");
  const pollingRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const mountedRef = useRef(true);

  const fetchData = useCallback(async () => {
    if (!mountedRef.current) return;

    if (pollingRef.current) return; // Don't overlap
    pollingRef.current = true;

    try {
      const response: StatusApiResponse = await fetchServerStatus();

      if (!mountedRef.current) return;

      if (!response.ok) {
        setState("provider-unavailable");
        setStatus((prev) => prev ?? toLegacyStatus(response));
      } else {
        const legacy = toLegacyStatus(response);
        setStatus(legacy);
        setState(legacy.online ? "online" : "offline");
      }
    } catch {
      if (!mountedRef.current) return;
      setState("provider-unavailable");
    } finally {
      pollingRef.current = false;
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    setState("loading");
    fetchData();

    intervalRef.current = setInterval(() => {
      setState((prev) =>
        prev === "online" || prev === "offline" || prev === "provider-unavailable"
          ? "refreshing"
          : prev,
      );
      fetchData();
    }, POLL_INTERVAL);

    return () => {
      mountedRef.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StatusContext.Provider
      value={{
        status,
        state,
        isInitial: state === "initial",
      }}
    >
      {children}
    </StatusContext.Provider>
  );
}

export function useServerStatus(): StatusContextValue {
  return useContext(StatusContext);
}
