"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Rocket, ExternalLink } from "lucide-react";
export default function ShipPage() {
    const router = useRouter();
    const [demoUrl, setDemoUrl] = useState("");
    const [summary, setSummary] = useState("");
    const inputStyle: React.CSSProperties = { width: "100%", padding: "14px 18px", background: "var(--parchment)", border: "1px solid rgba(13,13,13,.1)", borderRadius: 12, fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--ink)", outline: "none" };
    return (
        <div className="luxury-page">
            <div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}>
                <div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Venture · Ship</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}>Submit <em className="gold-shimmer-text">Ship</em></h1><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", marginTop: 8 }}>Package and submit your venture for peer review and scoring.</p></div>
            </div>
            <div className="luxury-container" style={{ maxWidth: 640, paddingTop: 40, paddingBottom: 80 }}>
                <div className="luxury-card" style={{ padding: 36 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <div><label className="luxury-overline" style={{ display: "block", marginBottom: 8 }}>Demo URL *</label><div style={{ position: "relative" }}><ExternalLink size={14} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(13,13,13,.2)" }} /><input value={demoUrl} onChange={e => setDemoUrl(e.target.value)} placeholder="https://your-demo.vercel.app" style={inputStyle} onFocus={e => (e.currentTarget.style.borderColor = "#C9A353")} onBlur={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,.1)")} /></div></div>
                        <div><label className="luxury-overline" style={{ display: "block", marginBottom: 8 }}>Ship Summary *</label><textarea value={summary} onChange={e => setSummary(e.target.value)} placeholder="What did you build? What challenges did you overcome? What would you do differently?" style={{ ...inputStyle, height: 140, resize: "none" as const }} onFocus={e => (e.currentTarget.style.borderColor = "#C9A353")} onBlur={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,.1)")} /></div>
                    </div>
                </div>
                <div className="luxury-card" style={{ padding: 28, marginTop: 16, borderColor: "rgba(201,163,83,.2)", background: "rgba(201,163,83,.03)" }}>
                    <p className="luxury-overline" style={{ marginBottom: 12 }}>Pre-Ship Checklist</p>
                    {["All milestones marked complete", "Demo URL is accessible", "Team members have approved", "Assets are uploaded"].map(item => (
                        <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                            <div style={{ width: 16, height: 16, borderRadius: 4, border: "1.5px solid rgba(201,163,83,.3)" }} />
                            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)" }}>{item}</span>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
                    <button className="btn-primary" onClick={() => router.push("/dashboard")} style={{ padding: "16px 48px" }}>
                        <Rocket size={15} /> Submit Ship
                    </button>
                </div>
            </div>
        </div>
    );
}
