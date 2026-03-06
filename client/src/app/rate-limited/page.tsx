import Link from "next/link";
import { Clock } from "lucide-react";
export default function RateLimitedPage() {
    return (
        <div className="luxury-page" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24 }}>
            <div style={{ maxWidth: 420 }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(201,163,83,.06)", border: "1px solid rgba(201,163,83,.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                    <Clock size={28} style={{ color: "#C9A353" }} />
                </div>
                <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.5rem", fontWeight: 400, color: "var(--ink)", marginBottom: 12, letterSpacing: "-.02em" }}>Slow <em className="gold-shimmer-text">Down</em></h1>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--smoke)", lineHeight: 1.8, marginBottom: 28 }}>You&apos;ve made too many requests. Please wait a moment before trying again. Excellence takes patience.</p>
                <Link href="/dashboard" className="btn-secondary">Return to Dashboard</Link>
            </div>
        </div>
    );
}
