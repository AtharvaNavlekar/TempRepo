"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Search, Plus, ArrowRight, TrendingUp, CheckCircle2, Zap, Clock } from "lucide-react";

const PROJECTS = [
    { id: "proj-001", title: "Decentralized Identity Layer", guild: "React Guild", builders: 4, status: "building" as const, score: 2400, tags: ["Rust", "WASM", "ZK-Proofs"], daysLeft: 12, description: "Self-sovereign identity protocol replacing centralized credentialing.", progress: 67 },
    { id: "proj-002", title: "AI-Powered Recipe Engine", guild: "Chef Guild", builders: 3, status: "live" as const, score: 1800, tags: ["Python", "GPT-4", "FastAPI"], daysLeft: 5, description: "Generative recipe creation with nutritional scoring and cost analysis.", progress: 85 },
    { id: "proj-003", title: "Zero-Waste Packaging Design", guild: "Design Guild", builders: 2, status: "shipped" as const, score: 3200, tags: ["Figma", "Blender", "Sustainability"], daysLeft: 0, description: "Compostable packaging system designed with circular economy principles.", progress: 100 },
    { id: "proj-004", title: "Open-Source CNC Controller", guild: "Maker Guild", builders: 5, status: "staked" as const, score: 900, tags: ["C++", "Arduino", "PCB Design"], daysLeft: 30, description: "Multi-axis CNC controller with real-time toolpath visualization.", progress: 22 },
    { id: "proj-005", title: "Ambient Generative Album", guild: "Music Guild", builders: 2, status: "building" as const, score: 600, tags: ["Ableton", "Max/MSP", "Modular"], daysLeft: 21, description: "AI-assisted generative ambient compositions with live stem manipulation.", progress: 40 },
    { id: "proj-006", title: "Cross-Platform Auth SDK", guild: "React Guild", builders: 3, status: "live" as const, score: 4100, tags: ["TypeScript", "OAuth", "WebAuthn"], daysLeft: 8, description: "Universal authentication SDK supporting passkeys, OAuth, and Web3 wallets.", progress: 78 },
    { id: "proj-007", title: "Artisan Bread Scoring System", guild: "Chef Guild", builders: 1, status: "building" as const, score: 320, tags: ["IoT", "Computer Vision"], daysLeft: 45, description: "Camera + ML model that grades bread scoring patterns and crust quality.", progress: 15 },
    { id: "proj-008", title: "Woodworking Jig Library", guild: "Woodworking Guild", builders: 4, status: "shipped" as const, score: 2100, tags: ["CAD", "3D Print", "Parametric"], daysLeft: 0, description: "Open-source parametric jig designs for common woodworking operations.", progress: 100 },
    { id: "proj-009", title: "Portfolio Micro-Animations Kit", guild: "Design Guild", builders: 2, status: "live" as const, score: 1500, tags: ["Framer Motion", "CSS", "SVG"], daysLeft: 3, description: "Drop-in animation library for developer portfolios with zero dependencies.", progress: 90 },
];

const FILTERS = ["ALL", "BUILDING", "LIVE", "SHIPPED", "STAKED"];

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
    building: { label: "Building", color: "#977833", bg: "rgba(201,163,83,.1)", border: "rgba(201,163,83,.2)" },
    live: { label: "Live", color: "#5B8A6F", bg: "rgba(91,138,111,.1)", border: "rgba(91,138,111,.2)" },
    shipped: { label: "Shipped", color: "rgba(13,13,13,.5)", bg: "rgba(13,13,13,.05)", border: "rgba(13,13,13,.1)" },
    staked: { label: "Staked", color: "#6B7CB8", bg: "rgba(107,124,184,.1)", border: "rgba(107,124,184,.2)" },
};

