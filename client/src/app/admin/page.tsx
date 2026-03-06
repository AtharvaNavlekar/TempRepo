"use client";
import Link from "next/link";
import { Shield, BarChart2, FileText, AlertTriangle, DollarSign, Users, CheckCircle } from "lucide-react";
const SECTIONS = [
    { title: "Analytics", desc: "Platform metrics and growth data", icon: <BarChart2 size={18} />, href: "/admin/analytics/overview" },
    { title: "Content", desc: "Moderate user-generated content", icon: <FileText size={18} />, href: "/admin/content" },
    { title: "Disputes", desc: "Manage platform-level disputes", icon: <AlertTriangle size={18} />, href: "/admin/disputes" },
    { title: "Finance", desc: "Revenue, payouts, and escrow", icon: <DollarSign size={18} />, href: "/admin/finance" },
    { title: "Moderation", desc: "User reports and actions", icon: <Users size={18} />, href: "/admin/moderation" },
    { title: "Verification", desc: "Identity and skill verification", icon: <CheckCircle size={18} />, href: "/admin/verification" },
];
export default function AdminDashboard() {
    return (
        <div className="luxury-page">
            <div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}><Shield size={18} style={{ color: "#C9A353" }} /><p className="luxury-overline">Administration</p></div><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}>Admin <em className="gold-shimmer-text">Dashboard</em></h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 32 }}>
                    {[{ l: "Total Users", v: "12,847" }, { l: "Active Projects", v: "1,432" }, { l: "Revenue (MTD)", v: "$48.2K" }, { l: "Disputes Open", v: "7" }, { l: "Verifications", v: "28" }, { l: "Ships Today", v: "14" }].map(s => (<div key={s.l} className="luxury-card" style={{ padding: 20, textAlign: "center" }}><p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontStyle: "italic", color: "#C9A353" }}>{s.v}</p><p className="luxury-overline">{s.l}</p></div>))}
                </div>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", marginBottom: 16 }}>Sections</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                    {SECTIONS.map(s => (<Link key={s.title} href={s.href} style={{ textDecoration: "none" }}><div className="luxury-card" style={{ padding: 24, cursor: "pointer", transition: "border-color .2s" }} onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201,163,83,.4)")} onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,.06)")}><div style={{ color: "#C9A353", marginBottom: 12 }}>{s.icon}</div><h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 15, color: "var(--ink)", marginBottom: 4 }}>{s.title}</h3><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>{s.desc}</p></div></Link>))}
                </div>
            </div>
        </div>
    );
}
