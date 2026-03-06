import { useState, useEffect } from 'react';
import { fetchGitHubActivity, ActivitySummary } from '@/lib/github';

/**
 * Hook to fetch and manage GitHub contribution activity.
 */
export function useGitHubActivity(username: string, year: number) {
    const [activity, setActivity] = useState<ActivitySummary | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!username) return;

        let isMounted = true;

        async function loadActivity() {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchGitHubActivity(username, year);
                if (isMounted) {
                    setActivity(data);
                    if (!data) {
                        // We set null but no explicit error unless fetch failed completely
                        // This allows UI to handle "No data for this year" fallback
                    }
                }
            } catch (err) {
                if (isMounted) {
                    setError("Failed to fetch GitHub activity");
                    console.error(err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadActivity();

        return () => {
            isMounted = false;
        };
    }, [username, year]);

    return { activity, loading, error };
}
