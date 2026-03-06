"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconGitHub, IconDiscord, IconTwitter } from "@/components/icons";

const FOOTER_SECTIONS = [
    {
        title: "Protocol",
        links: [
            { label: "Discovery Feed", href: "/feed" },
            { label: "Ship Log", href: "/ship-log/studio" },
            { label: "War Rooms", href: "/project/new" },
            { label: "Guilds", href: "/guilds" },
            { label: "Global Pulse", href: "/pulse" },
            { label: "Leaderboard", href: "/leaderboard" },
        ],
    },
    {
        title: "Economy",
        links: [
            { label: "Bounties", href: "/bounties" },
            { label: "Job Board", href: "/jobs" },
            { label: "Escrow Portal", href: "/escrow" },
            { label: "Payouts", href: "/payouts" },
            { label: "Matchmaker", href: "/matchmaker" },
            { label: "Mentorship Hub", href: "/mentorship" },
        ],
    },
    {
        title: "Platform",
        links: [
            { label: "Settings", href: "/settings" },
            { label: "Developer API", href: "/developers" },
            { label: "Help Center", href: "/help" },
            { label: "Feedback", href: "/feedback" },
            { label: "Privacy", href: "/settings/privacy" },
            { label: "Integrations", href: "/settings/integrations" },
        ],
    },
    {
        title: "Identity",
        links: [
            { label: "Your Dashboard", href: "/dashboard" },
            { label: "Ship Log Editor", href: "/ship-log/studio" },
            { label: "DNA Cards", href: "/ship-log/dna/1" },
            { label: "Failure Vault", href: "/ship-log/failures" },
            { label: "Peer Reviews", href: "/ship-log/reviews" },
            { label: "Reputation", href: "/ship-log/reputation" },
        ],
    },
];

const SOCIAL_ICONS = [
    { label: "GitHub", href: "https://github.com", Icon: IconGitHub },
    { label: "Discord", href: "https://discord.com", Icon: IconDiscord },
    { label: "Twitter", href: "https://twitter.com", Icon: IconTwitter },
];

/* Routes where Footer should be hidden */
const HIDE_ON = ["/onboard", "/maintenance", "/offline"];

/* Routes that get the light-mode footer */
const LIGHT_ROUTES = ["/", "/company", "/developers", "/help", "/waitlist"];

export default function Footer() {
    const pathname = usePathname();

    if (HIDE_ON.some(p => pathname?.startsWith(p))) return null;

    const isLight = LIGHT_ROUTES.some(r => r === "/" ? pathname === "/" : pathname?.startsWith(r));

    if (isLight) {
        return (
            <footer
                className="border-t"
                style={{
                    background: "var(--bg-surface)",
                    borderColor: "var(--border-subtle)",
                }}
            >
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
                        {/* Brand column */}
                        <div className="col-span-2 md:col-span-1">
                            <Link href="/" className="font-serif text-xl font-medium text-[#131313] hover:opacity-70 transition-opacity">
                                CollabRise
                            </Link>
                            <p className="text-[12px] text-[#999] leading-relaxed mt-3 max-w-48">
                                The universal Proof-of-Work protocol. Ship real projects. Replace your resume.
                            </p>
                            <div className="flex gap-2 mt-5">
                                {SOCIAL_ICONS.map(s => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Visit CollabRise on ${s.label}`}
                                        className="w-8 h-8 rounded-lg bg-white border border-black/[0.07] flex items-center justify-center text-[#999] hover:text-[#131313] hover:border-black/20 transition-colors shadow-sm"
                                    >
                                        <s.Icon className="w-3.5 h-3.5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Nav columns */}
                        {FOOTER_SECTIONS.map(section => (
                            <div key={section.title}>
                                <h4 className="overline-label mb-4">{section.title}</h4>
                                <ul className="space-y-2.5">
                                    {section.links.map(link => (
                                        <li key={link.href + link.label}>
                                            <Link
                                                href={link.href}
                                                className="text-[13px] text-[#777] hover:text-[#131313] transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Bottom bar */}
                    <div
                        className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
                        style={{ borderColor: "var(--border-subtle)" }}
                    >
                        <p className="text-[11px] text-[#bbb] tracking-wide">
                            © 2026 CollabRise. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link href="/settings/privacy" className="text-[11px] text-[#bbb] hover:text-[#555] transition-colors">Privacy</Link>
                            <Link href="/help" className="text-[11px] text-[#bbb] hover:text-[#555] transition-colors">Terms</Link>
                            <Link href="/developers" className="text-[11px] text-[#bbb] hover:text-[#555] transition-colors">API</Link>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }

    /* Dark-mode footer — unchanged for authenticated routes */
    return (
        <footer className="border-t border-white/[0.06] bg-obsidian">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="font-clash font-bold text-xl text-lime">CollabRise</Link>
                        <p className="font-mono text-[11px] text-white/30 leading-relaxed mt-3 max-w-48">The universal Proof-of-Work protocol. Ship real projects. Replace your resume.</p>
                        <div className="flex gap-3 mt-4">
                            {SOCIAL_ICONS.map(s => (
                                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit CollabRise on ${s.label}`}
                                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-lime hover:border-lime/20 transition-colors">
                                    <s.Icon className="w-3.5 h-3.5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {FOOTER_SECTIONS.map(section => (
                        <div key={section.title}>
                            <h4 className="font-clash font-semibold text-xs text-white/50 uppercase tracking-wider mb-4">{section.title}</h4>
                            <ul className="space-y-2">
                                {section.links.map(link => (
                                    <li key={link.href + link.label}>
                                        <Link href={link.href} className="font-mono text-xs text-white/30 hover:text-lime transition-colors">{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-mono text-[10px] text-white/20 tracking-wider">© 2026 COLLABRISE PROTOCOL. SHIP OR DIE.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/settings/privacy" className="font-mono text-[10px] text-white/20 tracking-wider hover:text-lime transition-colors uppercase">Privacy</Link>
                        <Link href="/help" className="font-mono text-[10px] text-white/20 tracking-wider hover:text-lime transition-colors uppercase">Terms</Link>
                        <Link href="/developers" className="font-mono text-[10px] text-white/20 tracking-wider hover:text-lime transition-colors uppercase">API</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
