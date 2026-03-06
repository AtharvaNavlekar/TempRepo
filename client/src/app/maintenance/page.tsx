import Link from "next/link";

export default function MaintenancePage() {
    return (
        <div className="luxury-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 500, background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,163,83,.1), transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(201,163,83,.05) 1px, transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />

            <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 520, padding: "0 32px" }}>
                <div style={{ fontSize: "3.5rem", marginBottom: 20 }}>🛠️</div>
                <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(201,163,83,.5), transparent)", maxWidth: 80, margin: "0 auto 28px" }} />
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.65rem", fontWeight: 500, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(13,13,13,.35)", marginBottom: 16 }}>
                    Scheduled Maintenance
                </p>
                <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 400, color: "var(--ink)", lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: 16 }}>
                    We&apos;re <em className="gold-shimmer-text">refining</em><br />the experience
                </h1>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--smoke)", lineHeight: 1.8, marginBottom: 36 }}>
                    CollabRise is undergoing planned upgrades to deliver a better experience. Estimated downtime: 30 minutes. We&apos;ll be back shortly.
                </p>

                {/* Progress */}
                <div style={{ maxWidth: 260, margin: "0 auto 32px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "rgba(13,13,13,.4)" }}>Progress</span>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#C9A353", fontWeight: 500 }}>67%</span>
                    </div>
                    <div style={{ height: 4, background: "rgba(13,13,13,.08)", borderRadius: 9999, overflow: "hidden" }}>
                        <div style={{ width: "67%", height: "100%", background: "linear-gradient(90deg, #C9A353, #E5C97A)", borderRadius: 9999 }} />
                    </div>
                </div>

                <Link href="/" className="btn-secondary" style={{ display: "inline-flex" }}>
                    Return to Home
                </Link>
            </div>
        </div>
    );
}
