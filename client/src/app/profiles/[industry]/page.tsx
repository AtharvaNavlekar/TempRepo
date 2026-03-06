import { Users } from "lucide-react";
export default function Page() {
    const PROFILES = [
        { name: "0xNeo", industry: "Web3 Infrastructure", score: 12400, ships: 21 },
        { name: "0xAlice", industry: "Frontend Engineering", score: 7200, ships: 14 },
        { name: "CryptoMage", industry: "Cryptography", score: 11800, ships: 18 },
    ];
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Discovery</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}><Users size={22} style={{ display: "inline", marginRight: 8, color: "#C9A353" }} />Industry <em className="gold-shimmer-text">Profiles</em></h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                {PROFILES.map(p => (<div key={p.name} className="luxury-card" style={{ padding: 20, marginBottom: 10, display: "flex", alignItems: "center", gap: 16 }}><div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(201,163,83,.08)", border: "1px solid rgba(201,163,83,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: "1rem", color: "#8B6B1A" }}>{p.name[0]}</div><div style={{ flex: 1 }}><p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 15, color: "var(--ink)" }}>{p.name}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>{p.industry} · {p.ships} ships</p></div><p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontStyle: "italic", color: "#C9A353" }}>{p.score.toLocaleString()}</p></div>))}
            </div></div>
    );
}
