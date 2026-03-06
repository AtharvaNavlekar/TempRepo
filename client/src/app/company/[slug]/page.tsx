import Link from "next/link";
import { Building2, Users, MapPin, ExternalLink } from "lucide-react";
export default function Page() {
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}><div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(201,163,83,.08)", border: "1px solid rgba(201,163,83,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}><Building2 size={24} style={{ color: "#C9A353" }} /></div><div><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 400, color: "var(--ink)" }}>Nexus Labs</h1><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)", display: "flex", alignItems: "center", gap: 6 }}><MapPin size={12} /> San Francisco · Founded 2024</p></div></div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--smoke)", lineHeight: 1.8, maxWidth: 600 }}>Building the next generation of developer tools. We believe in open-source, radical transparency, and shipping fast.</p></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 32 }}>
                    {[{ l: "Team Size", v: "28" }, { l: "Projects", v: "12" }, { l: "Open Roles", v: "4" }, { l: "Avg Score", v: "892" }].map(s => (<div key={s.l} className="luxury-card" style={{ padding: 20, textAlign: "center" }}><p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontStyle: "italic", color: "#C9A353" }}>{s.v}</p><p className="luxury-overline">{s.l}</p></div>))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}><h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)" }}>Open Roles</h2><Link href="/company/nexus-labs/recruit" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#C9A353", textDecoration: "none" }}>View All →</Link></div>
                {["Senior Full-Stack Engineer", "Product Designer", "DevOps Lead", "Technical Writer"].map(r => (<div key={r} className="luxury-card" style={{ padding: 16, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)" }}>{r}</span><button className="btn-secondary" style={{ fontSize: 11, padding: "6px 14px" }}>Apply</button></div>))}
            </div></div>
    );
}
