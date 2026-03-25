import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

const GITHUB_USERNAME = 'f9ine99';
const GITHUB_TOKEN = env.GITHUB_TOKEN;
const CACHE_TTL_MS = 5 * 60 * 1000;
const RESPONSE_CACHE_CONTROL = 'public, max-age=0, s-maxage=300, stale-while-revalidate=600';

interface GitHubRepo {
    name: string;
    fork: boolean;
}

interface GitHubCommit {
    sha: string;
    commit: {
        message: string;
        author: {
            date: string;
        };
    };
}

interface CommitEntry {
    repo: string;
    msg: string;
    add: number;
    del: number;
    date: string;
}

interface LanguageEntry {
    name: string;
    percent: number;
    color: string;
}

interface HomePayload {
    commits: CommitEntry[];
    languages: LanguageEntry[];
    error?: 'rate_limit' | 'api_error';
}

let cachedPayload: HomePayload | null = null;
let cacheExpiresAt = 0;

function timeAgo(dateStr: string): string {
    try {
        const now = Date.now();
        const then = new Date(dateStr).getTime();
        if (isNaN(then)) return 'Recently';
        const diffMs = now - then;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays}d ago`;
        return new Date(dateStr).toLocaleDateString();
    } catch {
        return 'Recently';
    }
}

function setCache(payload: HomePayload): HomePayload {
    cachedPayload = payload;
    cacheExpiresAt = Date.now() + CACHE_TTL_MS;
    return payload;
}

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
    setHeaders({
        'cache-control': RESPONSE_CACHE_CONTROL
    });

    if (cachedPayload && Date.now() < cacheExpiresAt) {
        return cachedPayload;
    }

    const headers: Record<string, string> = {
        'User-Agent': 'SvelteKit-Portfolio',
        'Accept': 'application/vnd.github.v3+json'
    };

    if (GITHUB_TOKEN) {
        headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    try {
        // Step 1: Get recently pushed repos
        const reposRes = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=5`,
            { headers }
        );

        if (reposRes.status === 403) {
            console.warn('GitHub API rate limit exceeded');
            return cachedPayload ?? { commits: [], languages: [], error: 'rate_limit' };
        }

        if (!reposRes.ok) {
            console.warn(`GitHub repos API returned ${reposRes.status}`);
            return cachedPayload ?? { commits: [], languages: [], error: 'api_error' };
        }

        const repos = await reposRes.json() as GitHubRepo[];
        if (!Array.isArray(repos) || repos.length === 0) return setCache({ commits: [], languages: [] });

        const topRepos = repos.filter((repo) => !repo.fork).slice(0, 3);

        const commitPromises = topRepos.map(async (repo): Promise<CommitEntry | null> => {
            try {
                const commitsRes = await fetch(
                    `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=1`,
                    { headers }
                );

                if (!commitsRes.ok) return null;

                const commits = await commitsRes.json() as GitHubCommit[];
                if (!Array.isArray(commits) || commits.length === 0) return null;

                const c = commits[0];
                const msg = c.commit.message.split('\n')[0];
                const date = c.commit.author.date;

                return {
                    repo: repo.name,
                    msg,
                    add: 0,
                    del: 0,
                    date: timeAgo(date)
                };
            } catch {
                return null;
            }
        });

        const results = (await Promise.all(commitPromises)).filter(
            (commit): commit is CommitEntry => commit !== null
        );

        // Language stats logic
        const langColors: Record<string, string> = {
            'TypeScript': '#3178c6',
            'JavaScript': '#f1e05a',
            'Svelte': '#ff3e00',
            'CSS': '#563d7c',
            'HTML': '#e34c26',
            'Python': '#3572A5',
            'Go': '#00ADD8',
            'Rust': '#dea584',
            'Java': '#b07219',
            'C++': '#f34b7d',
            'Shell': '#89e051',
            'Dart': '#00B4AB',
            'Kotlin': '#A97BFF',
            'Ruby': '#701516',
            'PHP': '#4F5D95'
        };

        let languages: LanguageEntry[] = [];
        try {
            const allRepos = repos.filter((repo) => !repo.fork).slice(0, 4);
            const langTotals: Record<string, number> = {};

            await Promise.all(
                allRepos.map(async (repo) => {
                    try {
                        const langRes = await fetch(
                            `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/languages`,
                            { headers }
                        );
                        if (!langRes.ok) return;
                        const data = await langRes.json() as Record<string, number>;
                        for (const [lang, bytes] of Object.entries(data)) {
                            langTotals[lang] = (langTotals[lang] || 0) + bytes;
                        }
                    } catch { /* skip */ }
                })
            );

            const totalBytes = Object.values(langTotals).reduce((a, b) => a + b, 0);
            if (totalBytes > 0) {
                languages = Object.entries(langTotals)
                    .sort(([, a], [, b]) => b - a)
                    .map(([name, bytes]) => ({
                        name,
                        percent: Math.round((bytes / totalBytes) * 1000) / 10,
                        color: langColors[name] || '#8b949e'
                    }))
                    .filter(l => l.percent >= 0.5);
            }
        } catch { /* language stats are optional */ }

        return setCache({ commits: results, languages });
    } catch (error) {
        console.error('GitHub fetch failed:', error);
        return cachedPayload ?? { commits: [], languages: [], error: 'api_error' };
    }
};
