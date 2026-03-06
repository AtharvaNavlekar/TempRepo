import Link from "next/link";
export default function Page() {
    const STATS = [{ l: "Ships", v: "12" }, { l: "Score", v: "842" }, { l: "Guilds", v: "3" }, { l: "Streak", v: "7d" }];
    const SHIPS = [{ title: "Identity Layer v2", date: "Mar 1, 2026", status: "Shipped" }, { title: "NFT Marketplace", date: "Feb 14, 2026", status: "Shipped" }, { title: "Design System Core", date: "Jan 20, 2026", status: "Shipped" }];
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}><div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(201,163,83,.08)", border: "1px solid rgba(201,163,83,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", color: "#8B6B1A" }}>U</div><div><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 400, color: "var(--ink)" }}>@username</h1><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>Full-Stack Engineer · React Guild</p></div></div>
            <div style={{ display: "flex", gap: 16, marginTop: 16 }}>{STATS.map(s => (<div key={s.l} style={{ textAlign: "center" }}><p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontStyle: "italic", color: "#C9A353" }}>{s.v}</p><p className="luxury-overline">{s.l}</p></div>))}</div></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)", marginBottom: 16 }}>Recent Ships</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {SHIPS.map(s => (<div key={s.title} className="luxury-card" style={{ padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)" }}>{s.title}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>{s.date}</p></div><span style={{ padding: "3px 10px", background: "rgba(91,138,111,.08)", border: "1px solid rgba(91,138,111,.15)", borderRadius: 9999, fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 600, color: "#5B8A6F" }}>{s.status}</span></div>))}
                </div>
            </div></div>
    );
}
