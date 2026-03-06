import { Shuffle, ArrowRight } from "lucide-react";
export default function Page() {
    const MATCHES = [
        { name: "0xAlice", skills: ["React", "TypeScript"], compatibility: 94, avatar: "A" },
        { name: "CryptoMage", skills: ["Rust", "Cryptography"], compatibility: 87, avatar: "C" },
        { name: "DesignYuki", skills: ["Figma", "UI/UX"], compatibility: 82, avatar: "Y" },
    ];
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Discovery</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}><Shuffle size={22} style={{ display: "inline", marginRight: 8, color: "#C9A353" }} /><em className="gold-shimmer-text">Matchmaker</em></h1><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", marginTop: 8 }}>AI-powered co-founder matching based on your skills, DNA, and working style.</p></div></div>
            <div className="luxury-container" style={{ maxWidth: 640, paddingTop: 40, paddingBottom: 80 }}>
                {MATCHES.map(m => (<div key={m.name} className="luxury-card" style={{ padding: 24, marginBottom: 10, display: "flex", alignItems: "center", gap: 16 }}><div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(201,163,83,.08)", border: "1px solid rgba(201,163,83,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", color: "#8B6B1A" }}>{m.avatar}</div><div style={{ flex: 1 }}><p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 15, color: "var(--ink)" }}>{m.name}</p><div style={{ display: "flex", gap: 4, marginTop: 4 }}>{m.skills.map(s => <span key={s} className="luxury-tag">{s}</span>)}</div></div><div style={{ textAlign: "center" }}><p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontStyle: "italic", color: "#C9A353" }}>{m.compatibility}%</p><p className="luxury-overline">Match</p></div><button className="btn-primary" style={{ fontSize: 11, padding: "8px 14px" }}>Connect</button></div>))}
                <div style={{ textAlign: "center", marginTop: 20 }}><button className="btn-secondary"><Shuffle size={14} /> Find More Matches</button></div>
            </div></div>
    );
}
