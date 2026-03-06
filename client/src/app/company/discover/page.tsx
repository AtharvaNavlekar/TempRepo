"use client";
import { Search, Building2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
const COMPANIES = [
    { slug: "nexus-labs", name: "Nexus Labs", desc: "Building the next generation of developer tools", openRoles: 4, founded: "2024" },
    { slug: "zero-gravity", name: "Zero Gravity", desc: "Space-tech infrastructure and satellite communications", openRoles: 2, founded: "2023" },
    { slug: "pattern-ai", name: "Pattern AI", desc: "Enterprise AI solutions for supply chain optimization", openRoles: 6, founded: "2025" },
];
export default function Page() {
    const [search, setSearch] = useState("");
    const filtered = COMPANIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Companies</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}>Discover <em className="gold-shimmer-text">Companies</em></h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ position: "relative", marginBottom: 24 }}><Search size={14} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(13,13,13,.2)" }} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search companies..." style={{ width: "100%", paddingLeft: 40, paddingRight: 16, paddingTop: 12, paddingBottom: 12, background: "#fff", border: "1px solid rgba(13,13,13,.1)", borderRadius: 12, fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--ink)", outline: "none" }} /></div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                    {filtered.map(c => (<Link key={c.slug} href={`/company/${c.slug}`} style={{ textDecoration: "none" }}><div className="luxury-card" style={{ padding: 24, cursor: "pointer", transition: "border-color .2s" }} onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201,163,83,.4)")} onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,.06)")}><Building2 size={20} style={{ color: "#C9A353", marginBottom: 12 }} /><h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 16, color: "var(--ink)", marginBottom: 4 }}>{c.name}</h3><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)", lineHeight: 1.6, marginBottom: 12 }}>{c.desc}</p><div style={{ display: "flex", justifyContent: "space-between" }}><span className="luxury-tag">Since {c.founded}</span><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#C9A353" }}>{c.openRoles} open roles</span></div></div></Link>))}
                </div>
            </div></div>
    );
}
