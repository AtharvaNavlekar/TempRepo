"use client";
import { BentoCard, ForgeButton, PulseTag } from "@/components/forge";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const BOUNTY_DATA: Record<string, { title: string; company: string; reward: string; difficulty: string; description: string; requirements: string[]; timeline: string }> = {
    "bounty-001": { title: "Build a Real-Time Notification System", company: "NeonLabs", reward: "$2,500", difficulty: "HARD", description: "Design and implement a scalable notification system using WebSocket connections with fallback to Server-Sent Events.", requirements: ["React + TypeScript", "WebSocket/SSE expertise", "Redis pub/sub experience", "Ship Score > 2000"], timeline: "14 days" },
    "bounty-002": { title: "Design a Mobile Onboarding Flow", company: "CreativeOS", reward: "$1,800", difficulty: "MEDIUM", description: "Create an engaging 5-screen mobile onboarding flow with micro-animations and gamification elements.", requirements: ["Figma Advanced", "Motion design", "User research", "Ship Score > 1500"], timeline: "10 days" },
    "bounty-003": { title: "Audit Smart Contract for DEX", company: "ChainVault", reward: "$5,000", difficulty: "EXPERT", description: "Perform a comprehensive security audit on our decentralized exchange smart contracts (Solidity/EVM).", requirements: ["Solidity expertise", "Security audit experience", "Known CVE familiarity", "Ship Score > 5000"], timeline: "21 days" },
};

export default function BountyDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = (params?.id as string) || "bounty-001";
    const data = BOUNTY_DATA[id] || BOUNTY_DATA["bounty-001"];

    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-4xl mx-auto px-6 py-32">
                <button onClick={() => router.back()} className="font-mono text-xs text-white/40 hover:text-lime mb-6 block">← BACK TO MARKETPLACE</button>
                <div className="flex justify-between items-start mb-8">
                    <div><PulseTag status="live" className="mb-3" /><h1 className="font-clash font-bold text-4xl">{data.title}</h1><p className="font-mono text-sm text-white/40 mt-2">{data.company} · {data.timeline} · {data.difficulty}</p></div>
                    <div className="text-right"><p className="font-clash font-bold text-4xl text-lime">{data.reward}</p><p className="font-mono text-xs text-white/30">REWARD</p></div>
                </div>
                <BentoCard className="p-8 mb-6"><h3 className="font-clash font-semibold text-lg mb-3">Brief</h3><p className="font-mono text-sm text-white/60 leading-relaxed">{data.description}</p></BentoCard>
                <BentoCard className="p-8 mb-6"><h3 className="font-clash font-semibold text-lg mb-4">Requirements</h3>
                    <ul className="space-y-2">{data.requirements.map(r => <li key={r} className="font-mono text-sm text-white/60 flex gap-2"><span className="text-lime">→</span>{r}</li>)}</ul>
                </BentoCard>
                <ForgeButton variant="primary" className="w-full py-5 text-lg">ACCEPT CHALLENGE</ForgeButton>
            </main>
        </div>
    );
}
