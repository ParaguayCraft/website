import type { Metadata, Viewport } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ParaguayCraft | Servidor de Minecraft Paraguay",
  description:
    "Únete a ParaguayCraft, un servidor de Minecraft paraguayo con supervivencia, PvP, economía, facciones, eventos y una comunidad activa.",
  openGraph: {
    title: "ParaguayCraft | Servidor de Minecraft Paraguay",
    description:
      "Únete a ParaguayCraft, un servidor de Minecraft paraguayo con supervivencia, PvP, economía, facciones, eventos y una comunidad activa.",
    siteName: "ParaguayCraft",
    type: "website",
    locale: "es_PY",
  },
  twitter: {
    card: "summary_large_image",
    title: "ParaguayCraft | Servidor de Minecraft Paraguay",
    description:
      "Únete a ParaguayCraft, un servidor de Minecraft paraguayo con supervivencia, PvP, economía, facciones, eventos y una comunidad activa.",
  },
  robots: "index, follow",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#080b0d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${pressStart2P.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#d62f2f] focus:text-[#f1f1ed] focus:font-display focus:text-sm focus:uppercase"
        >
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
