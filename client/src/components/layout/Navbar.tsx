"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForgeButton } from "@/components/forge";
import { useCollabRiseStore } from "@/store/store";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconBell, IconTerminal, IconChevronDown, IconMenu, IconClose, IconSettings, IconHelp, IconChat } from "@/components/icons";
import { apiFetch } from "@/lib/api";

const NAV_ITEMS = [
    {
        label: "Explore",
        href: "/feed",
        children: [
            { label: "Venture Feed", href: "/feed", desc: "Browse active ventures" },
            { label: "Search", href: "/search", desc: "Find ventures, founders, partners" },
            { label: "Market Pulse", href: "/pulse", desc: "Real-time ecosystem activity" },
            { label: "Leaderboard", href: "/leaderboard", desc: "Hall of Fame rankings" },
        ],
    },
    {
        label: "Launch",
        href: "/project/new",
        children: [
            { label: "New Venture", href: "/project/new", desc: "Create a new venture" },
            { label: "Recruit Co-founders", href: "/project/recruit", desc: "AI-matched founders" },
            { label: "Blueprints", href: "/templates/code-lab", desc: "Pre-built venture blueprints" },
            { label: "Ship Log", href: "/ship-log/studio", desc: "Your venture portfolio" },
        ],
    },
    {
        label: "Guilds",
        href: "/guilds",
        children: [
            { label: "Guild Directory", href: "/guilds", desc: "Browse all venture guilds" },
            { label: "Find a Co-founder", href: "/matchmaker", desc: "AI-powered founder matching" },
            { label: "Mentorship", href: "/mentorship", desc: "Connect with industry leaders" },
            { label: "Your Guilds", href: "/guilds", desc: "Guilds you lead or belong to" },
        ],
    },
    {
        label: "Exchange",
        href: "/bounties",
        children: [
            { label: "Strategic Bounties", href: "/bounties", desc: "Outcome-based challenge market" },
            { label: "Opportunity Board", href: "/jobs", desc: "Strategic board for founders" },
            { label: "Settlements", href: "/escrow", desc: "Manage verified transactions" },
            { label: "Payouts", href: "/payouts", desc: "Revenue & distribution hub" },
        ],
    },
];

/* Routes that temporarily get simplified navigation (if any) */
const MINIMAL_ROUTES = ["/onboard", "/waitlist"];

function isMinimalRoute(pathname: string | null) {
    if (!pathname) return false;
    return MINIMAL_ROUTES.some(r => pathname === r || pathname.startsWith(r + "/"));
}

