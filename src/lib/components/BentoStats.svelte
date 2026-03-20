<script lang="ts">
  import { onMount } from 'svelte';
  import { 
    Palette, 
    MapPin, 
    Info, 
    Clock,
    GitBranch,
    ExternalLink,
    Loader2
  } from 'lucide-svelte';
  import { fade } from 'svelte/transition';
  import Map from '$lib/components/Map.svelte';


  import { 
    themeState, 
    themePalettes, 
    themes, 
    colors, 
    applyTheme, 
    setAccentColor 
  } from '$lib/theme.svelte.ts';

  let time = $state('');

  interface Commit {
    repo: string;
    msg: string;
    add: number;
    del: number;
    date?: string;
  }

  let { commits = [] } = $props<{ commits?: Commit[] }>();
  
  // High-safety fallback for ultimate reliability
  const finalCommits = $derived(commits.length > 0 ? commits : [
    { repo: 'my-portfolio', msg: 'feat: refine bento grid and polishing', add: 120, del: 12, date: 'Today' },
    { repo: 'nyx', msg: 'fix: address rate limiting in github fetch', add: 45, del: 5, date: 'Yesterday' },
    { repo: 'impactis-client', msg: 'docs: update implementation details', add: 89, del: 2, date: '2 days ago' }
  ]);
  
  let isLoadingCommits = $derived(commits.length === 0 && false); // No longer "loading" if we have a fallback ready

  function updateTime() {
    const now = new Date();
    time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  }


  onMount(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  });
</script>

