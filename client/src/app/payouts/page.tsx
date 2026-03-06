"use client";
import { motion } from "framer-motion";
import { DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
const PAYOUTS = [
    { project: "Identity Layer v2", amount: "$4,200", date: "Mar 1, 2026", type: "Milestone", status: "Completed" },
    { project: "NFT Marketplace", amount: "$1,800", date: "Feb 22, 2026", type: "Bounty", status: "Completed" },
    { project: "Design System", amount: "$2,500", date: "Feb 10, 2026", type: "Milestone", status: "Pending" },
];
export default function PayoutsPage() {
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Finance</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}><DollarSign size={22} style={{ display: "inline", marginRight: 8, color: "#C9A353" }} /><em className="gold-shimmer-text">Payouts</em></h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 32 }}>
                    {[{ l: "Total Earned", v: "$8,500", i: <ArrowUpRight size={14} style={{ color: "#5B8A6F" }} /> }, { l: "Pending", v: "$2,500", i: <DollarSign size={14} style={{ color: "#C9A353" }} /> }, { l: "This Month", v: "$4,200", i: <ArrowUpRight size={14} style={{ color: "#5B8A6F" }} /> }].map(s => (<div key={s.l} className="luxury-card" style={{ padding: 24, textAlign: "center" }}><div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>{s.i}</div><p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontStyle: "italic", color: "#C9A353" }}>{s.v}</p><p className="luxury-overline">{s.l}</p></div>))}
                </div>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", marginBottom: 16 }}>History</h2>
                {PAYOUTS.map((p, i) => (<motion.div key={p.project + p.date} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}><div className="luxury-card" style={{ padding: 20, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)" }}>{p.project}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>{p.type} · {p.date}</p></div><div style={{ display: "flex", gap: 12, alignItems: "center" }}><p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontStyle: "italic", color: "#C9A353" }}>{p.amount}</p><span style={{ padding: "3px 10px", borderRadius: 9999, fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 600, background: p.status === "Completed" ? "rgba(91,138,111,.08)" : "rgba(201,163,83,.08)", border: "1px solid", borderColor: p.status === "Completed" ? "rgba(91,138,111,.15)" : "rgba(201,163,83,.15)", color: p.status === "Completed" ? "#5B8A6F" : "#977833" }}>{p.status}</span></div></div></motion.div>))}
            </div></div>
    );
}
