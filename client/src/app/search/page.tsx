"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Search, X, Zap, Palette, Wrench, Flame, Music, PenTool, Hammer, Banknote, Landmark, Trophy, Telescope } from "lucide-react";

const CATEGORIES = ["ALL", "CODE", "DESIGN", "HARDWARE", "CULINARY", "MUSIC", "WRITING", "MAKER"];
const SORT_OPTIONS = ["RELEVANCE", "SCORE ↓", "NEWEST", "ENDING SOON"];
const TYPE_EMOJIS: Record<string, React.ReactNode> = { CODE: <Zap size={16} />, DESIGN: <Palette size={16} />, HARDWARE: <Wrench size={16} />, CULINARY: <Flame size={16} />, MUSIC: <Music size={16} />, WRITING: <PenTool size={16} />, MAKER: <Hammer size={16} /> };

const RESULTS = [
    { id: "proj-001", title: "Decentralized Identity Layer", type: "CODE", score: 2400, builders: 4, status: "building", guild: "React Guild", description: "Self-sovereign identity protocol replacing centralized credentialing.", progress: 67, tags: ["Rust", "WASM"] },
    { id: "proj-002", title: "AI Recipe Engine", type: "CULINARY", score: 1800, builders: 3, status: "live", guild: "Chef Guild", description: "Generative recipe creation with nutritional scoring.", progress: 85, tags: ["Python", "GPT-4"] },
    { id: "proj-003", title: "Zero-Waste Packaging", type: "DESIGN", score: 3200, builders: 2, status: "shipped", guild: "Design Guild", description: "Compostable packaging designed with circular economy principles.", progress: 100, tags: ["Figma", "Blender"] },
    { id: "proj-004", title: "CNC Controller v2", type: "HARDWARE", score: 900, builders: 5, status: "staked", guild: "Maker Guild", description: "Multi-axis CNC controller with real-time toolpath visualization.", progress: 22, tags: ["C++", "Arduino"] },
    { id: "proj-006", title: "Cross-Platform Auth SDK", type: "CODE", score: 4100, builders: 3, status: "live", guild: "React Guild", description: "Universal auth SDK supporting passkeys, OAuth, and Web3.", progress: 78, tags: ["TypeScript", "OAuth"] },
];

const STATUS_COLORS: Record<string, string> = {
    building: "#977833", live: "#5B8A6F", shipped: "rgba(13,13,13,.4)", staked: "#6B7CB8"
};

