"use client";

import { motion } from "framer-motion";
import { BentoCard, GlitchText, ShipScoreCounter } from "@/components/forge";
import Link from "next/link";
const LEADERS = [
    { rank: 1, name: "0xNeo", guild: "React Guild", guildIcon: "IconCpu", score: 12400, ships: 24, streak: 14, reviews: 89, failRate: "2%", topShip: "Auth SDK v3" },
    { rank: 2, name: "CryptoMage", guild: "Rust Guild", guildIcon: "IconCode", score: 11800, ships: 21, streak: 10, reviews: 72, failRate: "4%", topShip: "DEX Protocol" },
    { rank: 3, name: "DesignSensei", guild: "Design Guild", guildIcon: "IconPalette", score: 11200, ships: 19, streak: 12, reviews: 95, failRate: "1%", topShip: "Design System v5" },
    { rank: 4, name: "0xAlice", guild: "React Guild", guildIcon: "IconCpu", score: 9500, ships: 16, streak: 8, reviews: 64, failRate: "5%", topShip: "State Machine Kit" },
    { rank: 5, name: "SecAuditor_K", guild: "Blockchain", guildIcon: "IconLink", score: 9200, ships: 15, streak: 9, reviews: 58, failRate: "3%", topShip: "Smart Contract Audit" },
    { rank: 6, name: "ChefMika", guild: "Culinary Guild", guildIcon: "IconFlame", score: 8900, ships: 14, streak: 6, reviews: 42, failRate: "7%", topShip: "AI Recipe Engine" },
    { rank: 7, name: "RustNinja", guild: "Rust Guild", guildIcon: "IconCode", score: 8400, ships: 12, streak: 9, reviews: 56, failRate: "3%", topShip: "WASM Runtime" },
    { rank: 8, name: "MakerJoe", guild: "Maker Guild", guildIcon: "IconWrench", score: 7800, ships: 11, streak: 5, reviews: 38, failRate: "8%", topShip: "IoT Sensor Hub" },
    { rank: 9, name: "WriterAsh", guild: "Writing Guild", guildIcon: "IconPencil", score: 7200, ships: 18, streak: 7, reviews: 82, failRate: "2%", topShip: "API Docs Generator" },
    { rank: 10, name: "DevMarcus", guild: "React Guild", guildIcon: "IconCpu", score: 6800, ships: 10, streak: 4, reviews: 44, failRate: "10%", topShip: "CLI Migration Tool" },
    { rank: 11, name: "WasmWizard", guild: "Rust Guild", guildIcon: "IconCode", score: 6500, ships: 9, streak: 3, reviews: 33, failRate: "6%", topShip: "WASM Compiler" },
    { rank: 12, name: "DesignYuki", guild: "Design Guild", guildIcon: "IconPalette", score: 6100, ships: 9, streak: 3, reviews: 45, failRate: "4%", topShip: "Micro-Animation Kit" },
];

const RANK_STYLES = [
    "bg-gradient-to-br from-yellow-400/10 to-transparent border-yellow-400/30",
    "bg-gradient-to-br from-gray-300/10 to-transparent border-gray-300/30",
    "bg-gradient-to-br from-amber-600/10 to-transparent border-amber-600/30",
];

const RANK_COLORS = ["text-yellow-400", "text-gray-300", "text-amber-600"];

export default function LeaderboardPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-6xl mx-auto px-6 py-32">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="font-clash font-bold text-6xl mb-3"><GlitchText text="HALL OF FAME" /></h1>
                    <p className="font-mono text-white/50 max-w-xl mb-12">The top builders across the entire ecosystem. Ranked by Ship Score. Updated in real-time.</p>
                </motion.div>

                {/* Top 3 Podium */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {LEADERS.slice(0, 3).map((l, i) => (
                        <motion.div key={l.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, type: "spring" }}>
                            <Link href={`/ship-log/${l.name}`}>
                                <BentoCard className={`p-8 text-center cursor-pointer group transition-all hover:scale-[1.02] ${RANK_STYLES[i]}`}>
                                    <span className={`font-clash font-bold text-5xl ${RANK_COLORS[i]}`}>#{l.rank}</span>
                                    <div className="w-20 h-20 mx-auto my-4 bg-lime/10 border-2 border-lime/20 rounded-full flex items-center justify-center font-clash font-bold text-3xl text-lime group-hover:border-lime/40 transition-colors">{l.name[0]}</div>
                                    <h3 className="font-clash font-bold text-2xl group-hover:text-lime transition-colors">{l.name}</h3>
                                    <p className="font-mono text-xs text-white/40 mt-1">{l.guildIcon} {l.guild}</p>
                                    <div className="mt-4"><ShipScoreCounter value={l.score} size="md" /></div>
                                    <div className="grid grid-cols-3 gap-2 mt-4">
                                        <div className="p-2 bg-white/5 rounded"><p className="font-clash font-bold">{l.ships}</p><p className="font-mono text-[9px] text-white/30">SHIPS</p></div>
                                        <div className="p-2 bg-white/5 rounded"><p className="font-clash font-bold text-lime">{l.streak}d</p><p className="font-mono text-[9px] text-white/30">STREAK</p></div>
                                        <div className="p-2 bg-white/5 rounded"><p className="font-clash font-bold">{l.reviews}</p><p className="font-mono text-[9px] text-white/30">REVIEWS</p></div>
                                    </div>
                                    <p className="font-mono text-[10px] text-white/30 mt-3">Top Ship: <span className="text-lime">{l.topShip}</span></p>
                                </BentoCard>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Remaining Leaderboard */}
                <div className="space-y-2">
                    {LEADERS.slice(3).map((l, i) => (
                        <motion.div key={l.name} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                            <Link href={`/ship-log/${l.name}`}>
                                <BentoCard className="p-4 flex items-center gap-4 hover:border-lime/20 cursor-pointer group transition-all">
                                    <span className="font-clash font-bold text-lg text-white/30 w-10 text-right">#{l.rank}</span>
                                    <div className="w-10 h-10 bg-lime/10 border border-lime/20 rounded-full flex items-center justify-center font-clash font-bold text-lime">{l.name[0]}</div>
                                    <div className="flex-1">
                                        <h3 className="font-clash font-bold group-hover:text-lime transition-colors">{l.name}</h3>
                                        <p className="font-mono text-[10px] text-white/30">{l.guildIcon} {l.guild} · Top: {l.topShip}</p>
                                    </div>
                                    <div className="flex items-center gap-6 font-mono text-sm">
                                        <div className="text-center"><p className="font-clash font-bold">{l.ships}</p><p className="text-[9px] text-white/30">SHIPS</p></div>
                                        <div className="text-center"><p className="font-clash font-bold text-lime">{l.streak}d</p><p className="text-[9px] text-white/30">STREAK</p></div>
                                        <span className="font-clash font-bold text-lime text-xl w-20 text-right">{l.score.toLocaleString()}</span>
                                    </div>
                                </BentoCard>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
