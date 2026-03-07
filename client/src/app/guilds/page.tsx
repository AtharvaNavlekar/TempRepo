"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Search, Users, TrendingUp, Plus, ChevronRight, Zap, Code, Palette, Flame, Music, Wrench, PenTool, Hammer } from "lucide-react";

const GUILDS = [
    { slug: "react", name: "React Guild", icon: <Zap size={22} />, members: 2400, projects: 142, ships: 890, status: "live" as const, description: "Component architecture, state machines, and server components.", topBuilder: "0xNeo", topScore: 12400, growth: "+12%" },
    { slug: "rust", name: "Rust Guild", icon: <Code size={22} />, members: 1800, projects: 89, ships: 560, status: "live" as const, description: "Systems programming, zero-cost abstractions, memory safety.", topBuilder: "CryptoMage", topScore: 11800, growth: "+8%" },
    { slug: "design", name: "Design Guild", icon: <Palette size={22} />, members: 3100, projects: 210, ships: 1200, status: "live" as const, description: "Product design, design systems, and user experience.", topBuilder: "DesignSensei", topScore: 11200, growth: "+15%" },
    { slug: "culinary", name: "Culinary Guild", icon: <Flame size={22} />, members: 890, projects: 45, ships: 280, status: "building" as const, description: "Recipe development, food science, and restaurant tech.", topBuilder: "ChefMika", topScore: 4200, growth: "+22%" },
    { slug: "music", name: "Music Guild", icon: <Music size={22} />, members: 670, projects: 34, ships: 190, status: "building" as const, description: "Audio production, sound design, and generative music.", topBuilder: "SoundSmith", topScore: 3800, growth: "+18%" },
    { slug: "maker", name: "Maker Guild", icon: <Wrench size={22} />, members: 1200, projects: 78, ships: 400, status: "live" as const, description: "Physical fabrication, CNC, 3D printing, electronics.", topBuilder: "MakerJoe", topScore: 7800, growth: "+10%" },
    { slug: "writing", name: "Writing Guild", icon: <PenTool size={22} />, members: 1500, projects: 120, ships: 720, status: "live" as const, description: "Technical writing, content creation, and publishing.", topBuilder: "WriterAsh", topScore: 7200, growth: "+9%" },
    { slug: "woodworking", name: "Woodworking Guild", icon: <Hammer size={22} />, members: 430, projects: 22, ships: 110, status: "shipped" as const, description: "Traditional joinery, CNC woodworking, furniture design.", topBuilder: "WoodMaster", topScore: 5400, growth: "+5%" },
];

const STATUS_STYLE: Record<string, { label: string; color: string; bg: string; border: string }> = {
    live: { label: "Live", color: "#5B8A6F", bg: "rgba(91,138,111,.1)", border: "rgba(91,138,111,.2)" },
    building: { label: "Building", color: "#977833", bg: "rgba(201,163,83,.1)", border: "rgba(201,163,83,.2)" },
    shipped: { label: "Shipped", color: "rgba(13,13,13,.5)", bg: "rgba(13,13,13,.05)", border: "rgba(13,13,13,.1)" },
};

