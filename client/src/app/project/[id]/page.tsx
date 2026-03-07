"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Rocket, Radio, FileArchive, ChevronRight, AlertTriangle, Zap } from "lucide-react";

const NAV = [
    { label: "Overview", href: "" }, { label: "Milestones", href: "milestones" }, { label: "Assets", href: "assets" },
    { label: "Contracts", href: "contracts" }, { label: "Chat", href: "chat" }, { label: "Live", href: "live" },
    { label: "Disputes", href: "disputes" }, { label: "Ship", href: "ship" },
];
const TEAM = [
    { name: "0xNeo", role: "Lead Architect", score: 12400, avatar: "N", online: true },
    { name: "0xAlice", role: "Frontend", score: 7200, avatar: "A", online: true },
    { name: "DevMarcus", role: "Backend", score: 6100, avatar: "M", online: false },
    { name: "DesignYuki", role: "UI/UX", score: 6100, avatar: "Y", online: true },
];
const ACTIVITY = [
    { action: "pushed 14 commits", user: "0xNeo", time: "2m ago" },
    { action: "completed Milestone 2", user: "0xAlice", time: "1h ago" },
    { action: "uploaded design-v3.fig", user: "DesignYuki", time: "3h ago" },
    { action: "reviewed PR #42", user: "DevMarcus", time: "5h ago" },
];
const MILESTONES = [
    { name: "Project Setup & Auth", progress: 100 }, { name: "Core Business Logic", progress: 100 },
    { name: "Identity Verification", progress: 67 }, { name: "Peer Review System", progress: 20 }, { name: "QA & Ship", progress: 0 },
];

