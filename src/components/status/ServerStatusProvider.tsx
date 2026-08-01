"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { fetchServerStatus, toLegacyStatus } from "@/services/minecraftStatus";
import type { ServerStatus } from "@/types/server";
import type { StatusApiResponse } from "@/types/status-api";

export type StatusState =
  | "initial"
  | "online"
  | "offline"
  | "refreshing"
  | "provider-unavailable";

export interface StatusContextValue {
  status: ServerStatus | null;
  state: StatusState;
  stale: boolean;
  lastUpdated: number | null;
}

const StatusContext = createContext<StatusContextValue>({
  status: null,
  state: "initial",
  stale: false,
  lastUpdated: null,
});

const POLL_INTERVAL_MS = 30_000;

function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === "AbortError";
}

export function ServerStatusProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [state, setState] = useState<StatusState>("initial");
  const [stale, setStale] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const pollingRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const requestRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(false);
  const statusRef = useRef<ServerStatus | null>(null);

  const fetchData = useCallback(async (refresh: boolean) => {
    if (!mountedRef.current || pollingRef.current) return;

    pollingRef.current = true;
    const controller = new AbortController();
    requestRef.current = controller;
    const hadPreviousData = statusRef.current !== null;

    if (refresh && hadPreviousData) {
      setState("refreshing");
    }

    try {
      const response: StatusApiResponse = await fetchServerStatus(controller.signal);

      if (!mountedRef.current || controller.signal.aborted) return;

      if (!response.ok) {
        setState("provider-unavailable");
        setStale(hadPreviousData);
        if (!hadPreviousData) {
          statusRef.current = null;
          setStatus(null);
        }
        return;
      }

      const nextStatus = toLegacyStatus(response);
      statusRef.current = nextStatus;
      setStatus(nextStatus);
      setState(nextStatus.online ? "online" : "offline");
      setStale(false);
      setLastUpdated(Date.now());
    } catch (error) {
      if (!mountedRef.current || controller.signal.aborted || isAbortError(error)) {
        return;
      }

      setState("provider-unavailable");
      setStale(hadPreviousData);
      if (!hadPreviousData) {
        statusRef.current = null;
        setStatus(null);
      }
    } finally {
      if (requestRef.current === controller) {
        requestRef.current = null;
      }
      pollingRef.current = false;
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    // The request updates state only after its asynchronous response settles.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchData(false);

    intervalRef.current = setInterval(() => {
      void fetchData(true);
    }, POLL_INTERVAL_MS);

    return () => {
      mountedRef.current = false;
      requestRef.current?.abort();
      requestRef.current = null;
      if (intervalRef.current !== undefined) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };
  }, [fetchData]);

  return (
    <StatusContext.Provider value={{ status, state, stale, lastUpdated }}>
      {children}
    </StatusContext.Provider>
  );
}

export function useServerStatus(): StatusContextValue {
  return useContext(StatusContext);
}
