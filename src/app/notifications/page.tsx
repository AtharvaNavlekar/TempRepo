"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BentoCard, ForgeButton, GlitchText, PulseTag, ShipScoreCounter } from "@/components/forge";
import Link from "next/link";
import { useState } from "react";
import { IconInbox } from "@/components/icons";

const TABS = ["INBOX", "SYSTEM", "MENTIONS", "DISPUTES", "BOUNTIES"];

const ALL_NOTIFICATIONS = [
    { id: 1, type: "SHIPPED", tab: "INBOX", message: "Your project 'Auth SDK v3' was verified and scored.", time: "2m ago", read: false, status: "shipped" as const, scoreDelta: "+1,200", from: "System" },
    { id: 2, type: "DISPUTE", tab: "DISPUTES", message: "DevMarcus filed a dispute in CNC Controller project for insufficient test coverage.", time: "1h ago", read: false, status: "staked" as const, scoreDelta: "0", from: "DevMarcus" },
    { id: 3, type: "MENTION", tab: "MENTIONS", message: "0xAlice mentioned you in React Guild Forum: 'Great work on the state machine, @0xNeo!'", time: "3h ago", read: true, status: "live" as const, scoreDelta: "0", from: "0xAlice" },
    { id: 4, type: "BOUNTY", tab: "BOUNTIES", message: "New bounty matching your skills: 'Build IoT Dashboard' — $3,000 reward.", time: "5h ago", read: true, status: "building" as const, scoreDelta: "0", from: "MakerHQ" },
    { id: 5, type: "REVIEW", tab: "INBOX", message: "DesignSensei submitted a 5-star peer review for your Design System contribution.", time: "8h ago", read: true, status: "shipped" as const, scoreDelta: "+200", from: "DesignSensei" },
    { id: 6, type: "SYSTEM", tab: "SYSTEM", message: "Your Ship Score decayed by 1.2% due to inactivity. Log hours or ship to prevent further decay.", time: "1d ago", read: true, status: "staked" as const, scoreDelta: "-148", from: "System" },
    { id: 7, type: "SYSTEM", tab: "SYSTEM", message: "Weekly Score Snapshot: 12,400 PTS. You're ranked #1 globally.", time: "2d ago", read: true, status: "live" as const, scoreDelta: "0", from: "System" },
    { id: 8, type: "BOUNTY", tab: "BOUNTIES", message: "Your application for 'Audit Smart Contract' was shortlisted by ChainVault.", time: "2d ago", read: true, status: "building" as const, scoreDelta: "0", from: "ChainVault" },
    { id: 9, type: "MENTION", tab: "MENTIONS", message: "GuildMaster_Kai tagged you in a mentorship request.", time: "3d ago", read: true, status: "live" as const, scoreDelta: "0", from: "GuildMaster_Kai" },
    { id: 10, type: "SHIPPED", tab: "INBOX", message: "Cross-Chain Bridge milestone 2 is 100% complete. Escrow ready to release.", time: "3d ago", read: true, status: "shipped" as const, scoreDelta: "+340", from: "System" },
];

export default function NotificationsPage() {
    const [activeTab, setActiveTab] = useState("INBOX");
    const [notifications, setNotifications] = useState(ALL_NOTIFICATIONS);

    const filtered = notifications.filter(n => activeTab === "INBOX" ? true : n.tab === activeTab);
    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-4xl mx-auto px-6 py-32">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="font-clash font-bold text-5xl mb-2"><GlitchText text="NOTIFICATIONS" /></h1>
                            <p className="font-mono text-white/50">All activity across your ecosystem. {unreadCount > 0 && <span className="text-lime">{unreadCount} unread</span>}</p>
                        </div>
                        {unreadCount > 0 && <ForgeButton variant="ghost" size="sm" onClick={markAllRead}>MARK ALL READ</ForgeButton>}
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-8 overflow-x-auto">
                        {TABS.map(tab => {
                            const count = tab === "INBOX" ? notifications.filter(n => !n.read).length : notifications.filter(n => n.tab === tab && !n.read).length;
                            return (
                                <button key={tab} onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 font-mono text-xs uppercase tracking-widest rounded-bento-sm border transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === tab ? "bg-lime/10 border-lime/40 text-lime" : "border-white/10 text-white/40 hover:text-white"}`}>
                                    {tab}
                                    {count > 0 && <span className="w-5 h-5 bg-lime text-obsidian rounded-full text-[10px] font-bold flex items-center justify-center">{count}</span>}
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Notification List */}
                <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                        {filtered.map((n, i) => (
                            <motion.div key={n.id} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                                <BentoCard className={`p-5 flex items-center gap-4 cursor-pointer hover:border-lime/20 transition-all ${!n.read ? "border-lime/10 bg-lime/[0.02]" : ""}`}
                                    onClick={() => setNotifications(prev => prev.map(p => p.id === n.id ? { ...p, read: true } : p))}>
                                    {!n.read && <div className="w-2.5 h-2.5 bg-lime rounded-full animate-pulse flex-shrink-0" />}
                                    <PulseTag status={n.status} />
                                    <div className="flex-1 min-w-0">
                                        <p className={`font-mono text-sm ${n.read ? "text-white/50" : "text-white"} line-clamp-2`}>{n.message}</p>
                                        <p className="font-mono text-[10px] text-white/30 mt-1">from {n.from}</p>
                                    </div>
                                    <div className="flex-shrink-0 flex items-center gap-3">
                                        {n.scoreDelta !== "0" && <span className={`font-mono text-xs font-bold ${n.scoreDelta.startsWith("+") ? "text-lime" : "text-acid"}`}>{n.scoreDelta}</span>}
                                        <span className="font-mono text-xs text-white/30 whitespace-nowrap">{n.time}</span>
                                    </div>
                                </BentoCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {filtered.length === 0 && (
                    <div className="text-center py-20"><p className="text-4xl mb-4"><IconInbox className="w-5 h-5" /></p><p className="font-clash font-bold text-xl">No notifications in this tab</p></div>
                )}
            </main>
        </div>
    );
}
