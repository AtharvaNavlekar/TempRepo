"use client";
import { BentoCard, ForgeButton } from "@/components/forge";
import Link from "next/link";
const SECTIONS = [
    { title: "Privacy Controls", description: "Manage who can see your Ship Log and profile data.", href: "/settings/privacy", icon: "IconLock" },
    { title: "Connected Apps", description: "Manage GitHub, Figma, Stripe, and other integrations.", href: "/settings/integrations", icon: "IconLink" },
    { title: "Data Export", description: "Download all your data in JSON, CSV, or PDF format.", href: "/settings/export", icon: "IconPackage" },
];

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-4xl mx-auto px-6 py-32">
                <h1 className="font-clash font-bold text-5xl mb-2">Settings</h1>
                <p className="font-mono text-white/50 mb-12">Configure your CollabRise experience.</p>

                <BentoCard className="p-8 mb-8">
                    <h3 className="font-clash font-semibold text-xl mb-6">Profile</h3>
                    <div className="space-y-4">
                        <div><label className="font-mono text-xs text-white/50 uppercase tracking-widest mb-2 block">Display Name</label><input defaultValue="0xNeo" className="w-full bg-black/60 border border-white/10 rounded-bento-sm p-3 font-mono text-white focus:border-lime outline-none" /></div>
                        <div><label className="font-mono text-xs text-white/50 uppercase tracking-widest mb-2 block">Bio</label><textarea defaultValue="Full-stack architect. Shipping since 2020." className="w-full h-20 bg-black/60 border border-white/10 rounded-bento-sm p-3 font-mono text-white focus:border-lime outline-none resize-none" /></div>
                        <div><label className="font-mono text-xs text-white/50 uppercase tracking-widest mb-2 block">Primary Guild</label><select className="w-full bg-black/60 border border-white/10 rounded-bento-sm p-3 font-mono text-white focus:border-lime outline-none"><option>React Guild</option><option>Rust Guild</option><option>Design Guild</option></select></div>
                    </div>
                    <div className="mt-6 text-right"><ForgeButton variant="primary" size="sm">SAVE CHANGES</ForgeButton></div>
                </BentoCard>

                <div className="space-y-3">
                    {SECTIONS.map(s => (
                        <Link key={s.href} href={s.href}>
                            <BentoCard className="p-6 flex items-center gap-4 hover:border-lime/30 cursor-pointer group mb-3">
                                <span className="text-2xl">{s.icon}</span>
                                <div><h3 className="font-clash font-bold text-lg group-hover:text-lime transition-colors">{s.title}</h3><p className="font-mono text-xs text-white/40">{s.description}</p></div>
                            </BentoCard>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
