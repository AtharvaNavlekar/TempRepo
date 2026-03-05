"use client";

import { motion } from "framer-motion";
import { BentoCard, ForgeButton, GlitchText, PulseTag } from "@/components/forge";
import Link from "next/link";
const ADMIN_NAV = [
    { label: "Moderation", href: "/admin/moderation", icon: "IconShield", desc: "Flagged users & ban queue", count: 3, color: "text-acid" },
    { label: "Verification", href: "/admin/verification", icon: "IconSuccess", desc: "Manual oracle verification", count: 7, color: "text-yellow-400" },
    { label: "Finance", href: "/admin/finance", icon: "IconHire", desc: "Escrow & revenue tracking", count: 0, color: "text-lime" },
    { label: "Disputes", href: "/admin/disputes", icon: "IconScale", desc: "Court of Builders escalations", count: 2, color: "text-acid" },
    { label: "Content", href: "/admin/content", icon: "IconClipboard", desc: "Guild & content management", count: 0, color: "text-cyber" },
    { label: "Analytics", href: "/admin/analytics/overview", icon: "IconChart", desc: "Ecosystem-wide analytics", count: 0, color: "text-lime" },
];

const RECENT_ACTIONS = [
    { admin: "Admin_01", action: "Banned user ShadowDev42 for plagiarism", time: "2h ago" },
    { admin: "Admin_02", action: "Verified CodeRunner99's GitHub profile", time: "5h ago" },
    { admin: "Admin_01", action: "Released $2,500 escrow to 0xNeo", time: "8h ago" },
    { admin: "Admin_03", action: "Resolved dispute in CNC Controller (guilty)", time: "1d ago" },
    { admin: "Admin_01", action: "Featured React Guild on homepage", time: "1d ago" },
];

const ALERTS = [
    { level: "CRITICAL", message: "3 users flagged for possible plagiarism — awaiting review", icon: "IconCritical" },
    { level: "WARNING", message: "Escrow dispute between FoodForge and ChefMika unresolved for 5 days", icon: "IconWarning" },
    { level: "INFO", message: "Weekly ecosystem report generated — download available", icon: "IconInfo" },
];

const ALERT_COLORS: Record<string, string> = { CRITICAL: "border-acid/30 bg-acid/5", WARNING: "border-yellow-400/30 bg-yellow-400/5", INFO: "border-cyber/30 bg-cyber/5" };

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-7xl mx-auto px-6 py-32">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center gap-4 mb-4">
                        <h1 className="font-clash font-bold text-6xl"><GlitchText text="GOD VIEW" /></h1>
                        <PulseTag status="live" label="ADMIN" />
                    </div>
                    <p className="font-mono text-white/50 mb-12">Global Ship Score Monitor. Full ecosystem visibility. Handle with care.</p>
                </motion.div>

                {/* Top Stats */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
                    {[
                        { label: "GLOBAL SCORE", value: "2.8M", color: "text-lime" },
                        { label: "BUILDERS", value: "14,200", color: "text-cyber" },
                        { label: "SHIPS", value: "89,700", color: "text-lime" },
                        { label: "ACTIVE ROOMS", value: "2,847", color: "text-cyber" },
                        { label: "DISPUTES", value: "12", color: "text-acid" },
                        { label: "REVENUE 30D", value: "$42K", color: "text-yellow-400" },
                    ].map(s => (
                        <BentoCard key={s.label} className="p-4 text-center"><p className={`font-clash font-bold text-xl ${s.color}`}>{s.value}</p><p className="font-mono text-[9px] text-white/30 mt-1">{s.label}</p></BentoCard>
                    ))}
                </motion.div>

                {/* Alerts */}
                <div className="space-y-2 mb-8">
                    {ALERTS.map(a => (
                        <BentoCard key={a.message} className={`p-4 flex items-center gap-4 ${ALERT_COLORS[a.level]}`}>
                            <span className="text-xl">{a.icon}</span>
                            <div className="flex-1"><span className={`font-mono text-xs font-bold ${a.level === "CRITICAL" ? "text-acid" : a.level === "WARNING" ? "text-yellow-400" : "text-cyber"}`}>{a.level}</span><p className="font-mono text-sm text-white/60 mt-0.5">{a.message}</p></div>
                            <ForgeButton variant="ghost" size="sm">VIEW</ForgeButton>
                        </BentoCard>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Admin Modules */}
                    <div className="lg:col-span-2">
                        <h3 className="font-clash font-semibold text-xl mb-4">Admin Modules</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {ADMIN_NAV.map((n, i) => (
                                <motion.div key={n.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                                    <Link href={n.href}>
                                        <BentoCard className="p-6 hover:border-lime/30 cursor-pointer group text-center h-full transition-all">
                                            <div className="relative inline-block">
                                                <span className="text-3xl">{n.icon}</span>
                                                {n.count > 0 && <span className="absolute -top-1 -right-3 w-5 h-5 bg-acid text-obsidian rounded-full text-[10px] font-bold flex items-center justify-center">{n.count}</span>}
                                            </div>
                                            <h4 className="font-clash font-bold text-base mt-3 group-hover:text-lime transition-colors">{n.label}</h4>
                                            <p className="font-mono text-[10px] text-white/30 mt-1">{n.desc}</p>
                                        </BentoCard>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Admin Actions */}
                    <div>
                        <h3 className="font-clash font-semibold text-xl mb-4">Recent Actions</h3>
                        <BentoCard className="p-6">
                            <div className="space-y-3">
                                {RECENT_ACTIONS.map((a, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                                        className="p-3 bg-white/[0.03] rounded-bento-sm">
                                        <p className="font-mono text-xs text-white/60">{a.action}</p>
                                        <p className="font-mono text-[10px] text-white/30 mt-1">{a.admin} · {a.time}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </BentoCard>
                    </div>
                </div>
            </main>
        </div>
    );
}
