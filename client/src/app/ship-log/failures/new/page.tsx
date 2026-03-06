"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Page() {
    const router = useRouter();
    const [title, setTitle] = useState(""); const [root, setRoot] = useState(""); const [lesson, setLesson] = useState("");
    const inputStyle: React.CSSProperties = { width: "100%", padding: "14px 18px", background: "var(--parchment)", border: "1px solid rgba(13,13,13,.1)", borderRadius: 12, fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--ink)", outline: "none" };
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Ship Log · Post-Mortem</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}>New <em className="gold-shimmer-text">Post-Mortem</em></h1></div></div>
            <div className="luxury-container" style={{ maxWidth: 640, paddingTop: 40, paddingBottom: 80 }}>
                <div className="luxury-card" style={{ padding: 36, display: "flex", flexDirection: "column", gap: 20 }}>
                    <div><label className="luxury-overline" style={{ display: "block", marginBottom: 8 }}>Title</label><input value={title} onChange={e => setTitle(e.target.value)} placeholder="What failed?" style={inputStyle} /></div>
                    <div><label className="luxury-overline" style={{ display: "block", marginBottom: 8 }}>Root Cause</label><textarea value={root} onChange={e => setRoot(e.target.value)} placeholder="What was the root cause of this failure?" style={{ ...inputStyle, height: 100, resize: "none" as const }} /></div>
                    <div><label className="luxury-overline" style={{ display: "block", marginBottom: 8 }}>Lesson Learned</label><textarea value={lesson} onChange={e => setLesson(e.target.value)} placeholder="What did you learn? How will you prevent this from happening again?" style={{ ...inputStyle, height: 100, resize: "none" as const }} /></div>
                </div>
                <div style={{ marginTop: 20, textAlign: "right" }}><button className="btn-primary" onClick={() => router.push("/ship-log/failures")}>Submit Post-Mortem →</button></div>
            </div></div>
    );
}
