import Link from "next/link";
import { Users, Award, MessageCircle, Zap } from "lucide-react";
const MEMBERS = [
    { name: "0xNeo", role: "Moderator", score: 12400 },
    { name: "0xAlice", role: "Member", score: 7200 },
    { name: "DevMarcus", role: "Member", score: 6100 },
    { name: "CryptoMage", role: "Member", score: 11800 },
];
export default function Page() {
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container">
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}><div style={{ color: "#C9A353", display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={40} /></div><div><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 400, color: "var(--ink)" }}>The React Core</h1><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>1,420 members · Founded Jan 2025</p></div></div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--smoke)", lineHeight: 1.8, maxWidth: 600 }}>A community of React enthusiasts building cutting-edge applications and pushing the boundaries of frontend development.</p>
        </div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 32 }}>
                    {[{ l: "Members", v: "1,420", i: <Users size={16} /> }, { l: "Projects", v: "42", i: <Award size={16} /> }, { l: "Messages", v: "12.4K", i: <MessageCircle size={16} /> }].map(s => (<div key={s.l} className="luxury-card" style={{ padding: 20, textAlign: "center" }}><div style={{ color: "#C9A353", marginBottom: 8, display: "flex", justifyContent: "center" }}>{s.i}</div><p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontStyle: "italic", color: "#C9A353" }}>{s.v}</p><p className="luxury-overline">{s.l}</p></div>))}
                </div>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", marginBottom: 16 }}>Members</h2>
                {MEMBERS.map(m => (<div key={m.name} className="luxury-card" style={{ padding: 16, marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}><div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(201,163,83,.08)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: ".8rem", color: "#8B6B1A" }}>{m.name[0]}</div><div style={{ flex: 1 }}><p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 13, color: "var(--ink)" }}>{m.name}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "var(--smoke)" }}>{m.role} · {m.score.toLocaleString()}</p></div></div>))}
            </div></div>
    );
}
