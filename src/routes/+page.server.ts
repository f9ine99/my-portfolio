import type { PageServerLoad } from './$types';

const GITHUB_USERNAME = 'f9ine99';

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
        // Step 1: Get recently pushed repos
        const reposRes = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=5`,
            { headers: { 'User-Agent': 'SvelteKit-Portfolio', 'Accept': 'application/vnd.github.v3+json' } }
        );

        if (!reposRes.ok) {
            console.warn(`GitHub repos API returned ${reposRes.status}`);
            return { commits: [] };
        }

        const repos = await reposRes.json();
        if (!Array.isArray(repos) || repos.length === 0) return { commits: [] };

        // Step 2: Fetch the latest commit from each of the top 3 repos
        const topRepos = repos.filter((r: any) => !r.fork).slice(0, 3);

        const commitPromises = topRepos.map(async (repo: any) => {
            try {
                const commitsRes = await fetch(
                    `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=1`,
                    { headers: { 'User-Agent': 'SvelteKit-Portfolio', 'Accept': 'application/vnd.github.v3+json' } }
                );

                if (!commitsRes.ok) return null;

                const commits = await commitsRes.json();
                if (!Array.isArray(commits) || commits.length === 0) return null;

                const c = commits[0];
                const msg = c.commit.message.split('\n')[0];
                const date = c.commit.author.date;

                // Step 3: Fetch individual commit for real stats
                let additions = 0;
                let deletions = 0;
                try {
                    const detailRes = await fetch(
                        `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits/${c.sha}`,
                        { headers: { 'User-Agent': 'SvelteKit-Portfolio', 'Accept': 'application/vnd.github.v3+json' } }
                    );
                    if (detailRes.ok) {
                        const detail = await detailRes.json();
                        additions = detail.stats?.additions ?? 0;
                        deletions = detail.stats?.deletions ?? 0;
                    }
                } catch {
                    // Silently fail — stats will show 0
                }

                return {
                    repo: repo.name,
                    msg,
                    add: additions,
                    del: deletions,
                    date: timeAgo(date)
                };
            } catch {
                return null;
            }
        });

        const results = (await Promise.all(commitPromises)).filter(Boolean);
        return { commits: results };
    } catch (error) {
        console.error('GitHub fetch failed:', error);
        return { commits: [] };
    }
};
