"use client";
import { useState } from "react";
import { Sparkles } from "lucide-react";
export default function Page() {
    const [email, setEmail] = useState("");
    const [joined, setJoined] = useState(false);
    return (
        <div className="luxury-page" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24 }}>
            <div style={{ maxWidth: 480 }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(201,163,83,.06)", border: "1px solid rgba(201,163,83,.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
                    <Sparkles size={28} style={{ color: "#C9A353" }} />
                </div>
                {joined ? (
                    <>
                        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.5rem", fontWeight: 400, color: "var(--ink)", marginBottom: 12 }}>You&apos;re <em className="gold-shimmer-text">In</em></h1>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--smoke)", lineHeight: 1.8 }}>We&apos;ll notify you when your spot opens up. Thank you for your patience.</p>
                    </>
                ) : (
                    <>
                        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 400, color: "var(--ink)", marginBottom: 12, letterSpacing: "-.02em" }}>Join the <em className="gold-shimmer-text">Waitlist</em></h1>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--smoke)", lineHeight: 1.8, marginBottom: 28 }}>We&apos;re onboarding founders in small batches to ensure quality. Enter your email to reserve your spot.</p>
                        <div style={{ display: "flex", gap: 10 }}>
                            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={{ flex: 1, padding: "14px 18px", background: "#fff", border: "1px solid rgba(13,13,13,.1)", borderRadius: 12, fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--ink)", outline: "none" }} onFocus={e => (e.currentTarget.style.borderColor = "#C9A353")} onBlur={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,.1)")} />
                            <button className="btn-primary" onClick={() => setJoined(true)}>Join →</button>
                        </div>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "rgba(13,13,13,.2)", marginTop: 14 }}>2,847 founders ahead of you</p>
                    </>
                )}
            </div>
        </div>
    );
}