export default function SearchPage() {
    const [activeCategory, setActiveCategory] = useState("ALL");
    const [query, setQuery] = useState("");

    const filtered = RESULTS.filter(r => {
        const matchCategory = activeCategory === "ALL" || r.type === activeCategory;
        const matchQuery = !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
        return matchCategory && matchQuery;
    });

    return (
        <div className="luxury-page">
            {/* Header */}
            <div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}>
                <div className="luxury-container">
                    <p className="luxury-overline" style={{ marginBottom: 12 }}>Rise Protocol · Explore</p>
                    <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 400, color: "var(--ink)", lineHeight: 1, letterSpacing: "-.03em", marginBottom: 32 }}>
                        Search <em className="gold-shimmer-text">everything</em>
                    </h1>
                    <div style={{ position: "relative", maxWidth: 640 }}>
                        <Search size={16} style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "rgba(13,13,13,.3)" }} />
                        <input
                            type="text" value={query} onChange={e => setQuery(e.target.value)}
                            placeholder="Search ventures, founders, guilds, skills..."
                            style={{ width: "100%", paddingLeft: 48, paddingRight: query ? 44 : 20, paddingTop: 18, paddingBottom: 18, background: "#fff", border: "1.5px solid rgba(13,13,13,.1)", borderRadius: 16, fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "var(--ink)", outline: "none", boxShadow: "0 4px 20px rgba(13,13,13,.06)", transition: "border-color .2s, box-shadow .2s" }}
                            onFocus={e => { e.currentTarget.style.borderColor = "#C9A353"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(201,163,83,.12)"; }}
                            onBlur={e => { e.currentTarget.style.borderColor = "rgba(13,13,13,.1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(13,13,13,.06)"; }}
                        />
                        {query && (
                            <button onClick={() => setQuery("")} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(13,13,13,.3)", display: "flex", alignItems: "center" }}>
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div style={{ background: "#fff", borderBottom: "1px solid rgba(13,13,13,.07)", padding: "16px 0" }}>
                <div className="luxury-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {CATEGORIES.map(cat => (
                            <motion.button key={cat} whileTap={{ scale: 0.95 }} onClick={() => setActiveCategory(cat)} style={{
                                display: "inline-flex", alignItems: "center", gap: "6px",
                                padding: "7px 14px", fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 500,
                                letterSpacing: ".1em", textTransform: "uppercase", borderRadius: 9999, border: "1px solid", cursor: "pointer", transition: "all .2s",
                                background: activeCategory === cat ? "var(--ink)" : "transparent",
                                color: activeCategory === cat ? "#fff" : "rgba(13,13,13,.4)",
                                borderColor: activeCategory === cat ? "var(--ink)" : "rgba(13,13,13,.12)",
                            }}>
                                {TYPE_EMOJIS[cat] && <span>{TYPE_EMOJIS[cat]}</span>}{cat}
                            </motion.button>
                        ))}
                    </div>
                    <select style={{ background: "var(--parchment)", border: "1px solid rgba(13,13,13,.1)", borderRadius: 8, padding: "8px 14px", fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)", outline: "none" }}>
                        {SORT_OPTIONS.map(s => <option key={s}>{s}</option>)}
                    </select>
                </div>
            </div>

            {/* Results */}
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <p className="luxury-overline" style={{ marginBottom: 24 }}>{filtered.length} result{filtered.length !== 1 ? "s" : ""} found</p>
                <AnimatePresence mode="wait">
                    <motion.div key={activeCategory + query} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {filtered.map((r, i) => (
                            <motion.div key={r.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}>
                                <Link href={`/project/${r.id}`} style={{ textDecoration: "none" }}>
                                    <div className="luxury-card" style={{ padding: 20, display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(201,163,83,.07)", border: "1px solid rgba(201,163,83,.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A353", flexShrink: 0 }}>
                                            {TYPE_EMOJIS[r.type] || <Search size={20} />}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                                <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)" }}>{r.title}</h3>
                                                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", color: STATUS_COLORS[r.status] || "var(--smoke)" }}>
                                                    {r.status}
                                                </span>
                                            </div>
                                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)", marginBottom: 8 }}>{r.guild} · {r.builders} founders</p>
                                            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                                                {r.tags.map(t => (
                                                    <span key={t} style={{ padding: "2px 7px", background: "rgba(13,13,13,.04)", border: "1px solid rgba(13,13,13,.07)", borderRadius: 5, fontSize: 10, color: "var(--smoke)" }}>{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                        {r.progress > 0 && (
                                            <div style={{ flexShrink: 0, width: 80 }}>
                                                <div style={{ height: 3, background: "rgba(13,13,13,.06)", borderRadius: 9999, overflow: "hidden", marginBottom: 4 }}>
                                                    <div style={{ height: "100%", width: `${r.progress}%`, background: r.progress === 100 ? "#5B8A6F" : "#C9A353", borderRadius: 9999 }} />
                                                </div>
                                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "#C9A353", textAlign: "right" }}>{r.progress}%</p>
                                            </div>
                                        )}
                                        <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontStyle: "italic", color: "#C9A353", flexShrink: 0, minWidth: 60, textAlign: "right" }}>
                                            {r.score > 0 ? r.score.toLocaleString() : "—"}
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {filtered.length === 0 && (
                    <div style={{ textAlign: "center", padding: "80px 0" }}>
                        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", color: "var(--ink)", marginBottom: 8 }}>No results found</p>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)" }}>Try different keywords or clear the filter.</p>
                    </div>
                )}

                {/* Quick Links */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginTop: 64 }}>
                    <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(201,163,83,.4), transparent)", marginBottom: 40 }} />
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
                        {[
                            { label: "Browse Bounties", href: "/bounties", icon: <Banknote size={24} /> },
                            { label: "Explore Guilds", href: "/guilds", icon: <Landmark size={24} /> },
                            { label: "Leaderboard", href: "/leaderboard", icon: <Trophy size={24} /> },
                            { label: "Discovery Feed", href: "/feed", icon: <Telescope size={24} /> },
                        ].map(l => (
                            <Link key={l.href} href={l.href} style={{ textDecoration: "none" }}>
                                <div className="luxury-card" style={{ padding: 20, textAlign: "center", cursor: "pointer" }}>
                                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 8, color: "var(--ink)" }}>{l.icon}</div>
                                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--ink)", fontWeight: 500 }}>{l.label}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
