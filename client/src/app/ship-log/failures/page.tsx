"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, BookOpen } from "lucide-react";

const FAILURES = [
    { id: "fail-001", title: "Database Lock Contention (Production Drop)", date: "2025-08-14", lessons: ["Implement connection pooling", "Write better migrations", "Test under load"], recovered: true, pointsGained: 450 },
    { id: "fail-002", title: "Lost 4 Weeks Building the Wrong Feature", date: "2025-03-21", lessons: ["Talk to users first", "Set tighter feedback loops"], recovered: true, pointsGained: 210 },
    { id: "fail-003", title: "Burnout - Dropped Client Project", date: "2024-11-09", lessons: ["Enforce strict async boundaries", "Don't overcommit sweat equity"], recovered: false, pointsGained: 0 },
];

export default function FailureVaultPage() {
    return (
        <div className="luxury-page">
            {/* Header */}
            <div style={{ background: "var(--parchment)", padding: "80px 0 52px", borderBottom: "1px solid rgba(13,13,13,.08)" }}>
                <div className="luxury-container">
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
                        <div>
                            <p className="luxury-overline" style={{ marginBottom: 12 }}>Ship Log · Resilience Archive</p>
                            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 400, color: "var(--ink)", lineHeight: 1, letterSpacing: "-.03em", marginBottom: 16 }}>
                                The Failure<br /><em className="gold-shimmer-text">Vault</em>
                            </h1>
                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--smoke)", maxWidth: 480, lineHeight: 1.8 }}>
                                Corporate culture hides failure. We index it. Documenting your setbacks is the fastest way to prove you actually ship — and that you learn from breaking things.
                            </p>
                        </div>
                        <Link href="/ship-log/failures/new" className="btn-primary">
                            <Plus size={13} /> Log Post-Mortem
                        </Link>
                    </div>
                </div>
            </div>

            {/* Vault Cards */}
            <div className="luxury-container" style={{ paddingTop: 56, paddingBottom: 80 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
                    {FAILURES.map((failure, index) => (
                        <motion.div key={failure.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}>
                            <div className="luxury-card" style={{
                                padding: 28, height: "100%", display: "flex", flexDirection: "column",
                                position: "relative", overflow: "hidden",
                                opacity: failure.recovered ? 1 : 0.55,
                                borderLeft: failure.recovered ? "3px solid rgba(201,163,83,.4)" : "3px solid rgba(13,13,13,.12)"
                            }}>
                                {failure.recovered && (
                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, #C9A353, transparent)" }} />
                                )}
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "rgba(13,13,13,.35)", letterSpacing: ".1em" }}>{failure.date}</span>
                                    {failure.recovered && (
                                        <span style={{
                                            padding: "3px 10px", borderRadius: 9999,
                                            background: "rgba(201,163,83,.1)", border: "1px solid rgba(201,163,83,.2)",
                                            fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 600, color: "#977833"
                                        }}>+{failure.pointsGained} pts</span>
                                    )}
                                    {!failure.recovered && (
                                        <span style={{
                                            padding: "3px 10px", borderRadius: 9999,
                                            background: "rgba(13,13,13,.04)", border: "1px solid rgba(13,13,13,.1)",
                                            fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "rgba(13,13,13,.35)"
                                        }}>Unresolved</span>
                                    )}
                                </div>
                                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1.4, marginBottom: 18, flex: 1 }}>
                                    {failure.title}
                                </h3>
                                <div style={{ marginBottom: 20 }}>
                                    <p className="luxury-overline" style={{ marginBottom: 10 }}>Lessons Extracted</p>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                        {failure.lessons.map((lesson, i) => (
                                            <div key={i} style={{ display: "flex", gap: 8, fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)", lineHeight: 1.5 }}>
                                                <span style={{ color: "#C9A353", flexShrink: 0 }}>›</span>
                                                {lesson}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="btn-secondary" style={{ width: "100%", justifyContent: "center", fontSize: 12, padding: "10px 0" }}>
                                    <BookOpen size={12} /> Read Full Log
                                </button>
                            </div>
                        </motion.div>
                    ))}

                    {/* Add new card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, type: "spring" }}>
                        <Link href="/ship-log/failures/new" style={{ textDecoration: "none", display: "block", height: "100%" }}>
                            <div className="luxury-card" style={{
                                padding: 28, height: "100%", display: "flex", flexDirection: "column",
                                alignItems: "center", justifyContent: "center", textAlign: "center",
                                border: "1.5px dashed rgba(201,163,83,.25)", background: "rgba(201,163,83,.03)",
                                cursor: "pointer", minHeight: 240, transition: "border-color .3s, background .3s"
                            }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,163,83,.5)"; e.currentTarget.style.background = "rgba(201,163,83,.06)"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,163,83,.25)"; e.currentTarget.style.background = "rgba(201,163,83,.03)"; }}
                            >
                                <div style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(201,163,83,.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                                    <Plus size={18} style={{ color: "#C9A353" }} />
                                </div>
                                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", color: "var(--ink)", marginBottom: 6 }}>Log Another Crash</p>
                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)", lineHeight: 1.6 }}>
                                    Every failure logged earns you resilience multiplier points.
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
