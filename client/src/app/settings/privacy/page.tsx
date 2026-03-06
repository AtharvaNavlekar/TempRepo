"use client";
import { useState } from "react";
import { Shield, Eye, EyeOff } from "lucide-react";
const SETTINGS = [
    { label: "Profile Visibility", desc: "Allow others to view your ship log and profile", defaultOn: true },
    { label: "Show Ship Score", desc: "Display your score publicly on your profile", defaultOn: true },
    { label: "Activity Heatmap", desc: "Show your activity heatmap to visitors", defaultOn: false },
    { label: "Allow Direct Messages", desc: "Let other founders message you directly", defaultOn: true },
];
export default function Page() {
    const [toggles, setToggles] = useState(SETTINGS.map(s => s.defaultOn));
    const toggle = (i: number) => setToggles(prev => { const n = [...prev]; n[i] = !n[i]; return n; });
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Settings</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}><Shield size={22} style={{ display: "inline", marginRight: 8, color: "#C9A353" }} /><em className="gold-shimmer-text">Privacy</em></h1></div></div>
            <div className="luxury-container" style={{ maxWidth: 640, paddingTop: 40, paddingBottom: 80 }}>
                {SETTINGS.map((s, i) => (<div key={s.label} className="luxury-card" style={{ padding: 20, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}><div style={{ display: "flex", alignItems: "center", gap: 12 }}>{toggles[i] ? <Eye size={16} style={{ color: "#C9A353" }} /> : <EyeOff size={16} style={{ color: "rgba(13,13,13,.2)" }} />}<div><p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)" }}>{s.label}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>{s.desc}</p></div></div>
                    <button onClick={() => toggle(i)} style={{ width: 44, height: 24, borderRadius: 9999, border: "none", cursor: "pointer", background: toggles[i] ? "#C9A353" : "rgba(13,13,13,.1)", position: "relative", transition: "background .2s" }}><div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: toggles[i] ? 23 : 3, transition: "left .2s" }} /></button>
                </div>))}
            </div></div>
    );
}
