export default function Page() {
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Ship Log · Heatmap</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}>Activity <em className="gold-shimmer-text">Heatmap</em></h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div className="luxury-card" style={{ padding: 32 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(52,1fr)", gap: 2 }}>
                        {Array.from({ length: 364 }).map((_, i) => { const v = Math.random(); return <div key={i} style={{ aspectRatio: "1", borderRadius: 2, background: v > 0.7 ? "rgba(201,163,83,.7)" : v > 0.4 ? "rgba(201,163,83,.3)" : v > 0.15 ? "rgba(201,163,83,.12)" : "rgba(13,13,13,.04)" }} /> })}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 20, justifyContent: "flex-end" }}>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "var(--smoke)" }}>Less</span>
                        {[.04, .12, .3, .7].map(o => <div key={o} style={{ width: 12, height: 12, borderRadius: 2, background: `rgba(201,163,83,${o})` }} />)}
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "var(--smoke)" }}>More</span>
                    </div>
                </div>
            </div></div>
    );
}
