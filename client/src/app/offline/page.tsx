import { WifiOff } from "lucide-react";
export default function OfflinePage() {
    return (
        <div className="luxury-page" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24 }}>
            <div style={{ maxWidth: 420 }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(13,13,13,.04)", border: "1px solid rgba(13,13,13,.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                    <WifiOff size={28} style={{ color: "rgba(13,13,13,.25)" }} />
                </div>
                <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.5rem", fontWeight: 400, color: "var(--ink)", marginBottom: 12, letterSpacing: "-.02em" }}>You&apos;re <em style={{ color: "var(--smoke)" }}>Offline</em></h1>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--smoke)", lineHeight: 1.8, marginBottom: 28 }}>It looks like you&apos;ve lost your internet connection. Please check your network and try again.</p>
                <button className="btn-secondary" onClick={() => window.location.reload()}>Retry Connection</button>
            </div>
        </div>
    );
}
