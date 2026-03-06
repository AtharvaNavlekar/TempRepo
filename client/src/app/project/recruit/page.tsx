"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { UserPlus } from "lucide-react";

const ROLES_NEEDED = [
    { title: "Systems Engineer", skills: ["Rust", "WASM", "Performance"], commitment: "20h/week", importance: "Critical", filled: false },
    { title: "Security Auditor", skills: ["Solidity", "ZK-Proofs", "Cryptography"], commitment: "10h/week", importance: "High", filled: false },
    { title: "Technical Writer", skills: ["Docs", "API Reference", "Tutorials"], commitment: "8h/week", importance: "Medium", filled: true },
];
const CANDIDATES = [
    { name: "CryptoMage", score: 11800, skills: ["Rust", "Cryptography", "Systems"], compatibility: 96, ships: 21 },
    { name: "RustNinja", score: 8400, skills: ["Rust", "C++", "WASM"], compatibility: 91, ships: 12 },
    { name: "SecAuditor_K", score: 9200, skills: ["Solidity", "Security", "ZK"], compatibility: 88, ships: 15 },
    { name: "DocsMaster", score: 5600, skills: ["Technical Writing", "Docs"], compatibility: 82, ships: 8 },
    { name: "WasmWizard", score: 7100, skills: ["WASM", "Rust", "Performance"], compatibility: 79, ships: 9 },
];
const IMP_COLORS: Record<string, string> = { Critical: "rgba(180,60,60,.7)", High: "#C9A353", Medium: "#5B8A6F" };

export default function TeamRecruiterPage() {
    const [selectedRole, setSelectedRole] = useState(0);
    return (
        <div className="luxury-page">
            <div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}>
                <div className="luxury-container">
                    <p className="luxury-overline" style={{ marginBottom: 12 }}>Venture · Recruitment</p>
                    <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 400, color: "var(--ink)", marginBottom: 8 }}>Team <em className="gold-shimmer-text">Recruiter</em></h1>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)" }}>AI-powered candidate matching based on Ship Score, skill overlap, and working style DNA.</p>
                </div>
            </div>
            <div className="luxury-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>
                    {/* Roles */}
                    <div>
                        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontWeight: 400, color: "var(--ink)", marginBottom: 16 }}>Open Roles</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {ROLES_NEEDED.map((role, i) => (
                                <motion.div key={role.title} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                                    <div className="luxury-card" onClick={() => setSelectedRole(i)} style={{ padding: 20, cursor: "pointer", borderColor: selectedRole === i ? "rgba(201,163,83,.4)" : undefined, background: selectedRole === i ? "rgba(201,163,83,.03)" : "#fff", opacity: role.filled ? 0.5 : 1 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                            <h4 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)" }}>{role.title}</h4>
                                            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 600, color: IMP_COLORS[role.importance] }}>{role.importance}</span>
                                        </div>
                                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)", marginBottom: 8 }}>{role.commitment}</p>
                                        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>{role.skills.map(s => <span key={s} className="luxury-tag">{s}</span>)}</div>
                                        {role.filled && <p style={{ marginTop: 8, fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#5B8A6F" }}>✓ Filled</p>}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    {/* Candidates */}
                    <div>
                        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontWeight: 400, color: "var(--ink)", marginBottom: 16 }}>Best Matches for: <span style={{ color: "#C9A353" }}>{ROLES_NEEDED[selectedRole].title}</span></h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {CANDIDATES.map((c, i) => (
                                <motion.div key={c.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                    <div className="luxury-card" style={{ padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
                                        <div style={{ position: "relative" }}>
                                            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(201,163,83,.08)", border: "1px solid rgba(201,163,83,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", color: "#8B6B1A" }}>{c.name[0]}</div>
                                            <div style={{ position: "absolute", top: -4, right: -4, width: 24, height: 24, borderRadius: "50%", background: "#fff", border: "1px solid rgba(201,163,83,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 700, color: "#C9A353" }}>{c.compatibility}</div>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)" }}>{c.name}</h4>
                                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>{c.ships} ships · Score: {c.score.toLocaleString()}</p>
                                            <div style={{ display: "flex", gap: 4, marginTop: 6 }}>{c.skills.map(s => <span key={s} className="luxury-tag">{s}</span>)}</div>
                                        </div>
                                        <div style={{ textAlign: "center", marginRight: 12 }}>
                                            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", fontStyle: "italic", color: "#C9A353" }}>{c.compatibility}%</p>
                                            <p className="luxury-overline">Match</p>
                                        </div>
                                        <button className="btn-primary" style={{ fontSize: 11, padding: "8px 16px" }}><UserPlus size={12} /> Invite</button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