export default function Navbar() {
    const pathname = usePathname();
    const user = useCollabRiseStore((state) => state.user);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setOpenMenu(null);
        setMobileOpen(false);
    }, [pathname]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const isMinimalNav = isMinimalRoute(pathname);
    if (isMinimalNav) return null;

    const handleMouseEnter = (label: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpenMenu(label);
    };
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setOpenMenu(null), 200);
    };

    /* ── Unified Navbar — The Forge Reborn ─── */
    return (
        <>
            <nav
                className="fixed left-0 right-0 z-50 transition-all duration-500 flex justify-center top-4 px-4"
            >
                <div className="w-full flex items-center justify-between transition-all duration-500 max-w-6xl bg-white/80 backdrop-blur-2xl border border-royal-gold/20 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full py-3 px-8">
                    {/* Logo & Left Links */}
                    <div className="flex items-center gap-10">
                        <Link
                            href="/"
                            className="font-serif text-[1.25rem] font-bold tracking-[0.14em] relative group flex items-center"
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-ink via-ink to-ink group-hover:from-royal-gold group-hover:to-saffron transition-all duration-500">
                                COLLABRISE
                            </span>
                        </Link>

                        <div className="hidden lg:flex items-center gap-1">
                            {NAV_ITEMS.map(item => (
                                <div
                                    key={item.label}
                                    className="relative"
                                    onMouseEnter={() => handleMouseEnter(item.label)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Link
                                        href={item.href}
                                        className={`px-4 py-2 text-[13px] tracking-wide font-sans font-medium transition-all duration-300 flex items-center gap-1.5 rounded-full ${pathname?.startsWith(item.href.split("/").slice(0, 2).join("/")) ? "text-royal-gold bg-royal-gold/[0.06]" : "text-smoke hover:text-royal-gold hover:bg-royal-gold/[0.03]"}`}
                                    >
                                        {item.label}
                                        <IconChevronDown className={`w-3 h-3 transition-transform duration-300 ${openMenu === item.label ? "rotate-180 opacity-100 text-royal-gold" : "opacity-50"}`} />
                                    </Link>

                                    <AnimatePresence>
                                        {openMenu === item.label && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                                className="absolute top-full left-0 mt-4 w-72 bg-white/95 backdrop-blur-2xl border border-royal-gold/10 rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] z-50"
                                                onMouseEnter={() => handleMouseEnter(item.label)}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                <div className="py-2">
                                                    {item.children.map(child => (
                                                        <Link
                                                            key={child.href + child.label}
                                                            href={child.href}
                                                            className="flex flex-col gap-0.5 px-6 py-3.5 hover:bg-gradient-to-r hover:from-royal-gold/[0.06] hover:to-transparent transition-all border-b border-ink/[0.03] last:border-0 group"
                                                        >
                                                            <span className="font-serif font-semibold text-[17px] tracking-wide text-ink group-hover:text-royal-gold transition-colors duration-300">
                                                                {child.label}
                                                            </span>
                                                            <span className="text-[12px] font-sans text-smoke/70 group-hover:text-smoke/90 transition-colors">
                                                                {child.desc}
                                                            </span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right CTAs / Auth State */}
                    <div className="flex items-center gap-3">
                        {user ? (
                            <div className="hidden sm:flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Link href="/notifications" className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors relative ${pathname === "/notifications" ? "border-royal-gold/30 bg-royal-gold/5 text-royal-gold" : "border-ink/10 text-smoke/70 hover:text-ink hover:border-ink/20"}`}>
                                        <IconBell className="w-4 h-4" />
                                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-saffron text-white text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
                                    </Link>
                                </div>

                                <div className="h-6 w-px bg-ink/10" />

                                <div className="flex items-center gap-3">
                                    <Link href="/dashboard" className="flex items-center gap-2 group">
                                        <div className="w-8 h-8 rounded-full border border-royal-gold/20 bg-champagne flex items-center justify-center font-sans font-semibold text-xs text-royal-gold group-hover:bg-royal-gold/10 transition-colors">
                                            {user.handle.substring(0, 2).toUpperCase()}
                                        </div>
                                        <span className="font-sans font-medium text-xs text-smoke group-hover:text-ink transition-colors">@{user.handle}</span>
                                    </Link>
                                    <button
                                        onClick={async () => {
                                            await apiFetch("/auth/logout", { method: "POST" });
                                            window.location.href = "/";
                                        }}
                                        className="font-sans text-[10px] uppercase tracking-wider font-semibold text-smoke/50 hover:text-red-500 transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="hidden lg:flex items-center gap-4">
                                <Link href="/auth/login" className="font-sans font-bold text-[11px] tracking-widest uppercase text-smoke hover:text-royal-gold transition-colors px-4 py-2">
                                    Sign In
                                </Link>
                                <Link href="/auth/create-account" className="relative group px-7 py-3 rounded-full overflow-hidden shadow-[0_4px_14px_0_rgba(197,160,89,0.39)] hover:shadow-[0_6px_20px_rgba(197,160,89,0.23)] hover:-translate-y-[1px] transition-all duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-r from-royal-gold to-saffron"></div>
                                    <span className="relative flex items-center gap-2 font-sans font-bold text-[11px] tracking-widest uppercase text-white">
                                        Launch Venture <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                    </span>
                                </Link>
                            </div>
                        )}

                        <button
                            aria-label="Open menu"
                            className="lg:hidden w-9 h-9 rounded-xl border border-ink/10 flex items-center justify-center text-smoke hover:bg-ink/5 transition-colors"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? <IconClose className="w-4 h-4" /> : <IconMenu className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile full-screen overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-white overflow-y-auto lg:hidden"
                    >
                        <div className="flex justify-end p-6">
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center text-smoke hover:text-ink transition-colors mt-2"
                            >
                                <IconClose className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="px-8 pb-12 space-y-8">
                            {NAV_ITEMS.map(item => (
                                <div key={item.label}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="font-serif text-3xl font-bold text-ink hover:text-royal-gold transition-colors block mb-3"
                                    >
                                        {item.label}
                                    </Link>
                                    <div className="space-y-2 pl-1">
                                        {item.children.map(child => (
                                            <Link
                                                key={child.href + child.label}
                                                href={child.href}
                                                onClick={() => setMobileOpen(false)}
                                                className="flex items-center gap-2 py-1.5 text-smoke hover:text-ink transition-colors text-sm font-sans"
                                            >
                                                <span className="text-royal-gold/60">→</span>
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="pt-6 border-t border-ink/10 flex flex-col gap-3">
                                {user ? (
                                    <>
                                        <Link href="/dashboard" className="btn-outline text-center" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                                        <button
                                            onClick={async () => {
                                                await apiFetch("/auth/logout", { method: "POST" });
                                                window.location.href = "/";
                                            }}
                                            className="btn-ghost-dark text-center"
                                        >
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/auth/login" className="btn-outline text-center" onClick={() => setMobileOpen(false)}>Sign In</Link>
                                        <Link href="/auth/create-account" className="btn-saffron text-center" onClick={() => setMobileOpen(false)}>Launch Venture →</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
