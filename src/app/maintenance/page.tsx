"use client";
import Link from "next/link";
import { IconWrench } from "@/components/icons";

export default function MaintenancePage() {
    return (
        <div className="min-h-screen bg-obsidian flex items-center justify-center text-white font-sans">
            <div className="text-center"><div className="text-6xl mb-6"><IconWrench className="w-5 h-5" /></div><h1 className="font-clash font-bold text-4xl mb-4">FORGING IN PROGRESS</h1><p className="font-mono text-sm text-white/40 max-w-md mx-auto mb-8">We&apos;re upgrading the ecosystem. Expected downtime: 30 minutes.</p><div className="w-48 h-2 bg-white/10 rounded-full mx-auto overflow-hidden"><div className="w-2/3 h-full bg-lime rounded-full animate-pulse" /></div><p className="font-mono text-xs text-white/30 mt-4">67% complete</p></div>
        </div>
    );
}
