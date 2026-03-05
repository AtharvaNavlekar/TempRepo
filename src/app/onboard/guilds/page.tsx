"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ForgeButton, BentoCard, PulseTag } from "@/components/forge";
import { IconSuccess } from "@/components/icons";
import { useCollabRiseStore } from "@/store/store";

const GUILDS = [
    { id: "react", name: "The React Core", memberCount: 1420, vibe: "#CCFF00" },
    { id: "3d", name: "Spatial Web", memberCount: 384, vibe: "#FF00FF" },
    { id: "ai", name: "Neural Ops", memberCount: 2105, vibe: "#8A2BE2" },
    { id: "hardware", name: "Iron & Silicon", memberCount: 156, vibe: "#FFFFFF" },
    { id: "design", name: "Pixel Perfect", memberCount: 890, vibe: "#FF0055" },
    { id: "rust", name: "Rustaceans", memberCount: 450, vibe: "#FFA500" },
];

export default function GuildSelectionPage() {
    const router = useRouter();
    const [selectedGuilds, setSelectedGuilds] = useState<string[]>([]);
    const [search, setSearch] = useState("");
    const setStoreGuilds = useCollabRiseStore(state => state.setSelectedGuilds);

    const filteredGuilds = GUILDS.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));

    const toggleGuild = (id: string) => {
        setSelectedGuilds(prev =>
            prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
        );
    };

    const handleComplete = () => {
        const guildNames = selectedGuilds.map(id => GUILDS.find(g => g.id === id)?.name || id);
        setStoreGuilds(guildNames);
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen bg-obsidian flex flex-col p-6 md:p-12 relative overflow-hidden">
            <div className="flex-grow flex flex-col max-w-6xl mx-auto w-full relative z-10 pt-10">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                    <div>
                        <p className="font-mono text-white/50 text-sm tracking-widest uppercase mb-4">Phase 5 // Tribe Selection</p>
                        <h1 className="font-clash font-black text-4xl md:text-5xl text-white">Choose Your Guilds.</h1>
                    </div>

                    <div className="w-full md:w-auto relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-white/30">$</span>
                        <input
                            type="text"
                            placeholder="Search frequencies..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full md:w-80 bg-white/5 border border-white/10 rounded-full py-3 pl-10 pr-6 font-mono text-white placeholder:text-white/20 focus:outline-none focus:border-lime transition-colors"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                    <AnimatePresence>
                        {filteredGuilds.map((guild, i) => {
                            const isSelected = selectedGuilds.includes(guild.id);

                            return (
                                <motion.div
                                    key={guild.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                >
                                    <BentoCard
                                        className={`h-[200px] cursor-pointer group transition-all duration-300 border-2
                      ${isSelected ? 'bg-white/10 scale-[1.02]' : 'hover:scale-[1.02] border-white/5 hover:border-white/20'}
                    `}
                                        onClick={() => toggleGuild(guild.id)}
                                    >
                                        <div className="h-full flex flex-col justify-between p-6 relative overflow-hidden">
                                            {isSelected && (
                                                <div
                                                    className="absolute top-0 right-0 w-32 h-32 blur-[50px] opacity-40 rounded-full"
                                                    style={{ backgroundColor: guild.vibe }}
                                                />
                                            )}

                                            <div className="flex justify-between items-start z-10">
                                                <h3 className="font-clash font-bold text-2xl text-white group-hover:text-white transition-colors">
                                                    {guild.name}
                                                </h3>
                                                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors
                          ${isSelected ? 'border-transparent bg-white text-black' : 'border-white/20 text-transparent'}
                        `}><IconSuccess className="w-5 h-5" /></div>
                                            </div>

                                            <div className="flex justify-between items-end z-10">
                                                <PulseTag
                                                    status={isSelected ? "live" : "shipped"}
                                                    label={`${guild.memberCount} ACTIVE`}
                                                    className={isSelected ? "border-white/20 text-white bg-white/10" : "border-white/10 text-white/50 bg-black"}
                                                />
                                                <span className="font-mono text-xs text-white/30 uppercase tracking-widest group-hover:text-white/60 transition-colors">
                                                    Join ↗
                                                </span>
                                            </div>
                                        </div>
                                    </BentoCard>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

            </div>

            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-obsidian via-obsidian to-transparent z-50 flex justify-center pointer-events-none">
                <div className="pointer-events-auto">
                    <ForgeButton
                        size="lg"
                        onClick={handleComplete}
                        className="px-16 shadow-[0_0_30px_rgba(204,255,0,0.15)] bg-lime text-obsidian hover:bg-white border-none z-50 font-black text-xl"
                    >
                        ENTER THE FORGE
                    </ForgeButton>
                </div>
            </div>
        </div>
    );
}
