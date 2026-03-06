"use client";
import { motion } from "framer-motion";
import { GraduationCap, Star } from "lucide-react";
const MENTORS = [
    { name: "Sarah Chen", expertise: "System Architecture", rating: 4.9, sessions: 142, price: "$80/hr", avatar: "S" },
    { name: "Marcus Johnson", expertise: "Product Strategy", rating: 4.8, sessions: 89, price: "$65/hr", avatar: "M" },
    { name: "Yuki Tanaka", expertise: "Design Leadership", rating: 4.9, sessions: 201, price: "$90/hr", avatar: "Y" },
];
export default function MentorshipPage() {
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Growth</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}><GraduationCap size={24} style={{ display: "inline", marginRight: 10, color: "#C9A353" }} /><em className="gold-shimmer-text">Mentorship</em></h1><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", marginTop: 8 }}>Connect with experienced founders and get guidance on your journey.</p></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                    {MENTORS.map((m, i) => (<motion.div key={m.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}><div className="luxury-card" style={{ padding: 28, textAlign: "center" }}><div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(201,163,83,.08)", border: "1px solid rgba(201,163,83,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", color: "#8B6B1A", margin: "0 auto 14px" }}>{m.avatar}</div><h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 16, color: "var(--ink)", marginBottom: 4 }}>{m.name}</h3><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)", marginBottom: 8 }}>{m.expertise}</p><div style={{ display: "flex", justifyContent: "center", gap: 2, marginBottom: 8 }}>{Array.from({ length: 5 }).map((_, j) => <Star key={j} size={12} fill="#C9A353" style={{ color: "#C9A353" }} />)}</div><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "var(--smoke)", marginBottom: 14 }}>{m.sessions} sessions · {m.rating} rating</p><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontStyle: "italic", color: "#C9A353" }}>{m.price}</span><button className="btn-primary" style={{ fontSize: 11, padding: "8px 16px" }}>Book</button></div></div></motion.div>))}
                </div>
            </div></div>
    );
}
