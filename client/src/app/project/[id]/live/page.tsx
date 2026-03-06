"use client";
import { Radio, Users } from "lucide-react";
const VIEWERS = [
    { name: "0xAlice", avatar: "A" }, { name: "DesignYuki", avatar: "Y" }, { name: "Spectator_1", avatar: "S" },
];
export default function Page() {
    return (
        <div className="luxury-page">
            <div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}>
                <div className="luxury-container">
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", background: "rgba(180,60,60,.08)", border: "1px solid rgba(180,60,60,.15)", borderRadius: 9999 }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(180,60,60,.7)", animation: "pulse 1.5s ease-in-out infinite" }} />
                            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(180,60,60,.7)" }}>Live Now</span>
                        </div>
                    </div>
                    <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}>Live <em className="gold-shimmer-text">Build Session</em></h1>
                </div>
            </div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
                    <div className="luxury-card" style={{ padding: 0, overflow: "hidden", aspectRatio: "16/9", background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ textAlign: "center" }}>
                            <Radio size={40} style={{ color: "rgba(201,163,83,.3)", marginBottom: 12 }} />
                            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontStyle: "italic", color: "rgba(255,255,255,.4)" }}>Stream Preview</p>
                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "rgba(255,255,255,.2)", marginTop: 4 }}>Live coding session in progress</p>
                        </div>
                    </div>
                    <div>
                        <div className="luxury-card" style={{ padding: 24, marginBottom: 12 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}><Users size={15} style={{ color: "#C9A353" }} /><h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)" }}>Viewers ({VIEWERS.length})</h3></div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {VIEWERS.map(v => (
                                    <div key={v.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(201,163,83,.08)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: ".7rem", color: "#8B6B1A" }}>{v.avatar}</div>
                                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--ink)" }}>{v.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="luxury-card" style={{ padding: 24 }}>
                            <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)", marginBottom: 12 }}>Session Stats</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {[{ l: "Duration", v: "1h 24m" }, { l: "Commits", v: "7" }, { l: "Lines Changed", v: "+342 / -89" }].map(s => (
                                    <div key={s.l} style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>{s.l}</span>
                                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 500, color: "var(--ink)" }}>{s.v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
