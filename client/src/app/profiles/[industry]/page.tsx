"use client";

import { motion } from "framer-motion";
import { BentoCard, GlitchText, ForgeButton, PulseTag, DNACard } from "@/components/forge";
import { useParams } from "next/navigation";
import Link from "next/link";
// Dynamic content maps based on industry slug
const INDUSTRY_DATA: Record<string, {
    title: string;
    subtitle: string;
    color: string;
    icon: string;
    metrics: { label: string; value: string }[];
    topSkills: string[];
    artifacts: { id: string; title: string; type: string; score: number; date: string; tags: string[]; metrics: { label: string; value: string | number }[]; typeIcon: string }[];
}> = {
    developer: {
        title: "Developer",
        subtitle: "Code Architects & System Engineers",
        color: "lime",
        icon: "IconShipScore",
        metrics: [
            { label: "AVG COMMITS/WEEK", value: "142" },
            { label: "OPEN SOURCE CONTRIBS", value: "23" },
            { label: "CODE REVIEW SCORE", value: "9.4" }
        ],
        topSkills: ["TypeScript", "React", "Rust", "Go", "PostgreSQL", "Docker"],
        artifacts: [
            { id: "dev-1", title: "Distributed Task Queue", type: "BACKEND", score: 1200, date: "2026-02-01", tags: ["Go", "Redis", "gRPC"], metrics: [{ label: "THROUGHPUT", value: "10K/s" }, { label: "UPTIME", value: "99.99%" }], typeIcon: "IconShipScore" },
            { id: "dev-2", title: "Real-time Collaboration Engine", type: "FULLSTACK", score: 980, date: "2026-01-15", tags: ["WebSocket", "CRDT", "React"], metrics: [{ label: "USERS", value: "5K+" }, { label: "LATENCY", value: "<50ms" }], typeIcon: "IconLink" }
        ]
    },
    designer: {
        title: "Designer",
        subtitle: "Visual Architects & Experience Engineers",
        color: "cyber",
        icon: "IconPalette",
        metrics: [
            { label: "FIGMA COMPONENTS", value: "340+" },
            { label: "CASE STUDIES", value: "12" },
            { label: "AESTHETIC SCORE", value: "S-Tier" }
        ],
        topSkills: ["Figma", "Framer", "After Effects", "Blender", "CSS", "Prototyping"],
        artifacts: [
            { id: "des-1", title: "Neon Design System v3", type: "DESIGN SYSTEM", score: 1450, date: "2026-02-10", tags: ["Figma", "Tokens", "A11y"], metrics: [{ label: "COMPONENTS", value: 340 }, { label: "VARIANTS", value: "1.2K" }], typeIcon: "IconPalette" },
            { id: "des-2", title: "E-Commerce Redesign", type: "UI/UX", score: 870, date: "2025-12-08", tags: ["Mobile", "Conversion", "A/B"], metrics: [{ label: "CONVERSION", value: "+34%" }, { label: "NPS", value: 82 }], typeIcon: "IconPalette" }
        ]
    },
    chef: {
        title: "Chef",
        subtitle: "Culinary Innovators & Kitchen Engineers",
        color: "acid",
        icon: "IconFlame",
        metrics: [
            { label: "RECIPES SHIPPED", value: "89" },
            { label: "POP-UPS HOSTED", value: "7" },
            { label: "COMMUNITY RATING", value: "4.9" }
        ],
        topSkills: ["Fermentation", "Sous Vide", "Menu Design", "Food Photography", "Cost Analysis", "Team Leadership"],
        artifacts: [
            { id: "chef-1", title: "Zero-Waste Tasting Menu", type: "MENU", score: 920, date: "2026-01-20", tags: ["Sustainability", "Fine Dining"], metrics: [{ label: "COVERS", value: "200+" }, { label: "WASTE", value: "-90%" }], typeIcon: "IconFlame" },
            { id: "chef-2", title: "Fermentation Lab Protocol", type: "R&D", score: 750, date: "2025-11-15", tags: ["Koji", "Lacto", "Science"], metrics: [{ label: "EXPERIMENTS", value: 45 }, { label: "PUBLISHED", value: "Yes" }], typeIcon: "IconFlame" }
        ]
    },
    founder: {
        title: "Founder",
        subtitle: "Vision Architects & Growth Engineers",
        color: "lime",
        icon: "IconRocket",
        metrics: [
            { label: "VENTURES LAUNCHED", value: "4" },
            { label: "TOTAL RAISED", value: "$2.1M" },
            { label: "EXIT MULTIPLIER", value: "3.2x" }
        ],
        topSkills: ["Fundraising", "Product Strategy", "Team Building", "GTM", "Financial Modeling", "Storytelling"],
        artifacts: [
            { id: "found-1", title: "Series A Pitch Deck", type: "STRATEGY", score: 1800, date: "2026-02-20", tags: ["VC", "SaaS", "B2B"], metrics: [{ label: "RAISED", value: "$1.5M" }, { label: "MEETINGS", value: 42 }], typeIcon: "IconRocket" },
            { id: "found-2", title: "Product-Market Fit Analysis", type: "RESEARCH", score: 650, date: "2025-09-01", tags: ["Surveys", "Data", "Pivots"], metrics: [{ label: "INTERVIEWS", value: 120 }, { label: "PIVOTS", value: 2 }], typeIcon: "IconChart" }
        ]
    },
    musician: {
        title: "Musician",
        subtitle: "Audio Architects & Sound Engineers",
        color: "cyber",
        icon: "IconMusic",
        metrics: [
            { label: "TRACKS SHIPPED", value: "47" },
            { label: "COLLAB SESSIONS", value: "23" },
            { label: "STREAM AVG", value: "12K" }
        ],
        topSkills: ["Ableton", "Mixing", "Sound Design", "Music Theory", "Live Performance", "Sampling"],
        artifacts: [
            { id: "mus-1", title: "Ambient EP: Void Protocol", type: "RELEASE", score: 880, date: "2026-01-30", tags: ["Ambient", "Modular", "Spatial"], metrics: [{ label: "STREAMS", value: "45K" }, { label: "SAVES", value: "3.2K" }], typeIcon: "IconMusic" }
        ]
    },
    writer: {
        title: "Writer",
        subtitle: "Content Architects & Narrative Engineers",
        color: "lime",
        icon: "IconPencil",
        metrics: [
            { label: "ARTICLES SHIPPED", value: "156" },
            { label: "AVG READ TIME", value: "7.2m" },
            { label: "NEWSLETTER SUBS", value: "8.4K" }
        ],
        topSkills: ["Technical Writing", "Copywriting", "SEO", "Storytelling", "Research", "Editing"],
        artifacts: [
            { id: "wri-1", title: "The Builder Manifesto", type: "ESSAY", score: 1100, date: "2026-02-05", tags: ["Culture", "Tech", "Philosophy"], metrics: [{ label: "READS", value: "120K" }, { label: "SHARES", value: "4.5K" }], typeIcon: "IconPencil" }
        ]
    },
    photographer: {
        title: "Photographer",
        subtitle: "Visual Storytellers & Light Engineers",
        color: "acid",
        icon: "IconImage",
        metrics: [
            { label: "SHOOTS COMPLETED", value: "234" },
            { label: "EXHIBITIONS", value: "5" },
            { label: "CLIENT RATING", value: "4.9" }
        ],
        topSkills: ["Lightroom", "Composition", "Studio Lighting", "Street Photography", "Post-Processing", "Color Theory"],
        artifacts: [
            { id: "pho-1", title: "Urban Decay Series", type: "EXHIBITION", score: 950, date: "2026-01-10", tags: ["Street", "B&W", "Editorial"], metrics: [{ label: "PRINTS SOLD", value: 28 }, { label: "FEATURED", value: "3 Mags" }], typeIcon: "IconImage" }
        ]
    },
    carpenter: {
        title: "Carpenter",
        subtitle: "Material Architects & Craft Engineers",
        color: "lime",
        icon: "IconWood",
        metrics: [
            { label: "PROJECTS SHIPPED", value: "67" },
            { label: "CUSTOM COMMISSIONS", value: "31" },
            { label: "MATERIAL MASTERY", value: "S-Tier" }
        ],
        topSkills: ["Joinery", "CNC", "Wood Selection", "Finishing", "CAD", "Structural Design"],
        artifacts: [
            { id: "carp-1", title: "Live-Edge Conference Table", type: "COMMISSION", score: 1300, date: "2025-12-20", tags: ["Walnut", "Epoxy", "Custom"], metrics: [{ label: "HOURS", value: 120 }, { label: "VALUE", value: "$8K" }], typeIcon: "IconWood" }
        ]
    },
    maker: {
        title: "Maker",
        subtitle: "Hardware Architects & Prototype Engineers",
        color: "cyber",
        icon: "IconWrench",
        metrics: [
            { label: "PROTOTYPES", value: "42" },
            { label: "OPEN-SOURCE HW", value: "8" },
            { label: "MAKER SCORE", value: "A-Tier" }
        ],
        topSkills: ["3D Printing", "Arduino", "PCB Design", "Laser Cutting", "Soldering", "CAD"],
        artifacts: [
            { id: "mak-1", title: "Open-Source Air Quality Monitor", type: "HARDWARE", score: 1050, date: "2026-02-15", tags: ["IoT", "ESP32", "Open Source"], metrics: [{ label: "FORKS", value: 340 }, { label: "DEPLOYED", value: "50+" }], typeIcon: "IconWrench" }
        ]
    }
};

