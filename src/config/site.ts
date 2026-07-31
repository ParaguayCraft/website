// Public values are read once at build time from direct static references.
// Next.js can inline process.env.NEXT_PUBLIC_* only when the key is a
// literal, so dynamic `process.env[key]` lookups must not be used.
const publicServerHost = process.env.NEXT_PUBLIC_SERVER_HOST;
const publicServerDisplayAddress = process.env.NEXT_PUBLIC_SERVER_DISPLAY_ADDRESS;
const publicDiscordUrl = process.env.NEXT_PUBLIC_DISCORD_URL;
const publicBlueMapUrl = process.env.NEXT_PUBLIC_BLUEMAP_URL;
const publicYouTubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL;
const publicTikTokUrl = process.env.NEXT_PUBLIC_TIKTOK_URL;

function normalizeUrl(value: string | undefined): string | null {
  const normalized = value?.trim();
  return normalized && normalized !== "#" ? normalized : null;
}

function requireUrl(value: string | undefined, fallback: string): string {
  return normalizeUrl(value) ?? fallback;
}

const bluemapRaw = normalizeUrl(publicBlueMapUrl);
const isProduction = process.env.NODE_ENV === "production";

export const siteConfig = {
  name: "ParaguayCraft",
  description:
    "Un servidor de Minecraft para todos los paraguayos y amigos. Comunidad, diversión y aventuras sin límites.",

  serverHost: requireUrl(publicServerHost, "play.paraguaycraft.com"),
  serverDisplayAddress: requireUrl(publicServerDisplayAddress, "play.paraguaycraft.com"),
  // Backward-compat alias — prefer serverDisplayAddress for copy, serverHost for connectivity
  get serverIp(): string {
    return this.serverDisplayAddress;
  },
  supportedVersion: "1.21+",
  serverQueryPort: Number(process.env.SERVER_QUERY_PORT) || 25577,

  discordUrl: normalizeUrl(publicDiscordUrl) ?? "https://discord.gg/paraguaycraft",
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
    discord: normalizeUrl(publicDiscordUrl) ?? "https://discord.gg/paraguaycraft",
    youtube: normalizeUrl(publicYouTubeUrl),
    tiktok: normalizeUrl(publicTikTokUrl),
  },
} as const;
