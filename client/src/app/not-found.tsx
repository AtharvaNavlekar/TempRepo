import Link from "next/link";

export default function NotFound() {
    return (
        <div className="luxury-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 500, background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,163,83,.1), transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(201,163,83,.06) 1px, transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />

            <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 520, padding: "0 32px" }}>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(5rem,12vw,9rem)", fontStyle: "italic", color: "rgba(201,163,83,.25)", lineHeight: 1, marginBottom: 8 }}>404</p>
                <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(201,163,83,.5), transparent)", maxWidth: 120, margin: "0 auto 28px" }} />
                <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 400, color: "var(--ink)", marginBottom: 16, lineHeight: 1.2 }}>
                    This page doesn&apos;t exist yet
                </h1>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--smoke)", lineHeight: 1.8, marginBottom: 36 }}>
                    The venture you&apos;re looking for may have shipped, moved, or simply never existed. Let&apos;s get you back on track.
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                    <Link href="/" className="btn-primary" style={{ display: "inline-flex", gap: 8 }}>Return Home</Link>
                    <Link href="/feed" className="btn-secondary" style={{ display: "inline-flex", gap: 8 }}>Browse Feed</Link>
                </div>
            </div>
        </div>
    );
}
