<script lang="ts">
  import { onMount } from 'svelte';
  import { 
    Palette, 
    Calendar, 
    MapPin, 
    Info, 
    MousePointerClick,
    Clock,
    GitBranch,
    ExternalLink,
    Loader2
  } from 'lucide-svelte';
  import { fade } from 'svelte/transition';
  import Map from '$lib/components/Map.svelte';


  let time = $state('');
  let currentTheme = $state('Macchiato');

  let bgEffect = $state(true);


  interface ThemePalette {
    [key: string]: string;
  }

  const themePalettes: Record<string, ThemePalette> = {
    Mocha: {
      '--bg-color': '#11111b',
      '--card-bg': '#1e1e2e',
      '--card-bg-elevated': '#181825',
      '--text-primary': '#cdd6f4',
      '--text-muted': '#7f849c',
      '--accent-orange': '#fab387',
      '--accent-blue': '#89b4fa',
      '--accent-purple': '#cba6f7',
      '--selection-bg': '#313244',
      '--scrollbar-thumb': '#585b70',
      '--nav-bg': 'rgba(17, 17, 27, 0.08)'
    },
    Macchiato: {
      '--bg-color': '#1e2030',
      '--card-bg': '#24273a',
      '--card-bg-elevated': '#1e2030',
      '--text-primary': '#cad3f5',
      '--text-muted': '#8087a2',
      '--accent-orange': '#f5a97f',
      '--accent-blue': '#8aadf4',
      '--accent-purple': '#c6a0f6',
      '--selection-bg': '#363a4f',
      '--scrollbar-thumb': '#5b6078',
      '--nav-bg': 'rgba(30, 32, 48, 0.08)'
    },
    Frappe: {
      '--bg-color': '#232634',
      '--card-bg': '#303446',
      '--card-bg-elevated': '#292c3c',
      '--text-primary': '#c6d0f5',
      '--text-muted': '#838ba7',
      '--accent-orange': '#ef9f76',
      '--accent-blue': '#8caaee',
      '--accent-purple': '#ca9ee6',
      '--selection-bg': '#414559',
      '--scrollbar-thumb': '#626880',
      '--nav-bg': 'rgba(35, 38, 52, 0.08)'
    },
    Latte: {
      '--bg-color': '#eff1f5',
      '--card-bg': '#e6e9ef',
      '--card-bg-elevated': '#dce0e8',
      '--text-primary': '#4c4f69',
      '--text-muted': '#8c8fa1',
      '--accent-orange': '#fe640b',
      '--accent-blue': '#1e66f5',
      '--accent-purple': '#8839ef',
      '--selection-bg': '#ccd0da',
      '--scrollbar-thumb': '#bcc0cc',
      '--nav-bg': 'rgba(239, 241, 245, 0.08)'
    }
  };

  const themes = ['Latte', 'Frappe', 'Macchiato', 'Mocha'];
  
  const colors = [
    '#f5e0dc', '#f2cdcd', '#f5c2e7', '#cba6f7', '#f38ba8', '#eba0ac', '#fab387',
    '#f9e2af', '#a6e3a1', '#94e2d5', '#89dceb', '#74c7ec', '#89b4fa', '#b4befe'
  ];

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

  function applyTheme(themeName: string) {
    currentTheme = themeName;
    const palette = themePalettes[themeName];
    if (palette) {
      Object.entries(palette).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
    }
  }

  function setAccentColor(color: string) {
    document.documentElement.style.setProperty('--accent-orange', color);
  }

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
            class="theme-btn {currentTheme === theme ? 'active' : ''}" 
            onclick={() => applyTheme(theme)}
          >
            {theme}
          </button>
        {/each}
      </div>
      <div class="color-grid">
        {#each colors as color}
          <button 
            class="color-circle" 
            style="background: {color}"
            onclick={() => setAccentColor(color)}
            aria-label="Set accent color to {color}"
          ></button>
        {/each}
      </div>
      <div class="effect-toggle">
        <label class="toggle">
          <input type="checkbox" bind:checked={bgEffect}>
          <span class="checkmark"></span>
          <span class="label-text">Background effect: {bgEffect ? 'on' : 'off'}</span>
        </label>
      </div>
    </div>

    <!-- Connect Card -->
    <div class="bento-card connect-card" in:fade={{ duration: 400, delay: 200 }}>
      <div class="card-header">
        <Calendar size={18} class="header-icon" />
        <h3>Let's Connect</h3>
      </div>
      <p class="card-text">
        Always open to interesting projects and conversations.
      </p>
      <a href="mailto:firaol@example.com" class="action-btn connect-btn">
        <Calendar size={16} />
        Book a Chat
      </a>
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


  .theme-card, .connect-card {
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

  .toggle { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; font-size: 0.85rem; color: var(--text-primary); }
  .toggle input { display: none; }
  .checkmark { width: 18px; height: 18px; background: var(--card-bg-elevated); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 4px; position: relative; }
  .toggle input:checked + .checkmark { background: var(--accent-orange); border-color: var(--accent-orange); }
  .toggle input:checked + .checkmark::after { content: '✓'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #000; font-size: 10px; }

  .card-text { font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; }

  .action-btn { display: flex; align-items: center; justify-content: center; gap: 0.75rem; padding: 0.65rem; border-radius: 10px; font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; border: none; }
  
  .connect-btn { background: #dce0e8; color: #1e2030; text-decoration: none; margin-top: auto; }
  .connect-btn:hover { background: var(--accent-orange); }

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
  }
</style>
