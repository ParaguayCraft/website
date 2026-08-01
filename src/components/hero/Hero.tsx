"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { MinecraftButton } from "@/components/ui/MinecraftButton";
import { ServerConnectionBar } from "./ServerConnectionBar";
import { CopyServerIpButton } from "./CopyServerIpButton";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="relative min-h-[700px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background — original ParaguayCraft vector scene (see ASSETS.md) */}
      <div className="absolute inset-0 z-0">
        <svg
          viewBox="0 0 1440 600"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="pgSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#05070f" />
              <stop offset="32%" stopColor="#0b1226" />
              <stop offset="56%" stopColor="#1c2440" />
              <stop offset="74%" stopColor="#47304b" />
              <stop offset="88%" stopColor="#8a3a3c" />
              <stop offset="100%" stopColor="#c8503a" />
            </linearGradient>
            <radialGradient id="pgSun" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#ffd9a0" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#f0a35e" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#f0a35e" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="pgTorch" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#ffc97a" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#e8b342" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="pgRiver" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0a35e" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#f0a35e" stopOpacity="0" />
            </linearGradient>
          </defs>
          <style>
            {`@media (prefers-reduced-motion: no-preference) {
              .pg-flicker { animation: pgFlick 2.6s ease-in-out infinite; }
              .pg-flicker-slow { animation: pgFlick 3.8s ease-in-out infinite; }
              .pg-twinkle { animation: pgTwinkle 3.2s ease-in-out infinite; }
            }
            @keyframes pgFlick { 0%, 100% { opacity: 0.55; } 50% { opacity: 0.95; } }
            @keyframes pgTwinkle { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.75; } }`}
          </style>

          {/* Night-to-sunset sky */}
          <rect x="0" y="0" width="1440" height="600" fill="url(#pgSky)" />

          {/* Stars */}
          <g fill="#f1f1ed">
            <circle cx="80" cy="60" r="1.2" opacity="0.5" />
            <circle cx="180" cy="140" r="0.9" opacity="0.35" />
            <circle cx="260" cy="50" r="1.4" opacity="0.6" className="pg-twinkle" />
            <circle cx="340" cy="110" r="0.8" opacity="0.3" />
            <circle cx="430" cy="40" r="1.1" opacity="0.45" />
            <circle cx="520" cy="150" r="0.9" opacity="0.3" />
            <circle cx="600" cy="80" r="1.3" opacity="0.55" className="pg-twinkle" style={{ animationDelay: "0.8s" }} />
            <circle cx="690" cy="35" r="0.8" opacity="0.35" />
            <circle cx="770" cy="120" r="1" opacity="0.4" />
            <circle cx="850" cy="55" r="1.4" opacity="0.6" className="pg-twinkle" style={{ animationDelay: "1.6s" }} />
            <circle cx="930" cy="150" r="0.8" opacity="0.3" />
            <circle cx="1010" cy="90" r="1.2" opacity="0.5" />
            <circle cx="1100" cy="45" r="0.9" opacity="0.35" />
            <circle cx="1180" cy="130" r="1.3" opacity="0.55" className="pg-twinkle" style={{ animationDelay: "2.4s" }} />
            <circle cx="1260" cy="70" r="0.8" opacity="0.3" />
            <circle cx="1340" cy="120" r="1.1" opacity="0.45" />
            <circle cx="1400" cy="45" r="0.9" opacity="0.35" />
            <circle cx="140" cy="210" r="0.8" opacity="0.25" />
            <circle cx="480" cy="200" r="0.7" opacity="0.25" />
            <circle cx="960" cy="205" r="0.7" opacity="0.25" />
            <circle cx="1300" cy="200" r="0.8" opacity="0.25" />
          </g>

          {/* Setting sun behind the castle */}
          <circle cx="720" cy="440" r="220" fill="url(#pgSun)" opacity="0.55" />
          <circle cx="720" cy="445" r="110" fill="url(#pgSun)" opacity="0.8" />
          <circle cx="720" cy="452" r="42" fill="#ffd9a0" opacity="0.9" />

          {/* Distant sierra silhouettes */}
          <path d="M0,420 L120,362 L240,412 L380,352 L520,408 L700,356 L880,412 L1040,362 L1200,408 L1320,372 L1440,416 L1440,600 L0,600 Z" fill="#141b2e" opacity="0.85" />
          <path d="M0,458 L160,422 L320,462 L520,427 L760,464 L980,432 L1180,467 L1440,442 L1440,600 L0,600 Z" fill="#0e1424" />

          {/* River reflecting the sunset */}
          <rect x="0" y="470" width="1440" height="18" fill="#0a1020" />
          <rect x="600" y="470" width="240" height="16" fill="url(#pgRiver)" />
          <rect x="660" y="474" width="120" height="2" fill="#ffd9a0" opacity="0.35" />
          <rect x="690" y="480" width="60" height="1.5" fill="#ffd9a0" opacity="0.25" />

          {/* Valley mist */}
          <ellipse cx="720" cy="468" rx="680" ry="22" fill="#f1f1ed" opacity="0.05" />
          <ellipse cx="720" cy="454" rx="460" ry="12" fill="#f1f1ed" opacity="0.05" />

          {/* Castle mound */}
          <ellipse cx="720" cy="494" rx="430" ry="34" fill="#0a0f1c" />

          {/* Castle — curtain wall */}
          <g>
            <rect x="470" y="398" width="500" height="88" fill="#0b101d" />
            {Array.from({ length: 18 }, (_, i) => (
              <rect key={i} x={474 + i * 28} y="388" width="14" height="12" fill="#0b101d" />
            ))}
            {/* Wall windows */}
            <rect x="540" y="428" width="7" height="12" fill="#e8b342" opacity="0.85" />
            <circle cx="543.5" cy="434" r="14" fill="url(#pgTorch)" className="pg-flicker" />
            <rect x="893" y="428" width="7" height="12" fill="#e8b342" opacity="0.85" />
            <circle cx="896.5" cy="434" r="14" fill="url(#pgTorch)" className="pg-flicker" style={{ animationDelay: "1.1s" }} />
          </g>

          {/* Castle — keep */}
          <g>
            <rect x="655" y="278" width="130" height="208" fill="#0d1322" />
            {Array.from({ length: 5 }, (_, i) => (
              <rect key={i} x={659 + i * 26} y="266" width="15" height="14" fill="#0d1322" />
            ))}
            {/* Keep windows */}
            <rect x="684" y="322" width="8" height="15" fill="#e8b342" opacity="0.9" />
            <circle cx="688" cy="329" r="16" fill="url(#pgTorch)" className="pg-flicker-slow" />
            <rect x="716" y="322" width="8" height="15" fill="#e8b342" opacity="0.55" />
            <rect x="748" y="322" width="8" height="15" fill="#e8b342" opacity="0.9" />
            <circle cx="752" cy="329" r="16" fill="url(#pgTorch)" className="pg-flicker" style={{ animationDelay: "0.6s" }} />
            <rect x="716" y="372" width="8" height="15" fill="#e8b342" opacity="0.4" />
            {/* Sunset rim light */}
            <rect x="783" y="278" width="2" height="208" fill="#f0a35e" opacity="0.28" />
          </g>

          {/* Castle — side towers with roofs */}
          <g>
            <rect x="518" y="322" width="72" height="164" fill="#0c1120" />
            <path d="M506,322 L554,264 L602,322 Z" fill="#090e19" />
            <rect x="588" y="322" width="2" height="164" fill="#f0a35e" opacity="0.22" />
            <rect x="550" y="372" width="7" height="13" fill="#e8b342" opacity="0.8" />
            <circle cx="553.5" cy="378" r="13" fill="url(#pgTorch)" className="pg-flicker" style={{ animationDelay: "1.7s" }} />

            <rect x="850" y="322" width="72" height="164" fill="#0c1120" />
            <path d="M838,322 L886,264 L934,322 Z" fill="#090e19" />
            <rect x="920" y="322" width="2" height="164" fill="#f0a35e" opacity="0.22" />
            <rect x="883" y="372" width="7" height="13" fill="#e8b342" opacity="0.8" />
            <circle cx="886.5" cy="378" r="13" fill="url(#pgTorch)" className="pg-flicker-slow" style={{ animationDelay: "0.4s" }} />
          </g>

          {/* Gate with warm interior glow */}
          <ellipse cx="720" cy="470" rx="34" ry="26" fill="url(#pgTorch)" opacity="0.85" className="pg-flicker-slow" />
          <path d="M692,486 L692,438 Q720,412 748,438 L748,486 Z" fill="#150c06" />
          <path d="M692,486 L692,438 Q720,412 748,438 L748,486 Z" fill="none" stroke="#f0a35e" strokeOpacity="0.3" strokeWidth="1.5" />
          <line x1="706" y1="432" x2="706" y2="486" stroke="#000000" strokeOpacity="0.55" strokeWidth="2" />
          <line x1="720" y1="424" x2="720" y2="486" stroke="#000000" strokeOpacity="0.55" strokeWidth="2" />
          <line x1="734" y1="432" x2="734" y2="486" stroke="#000000" strokeOpacity="0.55" strokeWidth="2" />

          {/* Paraguayan triband flying from the keep */}
          <line x1="720" y1="266" x2="720" y2="218" stroke="#2a3244" strokeWidth="3" />
          <g>
            <path d="M722,220 C740,214 758,226 776,220 C783,218 789,219 796,222 L796,233 C789,230 783,229 776,231 C758,237 740,225 722,231 Z" fill="#d52b1e" />
            <path d="M722,231 C740,225 758,237 776,231 C783,229 789,230 796,233 L796,244 C789,241 783,240 776,242 C758,248 740,236 722,242 Z" fill="#f1f1ed" />
            <path d="M722,242 C740,236 758,248 776,242 C783,240 789,241 796,244 L796,255 C789,252 783,251 776,253 C758,259 740,247 722,253 Z" fill="#2b4fa0" />
          </g>

          {/* Foreground ground and torch-lit approach */}
          <path d="M0,600 L0,506 Q360,482 720,490 T1440,504 L1440,600 Z" fill="#070b14" />
          <path d="M706,488 L734,488 L806,600 L634,600 Z" fill="#10182a" />
          <path d="M714,488 L726,488 L760,600 L680,600 Z" fill="#e8b342" opacity="0.08" />
          <line x1="672" y1="520" x2="672" y2="500" stroke="#0a0f1c" strokeWidth="4" />
          <circle cx="672" cy="496" r="12" fill="url(#pgTorch)" className="pg-flicker" style={{ animationDelay: "0.9s" }} />
          <circle cx="672" cy="496" r="3" fill="#ffc97a" />
          <line x1="768" y1="520" x2="768" y2="500" stroke="#0a0f1c" strokeWidth="4" />
          <circle cx="768" cy="496" r="12" fill="url(#pgTorch)" className="pg-flicker" style={{ animationDelay: "2s" }} />
          <circle cx="768" cy="496" r="3" fill="#ffc97a" />

          {/* Framing foreground trees */}
          <g fill="#04070e">
            <path d="M-20,600 L60,420 L140,600 Z" />
            <path d="M60,600 L130,448 L200,600 Z" opacity="0.85" />
            <path d="M1240,600 L1310,448 L1380,600 Z" opacity="0.85" />
            <path d="M1300,600 L1380,420 L1460,600 Z" />
          </g>

          {/* Fireflies */}
          <g fill="#ffc97a">
            <circle cx="300" cy="430" r="2" opacity="0.6" className="pg-twinkle" />
            <circle cx="420" cy="470" r="1.6" opacity="0.5" className="pg-twinkle" style={{ animationDelay: "1.2s" }} />
            <circle cx="1060" cy="440" r="2" opacity="0.6" className="pg-twinkle" style={{ animationDelay: "0.5s" }} />
            <circle cx="1160" cy="480" r="1.6" opacity="0.5" className="pg-twinkle" style={{ animationDelay: "2.1s" }} />
          </g>
        </svg>

        {/* Scrims for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080b0d]/85 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b0d] via-[#080b0d]/25 to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-32 md:pb-40 max-w-[900px]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.p
          className="text-sm md:text-base text-[#b6b9bb] font-medium uppercase tracking-[0.2em] mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Bienvenido a
        </motion.p>

        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span className="block text-[#f1f1ed]">PARAGUAY</span>
          <span className="block text-[#d62f2f]">CRAFT</span>
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-[#b6b9bb] max-w-prose mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.4 }}
        >
          {siteConfig.description}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <CopyServerIpButton />
          <MinecraftButton
            variant="secondary"
            href={siteConfig.discordUrl}
            icon={<MessageCircle size={20} />}
          >
            Discord
          </MinecraftButton>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[600px] px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <ServerConnectionBar />
        </motion.div>
      </motion.div>
    </section>
  );
}
