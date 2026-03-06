"use client";

import { BentoCard, PulseTag, GlitchText, RenderIcon } from "@/components/forge";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
const INITIAL_EVENTS = [
    { id: 1, builder: "0xNeo", action: "shipped", project: "CollabRise Core v2", status: "shipped" as const, time: "2s ago", guild: "React Guild", icon: "IconCpu", scoreDelta: "+1,200" },
    { id: 2, builder: "0xAlice", action: "staked 500 PTS on", project: "Neon DEX Audit", status: "staked" as const, time: "14s ago", guild: "React Guild", icon: "IconCpu", scoreDelta: "-500" },
    { id: 3, builder: "ChefMika", action: "joined War Room", project: "Zero-Waste Menu", status: "building" as const, time: "32s ago", guild: "Culinary Guild", icon: "IconFlame", scoreDelta: "+50" },
    { id: 4, builder: "RustNinja", action: "filed dispute in", project: "CNC Controller", status: "staked" as const, time: "1m ago", guild: "Maker Guild", icon: "IconWrench", scoreDelta: "0" },
    { id: 5, builder: "DesignYuki", action: "pushed 14 commits to", project: "Brand System v4", status: "live" as const, time: "2m ago", guild: "Design Guild", icon: "IconPalette", scoreDelta: "+280" },
    { id: 6, builder: "MakerJoe", action: "completed milestone in", project: "IoT Sensor Hub", status: "shipped" as const, time: "4m ago", guild: "Maker Guild", icon: "IconWrench", scoreDelta: "+340" },
    { id: 7, builder: "WriterAsh", action: "published post-mortem for", project: "Newsletter Pivot", status: "building" as const, time: "5m ago", guild: "Writing Guild", icon: "IconPencil", scoreDelta: "+100" },
    { id: 8, builder: "0xBob", action: "created War Room", project: "Cross-Chain Bridge", status: "live" as const, time: "8m ago", guild: "Rust Guild", icon: "IconCode", scoreDelta: "+200" },
    { id: 9, builder: "CryptoMage", action: "received 5-star review on", project: "DEX Protocol", status: "shipped" as const, time: "12m ago", guild: "Rust Guild", icon: "IconCode", scoreDelta: "+500" },
    { id: 10, builder: "DesignSensei", action: "mentored 3 builders in", project: "Design Guild Bootcamp", status: "live" as const, time: "15m ago", guild: "Design Guild", icon: "IconPalette", scoreDelta: "+150" },
    { id: 11, builder: "GuildMaster_Kai", action: "promoted to Elder in", project: "React Guild", status: "shipped" as const, time: "22m ago", guild: "React Guild", icon: "IconCpu", scoreDelta: "+800" },
    { id: 12, builder: "SecAuditor_K", action: "completed bounty", project: "Smart Contract Audit", status: "shipped" as const, time: "30m ago", guild: "Blockchain Guild", icon: "IconLink", scoreDelta: "+2,500" },
];

const STATS = [
    { label: "EVENTS/MIN", value: "42", color: "text-lime" },
    { label: "BUILDERS ONLINE", value: "1,203", color: "text-cyber" },
    { label: "SHIPS TODAY", value: "47", color: "text-acid" },
    { label: "ACTIVE ROOMS", value: "2,847", color: "text-yellow-400" },
];

export default function GlobalPulsePage() {
    const [events, setEvents] = useState(INITIAL_EVENTS);
    const [liveCount, setLiveCount] = useState(42);

    useEffect(() => {
        const interval = setInterval(() => {
            setLiveCount(prev => prev + Math.floor(Math.random() * 3));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-5xl mx-auto px-6 py-32">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="relative"><div className="w-4 h-4 bg-lime rounded-full animate-pulse" /><div className="w-4 h-4 bg-lime rounded-full absolute inset-0 animate-ping opacity-30" /></div>
                        <GlitchText text="GLOBAL PULSE" as="h1" className="text-6xl" />
                    </div>
                    <p className="font-mono text-white/50 max-w-xl mb-8">Real-time activity across the entire CollabRise ecosystem. Every ship, stake, dispute, and commit — as it happens.</p>

                    {/* Live Stats */}
                    <div className="grid grid-cols-4 gap-4 mb-12">
                        {STATS.map(s => (
                            <BentoCard key={s.label} className="p-4 text-center">
                                <p className={`font-clash font-bold text-2xl ${s.color}`}>{s.value}</p>
                                <p className="font-mono text-[10px] text-white/30 mt-1">{s.label}</p>
                            </BentoCard>
                        ))}
                    </div>
                </motion.div>

                {/* Event Stream */}
                <div className="space-y-2">
                    {events.map((e, i) => (
                        <motion.div key={e.id} initial={{ opacity: 0, x: -30, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: i * 0.04, type: "spring", stiffness: 200, damping: 25 }}>
                            <BentoCard className="p-4 flex items-center gap-4 hover:border-lime/20 cursor-pointer group transition-all">
                                <div className="flex-shrink-0 flex items-center gap-3">
                                    <PulseTag status={e.status} />
                                    <RenderIcon name={e.icon} className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1 flex-wrap">
                                        <Link href={`/ship-log/${e.builder}`} className="font-clash font-bold text-white hover:text-lime transition-colors">{e.builder}</Link>
                                        <span className="font-mono text-sm text-white/40">{e.action}</span>
                                        <span className="font-clash font-bold text-lime truncate">{e.project}</span>
                                    </div>
                                    <p className="font-mono text-[10px] text-white/30 mt-0.5">{e.guild}</p>
                                </div>
                                <div className="flex items-center gap-4 flex-shrink-0">
                                    {e.scoreDelta !== "0" && <span className={`font-mono text-xs font-bold ${e.scoreDelta.startsWith("+") ? "text-lime" : "text-acid"}`}>{e.scoreDelta}</span>}
                                    <span className="font-mono text-xs text-white/30 whitespace-nowrap w-16 text-right">{e.time}</span>
                                </div>
                            </BentoCard>
                        </motion.div>
                    ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-8">
                    <p className="font-mono text-xs text-white/30 mb-4">{liveCount} events in the last minute</p>
                </div>
            </main>
        </div>
    );
}