export default function WarRoomPage() {
    const [activeTab, setActiveTab] = useState("");
    return (
        <div className="luxury-page">
            {/* Hero */}
            <div style={{ background: "var(--parchment)", padding: "80px 0 0", borderBottom: "1px solid rgba(13,13,13,.08)" }}>
                <div className="luxury-container">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", background: "rgba(201,163,83,.1)", border: "1px solid rgba(201,163,83,.2)", borderRadius: 9999, fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#977833" }}>
                                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#C9A353" }} /> Building
                                </span>
                                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "var(--smoke)", display: "flex", alignItems: "center", gap: 4 }}><Zap size={12} /> React Guild</span>
                            </div>
                            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 400, color: "var(--ink)", lineHeight: 1.2, marginBottom: 8 }}>Decentralized Identity Layer</h1>
                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", maxWidth: 580, lineHeight: 1.7 }}>Self-sovereign identity protocol replacing centralized credentialing. Built on zero-knowledge proofs.</p>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.5rem", fontStyle: "italic", color: "#C9A353" }}>2,400</p>
                            <p className="luxury-overline">Ship Score</p>
                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "var(--smoke)", marginTop: 4 }}>12 days remaining</p>
                        </div>
                    </div>
                    {/* Tab nav */}
                    <div style={{ display: "flex", gap: 0, borderBottom: "none" }}>
                        {NAV.map(nav => (
                            <Link key={nav.label} href={nav.href ? `/project/proj-001/${nav.href}` : "/project/proj-001"} style={{ textDecoration: "none" }}>
                                <button onClick={() => setActiveTab(nav.href)} style={{
                                    padding: "12px 18px", fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: ".08em",
                                    textTransform: "uppercase", background: "none", border: "none", cursor: "pointer", transition: "all .2s", position: "relative",
                                    color: activeTab === nav.href ? "var(--ink)" : "rgba(13,13,13,.35)",
                                    borderBottom: activeTab === nav.href ? "2px solid #C9A353" : "2px solid transparent"
                                }}>{nav.label}</button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
                    {/* Left */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        {/* Milestones */}
                        <div className="luxury-card" style={{ padding: 28 }}>
                            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontWeight: 400, color: "var(--ink)", marginBottom: 20 }}>Sprint Progress</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                {MILESTONES.map((m, i) => (
                                    <div key={m.name}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)" }}>{m.name}</span>
                                            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, color: m.progress === 100 ? "#5B8A6F" : m.progress > 0 ? "#C9A353" : "rgba(13,13,13,.2)" }}>{m.progress}%</span>
                                        </div>
                                        <div style={{ height: 4, background: "rgba(13,13,13,.06)", borderRadius: 9999, overflow: "hidden" }}>
                                            <motion.div initial={{ width: 0 }} animate={{ width: `${m.progress}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}
                                                style={{ height: "100%", borderRadius: 9999, background: m.progress === 100 ? "#5B8A6F" : "#C9A353" }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(13,13,13,.06)" }}>
                                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>Overall</span>
                                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontStyle: "italic", color: "#C9A353" }}>57%</span>
                            </div>
                        </div>
                        {/* Stats */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
                            {[{ label: "Commits", value: "247" }, { label: "Hours", value: "186h" }, { label: "Files", value: "89" }, { label: "Reviews", value: "12" }].map(s => (
                                <div key={s.label} className="luxury-card" style={{ padding: 16, textAlign: "center" }}>
                                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontStyle: "italic", color: "var(--ink)" }}>{s.value}</p>
                                    <p className="luxury-overline">{s.label}</p>
                                </div>
                            ))}
                        </div>
                        {/* Activity */}
                        <div className="luxury-card" style={{ padding: 28 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontWeight: 400, color: "var(--ink)" }}>Recent Activity</h3>
                                <Link href="/project/proj-001/chat" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#C9A353", textDecoration: "none" }}>View All →</Link>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {ACTIVITY.map((a, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                                        style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: "rgba(13,13,13,.02)", borderRadius: 10 }}>
                                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(201,163,83,.08)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: ".8rem", color: "#8B6B1A" }}>{a.user[0]}</div>
                                        <div style={{ flex: 1 }}>
                                            <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 13, color: "var(--ink)" }}>{a.user}</span>
                                            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)" }}> {a.action}</span>
                                        </div>
                                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "rgba(13,13,13,.25)" }}>{a.time}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Right sidebar */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        {/* Team */}
                        <div className="luxury-card" style={{ padding: 24 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 400, color: "var(--ink)" }}>Team</h3>
                                <Link href="/project/recruit" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#C9A353", textDecoration: "none" }}>+ Recruit</Link>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {TEAM.map(m => (
                                    <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                                        <div style={{ position: "relative" }}>
                                            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(201,163,83,.08)", border: "1px solid rgba(201,163,83,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: ".8rem", color: "#8B6B1A" }}>{m.avatar}</div>
                                            {m.online && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#5B8A6F", position: "absolute", bottom: 0, right: 0, border: "2px solid #fff" }} />}
                                        </div>
                                        <div><p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 13, color: "var(--ink)" }}>{m.name}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "var(--smoke)" }}>{m.role} · {m.score.toLocaleString()}</p></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Quick Actions */}
                        <div className="luxury-card" style={{ padding: 24 }}>
                            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 400, color: "var(--ink)", marginBottom: 14 }}>Quick Actions</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                <Link href="/project/proj-001/live" className="btn-secondary" style={{ justifyContent: "flex-start", width: "100%" }}><Radio size={13} /> Start Live Build</Link>
                                <Link href="/project/proj-001/ship" className="btn-primary" style={{ justifyContent: "flex-start", width: "100%" }}><Rocket size={13} /> Submit Ship</Link>
                                <Link href="/project/proj-001/assets" className="btn-secondary" style={{ justifyContent: "flex-start", width: "100%" }}><FileArchive size={13} /> Upload Asset</Link>
                            </div>
                        </div>
                        {/* Tech Stack */}
                        <div className="luxury-card" style={{ padding: 24 }}>
                            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 400, color: "var(--ink)", marginBottom: 14 }}>Tech Stack</h3>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                {["Rust", "WASM", "ZK-Proofs", "React", "TypeScript", "PostgreSQL", "Redis", "Docker"].map(t => <span key={t} className="luxury-tag">{t}</span>)}
                            </div>
                        </div>
                        {/* Danger */}
                        <div className="luxury-card" style={{ padding: 24, borderColor: "rgba(180,60,60,.12)" }}>
                            <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "rgba(180,60,60,.7)", marginBottom: 8 }}>Danger Zone</h3>
                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)", marginBottom: 14 }}>Actions that affect all team members and staked points.</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                <Link href="/project/proj-001/disputes" style={{ textDecoration: "none" }}><button style={{ width: "100%", padding: "10px 14px", display: "flex", alignItems: "center", gap: 6, background: "rgba(180,60,60,.06)", border: "1px solid rgba(180,60,60,.15)", borderRadius: 10, fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "rgba(180,60,60,.7)", cursor: "pointer" }}><AlertTriangle size={13} /> File Dispute</button></Link>
                                <button style={{ width: "100%", padding: "10px 14px", display: "flex", alignItems: "center", gap: 6, background: "none", border: "1px solid rgba(13,13,13,.08)", borderRadius: 10, fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)", cursor: "pointer" }}><ChevronRight size={13} /> Leave Project</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
