"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Check, ArrowRight } from "lucide-react";

const GUILDS = [
    { id: "react", name: "The React Core", emoji: "⚡", memberCount: 1420 },
    { id: "3d", name: "Spatial Web", emoji: "🌐", memberCount: 384 },
    { id: "ai", name: "Neural Ops", emoji: "🧠", memberCount: 2105 },
    { id: "hardware", name: "Iron & Silicon", emoji: "🔧", memberCount: 156 },
    { id: "design", name: "Pixel Perfect", emoji: "🎨", memberCount: 890 },
    { id: "rust", name: "Rustaceans", emoji: "🦀", memberCount: 450 },
];

export default function GuildSelectionPage() {
    const router = useRouter();
    const [selectedGuilds, setSelectedGuilds] = useState<string[]>([]);
    const [search, setSearch] = useState("");
    const filteredGuilds = GUILDS.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));
    const toggleGuild = (id: string) => setSelectedGuilds(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);

    return (
        <div className="luxury-page" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: "0 24px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(201,163,83,.04) 1px, transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />

            <div style={{ flex: 1, display: "flex", flexDirection: "column", maxWidth: 1000, margin: "0 auto", width: "100%", position: "relative", zIndex: 10, paddingTop: 80, paddingBottom: 120 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, gap: 24, flexWrap: "wrap" }}>
                    <div>
                        <p className="luxury-overline" style={{ marginBottom: 12 }}>Phase 5 · Tribe Selection</p>
                        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 400, color: "var(--ink)" }}>
                            Choose Your <em className="gold-shimmer-text">Guilds</em>
                        </h1>
                    </div>
                    <div style={{ position: "relative" }}>
                        <Search size={13} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(13,13,13,.3)" }} />
                        <input type="text" placeholder="Search guilds..." value={search} onChange={e => setSearch(e.target.value)}
                            style={{ width: 260, paddingLeft: 36, paddingRight: 16, paddingTop: 10, paddingBottom: 10, background: "#fff", border: "1px solid rgba(13,13,13,.1)", borderRadius: 9999, fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--ink)", outline: "none" }}
                            onFocus={e => (e.currentTarget.style.borderColor = "#C9A353")}
                            onBlur={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,.1)")}
                        />
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
                    <AnimatePresence>
                        {filteredGuilds.map((guild, i) => {
                            const isSelected = selectedGuilds.includes(guild.id);
                            return (
                                <motion.div key={guild.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                                    <div className="luxury-card" onClick={() => toggleGuild(guild.id)}
                                        style={{
                                            padding: 28, height: 180, cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between",
                                            borderColor: isSelected ? "rgba(201,163,83,.4)" : undefined,
                                            background: isSelected ? "rgba(201,163,83,.03)" : "#fff",
                                            transition: "all .3s"
                                        }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                <span style={{ fontSize: "1.5rem" }}>{guild.emoji}</span>
                                                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontWeight: 400, color: "var(--ink)" }}>{guild.name}</h3>
                                            </div>
                                            <div style={{
                                                width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                                                background: isSelected ? "#C9A353" : "transparent", border: isSelected ? "none" : "1.5px solid rgba(13,13,13,.12)",
                                                transition: "all .2s"
                                            }}>
                                                {isSelected && <Check size={12} style={{ color: "#fff" }} />}
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "var(--smoke)" }}>{guild.memberCount.toLocaleString()} active</span>
                                            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#C9A353", opacity: 0.7 }}>Join ↗</span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Fixed bottom CTA */}
            <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "20px 0 28px", background: "linear-gradient(to top, var(--cream), rgba(250,247,240,.95), transparent)", zIndex: 50, display: "flex", justifyContent: "center" }}>
                <button className="btn-primary" onClick={() => router.push("/dashboard")} style={{ padding: "16px 48px", fontSize: 14 }}>
                    Enter CollabRise <ArrowRight size={15} />
                </button>
            </div>
        </div>
    );
}
