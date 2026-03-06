"use client";
import { useState } from "react";
const INTEGRATIONS = [
    { name: "GitHub", icon: "🐙", status: "Connected", desc: "Auto-sync repos and contributions" },
    { name: "Figma", icon: "🎨", status: "Not Connected", desc: "Import design assets and prototypes" },
    { name: "Slack", icon: "💬", status: "Connected", desc: "Team notifications and updates" },
    { name: "Linear", icon: "📋", status: "Not Connected", desc: "Project management sync" },
];
export default function Page() {
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Settings</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}><em className="gold-shimmer-text">Integrations</em></h1></div></div>
            <div className="luxury-container" style={{ maxWidth: 640, paddingTop: 40, paddingBottom: 80 }}>
                {INTEGRATIONS.map(i => (<div key={i.name} className="luxury-card" style={{ padding: 20, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}><span style={{ fontSize: "1.5rem" }}>{i.icon}</span><div><p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)" }}>{i.name}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>{i.desc}</p></div></div>
                    <button className={i.status === "Connected" ? "btn-secondary" : "btn-primary"} style={{ fontSize: 11, padding: "8px 16px" }}>{i.status === "Connected" ? "Disconnect" : "Connect"}</button>
                </div>))}
            </div></div>
    );
}
