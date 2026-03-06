/**
 * github.ts — Utility for fetching real-time data from GitHub API
 */

export interface GitHubEvent {
    id: string;
    type: string;
    actor: {
        login: string;
    };
    repo: {
        id: number;
        name: string;
        url: string;
    };
    payload: {
        action?: string;
        ref?: string;
        ref_type?: string;
        commits?: {
            sha: string;
            message: string;
            url: string;
        }[];
    };
    created_at: string;
}

export interface ActivitySummary {
    year: number;
    month: string;
    commitCount: number;
    repoCount: number;
    commitsByRepo: {
        name: string;
        count: number;
        percent: number;
    }[];
    newRepos: {
        name: string;
        lang: string;
        color: string;
        date: string;
    }[];
}

const LANGUAGE_COLORS: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Java: "#b07219",
    "C++": "#f34b7d",
    Go: "#00ADD8",
    Rust: "#dea584",
    HTML: "#e34c26",
    CSS: "#563d7c",
};

/**
 * Fetches activity events for a user and parses them into a summary format.
 * Note: GitHub Events API only returns the last 90 days.
 */
export async function fetchGitHubActivity(username: string, year: number): Promise<ActivitySummary | null> {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/events`);
        if (!response.ok) return null;

        const events: GitHubEvent[] = await response.json();

        // Filter by year (though events are usually only recent 90 days)
        const yearEvents = events.filter(e => new Date(e.created_at).getFullYear() === year);

        if (yearEvents.length === 0) return null;

        const commitsByRepo: Record<string, number> = {};
        const newReposSet = new Set<string>();
        const newReposDetail: ActivitySummary['newRepos'] = [];
        let totalCommits = 0;

        yearEvents.forEach(event => {
            if (event.type === "PushEvent") {
                const count = event.payload.commits?.length || 0;
                commitsByRepo[event.repo.name] = (commitsByRepo[event.repo.name] || 0) + count;
                totalCommits += count;
            } else if (event.type === "CreateEvent" && event.payload.ref_type === "repository") {
                if (!newReposSet.has(event.repo.name)) {
                    newReposSet.add(event.repo.name);
                    newReposDetail.push({
                        name: event.repo.name,
                        lang: "Unknown", // Language requires another API call, using placeholder
                        color: "#8b6b1a",
                        date: new Date(event.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                    });
                }
            }
        });

        const sortedCommits = Object.entries(commitsByRepo)
            .map(([name, count]) => ({
                name,
                count,
                percent: totalCommits > 0 ? Math.round((count / totalCommits) * 100) : 0
            }))
            .sort((a, b) => b.count - a.count);

        return {
            year,
            month: new Date(yearEvents[0].created_at).toLocaleString('default', { month: 'long' }),
            commitCount: totalCommits,
            repoCount: Object.keys(commitsByRepo).length,
            commitsByRepo: sortedCommits,
            newRepos: newReposDetail
        };
    } catch (error) {
        console.error("Error fetching GitHub activity:", error);
        return null;
    }
}
