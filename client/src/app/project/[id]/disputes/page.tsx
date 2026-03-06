"use client";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
const DISPUTES = [
    { id: 1, filed: "DevMarcus", against: "0xNeo", reason: "Missed 3 consecutive stand-ups. Hours not logged for Sprint 2.", status: "Under Review", date: "2026-02-28" },
    { id: 2, filed: "0xAlice", against: "DevMarcus", reason: "Committed code that broke the staging environment without notification.", status: "Pending Vote", date: "2026-03-01" },
];
export default function DisputeCenterPage() {
    return (
        <div className="luxury-page">
            <div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}>
                <div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12, color: "rgba(180,60,60,.5)" }}>Venture · Disputes</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}>Dispute Center</h1><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", marginTop: 8 }}>Project-level disagreements. Resolved by the Court of Founders.</p></div>
            </div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {DISPUTES.map((d, i) => (
                        <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                            <div className="luxury-card" style={{ padding: 24, borderLeftWidth: 3, borderLeftColor: "rgba(180,60,60,.3)" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                    <div><span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14, color: "rgba(180,60,60,.7)" }}>{d.filed}</span><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)", margin: "0 8px" }}>vs</span><span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)" }}>{d.against}</span></div>
                                    <span style={{ padding: "3px 10px", background: "rgba(201,163,83,.08)", border: "1px solid rgba(201,163,83,.15)", borderRadius: 9999, fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 600, color: "#977833" }}>{d.status}</span>
                                </div>
                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", lineHeight: 1.7, marginBottom: 14 }}>{d.reason}</p>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "rgba(13,13,13,.25)" }}>{d.date}</span>
                                    <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "rgba(180,60,60,.06)", border: "1px solid rgba(180,60,60,.15)", borderRadius: 10, fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "rgba(180,60,60,.7)", cursor: "pointer" }}><AlertTriangle size={13} /> Vote on Resolution</button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
