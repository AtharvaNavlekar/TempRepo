"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForgeButton } from "@/components/forge";
import { ShipScoreCounter } from "@/components/forge";
import { useCollabRiseStore } from "@/store/store";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconBell, IconTerminal, IconChevronDown, IconMenu, IconClose, IconSettings, IconHelp, IconChat } from "@/components/icons";
import { apiFetch } from "@/lib/api";

const NAV_ITEMS = [
    {
        label: "Discover",
        href: "/feed",
        children: [
            { label: "Feed", href: "/feed", desc: "Browse active projects" },
            { label: "Search", href: "/search", desc: "Find projects, builders, freelance work" },
            { label: "Activity Pulse", href: "/pulse", desc: "Real-time ecosystem activity" },
            { label: "Leaderboard", href: "/leaderboard", desc: "Hall of Fame rankings" },
        ],
    },
    {
        label: "Build",
        href: "/project/new",
        children: [
            { label: "New Project", href: "/project/new", desc: "Create a new project" },
            { label: "Recruit Team", href: "/project/recruit", desc: "AI-matched builders" },
            { label: "Templates", href: "/templates/code-lab", desc: "Pre-built project blueprints" },
            { label: "My Portfolio", href: "/ship-log/studio", desc: "Your builder portfolio" },
        ],
    },
    {
        label: "Communities",
        href: "/guilds",
        children: [
            { label: "Community Directory", href: "/guilds", desc: "Browse all communities" },
            { label: "Find a Partner", href: "/matchmaker", desc: "Pair-Builder AI matching" },
            { label: "Mentorship Hub", href: "/mentorship", desc: "Connect with mentors" },
            { label: "Your Communities", href: "/guilds", desc: "Communities you belong to" },
        ],
    },
    {
        label: "Work",
        href: "/bounties",
        children: [
            { label: "Freelance Work", href: "/bounties", desc: "Paid challenge marketplace" },
            { label: "Job Board", href: "/jobs", desc: "Reverse job board for builders" },
            { label: "Payments", href: "/escrow", desc: "Manage verified payments" },
            { label: "Payouts", href: "/payouts", desc: "Invoice & payout dashboard" },
        ],
    },
];

/* Routes that get the public light-mode navbar */
const PUBLIC_ROUTES = ["/", "/company", "/developers", "/help", "/waitlist"];

function isPublicRoute(pathname: string | null) {
    if (!pathname) return false;
    return PUBLIC_ROUTES.some(r => r === "/" ? pathname === "/" : pathname.startsWith(r));
}

