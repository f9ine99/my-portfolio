<script lang="ts">
  import { onMount } from 'svelte';
  import { ExternalLink, GitBranch, Loader2 } from 'lucide-svelte';
  import { fade } from 'svelte/transition';

  interface Commit {
    repo: string;
    msg: string;
    add: number;
    del: number;
    date?: string;
  }

  interface Language {
    name: string;
    percent: number;
    color: string;
  }

  interface Props {
    commits: Commit[];
    languages: Language[];
    error: string;
  }

  let { commits, languages, error }: Props = $props();

  const finalCommits = $derived(commits);
  let isInitialLoad = $state(true);
  let isLoadingCommits = $derived(isInitialLoad && commits.length === 0 && !error);
  let hoveredLang = $state<Language | null>(null);

  onMount(() => {
    isInitialLoad = false;
  });
</script>

<div class="bento-card commits-card" in:fade={{ duration: 400, delay: 500 }}>
  <div class="card-header">
    <GitBranch size={18} class="header-icon" />
    <h3>Recent Commits</h3>
    {#if isLoadingCommits}
      <Loader2 size={14} class="animate-spin header-tag" />
    {:else}
      <span class="header-tag">[{error ? 'error' : 'live'}]</span>
    {/if}
  </div>

  <div class="commits-container">
    <div class="commits-list">
      {#if error === 'rate_limit'}
        <div class="commit-item error-state">
          <span class="commit-msg">
            <span class="error-text">Rate limit exceeded.</span> Provide a GITHUB_TOKEN in .env to fix this.
          </span>
        </div>
      {:else if error}
        <div class="commit-item error-state">
          <span class="commit-msg">Failed to fetch recent activity from GitHub.</span>
        </div>
      {:else}
        {#each finalCommits as commit}
          <div class="commit-item">
            <span class="commit-msg">
              <span class="repo-name">{commit.repo}:</span> {commit.msg}
            </span>
            {#if commit.repo !== 'error'}
              <span class="commit-stats">
                <span class="add">+{commit.add}</span> / <span class="del">-{commit.del}</span>
                <span class="commit-date">{commit.date}</span>
              </span>
            {/if}
          </div>
        {:else}
          <div class="commit-item empty-state">
            <span class="commit-msg">No recent public push events found.</span>
          </div>
        {/each}
      {/if}
    </div>
  </div>

  <div class="commits-footer">
    <a href="https://github.com/f9ine99" target="_blank" rel="noopener noreferrer" class="github-link">
      View on GitHub <ExternalLink size={14} />
    </a>

    <div class="lang-bar-wrapper">
      {#if hoveredLang}
        <div class="lang-tooltip">
          <span class="lang-dot" style="background: {hoveredLang.color}"></span>
          {hoveredLang.name} <span class="lang-pct">{hoveredLang.percent}%</span>
        </div>
      {/if}

      <div class="activity-bar" class:loading={isLoadingCommits}>
        {#if languages && languages.length > 0}
          {#each languages as lang}
            <div
              class="bar-segment"
              style="width: {lang.percent}%; background: {lang.color};"
              role="presentation"
              onmouseenter={() => (hoveredLang = lang)}
              onmouseleave={() => (hoveredLang = null)}
              ontouchstart={() => (hoveredLang = lang)}
            ></div>
          {/each}
        {:else}
          <div class="bar-segment" style="width: 100%; background: var(--selection-bg);"></div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .card-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
  }

  :global(.header-icon) {
    color: var(--accent-orange);
  }

  h3 {
    font-size: 1rem;
    margin: 0;
    color: var(--text-primary);
    font-weight: 500;
  }

  .header-tag {
    margin-left: auto;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-muted);
    opacity: 0.7;
  }

  .commits-container {
    background: var(--bg-color);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 1.25rem;
    position: relative;
    overflow: hidden;
  }

  .commits-list {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .commit-item {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    line-height: 1.4;
    color: var(--text-primary);
  }

  .repo-name {
    color: var(--text-muted);
  }

  .commit-stats {
    white-space: nowrap;
    margin-left: 1rem;
  }

  .add {
    color: var(--accent-green);
  }

  .del {
    color: var(--accent-red);
  }

  .commit-date {
    color: var(--text-muted);
    margin-left: 0.5rem;
    font-size: 0.7rem;
    opacity: 0.7;
  }

  .error-state,
  .empty-state {
    padding: 0.5rem 0;
    opacity: 0.8;
  }

  .error-text {
    color: var(--accent-red);
    font-weight: 600;
  }

  .commits-footer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: auto;
  }

  .github-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: var(--text-muted);
    text-decoration: none;
    width: fit-content;
    transition: color 0.2s;
  }

  .github-link:hover {
    color: var(--accent-blue);
  }

  .lang-bar-wrapper {
    position: relative;
  }

  .lang-tooltip {
    position: absolute;
    top: -28px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--card-bg-elevated);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    padding: 0.25rem 0.6rem;
    font-size: 0.7rem;
    font-family: var(--font-mono);
    color: var(--text-primary);
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 0.35rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 10;
    pointer-events: none;
  }

  .lang-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .lang-pct {
    color: var(--text-muted);
  }

  .activity-bar {
    display: flex;
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
    width: 100%;
    background: var(--card-bg-elevated);
  }

  .bar-segment {
    height: 100%;
    transition: width 0.3s, opacity 0.2s;
    cursor: pointer;
  }

  .bar-segment:hover {
    opacity: 0.8;
  }

  .activity-bar.loading .bar-segment {
    opacity: 0.3;
    animation: pulse 1.5s infinite;
  }

  :global(.animate-spin) {
    animation: spin 1s linear infinite;
  }

  @keyframes pulse {
    0% {
      opacity: 0.3;
    }

    50% {
      opacity: 0.6;
    }

    100% {
      opacity: 0.3;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 600px) {
    .commit-item {
      flex-direction: column;
      gap: 0.25rem;
      align-items: flex-start;
    }

    .commit-msg {
      overflow: hidden;
      text-overflow: ellipsis;
      line-clamp: 2;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 0.75rem;
    }

    .commit-stats {
      margin-left: 0;
      font-size: 0.7rem;
      opacity: 0.8;
    }
  }
</style>
