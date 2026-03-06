import Link from "next/link";
import { ShieldOff } from "lucide-react";
export default function AccessDeniedPage() {
    return (
        <div className="luxury-page" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24 }}>
            <div style={{ maxWidth: 440 }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(180,60,60,.06)", border: "1px solid rgba(180,60,60,.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                    <ShieldOff size={28} style={{ color: "rgba(180,60,60,.5)" }} />
                </div>
                <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.5rem", fontWeight: 400, color: "var(--ink)", marginBottom: 12, letterSpacing: "-.02em" }}>Access <em style={{ color: "rgba(180,60,60,.6)" }}>Denied</em></h1>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--smoke)", lineHeight: 1.8, marginBottom: 28 }}>You don't have permission to view this page. If you believe this is an error, please contact support.</p>
                <Link href="/dashboard" className="btn-primary">Return to Dashboard →</Link>
            </div>
        </div>
    );
}
