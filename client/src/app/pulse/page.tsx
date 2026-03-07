"use client";
import { useEffect, useState } from "react";
import { Activity, TrendingUp, Users, Zap } from "lucide-react";
export default function PulsePage() {
    const [count, setCount] = useState(0);
    useEffect(() => { const id = setInterval(() => setCount(c => c + Math.floor(Math.random() * 3)), 2000); return () => clearInterval(id); }, []);
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Real-Time</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}><Activity size={22} style={{ display: "inline", marginRight: 8, color: "#C9A353" }} />Platform <em className="gold-shimmer-text">Pulse</em></h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 32 }}>
                    {[{ l: "Active Now", v: "342", i: <Users size={16} style={{ color: "#C9A353" }} /> }, { l: "Ships Today", v: String(14 + count), i: <Zap size={16} style={{ color: "#C9A353" }} /> }, { l: "Commits/hr", v: "1,247", i: <TrendingUp size={16} style={{ color: "#C9A353" }} /> }, { l: "Uptime", v: "99.98%", i: <Activity size={16} style={{ color: "#C9A353" }} /> }].map(s => (<div key={s.l} className="luxury-card" style={{ padding: 24, textAlign: "center" }}><div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>{s.i}</div><p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontStyle: "italic", color: "#C9A353" }}>{s.v}</p><p className="luxury-overline">{s.l}</p></div>))}
                </div>
                <div className="luxury-card" style={{ padding: 32, textAlign: "center", minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--smoke)", display: "flex", alignItems: "center", gap: "8px" }}><TrendingUp size={16} /> Live activity graph will render here</p>
                </div>
            </div></div>
    );
}