export default function FeedPage() {
    const [activeFilter, setActiveFilter] = useState("ALL");
    const [query, setQuery] = useState("");

    const filtered = PROJECTS.filter(p => {
        const matchFilter = activeFilter === "ALL" || p.status === activeFilter.toLowerCase();
        const matchQuery = !query || p.title.toLowerCase().includes(query.toLowerCase()) || p.guild.toLowerCase().includes(query.toLowerCase());
        return matchFilter && matchQuery;
    });

    const STAT_ITEMS = [
        { label: "Active Ventures", value: "2,847" },
        { label: "Founders Online", value: "1,203" },
        { label: "Ships Today", value: "47" },
        { label: "Total Staked", value: "$142K" },
    ];

    return (
        <div className="luxury-page">
            {/* ── Header Section ── */}
            <div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}>
                <div className="luxury-container">
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 40 }}>
                        <div>
                            <p className="luxury-overline" style={{ marginBottom: 10 }}>Proof-of-Work Protocol</p>
                            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 400, color: "var(--ink)", lineHeight: 1, letterSpacing: "-.03em", marginBottom: 14 }}>
                                Venture<br /><em className="gold-shimmer-text">Discovery Feed</em>
                            </h1>
                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--smoke)", maxWidth: 440, lineHeight: 1.8 }}>
                                Active ventures across every guild. Filter by status, browse by craft, and find your next collaboration.
                            </p>
                        </div>
                        <Link href="/project/new" className="btn-primary">
                            <Plus size={13} /> New Venture <ArrowRight size={13} />
                        </Link>
                    </div>

                    {/* Stats */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
                        {STAT_ITEMS.map((s, i) => (
                            <div key={s.label} style={{
                                padding: "0 20px", textAlign: "center",
                                borderRight: i < 3 ? "1px solid rgba(13,13,13,.08)" : "none"
                            }}>
                                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.4rem,2.5vw,2rem)", fontStyle: "italic", color: "#C9A353", lineHeight: 1, marginBottom: 4 }}>{s.value}</p>
                                <p className="luxury-overline">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Filters + Search ── */}
            <div style={{ background: "#fff", borderBottom: "1px solid rgba(13,13,13,.07)", padding: "20px 0", position: "sticky", top: 0, zIndex: 40, backdropFilter: "blur(12px)" }}>
                <div className="luxury-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                        {FILTERS.map(f => (
                            <motion.button key={f} whileTap={{ scale: 0.95 }} onClick={() => setActiveFilter(f)} style={{
                                padding: "8px 16px", fontFamily: "'DM Sans',sans-serif",
                                fontSize: 11, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase",
                                borderRadius: 9999, border: "1px solid",
                                cursor: "pointer", transition: "all .2s",
                                background: activeFilter === f ? "var(--ink)" : "transparent",
                                color: activeFilter === f ? "#fff" : "rgba(13,13,13,.4)",
                                borderColor: activeFilter === f ? "var(--ink)" : "rgba(13,13,13,.12)",
                            }}>
                                {f}
                            </motion.button>
                        ))}
                    </div>
                    <div style={{ position: "relative" }}>
                        <Search size={13} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(13,13,13,.3)" }} />
                        <input
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Search ventures or guilds..."
                            style={{
                                paddingLeft: 34, paddingRight: 16, paddingTop: 9, paddingBottom: 9,
                                background: "var(--parchment)", border: "1px solid rgba(13,13,13,.1)",
                                borderRadius: 9999, fontFamily: "'DM Sans',sans-serif", fontSize: 13,
                                color: "var(--ink)", outline: "none", width: 240,
                                transition: "border-color .2s"
                            }}
                            onFocus={e => (e.currentTarget.style.borderColor = "#C9A353")}
                            onBlur={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,.1)")}
                        />
                    </div>
                </div>
            </div>

            {/* ── Project Grid ── */}
            <div className="luxury-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFilter + query}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
                    >
                        {filtered.map((project, i) => {
                            const st = STATUS_CONFIG[project.status] || STATUS_CONFIG.building;
                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.04, type: "spring", stiffness: 200, damping: 25 }}
                                >
                                    <Link href={`/project/${project.id}`} style={{ textDecoration: "none" }}>
                                        <motion.div className="luxury-card" style={{ padding: 24, height: "100%", display: "flex", flexDirection: "column", cursor: "pointer" }}
                                            whileHover={{ scale: 1.01 }}>
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                                                <span style={{
                                                    display: "inline-flex", alignItems: "center", gap: 5,
                                                    padding: "3px 10px", borderRadius: 9999, fontSize: 10,
                                                    fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase",
                                                    fontFamily: "'DM Sans',sans-serif",
                                                    background: st.bg, color: st.color, border: `1px solid ${st.border}`
                                                }}>
                                                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor" }} />
                                                    {st.label}
                                                </span>
                                                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontStyle: "italic", color: "#C9A353" }}>{project.score}</span>
                                            </div>

                                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "rgba(13,13,13,.3)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 6 }}>
                                                {project.guild}
                                            </p>
                                            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.05rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1.35, marginBottom: 10 }}>
                                                {project.title}
                                            </h3>
                                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)", lineHeight: 1.65, flex: 1, marginBottom: 16 }}>
                                                {project.description}
                                            </p>

                                            {/* Progress Bar */}
                                            <div style={{ marginBottom: 14 }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                                                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "rgba(13,13,13,.35)" }}>
                                                        {project.builders} founders · {project.daysLeft > 0 ? `${project.daysLeft}d left` : "Shipped"}
                                                    </span>
                                                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "#C9A353", fontWeight: 500 }}>
                                                        {project.progress}%
                                                    </span>
                                                </div>
                                                <div style={{ width: "100%", height: 3, background: "rgba(13,13,13,.06)", borderRadius: 9999, overflow: "hidden" }}>
                                                    <motion.div
                                                        style={{ height: "100%", borderRadius: 9999, background: project.progress === 100 ? "#5B8A6F" : "#C9A353" }}
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${project.progress}%` }}
                                                        transition={{ duration: 0.8, delay: i * 0.05 }}
                                                        viewport={{ once: true }}
                                                    />
                                                </div>
                                            </div>

                                            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                                                {project.tags.map(t => (
                                                    <span key={t} style={{
                                                        padding: "2px 8px", borderRadius: 6,
                                                        fontFamily: "'DM Sans',sans-serif", fontSize: 10,
                                                        color: "rgba(13,13,13,.4)", background: "rgba(13,13,13,.04)",
                                                        border: "1px solid rgba(13,13,13,.07)"
                                                    }}>{t}</span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {filtered.length === 0 && (
                    <div style={{ textAlign: "center", padding: "80px 0" }}>
                        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", color: "var(--ink)", marginBottom: 8 }}>No ventures found</p>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)" }}>Try a different filter or search term.</p>
                    </div>
                )}

                {/* ── Trending Section ── */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginTop: 72 }}>
                    <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(201,163,83,.4), transparent)", marginBottom: 48 }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                        <TrendingUp size={16} style={{ color: "#C9A353" }} />
                        <p className="luxury-overline">Trending This Week</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
                        {PROJECTS.slice(0, 3).map((p, i) => (
                            <div key={p.id} className="luxury-card" style={{ padding: 20, display: "flex", alignItems: "center", gap: 16, cursor: "default" }}>
                                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontStyle: "italic", color: "rgba(201,163,83,.25)", flexShrink: 0 }}>#{i + 1}</span>
                                <div>
                                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: ".9rem", color: "var(--ink)", marginBottom: 2 }}>{p.title}</p>
                                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "var(--smoke)" }}>{p.guild} · {p.score} pts</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
