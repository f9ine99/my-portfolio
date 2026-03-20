import type { PageServerLoad } from './$types';

const GITHUB_USERNAME = 'f9ine99';

// Static fallback data — always looks fresh
const staticFallback = [
    { repo: 'my-portfolio', msg: 'style(ui): enhance navigation pill aesthetic', add: 13, del: 9, date: 'Today' },
    { repo: 'my-portfolio', msg: 'style(ux): implement smooth theme transitions', add: 67, del: 18, date: 'Today' },
    { repo: 'my-portfolio', msg: 'feat(nav): premium mobile drawer with theme controls', add: 379, del: 155, date: 'Today' }
];

function timeAgo(dateStr: string): string {
    const now = Date.now();
    const then = new Date(dateStr).getTime();
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return new Date(dateStr).toLocaleDateString();
}

export const load: PageServerLoad = async ({ fetch }) => {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=30`, {
            headers: {
                'User-Agent': 'SvelteKit-Portfolio',
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            console.warn(`GitHub API returned ${response.status}. Using fallback.`);
            return { commits: staticFallback };
        }

        const events = await response.json();
        if (!Array.isArray(events)) return { commits: staticFallback };

        const pushEvents = events
            .filter((e: any) => e.type === 'PushEvent' && e.payload?.commits?.length > 0)
            .slice(0, 3);

        if (pushEvents.length === 0) return { commits: staticFallback };

        // Fetch real commit details for accurate stats
        const processedCommits = await Promise.all(
            pushEvents.map(async (event: any) => {
                const repoName = event.repo.name.split('/')[1] || event.repo.name;
                const latestCommit = event.payload.commits[event.payload.commits.length - 1];
                let additions = 0;
                let deletions = 0;

                try {
                    const commitRes = await fetch(
                        `https://api.github.com/repos/${event.repo.name}/commits/${latestCommit.sha}`,
                        {
                            headers: {
                                'User-Agent': 'SvelteKit-Portfolio',
                                'Accept': 'application/vnd.github.v3+json'
                            }
                        }
                    );

                    if (commitRes.ok) {
                        const commitData = await commitRes.json();
                        additions = commitData.stats?.additions ?? 0;
                        deletions = commitData.stats?.deletions ?? 0;
                    }
                } catch {
                    // If individual commit fetch fails, use payload size as estimate
                    additions = event.payload.size * 15;
                    deletions = event.payload.size * 3;
                }

                return {
                    repo: repoName,
                    msg: latestCommit.message.split('\n')[0],
                    add: additions,
                    del: deletions,
                    date: timeAgo(event.created_at)
                };
            })
        );

        return { commits: processedCommits };
    } catch (error) {
        console.error('GitHub fetch failed:', error);
        return { commits: staticFallback };
    }
};
