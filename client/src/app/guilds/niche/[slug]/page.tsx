import Link from "next/link";
import { Users } from "lucide-react";
const GUILDS = [
    { name: "AgriTech Collective", members: 124, desc: "Sustainable agriculture and food tech" },
    { name: "BioHack Lab", members: 87, desc: "Open-source biology and bioinformatics" },
    { name: "EdTech Pioneers", members: 256, desc: "Revolutionizing education through technology" },
];
export default function Page() {
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Guilds · Niche</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}>Niche <em className="gold-shimmer-text">Guilds</em></h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                    {GUILDS.map(g => (<div key={g.name} className="luxury-card" style={{ padding: 24, cursor: "pointer", transition: "border-color .2s" }} onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201,163,83,.4)")} onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,.06)")}><Users size={18} style={{ color: "#C9A353", marginBottom: 12 }} /><h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 15, color: "var(--ink)", marginBottom: 4 }}>{g.name}</h3><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)", marginBottom: 12 }}>{g.desc}</p><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#C9A353" }}>{g.members} members</span></div>))}
                </div>
            </div></div>
    );
}
