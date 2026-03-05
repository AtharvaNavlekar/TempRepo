"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForgeButton } from "@/components/forge";
import { ShipScoreCounter } from "@/components/forge";
import { useCollabRiseStore } from "@/store/store";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconBell, IconTerminal, IconChevronDown, IconMenu, IconClose, IconSettings, IconHelp, IconChat } from "@/components/icons";

const NAV_ITEMS = [
    {
        label: "DISCOVER",
        href: "/feed",
        children: [
            { label: "Feed", href: "/feed", desc: "Browse active projects" },
            { label: "Search", href: "/search", desc: "Find projects, builders, freelance work" },
            { label: "Activity Pulse", href: "/pulse", desc: "Real-time ecosystem activity" },
            { label: "Leaderboard", href: "/leaderboard", desc: "Hall of Fame rankings" },
        ],
    },
    {
        label: "BUILD",
        href: "/project/new",
        children: [
            { label: "New Project", href: "/project/new", desc: "Create a new project" },
            { label: "Recruit Team", href: "/project/recruit", desc: "AI-matched builders" },
            { label: "Templates", href: "/templates/code-lab", desc: "Pre-built project blueprints" },
            { label: "My Portfolio", href: "/ship-log/studio", desc: "Your builder portfolio" },
        ],
    },
    {
        label: "COMMUNITIES",
        href: "/guilds",
        children: [
            { label: "Community Directory", href: "/guilds", desc: "Browse all communities" },
            { label: "Find a Partner", href: "/matchmaker", desc: "Pair-Builder AI matching" },
            { label: "Mentorship Hub", href: "/mentorship", desc: "Connect with mentors" },
            { label: "Your Communities", href: "/guilds", desc: "Communities you belong to" },
        ],
    },
    {
        label: "WORK",
        href: "/bounties",
        children: [
            { label: "Freelance Work", href: "/bounties", desc: "Paid challenge marketplace" },
            { label: "Job Board", href: "/jobs", desc: "Reverse job board for builders" },
            { label: "Payments", href: "/escrow", desc: "Manage verified payments" },
            { label: "Payouts", href: "/payouts", desc: "Invoice & payout dashboard" },
        ],
    },
];

export default function Navbar() {
    const pathname = usePathname();
    const shipScore = useCollabRiseStore((state) => state.shipScore);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setOpenMenu(null);
        setMobileOpen(false);
    }, [pathname]);

    const isMinimalNav = pathname?.startsWith("/onboard");
    if (isMinimalNav) return null;

    const handleMouseEnter = (label: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpenMenu(label);
    };
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setOpenMenu(null), 200);
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 bg-obsidian/90 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="font-clash font-bold text-xl tracking-tighter text-white hover:text-lime transition-colors">
                            COLLAB<span className="text-lime">RISE</span>
                        </Link>

                        <div className="hidden lg:flex items-center gap-1">
                            {NAV_ITEMS.map(item => (
                                <div key={item.label} className="relative" onMouseEnter={() => handleMouseEnter(item.label)} onMouseLeave={handleMouseLeave}>
                                    <Link href={item.href}
                                        className={`px-3 py-2 font-mono text-[11px] font-bold tracking-widest transition-colors rounded-lg flex items-center gap-1 ${pathname?.startsWith(item.href.split("/").slice(0, 2).join("/")) ? "text-lime bg-lime/5" : "text-white/50 hover:text-white hover:bg-white/5"}`}>
                                        {item.label}
                                        <IconChevronDown className="w-3 h-3 opacity-40" />
                                    </Link>

                                    <AnimatePresence>
                                        {openMenu === item.label && (
                                            <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.97 }} transition={{ duration: 0.15 }}
                                                className="absolute top-full left-0 mt-1 w-64 bg-obsidian/95 backdrop-blur-xl border border-white/10 rounded-bento-sm overflow-hidden shadow-2xl z-50"
                                                onMouseEnter={() => handleMouseEnter(item.label)} onMouseLeave={handleMouseLeave}>
                                                {item.children.map(child => (
                                                    <Link key={child.href + child.label} href={child.href}
                                                        className="flex flex-col gap-0.5 px-4 py-3 hover:bg-lime/5 transition-colors border-b border-white/5 last:border-0 group">
                                                        <span className="font-clash font-semibold text-sm group-hover:text-lime transition-colors">{child.label}</span>
                                                        <span className="font-mono text-[10px] text-white/30">{child.desc}</span>
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block">
                            <ShipScoreCounter value={shipScore} size="sm" />
                        </div>

                        <div className="hidden sm:flex items-center gap-2">
                            <Link href="/notifications" className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-colors relative ${pathname === "/notifications" ? "border-lime/30 bg-lime/5 text-lime" : "border-white/10 text-white/40 hover:text-white hover:border-white/20"}`}>
                                <IconBell className="w-4 h-4" />
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-acid text-obsidian text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
                            </Link>
                            <Link href="/terminal" className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-colors ${pathname === "/terminal" ? "border-lime/30 bg-lime/5 text-lime" : "border-white/10 text-white/40 hover:text-white hover:border-white/20"}`}>
                                <IconTerminal className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="h-6 w-px bg-white/10 hidden sm:block" />

                        <div className="hidden sm:flex items-center gap-3">
                            <Link href="/auth/login" className="font-clash font-semibold text-sm text-white/70 hover:text-white transition-colors">
                                Sign In
                            </Link>
                            <Link href="/onboard/identity">
                                <ForgeButton variant="primary" size="sm">
                                    Get Started
                                </ForgeButton>
                            </Link>
                        </div>

                        <button className="lg:hidden w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
                            {mobileOpen ? <IconClose className="w-4 h-4" /> : <IconMenu className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="fixed inset-0 top-16 z-40 bg-obsidian/98 backdrop-blur-xl overflow-y-auto lg:hidden">
                        <div className="p-6 space-y-6">
                            {NAV_ITEMS.map(item => (
                                <div key={item.label}>
                                    <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-3">{item.label}</p>
                                    <div className="space-y-1">
                                        {item.children.map(child => (
                                            <Link key={child.href + child.label} href={child.href} onClick={() => setMobileOpen(false)}
                                                className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 transition-colors">
                                                <div><p className="font-clash font-semibold text-sm">{child.label}</p><p className="font-mono text-[10px] text-white/30">{child.desc}</p></div>
                                                <span className="text-white/20">→</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="pt-6 border-t border-white/10 space-y-2">
                                <Link href="/settings" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 font-clash font-semibold text-sm"><IconSettings className="w-4 h-4 text-white/40" /> Settings</Link>
                                <Link href="/help" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 font-clash font-semibold text-sm"><IconHelp className="w-4 h-4 text-white/40" /> Help Center</Link>
                                <Link href="/feedback" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 font-clash font-semibold text-sm"><IconChat className="w-4 h-4 text-white/40" /> Feedback</Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