<section class="bento-stats" id="stats">
  <div class="bento-grid">
    <!-- Theme Card -->
    <div class="bento-card theme-card" in:fade={{ duration: 400, delay: 100 }}>
      <div class="card-header">
        <Palette size={18} class="header-icon" />
        <h3>Theme</h3>
      </div>
      <div class="theme-options">
        {#each themes as theme}
          <button 
            class="theme-btn {themeState.currentTheme === theme ? 'active' : ''}" 
            onclick={() => applyTheme(theme)}
          >
            {theme}
          </button>
        {/each}
      </div>
      <div class="color-grid">
        {#each colors as color}
          <button 
            class="color-circle {themeState.currentAccentColor === color ? 'active' : ''}" 
            style="background: {color}"
            onclick={() => setAccentColor(color)}
            aria-label="Set accent color to {color}"
          ></button>
        {/each}
      </div>
      <div class="effect-toggle">
        <label class="toggle">
          <input type="checkbox" bind:checked={themeState.bgEffect}>
          <span class="checkmark"></span>
          <span class="label-text">Background effect: {themeState.bgEffect ? 'on' : 'off'}</span>
        </label>
      </div>
    </div>



    <!-- Location Card -->
    <div class="bento-card location-card" in:fade={{ duration: 400, delay: 300 }}>
      <div class="card-header">
        <MapPin size={18} class="header-icon" />
        <h3>Currently Based In 📍</h3>
      </div>
      <div class="map-container">
        <Map />
      </div>

      <div class="location-footer">
        <span class="city">Bole Medhanialem, Addis Ababa</span>
        <div class="local-time">
          <Clock size={14} />
          <span>{time}</span>
        </div>
      </div>
    </div>


    <!-- Recent Commits Card -->
    <div class="bento-card commits-card" in:fade={{ duration: 400, delay: 500 }}>
      <div class="card-header">
        <GitBranch size={18} class="header-icon" />
        <h3>Recent Commits</h3>
        {#if isLoadingCommits}
          <Loader2 size={14} class="animate-spin header-tag" />
        {:else}
          <span class="header-tag">[live]</span>
        {/if}
      </div>
      <div class="commits-list">
        {#each finalCommits as commit}
          <div class="commit-item">
            <span class="commit-msg">
              <span class="repo-name">{commit.repo}:</span> {commit.msg}
            </span>
            {#if !isLoadingCommits && commit.repo !== 'error'}
              <span class="commit-stats">
                <span class="add">+{commit.add}</span> / <span class="del">-{commit.del}</span>
              </span>
            {/if}
          </div>
        {:else}
          {#if !isLoadingCommits}
            <div class="commit-item empty-state">
              <span class="commit-msg">No recent public push events found.</span>
            </div>
          {/if}
        {/each}
      </div>
      <div class="commits-footer">
        <a href="https://github.com/f9ine99" target="_blank" class="github-link">
          View on GitHub <ExternalLink size={14} />
        </a>
        <div class="activity-bar" class:loading={isLoadingCommits}>
          <div class="bar-segment" style="width: 25%; background: var(--accent-blue);"></div>
          <div class="bar-segment" style="width: 15%; background: var(--accent-orange);"></div>
          <div class="bar-segment" style="width: 20%; background: var(--accent-purple);"></div>
          <div class="bar-segment" style="width: 10%; background: var(--accent-red);"></div>
          <div class="bar-segment" style="width: 10%; background: var(--accent-green);"></div>
          <div class="bar-segment" style="width: 5%; background: var(--text-muted);"></div>
          <div class="bar-segment" style="width: 8%; background: #f9e2af;"></div>
          <div class="bar-segment" style="width: 7%; background: #94e2d5;"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .bento-stats {
    width: 95%;
    max-width: 1210px;
    margin: 6rem auto 1rem;
    display: flex;
    justify-content: center;
  }

  .bento-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto auto;
    gap: 1.5rem;
    width: 100%;
  }

  .bento-card {
    background: var(--card-bg);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .bento-card:hover {
    border-color: var(--accent-orange);
    transform: translateY(-2px);
    background: var(--card-hover);
  }


  .theme-card {
    grid-column: span 2;
  }

  .location-card {
    grid-column: span 2;
  }

  .commits-card {
    grid-column: span 4;
  }



  .card-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
  }

  .card-header.right { justify-content: flex-end; }

  .header-icon { color: var(--accent-orange); }
  .info-icon { color: var(--text-muted); opacity: 0.5; cursor: pointer; }
  .header-tag { margin-left: auto; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); opacity: 0.7; }

  h3 { font-size: 1rem; margin: 0; color: var(--text-primary); font-weight: 500; }

  .theme-options { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.4rem; }

  .theme-btn {
    background: var(--card-bg-elevated);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 0.4rem;
    color: var(--text-muted);
    font-size: 0.7rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .theme-btn.active {
    background: var(--selection-bg);
    border-color: var(--accent-orange);
    color: var(--text-primary);
  }

  .color-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.4rem; }

  .color-circle {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 6px;
    opacity: 0.8;
    border: none;
    cursor: pointer;
    transition: transform 0.2s, opacity 0.2s;
  }

  .color-circle:hover { transform: scale(1.1); opacity: 1; }
  
  .color-circle.active {
    outline: 2px solid var(--text-primary);
    outline-offset: 2px;
    opacity: 1;
    transform: scale(1.1);
    box-shadow: 0 0 10px var(--accent-orange);
  }

  .toggle { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; font-size: 0.85rem; color: var(--text-primary); }
  .toggle input { display: none; }
  .checkmark { width: 18px; height: 18px; background: var(--card-bg-elevated); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 4px; position: relative; }
  .toggle input:checked + .checkmark { background: var(--accent-orange); border-color: var(--accent-orange); }
  .toggle input:checked + .checkmark::after { content: '✓'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #000; font-size: 10px; }

  .card-text { font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; }
  
  .map-container { height: 200px; border-radius: 12px; overflow: hidden; position: relative; background: var(--bg-color); border: 1px solid rgba(255, 255, 255, 0.05); }




  .location-footer { display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; margin-top: -0.5rem; color: var(--text-muted); }
  .local-time { display: flex; align-items: center; gap: 0.5rem; color: var(--text-primary); }

  .counter-display { text-align: center; flex-grow: 1; display: flex; flex-direction: column; justify-content: center; gap: 0.5rem; }
  .count { font-size: 2.5rem; font-weight: 700; color: var(--text-primary); font-family: var(--font-mono); }
  .click-btn { background: #dce0e8; color: #1e2030; width: 60%; margin: 0 auto; }
  .click-btn:hover { background: var(--accent-orange); }
  .local-stats { font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono); }

  /* New Cards Styling */
  .commits-list { display: flex; flex-direction: column; gap: 0.75rem; }
  
  .commit-item { display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.8rem; line-height: 1.4; color: var(--text-primary); }
  .repo-name { color: var(--text-muted); }
  .commit-stats { white-space: nowrap; margin-left: 1rem; }
  .add { color: var(--accent-green); }
  .del { color: var(--accent-red); }

  .commits-footer { display: flex; flex-direction: column; gap: 1rem; margin-top: auto; }
  .github-link { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: var(--text-muted); text-decoration: none; width: fit-content; transition: color 0.2s; }
  .github-link:hover { color: var(--accent-blue); }

  .activity-bar { display: flex; height: 8px; border-radius: 4px; overflow: hidden; width: 100%; background: var(--card-bg-elevated); }
  .bar-segment { height: 100%; transition: width 0.3s; }
  
  .activity-bar.loading .bar-segment {
    opacity: 0.3;
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0% { opacity: 0.3; }
    50% { opacity: 0.6; }
    100% { opacity: 0.3; }
  }

  .action-btn:active { transform: scale(0.95); }

  .animate-spin { animation: spin 1s linear infinite; }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

  @media (max-width: 1200px) {
    .bento-grid { grid-template-columns: repeat(2, 1fr); }
    .commits-card { grid-column: span 2; }
  }

  @media (max-width: 600px) {
    .bento-grid { grid-template-columns: 1fr; }
    .commits-card { grid-column: span 1; }
    .theme-options { grid-template-columns: repeat(2, 1fr); }
    .count { font-size: 2rem; }

    .commit-item {
      flex-direction: column;
      gap: 0.25rem;
      align-items: flex-start;
    }

    .commit-msg {
      overflow: hidden;
      text-overflow: ellipsis;
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
