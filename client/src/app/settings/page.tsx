"use client";

import Link from "next/link";
import { Save, Lock, Link2, Download, ChevronRight } from "lucide-react";

const SECTIONS = [
    { title: "Privacy Controls", description: "Manage who can see your Ship Log and profile data.", href: "/settings/privacy", icon: <Lock size={16} style={{ color: "#C9A353" }} /> },
    { title: "Connected Apps", description: "Manage GitHub, Figma, Stripe, and other integrations.", href: "/settings/integrations", icon: <Link2 size={16} style={{ color: "#C9A353" }} /> },
    { title: "Data Export", description: "Download your data in JSON, CSV, or PDF format.", href: "/settings/export", icon: <Download size={16} style={{ color: "#C9A353" }} /> },
];

const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px",
    background: "var(--parchment)", border: "1px solid rgba(13,13,13,.1)",
    borderRadius: 10, fontFamily: "'DM Sans',sans-serif", fontSize: 14,
    color: "var(--ink)", outline: "none", transition: "border-color .2s"
};

export default function SettingsPage() {
    return (
        <div className="luxury-page">
            {/* Header */}
            <div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}>
                <div className="luxury-container" style={{ maxWidth: 900, margin: "0 auto", padding: "0 48px" }}>
                    <p className="luxury-overline" style={{ marginBottom: 12 }}>Account · Preferences</p>
                    <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 400, color: "var(--ink)", lineHeight: 1, letterSpacing: "-.03em" }}>Settings</h1>
                </div>
            </div>

            <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 48px 80px" }}>
                {/* Profile Card */}
                <div className="luxury-card" style={{ padding: 36, marginBottom: 24, position: "relative", overflow: "hidden" }}>
                    <div className="luxury-card-accent" />
                    <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", marginBottom: 24 }}>Profile</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <div>
                            <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(13,13,13,.35)", display: "block", marginBottom: 8 }}>Display Name</label>
                            <input defaultValue="0xNeo" style={inputStyle}
                                onFocus={e => (e.currentTarget.style.borderColor = "#C9A353")}
                                onBlur={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,.1)")}
                            />
                        </div>
                        <div>
                            <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(13,13,13,.35)", display: "block", marginBottom: 8 }}>Manifesto</label>
                            <textarea defaultValue="Full-stack architect. Shipping since 2020." style={{ ...inputStyle, height: 90, resize: "none" as const }}
                                onFocus={e => (e.currentTarget.style.borderColor = "#C9A353")}
                                onBlur={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,.1)")}
                            />
                        </div>
                        <div>
                            <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(13,13,13,.35)", display: "block", marginBottom: 8 }}>Primary Guild</label>
                            <select style={inputStyle}
                                onFocus={e => (e.currentTarget.style.borderColor = "#C9A353")}
                                onBlur={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,.1)")}
                            >
                                <option>React Guild</option>
                                <option>Rust Guild</option>
                                <option>Design Guild</option>
                                <option>Music Guild</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
                        <button className="btn-primary" style={{ display: "inline-flex" }}>
                            <Save size={13} /> Save Changes
                        </button>
                    </div>
                </div>

                {/* Danger strip */}
                <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(201,163,83,.3), transparent)", margin: "8px 0 20px" }} />

                {/* Section Links */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {SECTIONS.map(s => (
                        <Link key={s.href} href={s.href} style={{ textDecoration: "none" }}>
                            <div className="luxury-card" style={{ padding: "18px 24px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
                                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(201,163,83,.08)", border: "1px solid rgba(201,163,83,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {s.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)", marginBottom: 2 }}>{s.title}</p>
                                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>{s.description}</p>
                                </div>
                                <ChevronRight size={14} style={{ color: "#C9A353" }} />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Danger Zone */}
                <div style={{ marginTop: 40 }}>
                    <p className="luxury-overline" style={{ marginBottom: 16, color: "rgba(180,60,60,.7)" }}>Danger Zone</p>
                    <div className="luxury-card" style={{ padding: 24, borderColor: "rgba(180,60,60,.12)" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div>
                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)", marginBottom: 4 }}>Delete Account</p>
                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>Permanently delete your account and all Ship Log data. This cannot be undone.</p>
                            </div>
                            <button style={{ padding: "10px 20px", background: "rgba(180,60,60,.08)", border: "1px solid rgba(180,60,60,.2)", borderRadius: 9999, fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "rgba(180,60,60,.8)", cursor: "pointer" }}>
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
