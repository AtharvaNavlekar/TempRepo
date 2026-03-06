import { Star } from "lucide-react";
export default function Page() {
    const REVIEWS = [
        { reviewer: "0xAlice", project: "Identity Layer", rating: 5, comment: "Exceptional code quality and communication. Would collaborate again." },
        { reviewer: "DevMarcus", project: "NFT Marketplace", rating: 4, comment: "Great velocity but could improve documentation coverage." },
        { reviewer: "DesignYuki", project: "Design System", rating: 5, comment: "Perfect handoff process. Implemented designs pixel-perfectly." },
    ];
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Ship Log</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}>Peer <em className="gold-shimmer-text">Reviews</em></h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}><div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {REVIEWS.map(r => (<div key={r.reviewer} className="luxury-card" style={{ padding: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><div><span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 15, color: "var(--ink)" }}>{r.reviewer}</span><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)", marginLeft: 8 }}>on {r.project}</span></div><div style={{ display: "flex", gap: 2 }}>{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} style={{ color: i < r.rating ? "#C9A353" : "rgba(13,13,13,.1)" }} fill={i < r.rating ? "#C9A353" : "none"} />)}</div></div>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", fontStyle: "italic", lineHeight: 1.7 }}>&ldquo;{r.comment}&rdquo;</p>
                </div>))}
            </div></div></div>
    );
}
