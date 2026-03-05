"use client";
import { BentoCard, ForgeButton, GlitchText } from "@/components/forge";
import { useParams } from "next/navigation";
import Link from "next/link";
const NICHE_DATA: Record<string, { title: string; icon: string; description: string; members: number; projects: number; featured: string[] }> = {
    react: { title: "The React Guild", icon: "IconCpu", description: "Masters of component architecture, state machines, and server components.", members: 2400, projects: 142, featured: ["CollabRise UI", "Neon DEX", "Auth SDK"] },
    rust: { title: "The Rust Guild", icon: "IconCode", description: "Systems builders. Zero-cost abstractions. Memory-safe shipping.", members: 1800, projects: 89, featured: ["Score Engine", "WASM Runtime", "P2P Layer"] },
    woodworking: { title: "The Woodworking Guild", icon: "IconWood", description: "From raw timber to finished furniture. Traditional joinery meets CNC.", members: 430, projects: 22, featured: ["Live-Edge Table", "Custom Shelving", "Restoration"] },
    photography: { title: "The Photography Guild", icon: "IconImage", description: "Visual storytelling through light, composition, and post-processing.", members: 650, projects: 38, featured: ["Urban Series", "Portrait Lab", "Aerial Shots"] },
    blockchain: { title: "The Blockchain Guild", icon: "IconLink", description: "Smart contracts, DeFi protocols, and on-chain reputation systems.", members: 1200, projects: 67, featured: ["DEX Protocol", "NFT Engine", "DAO Toolkit"] },
    ai: { title: "The AI Guild", icon: "IconCpu", description: "Machine learning, LLMs, and intelligent automation for builders.", members: 2100, projects: 95, featured: ["Auto-Scraper", "Code Review AI", "Match Engine"] },
    mobile: { title: "The Mobile Guild", icon: "IconCpu", description: "Native and cross-platform mobile experiences that ship fast.", members: 1600, projects: 74, featured: ["Builder App", "Guild Chat", "Score Tracker"] },
    gamedev: { title: "The GameDev Guild", icon: "IconCpu", description: "From indie to AAA. Game engines, shaders, and interactive experiences.", members: 900, projects: 41, featured: ["Voxel Engine", "Shader Lab", "Multiplayer Kit"] },
};

export default function NicheGuildPage() {
    const params = useParams();
    const slug = (params?.slug as string) || "react";
    const data = NICHE_DATA[slug] || NICHE_DATA.react;

    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-5xl mx-auto px-6 py-32">
                <div className="flex items-center gap-4 mb-6"><span className="text-5xl">{data.icon}</span><h1 className="font-clash font-bold text-5xl"><GlitchText text={data.title.toUpperCase()} /></h1></div>
                <p className="font-mono text-white/60 max-w-2xl mb-8">{data.description}</p>

                <div className="flex flex-wrap gap-2 mb-12">
                    {Object.entries(NICHE_DATA).map(([key, val]) => (
                        <Link key={key} href={`/guilds/niche/${key}`}><span className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded-bento-sm border cursor-pointer transition-colors ${key === slug ? "bg-white/10 border-white/30 text-white" : "border-white/10 text-white/40 hover:text-white"}`}>{val.icon} {key}</span></Link>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                    <BentoCard className="p-6 text-center"><p className="font-clash font-bold text-4xl text-lime">{data.members.toLocaleString()}</p><p className="font-mono text-[10px] text-white/30">MEMBERS</p></BentoCard>
                    <BentoCard className="p-6 text-center"><p className="font-clash font-bold text-4xl text-cyber">{data.projects}</p><p className="font-mono text-[10px] text-white/30">ACTIVE PROJECTS</p></BentoCard>
                </div>

                <BentoCard className="p-8 mb-8">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">Featured Ships</h3>
                    <div className="flex flex-wrap gap-3">{data.featured.map(f => <span key={f} className="px-4 py-2 bg-white/5 border border-white/10 rounded-bento-sm font-mono text-sm">{f}</span>)}</div>
                </BentoCard>
                <ForgeButton variant="primary" className="w-full py-5 text-lg">JOIN THIS GUILD</ForgeButton>
            </main>
        </div>
    );
}
