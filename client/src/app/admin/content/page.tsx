"use client";
const ITEMS = [
    { title: "AI-Generated Portfolio Spam", user: "@spambot22", date: "Mar 5", status: "Flagged" },
    { title: "Hate speech in guild forum", user: "@anon_user", date: "Mar 4", status: "Under Review" },
    { title: "Copyright claim on design assets", user: "@designer_pro", date: "Mar 3", status: "Resolved" },
];
export default function Page() {
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Admin</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}>Content <em className="gold-shimmer-text">Moderation</em></h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {ITEMS.map(i => (<div key={i.title} className="luxury-card" style={{ padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)" }}>{i.title}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>{i.user} · {i.date}</p></div><div style={{ display: "flex", gap: 8, alignItems: "center" }}><span style={{ padding: "3px 10px", borderRadius: 9999, fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 600, background: i.status === "Resolved" ? "rgba(91,138,111,.08)" : i.status === "Flagged" ? "rgba(180,60,60,.06)" : "rgba(201,163,83,.08)", color: i.status === "Resolved" ? "#5B8A6F" : i.status === "Flagged" ? "rgba(180,60,60,.7)" : "#977833", border: "1px solid", borderColor: i.status === "Resolved" ? "rgba(91,138,111,.15)" : i.status === "Flagged" ? "rgba(180,60,60,.12)" : "rgba(201,163,83,.15)" }}>{i.status}</span><button className="btn-secondary" style={{ fontSize: 11, padding: "6px 14px" }}>Review</button></div></div>))}
                </div>
            </div></div>
    );
}
