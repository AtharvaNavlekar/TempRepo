"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const FOOTER_SECTIONS = [
    {
        title: "Product",
        links: [
            { label: "Venture Feed", href: "/feed" },
            { label: "Ship Log", href: "/ship-log/studio" },
            { label: "Ventures", href: "/project/new" },
            { label: "Guilds", href: "/guilds" },
            { label: "Market Pulse", href: "/pulse" },
            { label: "Leaderboard", href: "/leaderboard" },
        ],
    },
    {
        title: "Community",
        links: [
            { label: "Matchmaker", href: "/matchmaker" },
            { label: "Mentorship Hub", href: "/mentorship" },
            { label: "Bounties", href: "/bounties" },
            { label: "Opportunity Board", href: "/jobs" },
            { label: "Feedback", href: "/feedback" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Privacy Policy", href: "/settings/privacy" },
            { label: "Terms of Service", href: "/help" },
            { label: "Developer API", href: "/developers" },
            { label: "Help Center", href: "/help" },
        ],
    },
];

/* Routes where Footer should be hidden */
const HIDE_ON = ["/onboard", "/maintenance", "/offline"];

export default function Footer() {
    const pathname = usePathname();

    if (HIDE_ON.some(p => pathname?.startsWith(p))) return null;

    return (
        <footer className="bg-parchment relative mt-auto">
            {/* Gold top border gradient */}
            <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(201,147,58,0.2), transparent)" }} />
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand column */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="font-serif text-[1.15rem] font-bold text-ink tracking-[0.12em] hover:text-royal-gold transition-colors duration-300">
                            COLLABRISE
                        </Link>
                        <p className="font-serif italic text-sm text-smoke leading-relaxed mt-4 max-w-52">
                            Proof of Work.<br />Proof of You.
                        </p>
                        {/* Social icons */}
                        <div className="flex gap-3 mt-6">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X" className="w-8 h-8 rounded-full border border-ink/10 flex items-center justify-center text-smoke hover:text-royal-gold hover:border-royal-gold/30 transition-all duration-300">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 rounded-full border border-ink/10 flex items-center justify-center text-smoke hover:text-royal-gold hover:border-royal-gold/30 transition-all duration-300">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-8 h-8 rounded-full border border-ink/10 flex items-center justify-center text-smoke hover:text-royal-gold hover:border-royal-gold/30 transition-all duration-300">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Nav columns */}
                    {FOOTER_SECTIONS.map(section => (
                        <div key={section.title}>
                            <h4 className="font-sans text-xs font-semibold text-smoke uppercase tracking-wider mb-4">{section.title}</h4>
                            <ul className="space-y-2.5">
                                {section.links.map(link => (
                                    <li key={link.href + link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-[13px] font-sans text-smoke/80 hover:text-saffron transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Copyright bar */}
                <div className="mt-12 pt-8 border-t border-ink/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <p className="text-[11px] text-smoke tracking-wide text-center sm:text-left">
                            © 2026 CollabRise Protocol. All rights reserved.
                        </p>
                        <p className="text-[11px] text-smoke/60 mt-0.5 text-center sm:text-left">
                            Built for entrepreneurs. Not for the faint of heart.
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/settings/privacy" className="text-[11px] text-smoke hover:text-saffron transition-colors">Privacy</Link>
                        <Link href="/help" className="text-[11px] text-smoke hover:text-saffron transition-colors">Terms</Link>
                        <Link href="/developers" className="text-[11px] text-smoke hover:text-saffron transition-colors">API</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
