import type { ServerStatus } from "@/types/server";

export async function fetchServerStatus(): Promise<ServerStatus> {
  const res = await fetch("/api/status");
  if (!res.ok) throw new Error("Status fetch failed");
  return res.json();
}
