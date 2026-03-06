"use client";
import { Search, Zap } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
const BOUNTIES = [
    { id: "b001", title: "Build ZK Login Module", reward: "$2,500", difficulty: "Hard", company: "Nexus Labs", tags: ["Rust", "ZK-Proofs"] },
    { id: "b002", title: "Design Mobile Onboarding", reward: "$1,200", difficulty: "Medium", company: "Zero Gravity", tags: ["Figma", "UI/UX"] },
    { id: "b003", title: "Write API Documentation", reward: "$800", difficulty: "Easy", company: "Pattern AI", tags: ["Docs", "OpenAPI"] },
];
const DIFF_C: Record<string, string> = { Hard: "rgba(180,60,60,.6)", Medium: "#C9A353", Easy: "#5B8A6F" };
export default function Page() {
    const [search, setSearch] = useState("");
    const filtered = BOUNTIES.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Marketplace</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}><Zap size={22} style={{ display: "inline", marginRight: 8, color: "#C9A353" }} /><em className="gold-shimmer-text">Bounties</em></h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ position: "relative", marginBottom: 20 }}><Search size={14} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(13,13,13,.2)" }} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bounties..." style={{ width: "100%", paddingLeft: 40, paddingRight: 16, paddingTop: 12, paddingBottom: 12, background: "#fff", border: "1px solid rgba(13,13,13,.1)", borderRadius: 12, fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--ink)", outline: "none" }} /></div>
                {filtered.map(b => (<Link key={b.id} href={`/bounties/${b.id}`} style={{ textDecoration: "none" }}><div className="luxury-card" style={{ padding: 20, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", transition: "border-color .2s" }} onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201,163,83,.4)")} onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,.06)")}><div><p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 15, color: "var(--ink)", marginBottom: 4 }}>{b.title}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>{b.company}</p><div style={{ display: "flex", gap: 4, marginTop: 6 }}>{b.tags.map(t => <span key={t} className="luxury-tag">{t}</span>)}</div></div><div style={{ textAlign: "right" }}><p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontStyle: "italic", color: "#C9A353" }}>{b.reward}</p><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, color: DIFF_C[b.difficulty] }}>{b.difficulty}</span></div></div></Link>))}
            </div></div>
    );
}