export default function GuildDirectoryPage() {
    const [searchQ, setSearchQ] = useState("");
    const filtered = GUILDS.filter(g => !searchQ || g.name.toLowerCase().includes(searchQ.toLowerCase()));

    return (
        <div className="luxury-page">
            {/* Header */}
            <div style={{ background: "var(--parchment)", padding: "80px 0 52px", borderBottom: "1px solid rgba(13,13,13,.08)" }}>
                <div className="luxury-container">
                    <p className="luxury-overline" style={{ marginBottom: 12 }}>Rise Protocol · Communities</p>
                    <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 400, color: "var(--ink)", lineHeight: 1, letterSpacing: "-.03em", marginBottom: 16 }}>
                        Guild<br /><em className="gold-shimmer-text">Directory</em>
                    </h1>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--smoke)", maxWidth: 440, lineHeight: 1.8, marginBottom: 40 }}>
                        Join your tribe. Rise through the ranks by shipping together. Every guild has its own culture, tools, and leaderboard.
                    </p>
                    {/* Stats */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
                        {[
                            { label: "Total Guilds", value: GUILDS.length.toString() },
                            { label: "Total Members", value: GUILDS.reduce((s, g) => s + g.members, 0).toLocaleString() },
                            { label: "Active Projects", value: GUILDS.reduce((s, g) => s + g.projects, 0).toString() },
                            { label: "Total Ships", value: GUILDS.reduce((s, g) => s + g.ships, 0).toLocaleString() },
                        ].map((s, i) => (
                            <div key={s.label} style={{ padding: "0 20px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(13,13,13,.08)" : "none" }}>
                                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontStyle: "italic", color: "#C9A353", lineHeight: 1, marginBottom: 4 }}>{s.value}</p>
                                <p className="luxury-overline">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div style={{ background: "#fff", borderBottom: "1px solid rgba(13,13,13,.07)", padding: "18px 0" }}>
                <div className="luxury-container">
                    <div style={{ position: "relative", maxWidth: 340 }}>
                        <Search size={13} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(13,13,13,.3)" }} />
                        <input
                            value={searchQ}
                            onChange={e => setSearchQ(e.target.value)}
                            placeholder="Search guilds..."
                            style={{ paddingLeft: 36, paddingRight: 16, paddingTop: 10, paddingBottom: 10, width: "100%", background: "var(--parchment)", border: "1px solid rgba(13,13,13,.1)", borderRadius: 9999, fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--ink)", outline: "none" }}
                            onFocus={e => (e.currentTarget.style.borderColor = "#C9A353")}
                            onBlur={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,.1)")}
                        />
                    </div>
                </div>
            </div>

            {/* Guild Grid */}
            <div className="luxury-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    {filtered.map((g, i) => {
                        const st = STATUS_STYLE[g.status];
                        return (
                            <motion.div key={g.slug} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}>
                                <Link href={`/guilds/${g.slug}`} style={{ textDecoration: "none" }}>
                                    <div className="luxury-card" style={{ padding: 28, cursor: "pointer", position: "relative", overflow: "hidden" }}>
                                        <div className="luxury-card-accent" />
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(201,163,83,.08)", border: "1px solid rgba(201,163,83,.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A353" }}>
                                                    {g.icon}
                                                </div>
                                                <div>
                                                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.05rem", fontWeight: 400, color: "var(--ink)", marginBottom: 4 }}>{g.name}</h3>
                                                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 9999, fontSize: 9, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", background: st.bg, color: st.color, border: `1px solid ${st.border}` }}>
                                                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: "currentColor" }} />{st.label}
                                                    </span>
                                                </div>
                                            </div>
                                            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, color: "#5B8A6F" }}>{g.growth}</span>
                                        </div>
                                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", lineHeight: 1.7, marginBottom: 20 }}>{g.description}</p>
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, marginBottom: 18 }}>
                                            {[{ label: "Members", value: g.members.toLocaleString() }, { label: "Projects", value: g.projects.toString() }, { label: "Ships", value: g.ships.toString() }].map((s, idx) => (
                                                <div key={s.label} style={{ textAlign: "center", borderRight: idx < 2 ? "1px solid rgba(13,13,13,.07)" : "none" }}>
                                                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontStyle: "italic", color: "var(--ink)" }}>{s.value}</p>
                                                    <p className="luxury-overline">{s.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "rgba(201,163,83,.05)", borderRadius: 10, border: "1px solid rgba(201,163,83,.1)" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(201,163,83,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: ".8rem", color: "#8B6B1A" }}>{g.topBuilder[0]}</div>
                                                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>Top: <span style={{ color: "var(--ink)", fontWeight: 500 }}>{g.topBuilder}</span></span>
                                            </div>
                                            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontStyle: "italic", color: "#C9A353" }}>{g.topScore.toLocaleString()}</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: 14, gap: 4, fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#C9A353" }}>
                                            View Guild <ChevronRight size={12} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginTop: 56, textAlign: "center" }}>
                    <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(201,163,83,.4), transparent)", marginBottom: 48 }} />
                    <div className="luxury-card" style={{ padding: 48, maxWidth: 480, margin: "0 auto" }}>
                        <Users size={28} style={{ color: "#C9A353", margin: "0 auto 16px", display: "block" }} />
                        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", color: "var(--ink)", marginBottom: 10 }}>
                            Can&apos;t find your guild?
                        </h3>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", marginBottom: 24, lineHeight: 1.7 }}>
                            Start your own. 50 founding members are needed to make it official.
                        </p>
                        <button className="btn-primary" style={{ display: "inline-flex" }}>
                            <Plus size={13} /> Propose New Guild
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