export default function IndustryProfilePage() {
    const params = useParams();
    const industry = (params?.industry as string) || "developer";
    const data = INDUSTRY_DATA[industry] || INDUSTRY_DATA.developer;

    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">

            <main className="max-w-6xl mx-auto px-6 py-32">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-5xl">{data.icon}</span>
                        <div>
                            <h1 className="font-clash font-bold text-5xl md:text-6xl">
                                <GlitchText text={data.title.toUpperCase()} />
                            </h1>
                            <p className="font-mono text-sm text-white/50 mt-1">{data.subtitle}</p>
                        </div>
                    </div>

                    {/* Industry Nav */}
                    <div className="flex flex-wrap gap-2 mt-8">
                        {Object.keys(INDUSTRY_DATA).map(key => (
                            <Link key={key} href={`/profiles/${key}`}>
                                <motion.span
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded-bento-sm border cursor-pointer transition-colors
                                        ${key === industry ? "bg-white/10 border-white/30 text-white" : "border-white/10 text-white/40 hover:text-white hover:border-white/20"}`}
                                >
                                    {key}
                                </motion.span>
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* Industry Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {data.metrics.map((metric, i) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <BentoCard className="p-6 text-center">
                                <p className="font-clash font-bold text-4xl text-white mb-2">{metric.value}</p>
                                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">{metric.label}</p>
                            </BentoCard>
                        </motion.div>
                    ))}
                </div>

                {/* Top Skills */}
                <BentoCard className="p-8 mb-12">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6">Core Skill Stack</h3>
                    <div className="flex flex-wrap gap-3">
                        {data.topSkills.map(skill => (
                            <PulseTag key={skill} label={skill} status="shipped" />
                        ))}
                    </div>
                </BentoCard>

                {/* Sample Artifacts */}
                <div className="mb-8">
                    <h2 className="font-clash font-semibold text-2xl flex items-center gap-3 mb-8">
                        <span className="w-2 h-8 bg-lime inline-block" />
                        Featured Artifacts
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.artifacts.map((artifact) => (
                            <DNACard key={artifact.id} {...artifact} />
                        ))}
                    </div>
                </div>

                <div className="text-center mt-12">
                    <ForgeButton variant="primary" className="text-lg px-12 py-5">
                        APPLY THIS PROFILE TEMPLATE
                    </ForgeButton>
                </div>
            </main>
        </div>
    );
}
