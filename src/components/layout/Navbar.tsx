"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForgeButton } from "@/components/forge";
import { ShipScoreCounter } from "@/components/forge";
import { useCollabRiseStore } from "@/store/store";

export default function Navbar() {
    const pathname = usePathname();
    const shipScore = useCollabRiseStore((state) => state.shipScore);

    // Don't show regular navbar on raw landing page or during deep onboarding
    const isMinimalNav = pathname === "/" || pathname?.startsWith("/onboard");

    if (isMinimalNav) return null;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/10 bg-obsidian/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link
                        href="/"
                        className="font-clash font-bold text-2xl tracking-tighter text-white hover:text-lime transition-colors duration-300"
                    >
                        COLLAB<span className="text-lime">RISE</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        <NavLink href="/feed" active={pathname?.startsWith("/feed")}>
                            DISCOVERY
                        </NavLink>
                        <NavLink href="/guilds" active={pathname?.startsWith("/guilds")}>
                            GUILDS
                        </NavLink>
                        <NavLink href="/bounties" active={pathname?.startsWith("/bounties")}>
                            MARKETPLACE
                        </NavLink>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden sm:block">
                        <ShipScoreCounter value={shipScore} size="sm" />
                    </div>

                    <div className="h-8 w-px bg-white/10 hidden sm:block"></div>

                    {pathname?.startsWith("/auth") ? (
                        <Link href="/auth/login">
                            <ForgeButton size="sm" variant="ghost">JOIN THE FORGE</ForgeButton>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/dashboard">
                                <div className="w-10 h-10 rounded-bento-sm bg-obsidian border border-white/10 flex items-center justify-center hover:border-lime transition-colors cursor-pointer group overflow-hidden relative">
                                    <div className="absolute inset-0 bg-lime/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                                    <span className="font-mono font-bold text-sm text-white relative z-10">UR</span>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

function NavLink({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className={`font-mono text-xs font-bold tracking-widest relative px-2 py-1 transition-colors duration-300 ${active ? "text-white" : "text-white/50 hover:text-white"
                }`}
        >
            {children}
            {active && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-lime transform origin-left transition-transform duration-300 ease-out" />
            )}
        </Link>
    );
}
