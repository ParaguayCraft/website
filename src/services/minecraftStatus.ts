import type { ServerStatus } from "@/types/server";

export async function fetchServerStatus(): Promise<ServerStatus> {
  // Placeholder: replace with real Minecraft query API later
  return {
    online: true,
    playersOnline: 87,
    playersMax: 200,
    version: "1.21+",
    address: "play.paraguaycraft.com",
  };
}
