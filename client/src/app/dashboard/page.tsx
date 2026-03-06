"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { PublicUser, BuilderProfile } from "@/lib/types";
import { apiFetch } from "@/lib/api";
import EditProfileModal from "@/components/profile/EditProfileModal";
import AddProjectModal from "@/components/profile/AddProjectModal";
import { GitHubCalendar } from "react-github-calendar";
import Link from "next/link";
import {
    ArrowRight, Star, GitCommit, ExternalLink, Plus, Pencil,
    Zap, Award, Clock, Globe, ChevronRight, Gem, AlertCircle
} from "lucide-react";
import { useGitHubActivity } from "@/hooks/useGitHubActivity";
import { useCollabRiseStore } from "@/store/store";

const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
        {children}
    </motion.div>
);

export default function DashboardPage() {
    const { shipScore, user, pulseEvents } = useCollabRiseStore();
    const [selectedYear, setSelectedYear] = useState(2026);
    const [fullUser, setFullUser] = useState<PublicUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

    // Dynamic GitHub Data
    const isBuilder = fullUser?.type === "builder";
    const profile = (fullUser?.profile || {}) as Partial<BuilderProfile>;

    let githubUsername: string | null = null;
    if (isBuilder && profile.githubUrl) {
        try {
            const url = new URL(profile.githubUrl);
            githubUsername = url.pathname.split("/").filter(Boolean)[0] || null;
        } catch (e) {
            githubUsername = profile.githubUrl.replace("https://github.com/", "").replace("/", "");
        }
    }

    const { activity, loading: githubLoading } = useGitHubActivity(githubUsername || "", selectedYear);

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
        return (
            <div className="luxury-page flex items-center justify-center" style={{ minHeight: "100vh" }}>
                <div style={{ textAlign: "center" }}>
                    <div className="hex-shape float-gentle" style={{
                        width: 52, height: 52,
                        background: "linear-gradient(135deg, rgba(201,163,83,.15), rgba(201,163,83,.05))",
                        margin: "0 auto 24px",
                        display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                        <Gem size={20} style={{ color: "#C9A353" }} />
                    </div>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(13,13,13,.35)", letterSpacing: ".15em", textTransform: "uppercase" }}>
                        Loading your venture profile...
                    </p>
                </div>
            </div>
        );
    }

    if (!fullUser) {
        return (
            <div className="luxury-page flex items-center justify-center" style={{ minHeight: "100vh" }}>
                <div style={{ textAlign: "center", maxWidth: 400 }}>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "3rem", color: "#C9A353", lineHeight: 1, marginBottom: 16 }}>401</p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(13,13,13,.5)" }}>Authentication required to access your dashboard.</p>
                    <Link href="/auth/login" className="btn-primary" style={{ marginTop: 24, display: "inline-flex" }}>
                        Sign In <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        );
    }

    // Derived states moved up to allow hook usage

    const STATS = [
        { label: "Venture Score", value: String(shipScore), icon: <Star size={14} style={{ color: "#C9A353" }} /> },
        { label: "Commitment", value: profile.commitmentLevel?.toUpperCase() || "CASUAL", icon: <Award size={14} style={{ color: "#C9A353" }} /> },
        { label: "Availability", value: `${profile.availability || 0}h/wk`, icon: <Clock size={14} style={{ color: "#C9A353" }} /> },
        { label: "Work Mode", value: profile.workPreference || "Any", icon: <Globe size={14} style={{ color: "#C9A353" }} /> },
    ];

    return (
        <div className="luxury-page">
            {isEditModalOpen && <EditProfileModal isOpen={true} onClose={() => setIsEditModalOpen(false)} user={fullUser} />}
            {isAddProjectModalOpen && <AddProjectModal isOpen={true} onClose={() => setIsAddProjectModalOpen(false)} user={fullUser} />}

            {/* ── Top Identity Banner ── */}
            <div style={{ background: "var(--parchment)", borderBottom: "1px solid rgba(13,13,13,.08)", padding: "80px 0 56px" }}>
                <div className="luxury-container">
                    <FadeUp>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
                            <div>
                                <p className="luxury-overline" style={{ marginBottom: 12 }}>
                                    {isBuilder ? "Founder" : "Partner"} Dashboard
                                </p>
                                <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.2rem,4vw,3.5rem)", fontWeight: 400, color: "var(--ink)", lineHeight: 1.05, marginBottom: 12, letterSpacing: "-.02em" }}>
                                    Welcome back,<br />
                                    <em className="gold-shimmer-text">{fullUser.fullName}</em>
                                </h1>
                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--smoke)", maxWidth: 480, lineHeight: 1.8 }}>
                                    {profile.manifesto || "Your manifesto is the soul of your Ship Log. Add one in your profile."}
                                </p>
                                <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
                                    <span className="luxury-tag">@{fullUser.handle}</span>
                                    <span className="luxury-tag">{fullUser.country}</span>
                                    {profile.craft && <span className="luxury-tag">{profile.craft}</span>}
                                    <span className={`luxury-status luxury-status--${profile.employmentStatus === "open" ? "live" : "active"}`}>
                                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor" }} />
                                        {profile.employmentStatus === "open" ? "Open to collaborate" : "Building"}
                                    </span>
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: 10, flexShrink: 0, flexWrap: "wrap" }}>
                                <button onClick={() => setIsEditModalOpen(true)} className="btn-secondary">
                                    <Pencil size={13} /> Edit Profile
                                </button>
                                {isBuilder && (
                                    <button onClick={() => setIsAddProjectModalOpen(true)} className="btn-primary">
                                        <Plus size={13} /> New Venture
                                    </button>
                                )}
                            </div>
                        </div>
                    </FadeUp>
                </div>
            </div>

            {/* ── Stats Strip ── */}
            <div style={{ background: "#fff", borderBottom: "1px solid rgba(13,13,13,.07)", padding: "32px 0" }}>
                <div className="luxury-container">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
                        {STATS.map((s, i) => (
                            <div key={s.label} style={{
                                padding: "0 24px",
                                borderRight: i < 3 ? "1px solid rgba(13,13,13,.07)" : "none",
                                textAlign: "center"
                            }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 6 }}>
                                    {s.icon}
                                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 500, color: "rgba(13,13,13,.35)", letterSpacing: ".18em", textTransform: "uppercase" }}>
                                        {s.label}
                                    </p>
                                </div>
                                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1 }}>
                                    {s.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Main Content ── */}
            <div className="luxury-container" style={{ paddingTop: 64, paddingBottom: 80 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }}>

                    {/* Left Column */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

                        {/* Skills & Guilds Card */}
                        <FadeUp delay={0.1}>
                            <div className="luxury-card" style={{ padding: 32, position: "relative", overflow: "hidden" }}>
                                <div className="luxury-card-accent" />
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                                    <div>
                                        <p className="luxury-overline" style={{ marginBottom: 16 }}>Equipped Skills</p>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                            {profile.skills && profile.skills.length > 0 ? (
                                                profile.skills.map((s: string) => (
                                                    <span key={s} style={{
                                                        padding: "5px 12px",
                                                        background: "rgba(13,13,13,.04)",
                                                        border: "1px solid rgba(13,13,13,.08)",
                                                        borderRadius: 8,
                                                        fontFamily: "'DM Sans',sans-serif",
                                                        fontSize: 12,
                                                        color: "var(--ink)",
                                                        cursor: "default",
                                                        transition: "border-color .3s"
                                                    }}>{s}</span>
                                                ))
                                            ) : (
                                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)" }}>No skills added yet.</p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="luxury-overline" style={{ marginBottom: 16 }}>Active Guilds</p>
                                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                            {profile.guilds && profile.guilds.length > 0 ? (
                                                profile.guilds.map(g => (
                                                    <div key={g} style={{
                                                        display: "flex", alignItems: "center", gap: 8,
                                                        padding: "8px 12px",
                                                        background: "rgba(201,163,83,.06)",
                                                        border: "1px solid rgba(201,163,83,.15)",
                                                        borderRadius: 10,
                                                        fontFamily: "'DM Sans',sans-serif",
                                                        fontSize: 12, color: "#8B6B1A"
                                                    }}>
                                                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#C9A353", flexShrink: 0 }} />
                                                        {g}
                                                    </div>
                                                ))
                                            ) : (
                                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)" }}>No guilds joined.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid rgba(13,13,13,.07)" }}>
                                    <p className="luxury-overline" style={{ marginBottom: 12 }}>Preferred Engagement Lengths</p>
                                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                        {profile.preferredProjectLength && profile.preferredProjectLength.length > 0 ? (
                                            profile.preferredProjectLength.map(len => (
                                                <span key={len} className="luxury-tag">{len}</span>
                                            ))
                                        ) : (
                                            <span className="luxury-tag">Any Duration</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </FadeUp>

                        {/* GitHub Heatmap & Activity */}
                        {githubUsername && (
                            <FadeUp delay={0.2}>
                                <div className="luxury-card" style={{ padding: 32, position: "relative", overflow: "hidden", marginBottom: 32 }}>
                                    <div className="luxury-card-accent" />

                                    {/* Header with Year Selector */}
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <GitCommit size={16} style={{ color: "#C9A353" }} />
                                            <p className="luxury-overline">{githubUsername}&apos;s Contribution Heatmap ({selectedYear})</p>
                                        </div>

                                        <div style={{ display: "flex", gap: 4, background: "rgba(13,13,13,.03)", padding: 4, borderRadius: 10 }}>
                                            {[2026, 2025, 2024].map(y => (
                                                <button
                                                    key={y}
                                                    onClick={() => setSelectedYear(y)}
                                                    style={{
                                                        padding: "6px 16px",
                                                        borderRadius: 8,
                                                        border: "none",
                                                        cursor: "pointer",
                                                        fontFamily: "'DM Sans',sans-serif",
                                                        fontSize: 12,
                                                        fontWeight: selectedYear === y ? 600 : 400,
                                                        background: selectedYear === y ? "#C9A353" : "transparent",
                                                        color: selectedYear === y ? "#fff" : "var(--smoke)",
                                                        transition: "all .2s ease"
                                                    }}
                                                >
                                                    {y}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ overflowX: "auto" }} className="no-scrollbar">
                                        <GitHubCalendar
                                            username={githubUsername}
                                            year={selectedYear}
                                            colorScheme="light"
                                            theme={{ light: ['#F0EDE5', '#e5d9b8', '#d4c080', '#c9a353', '#a07820'] }}
                                            fontSize={10}
                                            blockSize={11}
                                            blockMargin={4}
                                        />
                                    </div>
                                </div>

                                {/* Activity Timeline */}
                                <div style={{ paddingLeft: 8 }}>
                                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontWeight: 400, color: "var(--ink)", marginBottom: 24 }}>Contribution Activity</h3>

                                    <div style={{ position: "relative", paddingLeft: 32 }}>
                                        <div style={{ position: "absolute", left: 11, top: 0, bottom: 0, width: 1, background: "rgba(13,13,13,.06)" }}></div>

                                        {githubLoading ? (
                                            <div style={{ padding: "20px 0", color: "var(--smoke)", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
                                                <div className="animate-spin" style={{ width: 12, height: 12, border: "2px solid #C9A353", borderTopColor: "transparent", borderRadius: "50%" }}></div>
                                                Refining real-time data...
                                            </div>
                                        ) : activity ? (
                                            <>
                                                <div style={{ marginBottom: 24, position: "relative" }}>
                                                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 13, background: "var(--cream)", display: "inline-block", paddingRight: 12, color: "var(--ink)" }}>
                                                        {activity.month} <span style={{ fontWeight: 400, color: "var(--smoke)" }}>{selectedYear}</span>
                                                    </p>
                                                    <div style={{ height: 1, background: "rgba(13,13,13,.08)", position: "absolute", top: 10, left: 80, right: 0, zIndex: -1 }}></div>
                                                </div>

                                                {/* Commits */}
                                                {activity.commitCount > 0 && (
                                                    <div style={{ marginBottom: 32, position: "relative" }}>
                                                        <div style={{ position: "absolute", left: -32, top: 0, width: 22, height: 22, borderRadius: "50%", background: "var(--parchment)", border: "1px solid rgba(13,13,13,.1)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                                                            <GitCommit size={12} style={{ color: "var(--smoke)" }} />
                                                        </div>
                                                        <h4 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)", marginBottom: 12 }}>Created {activity.commitCount} commits in {activity.repoCount} repositories</h4>
                                                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                                            {activity.commitsByRepo.map(repo => (
                                                                <div key={repo.name} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                                                    <Link href={`https://github.com/${repo.name}`} target="_blank" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#C9A353", textDecoration: "none", flex: 1, fontWeight: 500 }}>{repo.name}</Link>
                                                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                                                        <span style={{ fontSize: 12, color: "var(--smoke)", minWidth: 60, textAlign: "right" }}>{repo.count} commits</span>
                                                                        <div style={{ width: 100, height: 5, background: "rgba(13,13,13,.04)", borderRadius: 3, overflow: "hidden" }}>
                                                                            <div style={{ width: `${repo.percent}%`, height: "100%", background: "#C9A353" }}></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Repos */}
                                                {activity.newRepos.length > 0 && (
                                                    <div style={{ marginBottom: 20, position: "relative" }}>
                                                        <div style={{ position: "absolute", left: -32, top: 0, width: 22, height: 22, borderRadius: "50%", background: "var(--parchment)", border: "1px solid rgba(13,13,13,.1)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                                                            <Plus size={12} style={{ color: "var(--smoke)" }} />
                                                        </div>
                                                        <h4 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink)", marginBottom: 12 }}>Created {activity.newRepos.length} repositories</h4>
                                                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                                            {activity.newRepos.map(repo => (
                                                                <div key={repo.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                                    <Link href={`https://github.com/${repo.name}`} target="_blank" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#C9A353", textDecoration: "none", fontWeight: 500 }}>{repo.name}</Link>
                                                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: repo.color }}></div>
                                                                        <span style={{ fontSize: 12, color: "var(--smoke)" }}>{repo.lang}</span>
                                                                        <span style={{ fontSize: 11, color: "rgba(13,13,13,.2)" }}>{repo.date}</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {activity.commitCount === 0 && activity.newRepos.length === 0 && (
                                                    <div style={{ padding: "20px 0", color: "var(--smoke)", fontSize: 13, fontStyle: "italic" }}>
                                                        No contribution events found in this period.
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div style={{ padding: "24px", background: "rgba(13,13,13,.02)", borderRadius: 12, border: "1px dashed rgba(13,13,13,.1)", textAlign: "center" }}>
                                                <AlertCircle size={16} style={{ color: "var(--smoke)", margin: "0 auto 8px", opacity: 0.5 }} />
                                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>
                                                    {selectedYear < 2026
                                                        ? `GitHub historic events for ${selectedYear} are no longer available via public API.`
                                                        : "No recent activity found. Start shipping to see your logs!"}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </FadeUp>
                        )}

                        {/* Launched Ventures */}
                        <FadeUp delay={0.25}>
                            <div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                                    <div>
                                        <p className="luxury-overline" style={{ marginBottom: 4 }}>Proof of Execution</p>
                                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--ink)" }}>
                                            Launched Ventures
                                        </h2>
                                    </div>
                                    <button onClick={() => setIsAddProjectModalOpen(true)} className="btn-secondary" style={{ fontSize: 12, padding: "10px 18px" }}>
                                        <Plus size={12} /> Add Venture
                                    </button>
                                </div>

                                {profile.projects && profile.projects.length > 0 ? (
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                        {profile.projects.map(proj => (
                                            <motion.div
                                                key={proj.id}
                                                className="luxury-card"
                                                style={{ padding: 24, cursor: "default", position: "relative", overflow: "hidden" }}
                                                whileHover={{ scale: 1.01 }}
                                            >
                                                <div className="luxury-card-accent" />
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                                                    <span className="luxury-tag">{proj.type}</span>
                                                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontStyle: "italic", color: "#C9A353" }}>{proj.score}</span>
                                                </div>
                                                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 400, color: "var(--ink)", marginBottom: 8, lineHeight: 1.4 }}>
                                                    {proj.name}
                                                </h3>
                                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)", lineHeight: 1.6, marginBottom: 12 }}>
                                                    {proj.description}
                                                </p>
                                                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                                    {(proj.tags || []).map((t: string) => (
                                                        <span key={t} style={{
                                                            padding: "2px 8px", background: "rgba(13,13,13,.04)", border: "1px solid rgba(13,13,13,.07)",
                                                            borderRadius: 6, fontSize: 10, color: "var(--smoke)"
                                                        }}>{t}</span>
                                                    ))}
                                                </div>
                                                {proj.url && (
                                                    <a href={proj.url} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 14, fontSize: 11, color: "#C9A353", textDecoration: "none" }}>
                                                        <ExternalLink size={10} /> View Project
                                                    </a>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="luxury-card" style={{ padding: 48, textAlign: "center" }}>
                                        <div className="hex-shape" style={{
                                            width: 48, height: 48,
                                            background: "linear-gradient(135deg, rgba(201,163,83,.12), rgba(201,163,83,.04))",
                                            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px"
                                        }}>
                                            <Zap size={18} style={{ color: "#C9A353" }} />
                                        </div>
                                        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", color: "var(--ink)", marginBottom: 8 }}>
                                            No ventures launched yet
                                        </p>
                                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)", marginBottom: 20 }}>
                                            Your Ship Log begins with your first logged venture.
                                        </p>
                                        <button onClick={() => setIsAddProjectModalOpen(true)} className="btn-primary">
                                            <Plus size={13} /> Launch First Venture
                                        </button>
                                    </div>
                                )}
                            </div>
                        </FadeUp>
                    </div>

                    {/* Right Column — Sidebar */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

                        {/* Profile card */}
                        <FadeUp delay={0.05}>
                            <div className="luxury-card" style={{ padding: 28, position: "relative", overflow: "hidden" }}>
                                <div className="luxury-card-accent" />
                                <p className="luxury-overline" style={{ marginBottom: 8 }}>Crowning Venture</p>
                                {profile.bestProject ? (
                                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", color: "var(--ink)", fontStyle: "italic" }}>
                                        {profile.bestProject}
                                    </p>
                                ) : (
                                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--smoke)" }}>Not set</p>
                                )}
                                <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(13,13,13,.07)" }}>
                                    <p className="luxury-overline" style={{ marginBottom: 8 }}>Bounty Status</p>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: profile.openToBounties ? "#5B8A6F" : "#C9A353" }} />
                                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--ink)" }}>
                                            {profile.openToBounties ? `Open · Min $${profile.minBountyReward}` : "Closed to bounties"}
                                        </p>
                                    </div>
                                </div>
                                <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                                    {profile.githubUrl && (
                                        <a href={profile.githubUrl} target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#C9A353", display: "flex", alignItems: "center", gap: 4, textDecoration: "none" }}>
                                            <ExternalLink size={11} /> GitHub ↗
                                        </a>
                                    )}
                                    {profile.portfolioUrl && (
                                        <a href={profile.portfolioUrl} target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#C9A353", display: "flex", alignItems: "center", gap: 4, textDecoration: "none" }}>
                                            <ExternalLink size={11} /> Portfolio ↗
                                        </a>
                                    )}
                                </div>
                            </div>
                        </FadeUp>

                        {/* Live Pulse */}
                        <FadeUp delay={0.15}>
                            <div className="luxury-card" style={{ padding: 24, maxHeight: 380, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
                                <div className="luxury-card-accent" />
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5B8A6F" }} />
                                    <p className="luxury-overline">Ecosystem Pulse</p>
                                </div>
                                <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
                                    {pulseEvents.slice(0, 6).map(event => (
                                        <div key={event.id}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                                                <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 12, color: "var(--ink)" }}>{event.builder}</span>
                                            </div>
                                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "var(--smoke)", lineHeight: 1.5 }}>
                                                {event.action} <span style={{ color: "var(--ink)", fontWeight: 500 }}>&quot;{event.project}&quot;</span>
                                            </p>
                                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, color: "rgba(13,13,13,.25)", marginTop: 4 }}>
                                                {new Date(event.timestamp || Date.now()).toLocaleTimeString()}
                                            </p>
                                            <div style={{ height: 1, background: "rgba(13,13,13,.06)", marginTop: 10 }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeUp>

                        {/* Quick Links */}
                        <FadeUp delay={0.2}>
                            <div className="luxury-card" style={{ padding: 20, position: "relative", overflow: "hidden" }}>
                                <div className="luxury-card-accent" />
                                <p className="luxury-overline" style={{ marginBottom: 14 }}>Quick Access</p>
                                {[
                                    { label: "Explore Feed", href: "/feed" },
                                    { label: "Guild Missions", href: "/guilds" },
                                    { label: "Leaderboard", href: "/leaderboard" },
                                    { label: "Settings", href: "/settings" },
                                ].map(l => (
                                    <Link key={l.href} href={l.href} style={{
                                        display: "flex", alignItems: "center", justifyContent: "space-between",
                                        padding: "10px 14px", borderRadius: 10, fontFamily: "'DM Sans',sans-serif",
                                        fontSize: 13, color: "var(--ink)", textDecoration: "none",
                                        transition: "background .2s"
                                    }}
                                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(201,163,83,.07)")}
                                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                                    >
                                        {l.label}
                                        <ChevronRight size={13} style={{ color: "#C9A353" }} />
                                    </Link>
                                ))}
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </div>
        </div>
    );
}
