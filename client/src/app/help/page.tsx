"use client";
import { motion } from "framer-motion";
import { HelpCircle, Book, MessageCircle, Zap, Rocket } from "lucide-react";
const TOPICS = [
    { title: "Getting Started", articles: 8, icon: <Rocket size={18} />, desc: "Set up your profile, create your first venture" },
    { title: "Ship Score & Staking", articles: 12, icon: <Zap size={18} />, desc: "How scoring works, staking, and multipliers" },
    { title: "Guilds & Community", articles: 6, icon: <MessageCircle size={18} />, desc: "Join guilds, forums, and mentorship" },
    { title: "API & Integrations", articles: 10, icon: <Book size={18} />, desc: "Developer docs, webhooks, and API access" },
];
export default function HelpPage() {
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Support</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}><HelpCircle size={22} style={{ display: "inline", marginRight: 8, color: "#C9A353" }} />Help <em className="gold-shimmer-text">Center</em></h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
                    {TOPICS.map((t, i) => (<motion.div key={t.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}><div className="luxury-card" style={{ padding: 28, cursor: "pointer", transition: "border-color .2s" }} onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201,163,83,.4)")} onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,.06)")}><div style={{ color: "#C9A353", marginBottom: 14 }}>{t.icon}</div><h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 16, color: "var(--ink)", marginBottom: 4 }}>{t.title}</h3><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)", lineHeight: 1.6, marginBottom: 10 }}>{t.desc}</p><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#C9A353" }}>{t.articles} articles →</span></div></motion.div>))}
                </div>
            </div></div>
    );
}
