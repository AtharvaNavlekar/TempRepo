"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function PasswordRecoveryPage() {
    const [step, setStep] = useState<1 | 2>(1);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRequestReset = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => { setLoading(false); setStep(2); }, 2000);
    };

    const inputStyle: React.CSSProperties = {
        width: "100%", padding: "14px 18px",
        background: "var(--parchment)", border: "1px solid rgba(13,13,13,.1)",
        borderRadius: 12, fontFamily: "'DM Sans',sans-serif", fontSize: 14,
        color: "var(--ink)", outline: "none", transition: "border-color .2s"
    };

    return (
        <div className="luxury-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 400, background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,163,83,.08), transparent 70%)", pointerEvents: "none" }} />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 460, padding: "0 24px" }}>
                <div style={{ background: "#fff", borderRadius: 20, border: "1px solid rgba(13,13,13,.06)", padding: "48px 40px", boxShadow: "0 8px 40px rgba(13,13,13,.06)" }}>
                    <div style={{ marginBottom: 32, paddingBottom: 24, borderBottom: "1px solid rgba(13,13,13,.08)" }}>
                        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.7rem", fontWeight: 400, color: "var(--ink)", marginBottom: 8 }}>Reset Password</h1>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", lineHeight: 1.7 }}>
                            Enter your email address and we&apos;ll send you a link to reset your password.
                        </p>
                    </div>

                    {step === 1 ? (
                        <form onSubmit={handleRequestReset} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            <div>
                                <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(13,13,13,.35)", display: "block", marginBottom: 8 }}>Email Address</label>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="founder@venture.net" required
                                    style={inputStyle}
                                    onFocus={e => (e.currentTarget.style.borderColor = "#C9A353")}
                                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,.1)")}
                                />
                            </div>
                            <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%", justifyContent: "center", padding: "14px 0", opacity: loading ? 0.6 : 1 }}>
                                {loading ? "Sending..." : "Send Reset Link"}
                            </button>
                        </form>
                    ) : (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "24px 0" }}>
                            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(91,138,111,.1)", border: "1px solid rgba(91,138,111,.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                                <Check size={24} style={{ color: "#5B8A6F" }} />
                            </div>
                            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", marginBottom: 8 }}>Link Sent</h3>
                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", lineHeight: 1.7, marginBottom: 24 }}>
                                Check your email for the reset link. It expires in 15 minutes.
                            </p>
                            <Link href="/auth/login" className="btn-secondary" style={{ display: "inline-flex" }}>Back to Sign In</Link>
                        </motion.div>
                    )}

                    <div style={{ marginTop: 28, textAlign: "center" }}>
                        <Link href="/auth/login" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)", textDecoration: "none" }}>
                            ← Back to Sign In
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
