"use client";
import { BentoCard, ForgeButton, GlitchText, PulseTag } from "@/components/forge";
import { IconStar } from "@/components/icons";
import Link from "next/link";

export default function CompanyProfilePage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-5xl mx-auto px-6 py-32">
                <div className="flex items-center justify-between mb-8">
                    <div><h1 className="font-clash font-bold text-5xl mb-2"><GlitchText text="NEONLABS" /></h1><p className="font-mono text-white/50">Building the future of decentralized infrastructure.</p></div>
                    <PulseTag status="live" label="HIRING" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <BentoCard className="p-5 text-center"><p className="font-clash font-bold text-2xl text-lime">47</p><p className="font-mono text-[10px] text-white/30">EMPLOYEES</p></BentoCard>
                    <BentoCard className="p-5 text-center"><p className="font-clash font-bold text-2xl text-cyber">$2.1M</p><p className="font-mono text-[10px] text-white/30">BOUNTIES PAID</p></BentoCard>
                    <BentoCard className="p-5 text-center"><p className="font-clash font-bold text-2xl text-acid">23</p><p className="font-mono text-[10px] text-white/30">ACTIVE BOUNTIES</p></BentoCard>
                    <BentoCard className="p-5 text-center"><p className="font-clash font-bold text-2xl flex items-center justify-center gap-1">4.9 <IconStar className="w-5 h-5 text-yellow-400" /></p><p className="font-mono text-[10px] text-white/30">BUILDER RATING</p></BentoCard>
                </div>
                <BentoCard className="p-8 mb-8"><h3 className="font-clash font-semibold text-xl mb-4">About</h3><p className="font-mono text-sm text-white/60 leading-relaxed">NeonLabs is a Series A startup building decentralized developer infrastructure. We believe in shipping fast, reviewing honestly, and compensating fairly. All hires are done through CollabRise bounties — no résumés, no interviews, just proof of work.</p></BentoCard>
                <div className="flex gap-4">
                    <Link href="/company/neonlabs/recruit"><ForgeButton variant="secondary">RECRUITMENT CONSOLE</ForgeButton></Link>
                    <ForgeButton variant="primary">VIEW OPEN BOUNTIES</ForgeButton>
                </div>
            </main>
        </div>
    );
}
