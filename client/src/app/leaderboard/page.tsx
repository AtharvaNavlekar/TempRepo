"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Crown } from "lucide-react";

const LEADERS = [
    { rank: 1, name: "0xNeo", guild: "React Guild", score: 12400, ships: 24, streak: 14, topShip: "Auth SDK v3" },
    { rank: 2, name: "CryptoMage", guild: "Rust Guild", score: 11800, ships: 21, streak: 10, topShip: "DEX Protocol" },
    { rank: 3, name: "DesignSensei", guild: "Design Guild", score: 11200, ships: 19, streak: 12, topShip: "Design System v5" },
    { rank: 4, name: "0xAlice", guild: "React Guild", score: 9500, ships: 16, streak: 8, topShip: "State Machine Kit" },
    { rank: 5, name: "SecAuditor_K", guild: "Blockchain", score: 9200, ships: 15, streak: 9, topShip: "Smart Contract Audit" },
    { rank: 6, name: "ChefMika", guild: "Culinary Guild", score: 8900, ships: 14, streak: 6, topShip: "AI Recipe Engine" },
    { rank: 7, name: "RustNinja", guild: "Rust Guild", score: 8400, ships: 12, streak: 9, topShip: "WASM Runtime" },
    { rank: 8, name: "MakerJoe", guild: "Maker Guild", score: 7800, ships: 11, streak: 5, topShip: "IoT Sensor Hub" },
    { rank: 9, name: "WriterAsh", guild: "Writing Guild", score: 7200, ships: 18, streak: 7, topShip: "API Docs Generator" },
    { rank: 10, name: "DevMarcus", guild: "React Guild", score: 6800, ships: 10, streak: 4, topShip: "CLI Migration Tool" },
];

const PODIUM_COLORS = ["#C9A353", "#8C8C8C", "#A07850"];

export default function LeaderboardPage() {
    return (
        <div className="luxury-page">
            {/* Header */}
            <div style={{ background: "var(--parchment)", padding: "80px 0 52px", borderBottom: "1px solid rgba(13,13,13,.08)" }}>
                <div className="luxury-container">
                    <p className="luxury-overline" style={{ marginBottom: 12 }}>Rise Protocol · Top 1%</p>
                    <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 400, color: "var(--ink)", lineHeight: 1, letterSpacing: "-.03em", marginBottom: 16 }}>
                        Hall of<br /><em className="gold-shimmer-text">Founders</em>
                    </h1>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--smoke)", maxWidth: 440, lineHeight: 1.8 }}>
                        These are the top founders across the entire ecosystem — ranked by verified Ship Score, updated in real-time.
                    </p>
                </div>
            </div>

            <div className="luxury-container" style={{ paddingTop: 56, paddingBottom: 80 }}>
                {/* Top 3 Podium */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 48 }}>
                    {LEADERS.slice(0, 3).map((l, i) => (
                        <motion.div key={l.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, type: "spring" }}>
                            <Link href={`/ship-log/${l.name}`} style={{ textDecoration: "none" }}>
                                <div className="luxury-card" style={{ padding: 32, textAlign: "center", cursor: "pointer", position: "relative", overflow: "hidden", borderTop: `3px solid ${PODIUM_COLORS[i]}` }}>
                                    {i === 0 && <Crown size={18} style={{ color: "#C9A353", margin: "0 auto 12px", display: "block" }} />}
                                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "3.5rem", fontStyle: "italic", color: PODIUM_COLORS[i], lineHeight: 1, marginBottom: 16, opacity: 0.3 }}>#{l.rank}</p>
                                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: `rgba(${i === 0 ? "201,163,83" : i === 1 ? "140,140,140" : "160,120,80"},.1)`, border: `2px solid ${PODIUM_COLORS[i]}30`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", color: PODIUM_COLORS[i] }}>
                                        {l.name[0]}
                                    </div>
                                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", marginBottom: 4 }}>{l.name}</h3>
                                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "var(--smoke)", marginBottom: 16 }}>{l.guild}</p>
                                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontStyle: "italic", color: PODIUM_COLORS[i], marginBottom: 20 }}>{l.score.toLocaleString()}</p>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                                        {[{ label: "Ships", v: l.ships }, { label: "Streak", v: `${l.streak}d` }].map((s, idx) => (
                                            <div key={s.label} style={{ padding: "8px 0", borderRight: idx === 0 ? "1px solid rgba(13,13,13,.07)" : "none", textAlign: "center" }}>
                                                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", color: "var(--ink)" }}>{s.v}</p>
                                                <p className="luxury-overline">{s.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <p style={{ marginTop: 14, fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "var(--smoke)" }}>Top Venture: <span style={{ color: "#C9A353" }}>{l.topShip}</span></p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(201,163,83,.4), transparent)", marginBottom: 32 }} />

                {/* Ranked List */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {LEADERS.slice(3).map((l, i) => (
                        <motion.div key={l.name} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                            <Link href={`/ship-log/${l.name}`} style={{ textDecoration: "none" }}>
                                <div className="luxury-card" style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}>
                                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontStyle: "italic", color: "rgba(13,13,13,.2)", width: 36, textAlign: "right", flexShrink: 0 }}>#{l.rank}</span>
                                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(201,163,83,.08)", border: "1px solid rgba(201,163,83,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: ".85rem", color: "#8B6B1A", flexShrink: 0 }}>{l.name[0]}</div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)", marginBottom: 2 }}>{l.name}</p>
                                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "var(--smoke)" }}>{l.guild} · {l.topShip}</p>
                                    </div>
                                    <div style={{ display: "flex", gap: 24 }}>
                                        {[{ label: "Ships", v: l.ships }, { label: "Streak", v: `${l.streak}d` }].map(s => (
                                            <div key={s.label} style={{ textAlign: "center" }}>
                                                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", color: "var(--ink)" }}>{s.v}</p>
                                                <p className="luxury-overline">{s.label}</p>
                                            </div>
                                        ))}
                                        <div style={{ textAlign: "right", minWidth: 70 }}>
                                            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontStyle: "italic", color: "#C9A353" }}>{l.score.toLocaleString()}</p>
                                            <p className="luxury-overline">Score</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
