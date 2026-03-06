"use client";
import { useState } from "react";
import { Bell, Check, UserPlus, Award, MessageCircle, AlertTriangle } from "lucide-react";
const NOTIFS = [
    { type: "invite", icon: <UserPlus size={14} />, msg: "0xAlice invited you to join Identity Layer v3", time: "5m ago", read: false },
    { type: "achievement", icon: <Award size={14} />, msg: "You earned the 'Consistent Shipper' badge!", time: "1h ago", read: false },
    { type: "message", icon: <MessageCircle size={14} />, msg: "New message from CryptoMage in project chat", time: "3h ago", read: false },
    { type: "dispute", icon: <AlertTriangle size={14} />, msg: "Dispute #14 requires your vote", time: "5h ago", read: true },
    { type: "achievement", icon: <Award size={14} />, msg: "Your Ship Score increased by +120 pts", time: "1d ago", read: true },
];
export default function NotificationsPage() {
    const [notifs, setNotifs] = useState(NOTIFS);
    const markAll = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));
    return (
        <div className="luxury-page"><div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}><div className="luxury-container"><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}><div><p className="luxury-overline" style={{ marginBottom: 12 }}>Inbox</p><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}><Bell size={22} style={{ display: "inline", marginRight: 8, color: "#C9A353" }} /><em className="gold-shimmer-text">Notifications</em></h1></div><button className="btn-secondary" onClick={markAll} style={{ fontSize: 11 }}><Check size={12} /> Mark All Read</button></div></div></div>
            <div className="luxury-container" style={{ maxWidth: 700, paddingTop: 40, paddingBottom: 80 }}>
                {notifs.map((n, i) => (<div key={i} className="luxury-card" style={{ padding: 16, marginBottom: 8, display: "flex", alignItems: "center", gap: 14, opacity: n.read ? 0.5 : 1, borderLeftWidth: n.read ? 1 : 3, borderLeftColor: n.read ? "rgba(13,13,13,.06)" : "#C9A353" }}><div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(201,163,83,.06)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A353", flexShrink: 0 }}>{n.icon}</div><div style={{ flex: 1 }}><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--ink)", lineHeight: 1.5 }}>{n.msg}</p></div><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "rgba(13,13,13,.25)", whiteSpace: "nowrap" }}>{n.time}</span></div>))}
            </div></div>
    );
}
