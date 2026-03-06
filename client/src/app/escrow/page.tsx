"use client";
import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
const ESCROWS = [
    { project: "Identity Layer v2", amount: "$4,200", status: "Held", release: "Mar 15, 2026", parties: "0xNeo ↔ 0xAlice" },
    { project: "NFT Marketplace", amount: "$2,800", status: "Released", release: "Feb 20, 2026", parties: "CryptoMage ↔ DevMarcus" },
    { project: "Design System", amount: "$1,500", status: "Disputed", release: "Pending", parties: "DesignYuki ↔ RustNinja" },
];
const SC: Record<string, { bg: string; border: string; color: string }> = { Held: { bg: "rgba(201,163,83,.08)", border: "rgba(201,163,83,.15)", color: "#977833" }, Released: { bg: "rgba(91,138,111,.08)", border: "rgba(91,138,111,.15)", color: "#5B8A6F" }, Disputed: { bg: "rgba(180,60,60,.06)", border: "rgba(180,60,60,.12)", color: "rgba(180,60,60,.7)" } };
export default function EscrowPage() {
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Finance</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}><Lock size={22} style={{ display: "inline", marginRight: 8, color: "#C9A353" }} /><em className="gold-shimmer-text">Escrow</em></h1><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", marginTop: 8 }}>Funds held in escrow until milestones are verified and approved.</p></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                {ESCROWS.map((e, i) => (<motion.div key={e.project} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}><div className="luxury-card" style={{ padding: 24, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 15, color: "var(--ink)", marginBottom: 4 }}>{e.project}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>{e.parties} · Release: {e.release}</p></div><div style={{ display: "flex", gap: 14, alignItems: "center" }}><p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontStyle: "italic", color: "#C9A353" }}>{e.amount}</p><span style={{ padding: "3px 10px", borderRadius: 9999, fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 600, background: SC[e.status].bg, border: `1px solid ${SC[e.status].border}`, color: SC[e.status].color }}>{e.status}</span></div></div></motion.div>))}
            </div></div>
    );
}
