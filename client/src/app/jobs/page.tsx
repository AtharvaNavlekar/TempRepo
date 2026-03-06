"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Briefcase, MapPin } from "lucide-react";
import { useState } from "react";
const JOBS = [
    { id: "j001", title: "Senior Full-Stack Engineer", company: "Nexus Labs", location: "Remote", type: "Full-time", salary: "$140K–$180K", tags: ["React", "Node.js", "PostgreSQL"] },
    { id: "j002", title: "Product Designer", company: "Zero Gravity", location: "San Francisco", type: "Full-time", salary: "$120K–$150K", tags: ["Figma", "Design Systems", "UX"] },
    { id: "j003", title: "Smart Contract Auditor", company: "Pattern AI", location: "Remote", type: "Contract", salary: "$200/hr", tags: ["Solidity", "Security", "ZK"] },
    { id: "j004", title: "DevRel Engineer", company: "Nexus Labs", location: "NYC / Remote", type: "Full-time", salary: "$130K–$160K", tags: ["Writing", "APIs", "Community"] },
];
export default function JobsPage() {
    const [search, setSearch] = useState("");
    const filtered = JOBS.filter(j => j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()));
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Careers</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 400, color: "var(--ink)" }}><Briefcase size={24} style={{ display: "inline", marginRight: 10, color: "#C9A353" }} /><em className="gold-shimmer-text">Job Board</em></h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ position: "relative", marginBottom: 24 }}><Search size={14} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(13,13,13,.2)" }} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search jobs..." style={{ width: "100%", paddingLeft: 40, paddingRight: 16, paddingTop: 12, paddingBottom: 12, background: "#fff", border: "1px solid rgba(13,13,13,.1)", borderRadius: 12, fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--ink)", outline: "none" }} /></div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {filtered.map((j, i) => (<motion.div key={j.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}><div className="luxury-card" style={{ padding: 24, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", transition: "border-color .2s" }} onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201,163,83,.4)")} onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,.06)")}><div><h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 16, color: "var(--ink)", marginBottom: 4 }}>{j.title}</h3><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", display: "flex", alignItems: "center", gap: 8 }}>{j.company} <MapPin size={11} /> {j.location} · {j.type}</p><div style={{ display: "flex", gap: 4, marginTop: 8 }}>{j.tags.map(t => <span key={t} className="luxury-tag">{t}</span>)}</div></div><div style={{ textAlign: "right" }}><p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontStyle: "italic", color: "#C9A353" }}>{j.salary}</p><button className="btn-primary" style={{ fontSize: 11, padding: "8px 16px", marginTop: 8 }}>Apply</button></div></div></motion.div>))}
                </div>
            </div></div>
    );
}
