import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
