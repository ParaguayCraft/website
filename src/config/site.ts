function envUrl(key: string): string | null {
  const value = process.env[key]?.trim();
  if (!value || value === "#") return null;
  return value;
}

function requireEnv(key: string, fallback: string): string {
  return envUrl(key) ?? fallback;
}

const bluemapRaw = envUrl("NEXT_PUBLIC_BLUEMAP_URL");
const isProduction = process.env.NODE_ENV === "production";

export const siteConfig = {
  name: "ParaguayCraft",
  description:
    "Un servidor de Minecraft para todos los paraguayos y amigos. Comunidad, diversión y aventuras sin límites.",

  serverHost: requireEnv("NEXT_PUBLIC_SERVER_HOST", "play.paraguaycraft.com"),
  serverDisplayAddress: requireEnv(
    "NEXT_PUBLIC_SERVER_DISPLAY_ADDRESS",
    "play.paraguaycraft.com",
  ),
  // Backward-compat alias — prefer serverDisplayAddress for copy, serverHost for connectivity
  get serverIp(): string {
    return this.serverDisplayAddress;
  },
  supportedVersion: "1.21+",
  serverQueryPort: Number(process.env.SERVER_QUERY_PORT) || 25577,

  discordUrl: envUrl("NEXT_PUBLIC_DISCORD_URL") ?? "https://discord.gg/paraguaycraft",
  storeUrl: "/tienda",
  votingUrl: "/votar",
  rulesUrl: "/reglas",

  blueMapUrl:
    isProduction
      ? bluemapRaw && /^https:\/\//.test(bluemapRaw)
        ? bluemapRaw
        : null
      : bluemapRaw ?? null,

  socialLinks: {
    discord: envUrl("NEXT_PUBLIC_DISCORD_URL") ?? "https://discord.gg/paraguaycraft",
    youtube: envUrl("NEXT_PUBLIC_YOUTUBE_URL"),
    tiktok: envUrl("NEXT_PUBLIC_TIKTOK_URL"),
  },
} as const;
