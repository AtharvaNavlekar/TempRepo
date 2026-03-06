"use client";
import { MessageCircle } from "lucide-react";
const THREADS = [
    { author: "0xNeo", title: "Best practices for ZK verification in production", replies: 12, time: "2h ago" },
    { author: "0xAlice", title: "Looking for feedback on our new component library", replies: 8, time: "5h ago" },
    { author: "DevMarcus", title: "Weekly standup recap — Sprint 4", replies: 3, time: "1d ago" },
];
export default function Page() {
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Guild</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}><MessageCircle size={22} style={{ display: "inline", marginRight: 8, color: "#C9A353" }} />Guild <em className="gold-shimmer-text">Forum</em></h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <button className="btn-primary" style={{ marginBottom: 20 }}>+ New Thread</button>
                {THREADS.map(t => (<div key={t.title} className="luxury-card" style={{ padding: 20, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", transition: "border-color .2s" }} onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201,163,83,.4)")} onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,.06)")}><div><p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)", marginBottom: 4 }}>{t.title}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>by {t.author} · {t.time}</p></div><div style={{ display: "flex", alignItems: "center", gap: 6 }}><MessageCircle size={13} style={{ color: "rgba(13,13,13,.2)" }} /><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>{t.replies}</span></div></div>))}
            </div></div>
    );
}
