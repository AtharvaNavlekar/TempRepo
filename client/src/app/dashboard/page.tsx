"use client";

import { useState, useEffect } from "react";
import { ForgeButton, BentoCard, ShipScoreCounter, DNACard, PulseTag } from "@/components/forge";
import { useCollabRiseStore } from "@/store/store";
import type { PublicUser, BuilderProfile } from "@/lib/types";
import { apiFetch } from "@/lib/api";
import EditProfileModal from "@/components/profile/EditProfileModal";
import AddProjectModal from "@/components/profile/AddProjectModal";
import { GitHubCalendar } from "react-github-calendar";

const MOCK_PROJECTS: any[] = [];

export default function DashboardPage() {
    const shipScore = useCollabRiseStore(state => state.shipScore);
    const pulseEvents = useCollabRiseStore(state => state.pulseEvents);

    // We fetch the deep user profile on mount to get the freshest data
    const [fullUser, setFullUser] = useState<PublicUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await apiFetch("/auth/me");
                if (res.ok) {
                    const data = await res.json();
                    setFullUser(data);
                }
            } catch (e) {
                console.error("Failed to fetch profile", e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (isLoading) {
        return <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center font-mono text-lime animate-pulse">Initializing Ecosystem...</div>;
    }

    if (!fullUser) {
        return <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center font-mono text-acid">401: Unauthorized Entity</div>;
    }

    const isBuilder = fullUser.type === "builder";
    const profile = fullUser.profile as Partial<BuilderProfile>;

    let githubUsername: string | null = null;
    if (isBuilder && profile.githubUrl) {
        try {
            const url = new URL(profile.githubUrl);
            githubUsername = url.pathname.split("/").filter(Boolean)[0] || null;
        } catch (e) {
            githubUsername = profile.githubUrl.replace("https://github.com/", "").replace("/", "");
        }
    }

    return (
        <div className="min-h-[calc(100vh-5rem)] p-6 md:p-12 max-w-7xl mx-auto">
            {/* Modal */}
            {isEditModalOpen && <EditProfileModal isOpen={true} onClose={() => setIsEditModalOpen(false)} user={fullUser} />}
            {isAddProjectModalOpen && <AddProjectModal isOpen={true} onClose={() => setIsAddProjectModalOpen(false)} user={fullUser} />}

            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/10 pb-8">
                <div>
                    <PulseTag status="live" label="WELCOME TO THE FORGE" className="mb-4" />
                    <h1 className="font-clash font-black text-4xl md:text-5xl text-white">
                        {isBuilder ? "Founder" : "Partner"}_{fullUser.handle}
                    </h1>
                    <p className="font-mono text-white/50 text-sm mt-3 leading-relaxed max-w-2xl">
                        {profile.manifesto || "No manifesto provided. Initiate your protocol."}
                    </p>
                </div>

                <div className="mt-6 md:mt-0 flex gap-4">
                    <ForgeButton variant="ghost" onClick={() => setIsEditModalOpen(true)}>EDIT PROFILE</ForgeButton>
                    {isBuilder && (
                        <ForgeButton onClick={() => setIsAddProjectModalOpen(true)} className="bg-lime text-obsidian border-none hover:bg-white">NEW VENTURE</ForgeButton>
                    )}
                </div>
            </div>

            {/* Main Stack layout */}
            <div className="space-y-8">

                {/* --- 1. Hero Identity Card --- */}
                <BentoCard className="p-0 overflow-hidden relative border border-white/10 group hover:border-white/20 transition-colors duration-500">
                    <div className="absolute top-0 right-0 p-6 z-10 flex gap-2">
                        <PulseTag status="building" label={profile.employmentStatus === "open" ? "OPEN TO COLLABORATE" : "LAUNCHING"} className="bg-obsidian/80 backdrop-blur" />
                    </div>

                    <div className="bg-gradient-to-r from-obsidian via-obsidian to-lime/[0.05] p-8 md:p-12 flex flex-col md:flex-row gap-12 items-start justify-between relative z-0">
                        {/* Name & Basic Info */}
                        <div className="flex-grow max-w-3xl">
                            <h3 className="font-mono text-xs uppercase tracking-widest text-lime mb-4 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                                {profile.craft || "UNDEFINED VENTURE ROLE"}
                            </h3>
                            <h2 className="font-clash font-black text-5xl md:text-6xl text-white mb-4 leading-none tracking-tight">
                                {fullUser.fullName}
                            </h2>
                            <p className="font-mono text-sm text-white/50 mb-10 flex items-center gap-4 flex-wrap">
                                <span className="bg-white/5 px-2 py-1 rounded text-white/70">@{fullUser.handle}</span>
                                <span className="text-white/20">•</span>
                                <span>{fullUser.email}</span>
                                <span className="text-white/20">•</span>
                                <span>{fullUser.country || "Earth"}</span>
                            </p>

                            {/* Manifesto Quote */}
                            <div className="pl-6 border-l-2 border-lime/40">
                                <p className="font-mono text-xl md:text-2xl text-white/90 leading-relaxed italic">
                                    &ldquo;{profile.manifesto || "No manifesto provided."}&rdquo;
                                </p>
                            </div>
                        </div>

                        {/* Top Level Stats */}
                        <div className="flex-shrink-0 w-full md:w-auto grid grid-cols-2 md:grid-cols-1 gap-8 text-right md:border-l border-white/10 md:pl-12 py-2">
                            <div>
                                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">Total Traction Score</p>
                                <p className="font-clash font-bold text-5xl text-lime">{shipScore}</p>
                            </div>
                            <div>
                                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">Pledge</p>
                                <p className="font-clash font-bold text-2xl text-white">{profile.commitmentLevel?.toUpperCase() || "CASUAL"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Action / Links Bar */}
                    <div className="bg-white/[0.02] border-t border-white/10 px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="font-mono text-xs flex gap-8">
                            {profile.githubUrl && <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors flex items-center gap-2">GITHUB ↗</a>}
                            {profile.portfolioUrl && <a href={profile.portfolioUrl} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors flex items-center gap-2">PORTFOLIO ↗</a>}
                            {!profile.githubUrl && !profile.portfolioUrl && <span className="text-white/20">No external links hooked</span>}
                        </div>
                        {profile.bestProject && (
                            <p className="font-mono text-xs text-white/40 bg-white/5 px-4 py-2 rounded">
                                <span className="uppercase tracking-widest mr-3">Crowning Venture:</span>
                                <span className="text-white font-bold">{profile.bestProject}</span>
                            </p>
                        )}
                    </div>
                </BentoCard>

                {/* --- 2. Details Split Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Column 1: Professional DNA */}
                    <BentoCard className="p-8 border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent hover:bg-white/[0.04] transition-colors duration-500">
                        <h3 className="font-clash font-bold text-2xl text-white mb-8">Professional DNA</h3>

                        <div className="space-y-6">
                            <div>
                                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">Experience & Level</p>
                                <p className="font-mono text-sm text-white capitalize">{profile.experienceLevel || "N/A"} <span className="text-lime">({profile.yearsOfExperience || 0} YRS)</span></p>
                            </div>

                            <div className="h-px bg-white/10" />

                            <div>
                                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">Availability & Preference</p>
                                <p className="font-mono text-sm text-white capitalize">{profile.availability || 0} Hours/Week • {profile.workPreference || "Any"}</p>
                            </div>

                            <div className="h-px bg-white/10" />

                            <div>
                                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-3">Bounty Status</p>
                                <div className="flex items-center gap-3">
                                    <span className={`w-2.5 h-2.5 rounded-full ${profile.openToBounties ? "bg-lime shadow-[0_0_10px_rgba(204,255,0,0.5)]" : "bg-red-500"}`} />
                                    <span className="font-mono text-sm text-white">
                                        {profile.openToBounties ? `OPEN (Min $${profile.minBountyReward})` : "CLOSED TO STRATEGIC BOUNTIES"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </BentoCard>

                    {/* Column 2: Weaponry & Logistics */}
                    <BentoCard className="p-8 border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent h-full md:col-span-2 flex flex-col hover:bg-white/[0.04] transition-colors duration-500">
                        <h3 className="font-clash font-bold text-2xl text-white mb-8">Weaponry & Arsenal</h3>

                        <div className="flex-grow flex flex-col justify-between">
                            <div className="mb-8">
                                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Equipped Skills</p>
                                <div className="flex flex-wrap gap-2.5">
                                    {profile.skills && profile.skills.length > 0 ? (
                                        profile.skills.map((s: string) => <span key={s} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg font-mono text-[11px] text-white/80 hover:border-lime/50 transition-colors hover:text-white cursor-default">{s}</span>)
                                    ) : (
                                        <span className="font-mono text-xs text-white/30">No skills equipped.</span>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                                <div>
                                    <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Active Guilds</p>
                                    <div className="space-y-3">
                                        {profile.guilds && profile.guilds.length > 0 ? (
                                            profile.guilds.map(g => (
                                                <div key={g} className="font-mono text-sm text-lime flex items-center gap-3 bg-lime/5 w-fit px-3 py-1.5 rounded border border-lime/10">
                                                    <span className="w-1.5 h-1.5 bg-lime rounded-full animate-pulse" /> {g}
                                                </div>
                                            ))
                                        ) : (
                                            <span className="font-mono text-xs text-white/30">Lone Wolf</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Venture Engagements</p>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.preferredProjectLength && profile.preferredProjectLength.length > 0 ? (
                                            profile.preferredProjectLength.map(len => (
                                                <span key={len} className="font-mono text-[11px] bg-white/5 border border-white/10 px-3 py-1.5 rounded font-bold text-white/60">{len}</span>
                                            ))
                                        ) : (
                                            <span className="font-mono text-xs text-white/30">Any duration</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BentoCard>
                </div>

                {/* --- 3. Shipped Artifacts & Pulse --- */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Shipped Artifacts DNA Collection */}
                    <div className="lg:col-span-3">
                        <div className="flex justify-between items-center mb-6 pl-2">
                            <h3 className="font-clash font-bold text-2xl text-white">Launched Ventures</h3>
                        </div>

                        {githubUsername && (
                            <div className="mb-8 p-6 bg-white/[0.02] border border-white/5 rounded-bento overflow-x-auto custom-scrollbar">
                                <div className="mb-6 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-lime" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    <span className="font-mono text-xs text-white/50 uppercase tracking-widest">{githubUsername}&apos;s Heatmap</span>
                                </div>
                                <div className="w-fit mx-auto min-w-max">
                                    <GitHubCalendar
                                        username={githubUsername}
                                        colorScheme="dark"
                                        theme={{ dark: ['#ffffff08', '#baff2940', '#baff2970', '#baff29a0', '#baff29'] }}
                                        fontSize={12}
                                        blockSize={11}
                                        blockMargin={4}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(profile.projects && profile.projects.length > 0) ? (
                                profile.projects.map(proj => (
                                    <DNACard
                                        key={proj.id}
                                        title={proj.name}
                                        description={proj.description}
                                        url={proj.url}
                                        type={proj.type}
                                        score={proj.score}
                                        date={proj.date}
                                        tags={proj.tags || []}
                                        metrics={[{ label: "IMPACT", value: "HIGH" }]}
                                    />
                                ))
                            ) : (
                                <div className="md:col-span-2 p-8 border border-white/5 bg-white/[0.02] rounded-bento text-center">
                                    <p className="font-mono text-sm text-white/40 mb-4">No ventures launched yet.</p>
                                    <ForgeButton onClick={() => setIsAddProjectModalOpen(true)} variant="ghost" className="text-lime border-lime/20 hover:bg-lime/10">Launch First Venture</ForgeButton>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Global Pulse Ticker Mini */}
                    <BentoCard className="lg:col-span-1 h-[400px] flex flex-col p-6 overflow-hidden relative border border-white/10">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-6 sticky top-0 bg-obsidian z-10 pb-2 border-b border-white/10">Live Pulse</h3>
                        <div className="flex-grow overflow-y-auto space-y-5 pr-2 custom-scrollbar relative z-0">
                            {pulseEvents.slice(0, 5).map(event => (
                                <div key={event.id} className="text-sm">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                                        <span className="font-mono font-bold text-white tracking-tight">{event.builder}</span>
                                    </div>
                                    <p className="font-mono text-white/60 text-[10px] leading-relaxed">
                                        {event.action} <span className="text-white">&quot;{event.project}&quot;</span>
                                    </p>
                                    <p className="font-mono text-white/30 text-[8px] mt-2">{new Date(event.timestamp || Date.now()).toLocaleTimeString()}</p>
                                    <div className="h-px bg-white/5 mt-4" />
                                </div>
                            ))}
                        </div>
                    </BentoCard>
                </div>

            </div>
        </div>
    );
}
