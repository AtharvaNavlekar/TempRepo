"use client";


import { ForgeButton, BentoCard, ShipScoreCounter, DNACard, PulseTag } from "@/components/forge";
import { useCollabRiseStore } from "@/store/store";

const MOCK_PROJECTS = [
    { id: 1, name: "CollabRise Landing", type: "Frontend", score: 850, commits: 120 },
    { id: 2, name: "Neural Engine API", type: "Backend", score: 1205, commits: 340 },
];

export default function DashboardPage() {
    const shipScore = useCollabRiseStore(state => state.shipScore);
    const pulseEvents = useCollabRiseStore(state => state.pulseEvents);

    return (
        <div className="min-h-[calc(100vh-5rem)] p-6 md:p-12 max-w-7xl mx-auto">

            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/10 pb-8">
                <div>
                    <PulseTag status="live" label="WELCOME TO THE FORGE" className="mb-4" />
                    <h1 className="font-clash font-black text-4xl md:text-5xl text-white">
                        Builder_0x7A9
                    </h1>
                    <p className="font-mono text-white/50 text-sm mt-2">
                        Identity: ENGINEER // Guilds: React, Neural Ops
                    </p>
                </div>

                <div className="mt-6 md:mt-0 flex gap-4">
                    <ForgeButton variant="ghost">SETTINGS</ForgeButton>
                    <ForgeButton className="bg-lime text-obsidian border-none hover:bg-white">NEW PROJECT</ForgeButton>
                </div>
            </div>

            {/* Bento Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {/* Main Stats */}
                <BentoCard className="md:col-span-2 lg:col-span-2 p-8 bg-gradient-to-br from-white/5 to-transparent">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-6">Global Ship Score</h3>
                    <div className="flex items-end gap-6 mb-8">
                        <ShipScoreCounter value={shipScore} size="lg" />
                        <div className="mb-2">
                            <span className="font-mono text-lime border border-lime/30 bg-lime/10 px-2 py-1 rounded text-xs">+14% THIS WEEK</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                        <div>
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-1">Total Shipped</p>
                            <p className="font-clash font-bold text-2xl text-white">12</p>
                        </div>
                        <div>
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-1">Active Stakes</p>
                            <p className="font-clash font-bold text-2xl text-white">850 PTS</p>
                        </div>
                        <div>
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-1">Failed</p>
                            <p className="font-clash font-bold text-2xl text-red-500">2</p>
                        </div>
                    </div>
                </BentoCard>

                {/* Global Pulse Ticker Mini */}
                <BentoCard className="md:col-span-1 lg:col-span-1 h-full flex flex-col p-6 overflow-hidden relative">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-4 sticky top-0 bg-obsidian z-10 pb-2">Live Pulse</h3>
                    <div className="flex-grow overflow-y-auto space-y-4 pr-2 custom-scrollbar relative z-0">
                        {pulseEvents.slice(0, 5).map(event => (
                            <div key={event.id} className="text-sm">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                                    <span className="font-mono font-bold text-white">{event.builder}</span>
                                </div>
                                <p className="font-mono text-white/60 text-[10px] leading-relaxed">
                                    {event.action} <span className="text-white">&quot;{event.project}&quot;</span>
                                </p>
                                <p className="font-mono text-white/30 text-[8px] mt-1">{new Date(event.timestamp || Date.now()).toLocaleTimeString()}</p>
                                <div className="h-px bg-white/5 mt-3" />
                            </div>
                        ))}
                    </div>
                </BentoCard>

                {/* Active War Rooms */}
                <div className="md:col-span-3 lg:col-span-4 mt-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-clash font-bold text-xl text-white">Active War Rooms</h3>
                        <span className="font-mono text-xs text-white/50 uppercase tracking-widest hover:text-white cursor-pointer transition-colors">View All ↗</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* War Room Empty State */}
                        <BentoCard className="p-8 border border-white/5 border-dashed flex flex-col items-center justify-center text-center min-h-[250px] group hover:border-lime/50 transition-colors">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <span className="text-2xl text-white/30">+</span>
                            </div>
                            <h4 className="font-clash font-bold text-lg text-white mb-2">Initialize New Project</h4>
                            <p className="font-mono text-white/40 text-xs">Set up a War Room, stake points, and invite builders.</p>
                        </BentoCard>

                        {/* War Room Active State (Mock) */}
                        <BentoCard className="p-0 border border-white/10 relative overflow-hidden flex flex-col">
                            <div className="absolute top-0 right-0 p-4 z-10">
                                <PulseTag status="building" label="IN PROGRESS" className="bg-obsidian/80 backdrop-blur" />
                            </div>
                            <div className="bg-gradient-to-r from-cyber/20 to-lime/10 p-6 flex-grow flex flex-col justify-end">
                                <h4 className="font-clash font-bold text-2xl text-white">Open Source Data CLI</h4>
                                <p className="font-mono text-[10px] text-white/60 uppercase tracking-widest mt-1">Due in 4 days</p>
                            </div>
                            <div className="bg-obsidian w-full px-6 py-4 flex justify-between items-center border-t border-white/10">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full border border-obsidian bg-cyber/30 flex items-center justify-center text-[10px] font-mono">B1</div>
                                    <div className="w-8 h-8 rounded-full border border-obsidian bg-lime/30 flex items-center justify-center text-[10px] font-mono">B2</div>
                                </div>
                                <ForgeButton variant="ghost" size="sm">ENTER WAR ROOM</ForgeButton>
                            </div>
                        </BentoCard>
                    </div>
                </div>

                {/* Shipped Artifacts DNA Collection */}
                <div className="md:col-span-3 lg:col-span-4 mt-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-clash font-bold text-xl text-white">Shipped Artifacts</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {MOCK_PROJECTS.map(proj => (
                            <DNACard
                                key={proj.id}
                                title={proj.name}
                                type={proj.type}
                                score={proj.score}
                                date="2026-02-14"
                                tags={["React", "TypeScript"]}
                                metrics={[{ label: "COMMITS", value: proj.commits }, { label: "LOC", value: "1.2K" }]}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
