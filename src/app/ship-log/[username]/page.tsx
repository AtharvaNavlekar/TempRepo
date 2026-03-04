"use client";

import { motion } from "framer-motion";
import { BentoCard, DNACard, PulseTag, ForgeButton, ShipScoreCounter, GlitchText } from "@/components/forge";
import { useParams } from "next/navigation";
import Link from "next/link";
// Mock Data
const BUILDER_DATA = {
    username: "0xNeo",
    industry: "Full-Stack Engineer",
    score: 8442,
    rank: "Diamond B-Class",
    description: "Building autonomous systems and rejecting corporate structure. 14 successful ships this year.",
    ships: [
        {
            id: "ship-001",
            title: "CollabRise Protocol Core",
            type: "ARCHITECTURE",
            score: 1450,
            date: "2026-02-14",
            tags: ["Rust", "WASM", "P2P"],
            metrics: [
                { label: "COMMITS", value: "2.4K" },
                { label: "PEER RATING", value: "9.8" },
            ],
            typeIcon: "IconShipScore",
        },
        {
            id: "ship-002",
            title: "Neon DEX Interface",
            type: "FRONTEND",
            score: 890,
            date: "2026-01-22",
            tags: ["React", "Three.js", "Framer"],
            metrics: [
                { label: "USERS", value: "14K+" },
                { label: "BOUNTY", value: "$5K" },
            ],
            typeIcon: "IconEye",
        },
        {
            id: "ship-003",
            title: "Zero-Knowledge Auth Layer",
            type: "SECURITY",
            score: 2100,
            date: "2025-11-05",
            tags: ["Cryptography", "Go", "ZKP"],
            metrics: [
                { label: "AUDITS", value: "Passed" },
                { label: "IMPACT", value: "Critical" },
            ],
            typeIcon: "IconShield",
        }
    ]
};

export default function PublicShipLog() {
    const params = useParams();
    const username = params?.username as string;

    const isOwner = username === "0xNeo"; // Simulating auth check

    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans selection:bg-lime/30">

            <main className="max-w-7xl mx-auto px-6 py-32">
                {/* Header Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12"
                >
                    <BentoCard colSpan={3} className="md:col-span-8 p-10 bg-gradient-to-br from-white/5 to-transparent">
                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-bento-sm bg-obsidian border-2 border-white/10 overflow-hidden relative z-10">
                                    {/* Placeholder Avatar - brutalist style */}
                                    <div className="w-full h-full bg-gradient-to-tr from-cyber/20 to-lime/20 flex flex-col items-center justify-center">
                                        <GlitchText text={username.substring(0, 2).toUpperCase()} className="text-4xl font-clash" />
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-lime/20 blur-xl scale-110 group-hover:bg-lime/40 transition-colors z-0" />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                    <h1 className="font-clash font-bold text-4xl">{username}</h1>
                                    <PulseTag label="ACTIVE BUILDER" status="live" className="scale-90 origin-left" />
                                </div>
                                <p className="font-mono text-lime tracking-widest uppercase text-sm mb-4">
                                    {BUILDER_DATA.industry} {"// "}{BUILDER_DATA.rank}
                                </p>
                                <p className="font-mono text-white/50 text-sm max-w-xl leading-relaxed">
                                    {BUILDER_DATA.description}
                                </p>
                            </div>
                        </div>
                    </BentoCard>

                    <BentoCard colSpan={1} className="md:col-span-4 p-8 flex flex-col justify-center items-center text-center bg-black/40">
                        <h3 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-4">Verified Ship Score</h3>
                        <ShipScoreCounter value={BUILDER_DATA.score} size="lg" />

                        {isOwner && (
                            <Link href="/ship-log/studio" className="mt-6 w-full">
                                <ForgeButton variant="ghost" className="w-full text-xs py-3 text-white/50 hover:text-white">
                                    ENTER STUDIO
                                </ForgeButton>
                            </Link>
                        )}
                    </BentoCard>
                </motion.div>

                {/* Timeline Section */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="font-clash font-semibold text-2xl flex items-center gap-3">
                            <span className="w-2 h-8 bg-lime inline-block"></span>
                            The Ship Log
                        </h2>

                        <div className="flex gap-4">
                            <Link href="/ship-log/heatmap">
                                <ForgeButton variant="secondary" size="sm">SKILL HEATMAP</ForgeButton>
                            </Link>
                            <Link href="/ship-log/reviews">
                                <ForgeButton variant="secondary" size="sm">PEER REVIEWS</ForgeButton>
                            </Link>
                        </div>
                    </div>

                    <div className="relative border-l-2 border-white/10 pl-8 ml-4 space-y-12">
                        {BUILDER_DATA.ships.map((ship, index) => (
                            <motion.div
                                key={ship.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: index * 0.1 }}
                                className="relative"
                            >
                                {/* Timeline Node */}
                                <div className="absolute -left-[41px] top-6 w-5 h-5 bg-obsidian border-2 border-lime rounded-full z-10 shadow-[0_0_10px_rgba(204,255,0,0.5)]" />
                                <div className="absolute -left-[32px] top-8 w-8 h-px bg-lime/30" />

                                <Link href={`/ship-log/dna/${ship.id}`}>
                                    <DNACard
                                        {...ship}
                                    />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
}
