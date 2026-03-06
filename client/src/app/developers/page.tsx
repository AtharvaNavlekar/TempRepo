"use client";
import { Code, Copy } from "lucide-react";
const API_ENDPOINTS = [
    { method: "GET", path: "/api/v1/score/:userId", desc: "Get a founder's Ship Score" },
    { method: "GET", path: "/api/v1/shiplog/:userId", desc: "Get a founder's public Ship Log" },
    { method: "POST", path: "/api/v1/project/create", desc: "Create a new venture" },
    { method: "GET", path: "/api/v1/guilds", desc: "List all guilds" },
    { method: "POST", path: "/api/v1/bounty/claim", desc: "Claim a bounty" },
];
const MC: Record<string, string> = { GET: "#5B8A6F", POST: "#C9A353", PUT: "#977833", DELETE: "rgba(180,60,60,.7)" };
export default function DeveloperPortalPage() {
    return (
        <div className="luxury-page">
            <div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}>
                <div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Developer Portal</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 400, color: "var(--ink)" }}><Code size={24} style={{ display: "inline", marginRight: 10, color: "#C9A353" }} /><em className="gold-shimmer-text">API Reference</em></h1><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", marginTop: 8 }}>Build integrations with the CollabRise API.</p></div>
            </div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div className="luxury-card" style={{ padding: 28, marginBottom: 20 }}>
                    <p className="luxury-overline" style={{ marginBottom: 12 }}>Authentication</p>
                    <div style={{ background: "var(--ink)", borderRadius: 10, padding: "16px 20px", fontFamily: "monospace", fontSize: 13, color: "rgba(255,255,255,.7)", overflowX: "auto" }}>
                        <span style={{ color: "rgba(201,163,83,.7)" }}>Authorization:</span> Bearer {"<your-api-key>"}
                    </div>
                </div>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", marginBottom: 16 }}>Endpoints</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {API_ENDPOINTS.map(ep => (
                        <div key={ep.path} className="luxury-card" style={{ padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
                            <span style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700, color: MC[ep.method] || "#C9A353", minWidth: 40 }}>{ep.method}</span>
                            <code style={{ fontFamily: "monospace", fontSize: 13, color: "var(--ink)", flex: 1 }}>{ep.path}</code>
                            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)", flex: 1 }}>{ep.desc}</span>
                            <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(13,13,13,.2)" }}><Copy size={14} /></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