export default function Navbar() {
    const pathname = usePathname();
    const shipScore = useCollabRiseStore((state) => state.shipScore);
    const user = useCollabRiseStore((state) => state.user);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const isLight = isPublicRoute(pathname);

    useEffect(() => {
        setOpenMenu(null);
        setMobileOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!isLight) return;
        const onScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [isLight]);

    const isMinimalNav = pathname?.startsWith("/onboard");
    if (isMinimalNav) return null;

    const handleMouseEnter = (label: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpenMenu(label);
    };
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setOpenMenu(null), 200);
    };

    /* ── Light-mode Navbar (public pages) ─────────────────────────── */
    if (isLight) {
        const navBg = scrolled
            ? "bg-[#F5F5F2]/95 border-b border-black/[0.06] shadow-sm backdrop-blur-xl"
            : "bg-transparent border-b border-transparent";

        return (
            <>
                <nav
                    className={`fixed top-[var(--banner-h,0px)] left-0 right-0 z-50 h-16 transition-all duration-400 ${navBg}`}
                    style={{ "--banner-h": "0px" } as React.CSSProperties}
                >
                    <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="font-serif text-xl font-medium text-[#131313] tracking-tight hover:opacity-70 transition-opacity"
                        >
                            CollabRise
                        </Link>

                        {/* Center nav links */}
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
                                        className="px-4 py-2 text-[13.5px] font-medium text-[#555555] hover:text-[#131313] transition-colors flex items-center gap-1 rounded-lg"
                                    >
                                        {item.label}
                                        <IconChevronDown className="w-3 h-3 opacity-50" />
                                    </Link>

                                    <AnimatePresence>
                                        {openMenu === item.label && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute top-full left-0 mt-2 w-64 bg-[#F5F5F2]/98 backdrop-blur-xl border border-black/[0.07] rounded-xl overflow-hidden shadow-hover z-50"
                                                onMouseEnter={() => handleMouseEnter(item.label)}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                {item.children.map(child => (
                                                    <Link
                                                        key={child.href + child.label}
                                                        href={child.href}
                                                        className="flex flex-col gap-0.5 px-4 py-3 hover:bg-black/[0.04] transition-colors border-b border-black/[0.05] last:border-0 group"
                                                    >
                                                        <span className="font-medium text-[13px] text-[#131313] group-hover:text-[#131313]">
                                                            {child.label}
                                                        </span>
                                                        <span className="text-[11px] text-[#999]">{child.desc}</span>
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        {/* Right CTAs */}
                        <div className="flex items-center gap-2">
                            <div className="hidden lg:flex items-center gap-2">
                                <Link href="/auth/login" className="btn-pill-secondary text-[13.5px] py-2 px-5">
                                    Sign In
                                </Link>
                                <Link href="/auth/create-account" className="btn-pill-primary text-[13.5px] py-2 px-5">
                                    Get Started
                                </Link>
                            </div>
                            <button
                                aria-label="Open menu"
                                className="lg:hidden w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-[#555] hover:bg-black/5 transition-colors"
                                onClick={() => setMobileOpen(!mobileOpen)}
                            >
                                {mobileOpen ? <IconClose className="w-4 h-4" /> : <IconMenu className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Mobile drawer */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="fixed inset-0 top-16 z-40 bg-[#F5F5F2]/98 backdrop-blur-xl overflow-y-auto lg:hidden"
                        >
                            <div className="p-6 space-y-6">
                                {NAV_ITEMS.map(item => (
                                    <div key={item.label}>
                                        <p className="text-[11px] font-medium text-[#999] uppercase tracking-widest mb-3">
                                            {item.label}
                                        </p>
                                        <div className="space-y-1">
                                            {item.children.map(child => (
                                                <Link
                                                    key={child.href + child.label}
                                                    href={child.href}
                                                    onClick={() => setMobileOpen(false)}
                                                    className="flex justify-between items-center p-3 rounded-xl hover:bg-black/[0.04] transition-colors"
                                                >
                                                    <div>
                                                        <p className="font-medium text-sm text-[#131313]">{child.label}</p>
                                                        <p className="text-[11px] text-[#999]">{child.desc}</p>
                                                    </div>
                                                    <span className="text-[#999]">→</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <div className="pt-6 border-t border-black/[0.07] flex flex-col gap-2">
                                    <Link href="/auth/login" className="btn-pill-secondary text-center">Sign In</Link>
                                    <Link href="/auth/create-account" className="btn-pill-primary text-center">Get Started</Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </>
        );
    }

    /* ── Dark-mode Navbar (authenticated app pages) — unchanged ────── */
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
                                        {item.label.toUpperCase()}
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
                            {user ? (
                                <div className="flex items-center gap-3">
                                    <Link href="/dashboard" className="flex items-center gap-2 group">
                                        <div className="w-8 h-8 rounded-full border border-white/20 bg-cyber/20 flex items-center justify-center font-mono text-xs text-lime group-hover:bg-lime/20 transition-colors">
                                            {user.handle.substring(0, 2).toUpperCase()}
                                        </div>
                                        <span className="font-mono text-xs text-white/70 group-hover:text-white transition-colors">@{user.handle}</span>
                                    </Link>
                                    <button
                                        onClick={async () => {
                                            await apiFetch("/auth/logout", { method: "POST" });
                                            window.location.href = "/";
                                        }}
                                        className="font-mono text-[10px] uppercase text-white/40 hover:text-red-400 transition-colors"
                                    >
                                        Drop Out
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link href="/auth/login" className="font-clash font-semibold text-sm text-white/70 hover:text-white transition-colors">
                                        Sign In
                                    </Link>
                                    <Link href="/auth/create-account">
                                        <ForgeButton variant="primary" size="sm">Get Started</ForgeButton>
                                    </Link>
                                </>
                            )}
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
                                                <div>
                                                    <p className="font-clash font-semibold text-sm">{child.label}</p>
                                                    <p className="font-mono text-[10px] text-white/30">{child.desc}</p>
                                                </div>
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
