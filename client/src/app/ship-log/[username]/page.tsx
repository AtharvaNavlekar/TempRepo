"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GitCommit, GitPullRequest, GitBranch, Plus, ChevronDown, Calendar } from "lucide-react";

export default function Page() {
    const [selectedYear, setSelectedYear] = useState(2026);
    const STATS = [{ l: "Ships", v: "12" }, { l: "Score", v: "842" }, { l: "Guilds", v: "3" }, { l: "Streak", v: "7d" }];
    const SHIPS = [
        { title: "Identity Layer v2", date: "Mar 1, 2026", status: "Shipped" },
        { title: "NFT Marketplace", date: "Feb 14, 2026", status: "Shipped" },
        { title: "Design System Core", date: "Jan 20, 2026", status: "Shipped" }
    ];

    const YEARS = [2026, 2025, 2024];

    // Mock Contribution Data
    const MONTHS = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];
    const GRID_SIZE = 52; // roughly weeks

    return (
        <div className="luxury-page">
            {/* Profile Header */}
            <div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}>
                <div className="luxury-container">
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(201,163,83,.08)", border: "1px solid rgba(201,163,83,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", color: "#8B6B1A" }}>A</div>
                        <div>
                            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}>Atharva Navlekar</h1>
                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)" }}>@atharvanavlekar · Full-Stack Engineer · React Guild</p>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: 24, marginTop: 16 }}>
                        {STATS.map(s => (
                            <div key={s.l} style={{ textAlign: "center" }}>
                                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontStyle: "italic", color: "#C9A353" }}>{s.v}</p>
                                <p className="luxury-overline">{s.l}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 24, alignItems: "start" }}>
                    <div style={{ minWidth: 0 }}>
                        {/* Heatmap Section */}
                        <div className="luxury-card" style={{ padding: 32, marginBottom: 32 }}>
                            <p className="luxury-overline" style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ height: 1, width: 24, background: "#C9A353" }}></span>
                                ATHARVANAVLEKAR&apos;S CONTRIBUTION HEATMAP ({selectedYear})
                            </p>

                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, paddingLeft: 20 }}>
                                {MONTHS.map(m => (
                                    <span key={m} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)", minWidth: 30, textAlign: "center" }}>{m}</span>
                                ))}
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gap: 4, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
                                {Array.from({ length: GRID_SIZE * 7 }).map((_, i) => {
                                    // Make 2026 look active, older years slightly less so
                                    const isActive = selectedYear === 2026 ? i > 250 : i > 400;
                                    const intensity = isActive ? Math.random() : 0;
                                    const colors = ["#F5F0E8", "#E6D9C0", "#D9C190", "#C9A353", "#8B6B1A"];
                                    const colorIndex = intensity === 0 ? 0 : Math.floor(Math.random() * 4) + 1;
                                    return (
                                        <div
                                            key={i}
                                            style={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: 2,
                                                background: colors[colorIndex],
                                                border: "1px solid rgba(13,13,13,.02)"
                                            }}
                                        />
                                    );
                                })}
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>{selectedYear === 2026 ? "104" : selectedYear === 2025 ? "87" : "42"} contributions in {selectedYear}</p>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ fontSize: 11, color: "var(--smoke)" }}>Less</span>
                                    <div style={{ display: "flex", gap: 3 }}>
                                        {["#F5F0E8", "#E6D9C0", "#D9C190", "#C9A353", "#8B6B1A"].map(c => (
                                            <div key={c} style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
                                        ))}
                                    </div>
                                    <span style={{ fontSize: 11, color: "var(--smoke)" }}>More</span>
                                </div>
                            </div>
                        </div>

                        {/* Contribution Activity Section */}
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 400, color: "var(--ink)", marginBottom: 24 }}>Contribution Activity</h2>

                        <div style={{ position: "relative", paddingLeft: 32 }}>
                            <div style={{ position: "absolute", left: 11, top: 0, bottom: 0, width: 1, background: "rgba(13,13,13,.06)" }}></div>

                            {/* Month Heading */}
                            <div style={{ marginBottom: 32, position: "relative" }}>
                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 13, background: "var(--cream)", display: "inline-block", paddingRight: 12, color: "var(--ink)" }}>{selectedYear === 2026 ? "March" : "December"} <span style={{ fontWeight: 400, color: "var(--smoke)" }}>{selectedYear}</span></p>
                                <div style={{ height: 1, background: "rgba(13,13,13,.08)", position: "absolute", top: 10, left: 80, right: 0, zIndex: -1 }}></div>
                            </div>

                            {/* Activity Item 1: Commits */}
                            <div style={{ marginBottom: 40, position: "relative" }}>
                                <div style={{ position: "absolute", left: -32, top: 0, width: 22, height: 22, borderRadius: "50%", background: "var(--parchment)", border: "1px solid rgba(13,13,13,.1)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                                    <GitCommit size={12} style={{ color: "var(--smoke)" }} />
                                </div>
                                <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 15, color: "var(--ink)", marginBottom: 16 }}>Created {selectedYear === 2026 ? "61" : "24"} commits in {selectedYear === 2026 ? "3" : "2"} repositories</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                    {[
                                        { name: "AtharvaNavlekar/Real-Estate-Mumbai", count: selectedYear === 2026 ? 47 : 18, percent: 80 },
                                        { name: "AtharvaNavlekar/TempRepo", count: selectedYear === 2026 ? 13 : 6, percent: 20 },
                                        ...(selectedYear === 2026 ? [{ name: "AtharvaNavlekar/CollabRise", count: 1, percent: 5 }] : [])
                                    ].map(repo => (
                                        <div key={repo.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                                            <Link href="#" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#C9A353", textDecoration: "none" }}>{repo.name}</Link>
                                            <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, justifyContent: "flex-end" }}>
                                                <span style={{ fontSize: 12, color: "var(--smoke)", minWidth: 60 }}>{repo.count} commits</span>
                                                <div style={{ width: 120, height: 6, background: "rgba(13,13,13,.04)", borderRadius: 3, overflow: "hidden" }}>
                                                    <div style={{ width: `${repo.percent}%`, height: "100%", background: "#C9A353", borderRadius: 3 }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Activity Item 2: Repositories */}
                            <div style={{ marginBottom: 40, position: "relative" }}>
                                <div style={{ position: "absolute", left: -32, top: 0, width: 22, height: 22, borderRadius: "50%", background: "var(--parchment)", border: "1px solid rgba(13,13,13,.1)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                                    <Plus size={12} style={{ color: "var(--smoke)" }} />
                                </div>
                                <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 15, color: "var(--ink)", marginBottom: 16 }}>Created {selectedYear === 2026 ? "3" : "1"} repositories</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                    {[
                                        { name: "AtharvaNavlekar/TempRepo", lang: "TypeScript", color: "#3178c6", date: selectedYear === 2026 ? "Mar 5" : "Dec 12" },
                                        ...(selectedYear === 2026 ? [
                                            { name: "AtharvaNavlekar/CollabRise", lang: "JavaScript", color: "#f1e05a", date: "Mar 4" },
                                            { name: "AtharvaNavlekar/Real-Estate-Mumbai", lang: "TypeScript", color: "#3178c6", date: "Mar 1" }
                                        ] : [])
                                    ].map(repo => (
                                        <div key={repo.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <Link href="#" style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "#C9A353", textDecoration: "none" }}>{repo.name}</Link>
                                            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: repo.color }}></div>
                                                    <span style={{ fontSize: 12, color: "var(--smoke)" }}>{repo.lang}</span>
                                                </div>
                                                <span style={{ fontSize: 12, color: "rgba(13,13,13,.2)" }}>{repo.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className="btn-secondary" style={{ width: "100%", justifyContent: "center", marginTop: 20 }}>
                                Show more activity
                            </button>
                        </div>
                    </div>

                    {/* Year Filter Sidebar */}
                    <div style={{ position: "sticky", top: 20 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            {YEARS.map(year => (
                                <button
                                    key={year}
                                    onClick={() => setSelectedYear(year)}
                                    style={{
                                        padding: "10px 16px",
                                        borderRadius: 8,
                                        border: "none",
                                        cursor: "pointer",
                                        textAlign: "left",
                                        fontFamily: "'DM Sans',sans-serif",
                                        fontSize: 14,
                                        fontWeight: selectedYear === year ? 600 : 400,
                                        background: selectedYear === year ? "#C9A353" : "transparent",
                                        color: selectedYear === year ? "#fff" : "var(--smoke)",
                                        transition: "all .2s ease",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10
                                    }}
                                    onMouseEnter={e => { if (selectedYear !== year) e.currentTarget.style.background = "rgba(201,163,83,.05)"; }}
                                    onMouseLeave={e => { if (selectedYear !== year) e.currentTarget.style.background = "transparent"; }}
                                >
                                    <Calendar size={14} style={{ opacity: selectedYear === year ? 1 : 0.4 }} />
                                    {year}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
