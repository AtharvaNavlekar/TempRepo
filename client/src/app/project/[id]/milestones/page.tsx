"use client";
import { motion } from "framer-motion";
import { Check, Clock, Circle } from "lucide-react";
const MILESTONES = [
    { name: "Project Setup & Auth", progress: 100, dueDate: "Feb 15", tasks: 8, completed: 8 },
    { name: "Core Business Logic", progress: 100, dueDate: "Feb 25", tasks: 12, completed: 12 },
    { name: "Identity Verification", progress: 67, dueDate: "Mar 5", tasks: 9, completed: 6 },
    { name: "Peer Review System", progress: 20, dueDate: "Mar 12", tasks: 10, completed: 2 },
    { name: "QA & Ship", progress: 0, dueDate: "Mar 20", tasks: 6, completed: 0 },
];
export default function MilestonesPage() {
    return (
        <div className="luxury-page">
            <div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}>
                <div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Venture · Milestones</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}>Sprint <em className="gold-shimmer-text">Milestones</em></h1></div>
            </div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {MILESTONES.map((m, i) => (
                        <motion.div key={m.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                            <div className="luxury-card" style={{ padding: 24, display: "flex", alignItems: "center", gap: 20 }}>
                                <div style={{ width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: m.progress === 100 ? "rgba(91,138,111,.1)" : m.progress > 0 ? "rgba(201,163,83,.08)" : "rgba(13,13,13,.04)", border: `1px solid ${m.progress === 100 ? "rgba(91,138,111,.2)" : m.progress > 0 ? "rgba(201,163,83,.15)" : "rgba(13,13,13,.08)"}` }}>
                                    {m.progress === 100 ? <Check size={16} style={{ color: "#5B8A6F" }} /> : m.progress > 0 ? <Clock size={16} style={{ color: "#C9A353" }} /> : <Circle size={16} style={{ color: "rgba(13,13,13,.2)" }} />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                        <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 15, color: "var(--ink)" }}>{m.name}</h3>
                                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, color: m.progress === 100 ? "#5B8A6F" : m.progress > 0 ? "#C9A353" : "rgba(13,13,13,.2)" }}>{m.progress}%</span>
                                    </div>
                                    <div style={{ height: 4, background: "rgba(13,13,13,.06)", borderRadius: 9999, overflow: "hidden", marginBottom: 8 }}>
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${m.progress}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}
                                            style={{ height: "100%", borderRadius: 9999, background: m.progress === 100 ? "#5B8A6F" : "#C9A353" }} />
                                    </div>
                                    <div style={{ display: "flex", gap: 16 }}>
                                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "var(--smoke)" }}>Due: {m.dueDate}</span>
                                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "var(--smoke)" }}>Tasks: {m.completed}/{m.tasks}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
