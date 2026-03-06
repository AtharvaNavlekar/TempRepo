import { UserPlus } from "lucide-react";
export default function Page() {
    const CANDIDATES = [
        { name: "0xAlice", score: 7200, match: 94, skills: ["React", "TypeScript", "Node.js"] },
        { name: "DevMarcus", score: 6100, match: 87, skills: ["Go", "Docker", "K8s"] },
        { name: "CryptoMage", score: 11800, match: 82, skills: ["Rust", "Cryptography"] },
    ];
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Nexus Labs · Recruit</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}>Recruit <em className="gold-shimmer-text">Talent</em></h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                {CANDIDATES.map(c => (<div key={c.name} className="luxury-card" style={{ padding: 20, marginBottom: 10, display: "flex", alignItems: "center", gap: 16 }}><div style={{ position: "relative" }}><div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(201,163,83,.08)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: "1rem", color: "#8B6B1A" }}>{c.name[0]}</div><div style={{ position: "absolute", top: -4, right: -4, width: 22, height: 22, borderRadius: "50%", background: "#fff", border: "1px solid rgba(201,163,83,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 700, color: "#C9A353" }}>{c.match}</div></div><div style={{ flex: 1 }}><p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)" }}>{c.name}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>Score: {c.score.toLocaleString()}</p><div style={{ display: "flex", gap: 4, marginTop: 6 }}>{c.skills.map(s => <span key={s} className="luxury-tag">{s}</span>)}</div></div><div style={{ textAlign: "center" }}><p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontStyle: "italic", color: "#C9A353" }}>{c.match}%</p><p className="luxury-overline">Match</p></div><button className="btn-primary" style={{ fontSize: 11, padding: "8px 16px" }}><UserPlus size={12} /> Invite</button></div>))}
            </div></div>
    );
}
