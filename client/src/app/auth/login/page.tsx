"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => { setLoading(false); window.location.href = "/vibe-check"; }, 1500);
    };

    const inputStyle: React.CSSProperties = {
        width: "100%", padding: "14px 18px",
        background: "var(--parchment)", border: "1px solid rgba(13,13,13,.1)",
        borderRadius: 12, fontFamily: "'DM Sans',sans-serif", fontSize: 14,
        color: "var(--ink)", outline: "none", transition: "border-color .2s, box-shadow .2s"
    };

    return (
        <div className="luxury-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
            {/* Background */}
            <div style={{ position: "absolute", top: "50%", left: "30%", transform: "translate(-50%,-50%)", width: 600, height: 500, background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,163,83,.08), transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(201,163,83,.04) 1px, transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />

            <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 1000, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, margin: "0 auto", padding: "0 32px" }}>
                {/* Left — Branding Panel */}
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
                    style={{ background: "var(--ink)", padding: 56, display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: "20px 0 0 20px", position: "relative", overflow: "hidden", minHeight: 540 }}>
                    <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, borderTop: "1px solid rgba(201,163,83,.25)", borderRight: "1px solid rgba(201,163,83,.25)", margin: 24 }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, width: 60, height: 60, borderBottom: "1px solid rgba(201,163,83,.25)", borderLeft: "1px solid rgba(201,163,83,.25)", margin: 24 }} />
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(201,163,83,.06) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />

                    <div style={{ position: "relative", zIndex: 1 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", background: "rgba(201,163,83,.15)", border: "1px solid rgba(201,163,83,.2)", borderRadius: 9999, marginBottom: 32 }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5B8A6F" }} />
                            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "#C9A353" }}>System Online</span>
                        </div>
                        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 400, fontStyle: "italic", color: "#fff", lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: 8 }}>
                            Welcome<br />to <span style={{ color: "#C9A353" }}>CollabRise</span>
                        </h1>
                    </div>
                    <p style={{ position: "relative", zIndex: 1, fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.9, maxWidth: 320, letterSpacing: ".02em" }}>
                        Ship real ventures, build irrefutable proof of your abilities, and let your work replace your résumé.
                    </p>
                </motion.div>

                {/* Right — Login Form */}
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                    style={{ background: "#fff", padding: 56, borderRadius: "0 20px 20px 0", display: "flex", flexDirection: "column", justifyContent: "center", boxShadow: "8px 8px 40px rgba(13,13,13,.06)" }}>
                    <div style={{ marginBottom: 36 }}>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 400, color: "var(--ink)", marginBottom: 8 }}>Welcome Back.</h2>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)" }}>Sign in to continue to your account.</p>
                    </div>

                    <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <div>
                            <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(13,13,13,.35)", display: "block", marginBottom: 8 }}>Email Address</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="founder@venture.net" required
                                style={inputStyle}
                                onFocus={e => { e.currentTarget.style.borderColor = "#C9A353"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,163,83,.1)"; }}
                                onBlur={e => { e.currentTarget.style.borderColor = "rgba(13,13,13,.1)"; e.currentTarget.style.boxShadow = "none"; }}
                            />
                        </div>
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(13,13,13,.35)" }}>Password</label>
                                <Link href="/auth/recovery" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 600, color: "#C9A353", textDecoration: "none", letterSpacing: ".1em", textTransform: "uppercase" }}>Forgot?</Link>
                            </div>
                            <input type="password" placeholder="••••••••••••" required
                                style={inputStyle}
                                onFocus={e => { e.currentTarget.style.borderColor = "#C9A353"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,163,83,.1)"; }}
                                onBlur={e => { e.currentTarget.style.borderColor = "rgba(13,13,13,.1)"; e.currentTarget.style.boxShadow = "none"; }}
                            />
                        </div>
                        <button type="submit" className="btn-primary" disabled={loading}
                            style={{ width: "100%", justifyContent: "center", padding: "14px 0", fontSize: 12, opacity: loading ? 0.6 : 1 }}>
                            {loading ? "Signing in..." : <><span>Sign In</span> <ArrowRight size={13} /></>}
                        </button>
                    </form>

                    <div style={{ margin: "28px 0", display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ flex: 1, height: 1, background: "rgba(13,13,13,.08)" }} />
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(13,13,13,.3)" }}>Or Continue With</span>
                        <div style={{ flex: 1, height: 1, background: "rgba(13,13,13,.08)" }} />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        <button className="btn-secondary" style={{ justifyContent: "center" }}><Github size={14} /> GitHub</button>
                        <button className="btn-secondary" style={{ justifyContent: "center" }}>🔗 Wallet</button>
                    </div>

                    <p style={{ textAlign: "center", marginTop: 28, fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/create-account" style={{ color: "var(--ink)", fontWeight: 600, textDecoration: "none" }}>Sign Up</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
