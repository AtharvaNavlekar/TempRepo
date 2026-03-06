"use client";
const REPORTS = [
    { user: "@toxic_user_99", reason: "Harassment in guild chat", reporter: "@0xAlice", date: "Mar 5", severity: "High" },
    { user: "@spambot_3", reason: "Automated spam messages", reporter: "System", date: "Mar 4", severity: "Medium" },
    { user: "@bad_actor_7", reason: "Fake portfolio submissions", reporter: "@CryptoMage", date: "Mar 3", severity: "High" },
];
const SEV_C: Record<string, string> = { High: "rgba(180,60,60,.7)", Medium: "#C9A353", Low: "#5B8A6F" };
export default function Page() {
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Admin</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}>User <em className="gold-shimmer-text">Moderation</em></h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                {REPORTS.map(r => (<div key={r.user} className="luxury-card" style={{ padding: 20, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)" }}>{r.user}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>{r.reason}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "rgba(13,13,13,.25)", marginTop: 4 }}>Reported by {r.reporter} · {r.date}</p></div><div style={{ display: "flex", gap: 10, alignItems: "center" }}><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, color: SEV_C[r.severity] }}>{r.severity}</span><button className="btn-secondary" style={{ fontSize: 11, padding: "6px 14px" }}>Action</button></div></div>))}
            </div></div>
    );
}
