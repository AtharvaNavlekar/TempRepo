"use client";

import Link from "next/link";
import { RefreshCw } from "lucide-react";

export default function ServerErrorPage() {
    return (
        <div className="luxury-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 500, background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(180,60,60,.06), transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(13,13,13,.04) 1px, transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />

            <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 520, padding: "0 32px" }}>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(5rem,12vw,9rem)", fontStyle: "italic", color: "rgba(180,60,60,.15)", lineHeight: 1, marginBottom: 8 }}>500</p>
                <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(180,60,60,.3), transparent)", maxWidth: 120, margin: "0 auto 28px" }} />
                <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 400, color: "var(--ink)", marginBottom: 16, lineHeight: 1.2 }}>
                    Something went wrong
                </h1>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--smoke)", lineHeight: 1.8, marginBottom: 36 }}>
                    An unexpected error occurred on our end. Our team has been notified and is already working on a fix. Please try again shortly.
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                    <button onClick={() => window.location.reload()} className="btn-primary" style={{ display: "inline-flex" }}>
                        <RefreshCw size={13} /> Try Again
                    </button>
                    <Link href="/" className="btn-secondary" style={{ display: "inline-flex" }}>Return Home</Link>
                </div>
            </div>
        </div>
    );
}
