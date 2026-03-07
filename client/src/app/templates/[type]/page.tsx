"use client";
import { Layout, Rocket, Bot, Palette, Zap, Target, Smartphone } from "lucide-react";
const TEMPLATES = [
    { name: "SaaS Starter", icon: <Rocket size={32} />, desc: "Full-stack web app with auth, billing, and dashboards", category: "Web App", uses: 1420 },
    { name: "AI Agent", icon: <Bot size={32} />, desc: "Conversational AI with RAG, vector search, and tool use", category: "AI/ML", uses: 892 },
    { name: "NFT Collection", icon: <Palette size={32} />, desc: "Generative art with minting, marketplace, and royalties", category: "Web3", uses: 634 },
    { name: "API Gateway", icon: <Zap size={32} />, desc: "Rate-limited REST + GraphQL with monitoring", category: "Backend", uses: 1107 },
    { name: "Design System", icon: <Target size={32} />, desc: "Component library with Storybook and accessibility", category: "Frontend", uses: 756 },
    { name: "Mobile App", icon: <Smartphone size={32} />, desc: "React Native starter with navigation and auth", category: "Mobile", uses: 543 },
];
export default function Page() {
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Launchpad</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}><Layout size={22} style={{ display: "inline", marginRight: 8, color: "#C9A353" }} />Project <em className="gold-shimmer-text">Templates</em></h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                    {TEMPLATES.map(t => (<div key={t.name} className="luxury-card" style={{ padding: 28, cursor: "pointer", transition: "border-color .2s" }} onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201,163,83,.4)")} onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,.06)")}><div style={{ display: "block", marginBottom: 14, color: "var(--ink)" }}>{t.icon}</div><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 16, color: "var(--ink)" }}>{t.name}</h3><span className="luxury-tag">{t.category}</span></div><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)", lineHeight: 1.6, marginBottom: 14 }}>{t.desc}</p><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "rgba(13,13,13,.25)" }}>{t.uses.toLocaleString()} uses</span><button className="btn-primary" style={{ fontSize: 11, padding: "6px 14px" }}>Use Template</button></div></div>))}
                </div>
            </div></div>
    );
}
