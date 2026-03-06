import { Timer, Target, CheckCircle } from "lucide-react";
export default function Page() {
    const TASKS = [
        { title: "Implement ZK verifier module", assignee: "0xNeo", status: "Done", points: 8 },
        { title: "Design identity card component", assignee: "DesignYuki", status: "In Progress", points: 5 },
        { title: "Write integration tests", assignee: "0xAlice", status: "To Do", points: 3 },
        { title: "API documentation update", assignee: "DevMarcus", status: "To Do", points: 2 },
    ];
    const SC: Record<string, { bg: string; border: string; color: string }> = { Done: { bg: "rgba(91,138,111,.08)", border: "rgba(91,138,111,.15)", color: "#5B8A6F" }, "In Progress": { bg: "rgba(201,163,83,.08)", border: "rgba(201,163,83,.15)", color: "#977833" }, "To Do": { bg: "rgba(13,13,13,.03)", border: "rgba(13,13,13,.06)", color: "rgba(13,13,13,.35)" } };
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><p className="luxury-overline" style={{ marginBottom: 12 }}>Project</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}><Timer size={22} style={{ display: "inline", marginRight: 8, color: "#C9A353" }} />Sprint <em className="gold-shimmer-text">Board</em></h1></div></div>
            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
                    {[{ l: "Total Points", v: "18" }, { l: "Completed", v: "8" }, { l: "Days Left", v: "5" }].map(s => (<div key={s.l} className="luxury-card" style={{ padding: 20, textAlign: "center" }}><p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontStyle: "italic", color: "#C9A353" }}>{s.v}</p><p className="luxury-overline">{s.l}</p></div>))}
                </div>
                {TASKS.map(t => (<div key={t.title} className="luxury-card" style={{ padding: 18, marginBottom: 8, display: "flex", alignItems: "center", gap: 14 }}><div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: SC[t.status].bg, border: `1px solid ${SC[t.status].border}` }}>{t.status === "Done" ? <CheckCircle size={13} style={{ color: SC[t.status].color }} /> : <Target size={13} style={{ color: SC[t.status].color }} />}</div><div style={{ flex: 1 }}><p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)" }}>{t.title}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>{t.assignee} · {t.points} pts</p></div><span style={{ padding: "3px 10px", borderRadius: 9999, fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 600, background: SC[t.status].bg, border: `1px solid ${SC[t.status].border}`, color: SC[t.status].color }}>{t.status}</span></div>))}
            </div></div>
    );
}
