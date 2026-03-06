"use client";
import { BentoCard, ForgeButton, PulseTag, GlitchText, ShipScoreCounter } from "@/components/forge";
import Link from "next/link";
import { IconCpu } from "@/components/icons";

export default function GuildPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-6xl mx-auto px-6 py-32">
                <div className="flex items-center gap-4 mb-2"><span className="text-5xl"><IconCpu className="w-5 h-5" /></span><h1 className="font-clash font-bold text-5xl"><GlitchText text="REACT GUILD" /></h1></div>
                <p className="font-mono text-white/50 mb-12">The largest frontend engineering community in the forge.</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <BentoCard className="p-6 text-center"><p className="font-clash font-bold text-3xl text-lime">2,400</p><p className="font-mono text-[10px] text-white/30">MEMBERS</p></BentoCard>
                    <BentoCard className="p-6 text-center"><p className="font-clash font-bold text-3xl text-cyber">142</p><p className="font-mono text-[10px] text-white/30">WAR ROOMS</p></BentoCard>
                    <BentoCard className="p-6 text-center"><p className="font-clash font-bold text-3xl text-acid">89</p><p className="font-mono text-[10px] text-white/30">SHIPS</p></BentoCard>
                    <BentoCard className="p-6 text-center"><ShipScoreCounter value={142000} size="sm" label="GUILD SCORE" /></BentoCard>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <BentoCard className="p-6"><h3 className="font-clash font-semibold text-xl mb-4">Announcements</h3>
                        <div className="space-y-3">
                            {["React Guild Hackathon — March 15", "New mentorship slots available", "v19 Migration Guide published"].map(a => (
                                <div key={a} className="p-3 bg-white/5 rounded-bento-sm font-mono text-sm text-white/70 flex items-center gap-2"><span className="text-lime">›</span>{a}</div>
                            ))}
                        </div>
                    </BentoCard>
                    <BentoCard className="p-6"><h3 className="font-clash font-semibold text-xl mb-4">Top Builders</h3>
                        <div className="space-y-3">
                            {[{ n: "0xNeo", s: 8442 }, { n: "0xAlice", s: 7200 }, { n: "DevMarcus", s: 6100 }].map((b, i) => (
                                <div key={b.n} className="flex items-center justify-between p-3 bg-white/5 rounded-bento-sm">
                                    <div className="flex items-center gap-3"><span className="font-clash font-bold text-lime">#{i + 1}</span><span className="font-mono text-sm">{b.n}</span></div>
                                    <span className="font-clash font-bold text-lime">{b.s}</span>
                                </div>
                            ))}
                        </div>
                    </BentoCard>
                </div>
                <div className="flex gap-4">
                    <Link href="/guilds/react/forum"><ForgeButton variant="secondary">FORUM</ForgeButton></Link>
                    <ForgeButton variant="primary">JOIN GUILD</ForgeButton>
                </div>
            </main>
        </div>
    );
}
