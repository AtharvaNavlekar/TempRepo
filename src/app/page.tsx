"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
    ForgeButton,
    BentoCard,
    GlitchText,
    SpringTransition,
} from "@/components/forge";
import BuilderTicker from "@/components/landing/BuilderTicker";
import ManifestoScroll from "@/components/landing/ManifestoScroll";

// Dynamic import for Three.js (no SSR)
const ArtifactCloud = dynamic(
    () => import("@/components/landing/ArtifactCloud"),
    { ssr: false }
);

/* ─── Protocol Feature Data ─── */
const PROTOCOL_FEATURES = [
    {
        icon: "⚡",
        title: "Ship Score",
        description:
            "Your on-chain proof of execution. Every commit, every pixel, every plate — quantified and verified. No faking it.",
        accent: "lime" as const,
        colSpan: 2 as const,
    },
    {
        icon: "🧬",
        title: "Artifact DNA",
        description:
            "We extract genetic metadata from your work. PSD layers, Git commits, word counts. Your artifacts speak for themselves.",
        accent: "cyber" as const,
        colSpan: 1 as const,
    },
    {
        icon: "🔒",
        title: "Commitment Contracts",
        description:
            "Stake your reputation. Ghost a project and watch your profile decay in real-time with glitch effects.",
        accent: "acid" as const,
        colSpan: 1 as const,
    },
    {
        icon: "💀",
        title: "Failure Vault",
        description:
            "Your darkest moments, archived. Post-mortems that prove you learn from breaking things. Redacted. Raw. Real.",
        accent: "acid" as const,
        colSpan: 1 as const,
    },
    {
        icon: "⚔️",
        title: "Guilds",
        description:
            "Join your tribe. React Guild. Woodworking Guild. Chef Guild. Rise through the ranks by shipping together.",
        accent: "cyber" as const,
        colSpan: 1 as const,
    },
    {
        icon: "💰",
        title: "Build-to-Hire",
        description:
            "Companies don't interview you — they see what you've built. Sprint challenges replace the whiteboard forever.",
        accent: "lime" as const,
        colSpan: 2 as const,
    },
];

/* ─── Stats Data ─── */
const STATS = [
    { value: "14.2K", label: "Builders" },
    { value: "89.7K", label: "Artifacts Shipped" },
    { value: "2,847", label: "Active War Rooms" },
    { value: "342", label: "Guilds" },
];

