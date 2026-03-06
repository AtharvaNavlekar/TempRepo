"use client";
import { useState } from "react";
import Link from "next/link";
import { useGitHubActivity } from "@/hooks/useGitHubActivity";
import { GitHubCalendar } from "react-github-calendar";
import { GitCommit, GitPullRequest, GitBranch, Plus, ChevronDown, Calendar, AlertCircle } from "lucide-react";

export default function Page({ params }: { params: { username: string } }) {
    const { username } = params;
    const [selectedYear, setSelectedYear] = useState(2026);
    const { activity, loading: githubLoading } = useGitHubActivity(username, selectedYear);

    const STATS = [{ l: "Ships", v: "12" }, { l: "Score", v: "842" }, { l: "Guilds", v: "3" }, { l: "Streak", v: "7d" }];
    const YEARS = [2026, 2025, 2024];

    return (
        <div className="luxury-page">
            {/* Profile Header */}
            <div style={{ background: "var(--parchment)", padding: "80px 0 48px", borderBottom: "1px solid rgba(13,13,13,.08)" }}>
                <div className="luxury-container">
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(201,163,83,.08)", border: "1px solid rgba(201,163,83,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", color: "#8B6B1A" }}>{username.charAt(0).toUpperCase()}</div>
                        <div>
                            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)", textTransform: "capitalize" }}>{username.replace(/-/g, ' ')}</h1>
                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)" }}>@{username} · Contributor</p>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: 24, marginTop: 16 }}>
                        {STATS.map(s => (
                            <div key={s.l} style={{ textAlign: "center" }}>
                                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontStyle: "italic", color: "#C9A353" }}>{s.v}</p>
                                <p className="luxury-overline">{s.l}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="luxury-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                    <div style={{ minWidth: 0 }}>
                        {/* Heatmap Section */}
                        <div className="luxury-card" style={{ padding: 32, marginBottom: 32, position: "relative", overflow: "hidden" }}>
                            <div className="luxury-card-accent" />

                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
                                <p className="luxury-overline" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ height: 1, width: 24, background: "#C9A353" }}></span>
                                    {username.toUpperCase()}&apos;S CONTRIBUTION HEATMAP ({selectedYear})
                                </p>

                                <div style={{ display: "flex", gap: 4, background: "rgba(13,13,13,.03)", padding: 4, borderRadius: 10 }}>
                                    {YEARS.map(year => (
                                        <button
                                            key={year}
                                            onClick={() => setSelectedYear(year)}
                                            style={{
                                                padding: "6px 16px",
                                                borderRadius: 8,
                                                border: "none",
                                                cursor: "pointer",
                                                fontFamily: "'DM Sans',sans-serif",
                                                fontSize: 12,
                                                fontWeight: selectedYear === year ? 600 : 400,
                                                background: selectedYear === year ? "#C9A353" : "transparent",
                                                color: selectedYear === year ? "#fff" : "var(--smoke)",
                                                transition: "all .2s ease"
                                            }}
                                        >
                                            {year}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div style={{ overflowX: "auto" }} className="no-scrollbar">
                                <GitHubCalendar
                                    username={username}
                                    year={selectedYear}
                                    colorScheme="light"
                                    theme={{ light: ['#F0EDE5', '#e5d9b8', '#d4c080', '#c9a353', '#a07820'] }}
                                    fontSize={11}
                                    blockSize={12}
                                    blockMargin={4}
                                />
                            </div>
                        </div>

                        {/* Contribution Activity Section */}
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 400, color: "var(--ink)", marginBottom: 24 }}>Contribution Activity</h2>

                        <div style={{ position: "relative", paddingLeft: 32 }}>
                            <div style={{ position: "absolute", left: 11, top: 0, bottom: 0, width: 1, background: "rgba(13,13,13,.06)" }}></div>

                            {githubLoading ? (
                                <div style={{ padding: "20px 0", color: "var(--smoke)", fontSize: 14, display: "flex", alignItems: "center", gap: 10 }}>
                                    <div className="animate-spin" style={{ width: 14, height: 14, border: "2px solid #C9A353", borderTopColor: "transparent", borderRadius: "50%" }}></div>
                                    Synchronizing with GitHub...
                                </div>
                            ) : activity ? (
                                <>
                                    <div style={{ marginBottom: 32, position: "relative" }}>
                                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 13, background: "var(--cream)", display: "inline-block", paddingRight: 12, color: "var(--ink)" }}>{activity.month} <span style={{ fontWeight: 400, color: "var(--smoke)" }}>{selectedYear}</span></p>
                                        <div style={{ height: 1, background: "rgba(13,13,13,.08)", position: "absolute", top: 10, left: 80, right: 0, zIndex: -1 }}></div>
                                    </div>

                                    {/* Commits */}
                                    {activity.commitCount > 0 && (
                                        <div style={{ marginBottom: 40, position: "relative" }}>
                                            <div style={{ position: "absolute", left: -32, top: 0, width: 22, height: 22, borderRadius: "50%", background: "var(--parchment)", border: "1px solid rgba(13,13,13,.1)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                                                <GitCommit size={12} style={{ color: "var(--smoke)" }} />
                                            </div>
                                            <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 15, color: "var(--ink)", marginBottom: 16 }}>Created {activity.commitCount} commits in {activity.repoCount} repositories</h3>
                                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                                {activity.commitsByRepo.map(repo => (
                                                    <div key={repo.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                                                        <Link href={`https://github.com/${repo.name}`} target="_blank" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#C9A353", textDecoration: "none", fontWeight: 500 }}>{repo.name}</Link>
                                                        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, justifyContent: "flex-end" }}>
                                                            <span style={{ fontSize: 12, color: "var(--smoke)", minWidth: 60 }}>{repo.count} commits</span>
                                                            <div style={{ width: 140, height: 6, background: "rgba(13,13,13,.04)", borderRadius: 3, overflow: "hidden" }}>
                                                                <div style={{ width: `${repo.percent}%`, height: "100%", background: "#C9A353", borderRadius: 3 }}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Repositories */}
                                    {activity.newRepos.length > 0 && (
                                        <div style={{ marginBottom: 40, position: "relative" }}>
                                            <div style={{ position: "absolute", left: -32, top: 0, width: 22, height: 22, borderRadius: "50%", background: "var(--parchment)", border: "1px solid rgba(13,13,13,.1)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                                                <Plus size={12} style={{ color: "var(--smoke)" }} />
                                            </div>
                                            <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 15, color: "var(--ink)", marginBottom: 16 }}>Created {activity.newRepos.length} repositories</h3>
                                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                                {activity.newRepos.map(repo => (
                                                    <div key={repo.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                        <Link href={`https://github.com/${repo.name}`} target="_blank" style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 14, color: "#C9A353", textDecoration: "none" }}>{repo.name}</Link>
                                                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                                <div style={{ width: 10, height: 10, borderRadius: "50%", background: repo.color }}></div>
                                                                <span style={{ fontSize: 12, color: "var(--smoke)" }}>{repo.lang}</span>
                                                            </div>
                                                            <span style={{ fontSize: 12, color: "rgba(13,13,13,.2)" }}>{repo.date}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {activity.commitCount === 0 && activity.newRepos.length === 0 && (
                                        <div style={{ padding: "20px 0", color: "var(--smoke)", fontSize: 14, fontStyle: "italic" }}>
                                            No recent contribution events recorded.
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div style={{ padding: "32px", background: "rgba(13,13,13,.02)", borderRadius: 12, border: "1px dashed rgba(13,13,13,.1)", textAlign: "center" }}>
                                    <AlertCircle size={20} style={{ color: "var(--smoke)", margin: "0 auto 12px", opacity: 0.5 }} />
                                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--smoke)" }}>
                                        {selectedYear < 2026
                                            ? `Historic GitHub events for ${selectedYear} are out of range for the public API.`
                                            : "No recent activity found. Connect your GitHub to see live logs!"}
                                    </p>
                                </div>
                            )}

                            <button className="btn-secondary" style={{ width: "100%", justifyContent: "center", marginTop: 20 }}>
                                Show more activity
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
