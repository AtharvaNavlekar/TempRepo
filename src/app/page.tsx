"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    ForgeButton,
    BentoCard,
    GlitchText,
    SpringTransition,
    RenderIcon,
} from "@/components/forge";
import BuilderTicker from "@/components/landing/BuilderTicker";
import ManifestoScroll from "@/components/landing/ManifestoScroll";



/* ─── Protocol Feature Data ─── */
const PROTOCOL_FEATURES = [
    {
        icon: "IconShipScore",
        title: "Verified Score",
        description:
            "Your verified proof of execution. Every commit, every pixel, every plate — quantified and verified. No faking it.",
        accent: "lime" as const,
        colSpan: 2 as const,
    },
    {
        icon: "IconDNA",
        title: "Verified Work",
        description:
            "We analyze metadata to prove your work is authentic. PSD layers, Git commits, word counts. Your work speaks for itself.",
        accent: "cyber" as const,
        colSpan: 1 as const,
    },
    {
        icon: "IconLock",
        title: "Reliability Score",
        description:
            "Stake your reputation. If you abandon a project, your reliability score decreases in real-time.",
        accent: "acid" as const,
        colSpan: 1 as const,
    },
    {
        icon: "IconSkull",
        title: "Learning Log",
        description:
            "Track your past mistakes. Post-mortems that prove you learn from breaking things and grow.",
        accent: "acid" as const,
        colSpan: 1 as const,
    },
    {
        icon: "IconGuild",
        title: "Communities",
        description:
            "Join groups of builders. React Community. Woodworking Community. Chef Community. Rise through the ranks together.",
        accent: "cyber" as const,
        colSpan: 1 as const,
    },
    {
        icon: "IconHire",
        title: "Direct Hiring",
        description:
            "Companies bypass interviews and hire based on what you've actually built. Proof replaces the whiteboard forever.",
        accent: "lime" as const,
        colSpan: 2 as const,
    },
];

/* ─── Stats Data ─── */
const STATS = [
    { value: "14.2K", label: "Builders" },
    { value: "89.7K", label: "Artifacts Shipped" },
    { value: "2,847", label: "Active Projects" },
    { value: "342", label: "Communities" },
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
                        <h1 className="font-clash font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] tracking-tight mb-6">
                            The Professional Network for <span className="text-gradient-lime">Builders</span>.
                        </h1>
                    </SpringTransition>

                    {/* Subtitle Tagline */}
                    <SpringTransition preset="fadeIn" delay={0.5}>
                        <div className="mb-10 max-w-2xl mx-auto">
                            <p className="text-lg md:text-xl text-white/60 leading-relaxed">
                                Ship real projects, build irrefutable proof of your skills, and let your work replace your resume forever.
                            </p>
                        </div>
                    </SpringTransition>

                    {/* CTA Buttons */}
                    <SpringTransition preset="slideUp" delay={0.7}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/onboard">
                                <ForgeButton variant="primary" size="lg" className="w-full sm:w-auto px-8">
                                    Get Started
                                </ForgeButton>
                            </Link>
                            <Link href="/feed">
                                <ForgeButton variant="ghost" size="lg" className="w-full sm:w-auto px-8">
                                    Explore Projects
                                </ForgeButton>
                            </Link>
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
                                        <RenderIcon name={feature.icon} className="w-6 h-6 text-white" />
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
            <div id="manifesto" className="scroll-mt-32" />
            <ManifestoScroll />
        </main>
    );
}
