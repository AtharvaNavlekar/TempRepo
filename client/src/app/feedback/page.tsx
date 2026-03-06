"use client";
import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
export default function FeedbackPage() {
    const [type, setType] = useState("feature");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const inputStyle: React.CSSProperties = { width: "100%", padding: "14px 18px", background: "var(--parchment)", border: "1px solid rgba(13,13,13,.1)", borderRadius: 12, fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--ink)", outline: "none" };
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Support</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}><MessageSquare size={22} style={{ display: "inline", marginRight: 8, color: "#C9A353" }} />Share <em className="gold-shimmer-text">Feedback</em></h1></div></div>
            <div className="luxury-container" style={{ maxWidth: 560, paddingTop: 40, paddingBottom: 80 }}>
                {submitted ? (
                    <div className="luxury-card" style={{ padding: 48, textAlign: "center" }}>
                        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(91,138,111,.08)", border: "1px solid rgba(91,138,111,.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "1.5rem" }}>✓</div>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--ink)", marginBottom: 8 }}>Thank you!</h2>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)" }}>We appreciate your feedback. Our team will review it shortly.</p>
                    </div>
                ) : (
                    <div className="luxury-card" style={{ padding: 36, display: "flex", flexDirection: "column", gap: 20 }}>
                        <div><label className="luxury-overline" style={{ display: "block", marginBottom: 8 }}>Type</label>
                            <div style={{ display: "flex", gap: 6 }}>{["Feature Request", "Bug Report", "General"].map(t => { const k = t.toLowerCase().replace(" ", ""); return <button key={t} onClick={() => setType(k)} style={{ padding: "7px 14px", borderRadius: 9999, border: "1px solid", fontSize: 12, fontFamily: "'DM Sans',sans-serif", cursor: "pointer", background: type === k ? "var(--ink)" : "transparent", color: type === k ? "#fff" : "rgba(13,13,13,.4)", borderColor: type === k ? "var(--ink)" : "rgba(13,13,13,.12)", transition: "all .2s" }}>{t}</button> })}</div></div>
                        <div><label className="luxury-overline" style={{ display: "block", marginBottom: 8 }}>Message</label><textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell us what's on your mind..." style={{ ...inputStyle, height: 140, resize: "none" as const }} onFocus={e => (e.currentTarget.style.borderColor = "#C9A353")} onBlur={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,.1)")} /></div>
                        <button className="btn-primary" onClick={() => setSubmitted(true)} style={{ width: "100%" }}><Send size={14} /> Submit Feedback</button>
                    </div>
                )}
            </div></div>
    );
}
