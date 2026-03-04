"use client";
import { BentoCard, ForgeButton, GlitchText } from "@/components/forge";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
const TEMPLATE_DATA: Record<string, { title: string; icon: string; description: string; features: string[]; color: string }> = {
    "code-lab": { title: "Code Lab", icon: "IconShipScore", description: "Full-stack development environment with CI/CD integration, code review pipelines, and automated testing.", features: ["GitHub Integration", "CI/CD Pipeline", "Code Review Board", "Automated Testing"], color: "lime" },
    "design-studio": { title: "Design Studio", icon: "IconPalette", description: "Visual design workspace with Figma sync, design token management, and client handoff tools.", features: ["Figma Sync", "Design Tokens", "Component Library", "Client Handoff"], color: "cyber" },
    "hardware-workshop": { title: "Hardware Workshop", icon: "IconWrench", description: "Physical prototyping space with BOM tracking, PCB design review, and 3D print queue.", features: ["BOM Tracker", "PCB Review", "3D Print Queue", "Assembly Docs"], color: "acid" },
    "culinary-lab": { title: "Culinary Lab", icon: "IconFlame", description: "Recipe development space with ingredient costing, nutrition analysis, and photo integration.", features: ["Recipe Builder", "Cost Analysis", "Nutrition Engine", "Photo Integration"], color: "lime" },
    "music-studio": { title: "Music Studio", icon: "IconMusic", description: "Audio production space with DAW project sharing, stem tracking, and distribution pipeline.", features: ["DAW Sync", "Stem Tracker", "Mix Review", "Distribution"], color: "cyber" },
    "writing-room": { title: "Writing Room", icon: "IconPencil", description: "Collaborative writing space with version control, editorial review, and publishing pipeline.", features: ["Version Control", "Editorial Flow", "SEO Analysis", "Publishing"], color: "lime" },
    "open-source": { title: "Open Source", icon: "IconGlobe", description: "Community-driven project with contributor management, issue tracking, and release management.", features: ["Contributor CLA", "Issue Triage", "Release Pipeline", "Docs Generator"], color: "cyber" },
    "startup-sprint": { title: "Startup Sprint", icon: "IconRocket", description: "Fast-paced startup builder with pitch deck tools, financial modeling, and investor pipeline.", features: ["Pitch Builder", "Financial Model", "Investor CRM", "Cap Table"], color: "acid" },
    "hackathon": { title: "Hackathon", icon: "⏱", description: "Time-boxed competition mode with countdown timer, submission deadline, and judging panel.", features: ["Countdown Timer", "Submission Form", "Judge Portal", "Prize Distribution"], color: "lime" },
    "research": { title: "Research", icon: "IconFlame", description: "Academic and R&D workspace with literature review, experiment tracking, and paper drafting.", features: ["Literature DB", "Experiment Log", "Data Viz", "Paper Draft"], color: "cyber" },
    "community": { title: "Community", icon: "IconUsers", description: "Community-building project with event management, member engagement, and content calendar.", features: ["Event Manager", "Member Portal", "Content Calendar", "Analytics"], color: "acid" },
    "freelance": { title: "Freelance", icon: "IconHire", description: "Client project management with scope definition, milestone billing, and deliverable tracking.", features: ["Scope Builder", "Milestone Billing", "Deliverables", "Client Portal"], color: "lime" },
};

export default function TemplatePage() {
    const params = useParams();
    const type = (params?.type as string) || "code-lab";
    const data = TEMPLATE_DATA[type] || TEMPLATE_DATA["code-lab"];

    return (
        <div className="min-h-screen bg-obsidian text-white/90 font-sans">
            <main className="max-w-6xl mx-auto px-6 py-32">
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-5xl">{data.icon}</span>
                    <div><h1 className="font-clash font-bold text-5xl"><GlitchText text={data.title.toUpperCase()} /></h1><p className="font-mono text-sm text-white/50 mt-1">War Room Template</p></div>
                </div>
                <p className="font-mono text-white/60 max-w-2xl mb-12">{data.description}</p>

                <div className="flex flex-wrap gap-2 mb-12">
                    {Object.keys(TEMPLATE_DATA).map(key => (
                        <Link key={key} href={`/templates/${key}`}>
                            <motion.span whileHover={{ scale: 1.05 }} className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded-bento-sm border cursor-pointer transition-colors ${key === type ? "bg-white/10 border-white/30 text-white" : "border-white/10 text-white/40 hover:text-white"}`}>{key.replace("-", " ")}</motion.span>
                        </Link>
                    ))}
                </div>

                <BentoCard className="p-8 mb-8">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6">Built-in Features</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {data.features.map(f => (
                            <div key={f} className="p-4 bg-white/5 border border-white/10 rounded-bento-sm text-center"><p className="font-mono text-sm text-white/80">{f}</p></div>
                        ))}
                    </div>
                </BentoCard>
                <div className="text-center"><ForgeButton variant="primary" className="text-lg px-12 py-5">USE THIS TEMPLATE</ForgeButton></div>
            </main>
        </div>
    );
}