export default function ManifestoPage() {
    return (
        <main className="min-h-screen bg-obsidian text-white overflow-hidden">
            {/* ═══════════════════════════════════════
          SECTION 1: HERO
          ═══════════════════════════════════════ */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Radial gradient bursts */}
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-lime/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-cyber/5 rounded-full blur-[100px]" />
                    <div className="absolute top-2/3 left-1/2 w-[300px] h-[300px] bg-acid/3 rounded-full blur-[80px]" />

                    {/* Grid lines */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(204, 255, 0, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(204, 255, 0, 0.3) 1px, transparent 1px)
              `,
                            backgroundSize: "80px 80px",
                        }}
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center max-w-5xl mx-auto">
                    {/* Top Badge */}
                    <SpringTransition preset="bounceIn" delay={0.1}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-lime opacity-75 animate-ping" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime" />
                            </span>
                            <span className="font-mono text-[11px] tracking-[0.2em] text-white/50 uppercase">
                                Protocol v1.0 — Now Live
                            </span>
                        </div>
                    </SpringTransition>

                    {/* Main Headline */}
                    <SpringTransition preset="slideUp" delay={0.2}>
                        <h1 className="font-clash font-bold text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] tracking-tight mb-6">
                            <span className="text-white">SHIP.</span>
                            <br />
                            <span className="text-gradient-lime">OR DIE</span>
                            <br />
                            <span className="text-white">TRYING.</span>
                        </h1>
                    </SpringTransition>

                    {/* Glitch Tagline */}
                    <SpringTransition preset="fadeIn" delay={0.5}>
                        <div className="mb-10">
                            <GlitchText
                                text="THE UNIVERSAL PROOF-OF-WORK PROTOCOL"
                                as="h2"
                                className="text-lg md:text-xl lg:text-2xl tracking-[0.15em] text-white/50"
                                continuous
                                speed="slow"
                            />
                        </div>
                    </SpringTransition>

                    {/* CTA Buttons */}
                    <SpringTransition preset="slideUp" delay={0.7}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <ForgeButton variant="primary" size="lg">
                                Enter the Forge
                            </ForgeButton>
                            <ForgeButton variant="ghost" size="lg">
                                Read the Manifesto ↓
                            </ForgeButton>
                        </div>
                    </SpringTransition>

                    {/* Stats Row */}
                    <SpringTransition preset="fadeIn" delay={0.9}>
                        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mt-16 pt-8 border-t border-white/[0.06]">
                            {STATS.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    className="text-center"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.1 + i * 0.15, type: "spring" }}
                                >
                                    <p className="font-clash font-bold text-2xl md:text-3xl text-lime">
                                        {stat.value}
                                    </p>
                                    <p className="font-mono text-[10px] tracking-[0.25em] text-white/30 uppercase mt-1">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </SpringTransition>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
                        <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-lime"
                            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════
          SECTION 2: 3D ARTIFACT CLOUD
          ═══════════════════════════════════════ */}
            <section className="relative py-16 md:py-24">
                <SpringTransition preset="fadeIn">
                    <div className="text-center mb-8">
                        <span className="font-mono text-[11px] tracking-[0.3em] text-white/30 uppercase">
                            Hover to explore artifact DNA
                        </span>
                    </div>
                </SpringTransition>

                <ArtifactCloud />
            </section>

            {/* ═══════════════════════════════════════
          SECTION 3: THE PROTOCOL — BENTO GRID
          ═══════════════════════════════════════ */}
            <section className="relative py-24 md:py-32 px-6 md:px-12">
                {/* Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime/[0.02] rounded-full blur-[200px]" />
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Section Header */}
                    <SpringTransition preset="slideUp">
                        <div className="text-center mb-16">
                            <span className="font-mono text-[11px] tracking-[0.3em] text-lime/60 uppercase block mb-4">
                                The Core Protocol
                            </span>
                            <h2 className="font-clash font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                                How It <span className="text-gradient-multi">Works</span>
                            </h2>
                            <p className="font-mono text-sm text-white/40 max-w-lg mx-auto">
                                Six interconnected systems that replace credentials with proof.
                                No gatekeepers. No interviews. Just verified output.
                            </p>
                        </div>
                    </SpringTransition>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {PROTOCOL_FEATURES.map((feature, i) => (
                            <BentoCard
                                key={i}
                                colSpan={feature.colSpan}
                                accent={feature.accent}
                                delay={i * 0.1}
                            >
                                <div className="h-full flex flex-col">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-3xl">{feature.icon}</span>
                                        <h3 className="font-clash font-bold text-xl text-white">
                                            {feature.title}
                                        </h3>
                                    </div>
                                    <p className="font-mono text-sm text-white/50 leading-relaxed flex-1">
                                        {feature.description}
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-white/[0.06]">
                                        <span className="font-mono text-[10px] tracking-[0.2em] text-lime/50 uppercase cursor-pointer hover:text-lime transition-colors">
                                            Learn more →
                                        </span>
                                    </div>
                                </div>
                            </BentoCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          SECTION 4: BUILDER PULSE TICKER
          ═══════════════════════════════════════ */}
            <BuilderTicker />

            {/* ═══════════════════════════════════════
          SECTION 5: THE MANIFESTO + TERMINAL
          ═══════════════════════════════════════ */}
            <ManifestoScroll />

            {/* ═══════════════════════════════════════
          SECTION 6: FOOTER
          ═══════════════════════════════════════ */}
            <footer className="relative border-t border-white/[0.06] py-16 px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        {/* Brand */}
                        <div className="md:col-span-1">
                            <h3 className="font-clash font-bold text-2xl text-lime mb-3">
                                CollabRise
                            </h3>
                            <p className="font-mono text-xs text-white/30 leading-relaxed">
                                The universal Proof-of-Work protocol. Ship real projects. Replace
                                your resume forever.
                            </p>
                        </div>

                        {/* Navigation columns */}
                        {[
                            {
                                title: "Protocol",
                                links: [
                                    "The Gateway",
                                    "Ship Log",
                                    "War Rooms",
                                    "Guilds",
                                ],
                            },
                            {
                                title: "Economy",
                                links: [
                                    "Marketplace",
                                    "Bounties",
                                    "Escrow",
                                    "Build-to-Hire",
                                ],
                            },
                            {
                                title: "System",
                                links: [
                                    "Command Center",
                                    "API Docs",
                                    "Status",
                                    "Changelog",
                                ],
                            },
                        ].map((col, i) => (
                            <div key={i}>
                                <h4 className="font-clash font-semibold text-sm text-white/50 uppercase tracking-wider mb-4">
                                    {col.title}
                                </h4>
                                <ul className="space-y-2.5">
                                    {col.links.map((link, j) => (
                                        <li key={j}>
                                            <a
                                                href="#"
                                                className="font-mono text-sm text-white/30 hover:text-lime transition-colors"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Bottom bar */}
                    <div className="mt-12 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="font-mono text-[10px] text-white/20 tracking-wider">
                            © 2026 COLLABRISE PROTOCOL. SHIP OR DIE.
                        </p>
                        <div className="flex items-center gap-6">
                            {["Twitter", "GitHub", "Discord"].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="font-mono text-[10px] text-white/20 tracking-wider hover:text-lime transition-colors uppercase"
                                >
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
