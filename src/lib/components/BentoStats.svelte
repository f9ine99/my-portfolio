<script>
  import { onMount } from 'svelte';
  import { 
    Palette, 
    Calendar, 
    MapPin, 
    Info, 
    MousePointerClick,
    Clock
  } from 'lucide-svelte';
  import { fade } from 'svelte/transition';

  let localClicks = $state(0);
  let globalClicks = $state(790151);
  let time = $state('');
  let currentTheme = $state('Macchiato');
  let bgEffect = $state(true);

  const themePalettes = {
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

  function applyTheme(themeName) {
    currentTheme = themeName;
    const palette = themePalettes[themeName];
    Object.entries(palette).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }

  function setAccentColor(color) {
    document.documentElement.style.setProperty('--accent-orange', color);
  }

  function updateTime() {
    const now = new Date();
    time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  }

  function handlePulse() {
    localClicks++;
    globalClicks++;
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
    <div class="bento-card theme-card">
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
    <div class="bento-card connect-card">
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
    <div class="bento-card location-card">
      <div class="card-header">
        <MapPin size={18} class="header-icon" />
        <h3>Currently Based In 📍</h3>
      </div>
      <div class="map-container">
        <img src="/addis_ababa_dark_map.png" alt="Addis Ababa Map" class="map-img">
        <div class="map-overlay">
          <span>ADDIS ABABA</span>
        </div>
      </div>
      <div class="location-footer">
        <span class="city">Addis Ababa, ET</span>
        <div class="local-time">
          <Clock size={14} />
          <span>{time}</span>
        </div>
      </div>
    </div>

    <!-- Global Counter Card -->
    <div class="bento-card counter-card">
      <div class="card-header right">
        <Info size={18} class="info-icon" />
      </div>
      <div class="counter-display">
        <span class="count">{globalClicks.toLocaleString()}</span>
        <button class="action-btn click-btn" onclick={handlePulse}>
          CLICK ME
        </button>
        <p class="local-stats">
          you've clicked {localClicks} times
        </p>
      </div>
    </div>
  </div>
</section>

<style>
  .bento-stats {
    width: 95%;
    max-width: 1200px;
    margin: 6rem auto;
    display: flex;
    justify-content: center;
  }

  .bento-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    width: 95%;
    max-width: 1200px;
  }

  .bento-card {
    background: var(--card-bg);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    transition: transform 0.2s, border-color 0.2s, background-color 0.3s;
  }

  .bento-card:hover {
    border-color: rgba(255, 255, 255, 0.1);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .card-header.right {
    justify-content: flex-end;
  }

  .header-icon {
    color: var(--accent-orange);
  }

  .info-icon {
    color: var(--text-muted);
    opacity: 0.5;
  }

  h3 {
    font-size: 1rem;
    margin: 0;
    color: var(--text-primary);
    font-weight: 500;
  }

  .theme-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .theme-btn {
    background: var(--card-bg-elevated);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 0.5rem;
    color: var(--text-muted);
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .theme-btn.active {
    background: var(--selection-bg);
    border-color: var(--accent-orange);
    color: var(--text-primary);
  }

  .color-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
  }

  .color-circle {
    width: 20px;
    height: 20px;
    border-radius: 6px;
    opacity: 0.8;
    border: none;
    cursor: pointer;
    transition: transform 0.2s, opacity 0.2s;
  }

  .color-circle:hover {
    transform: scale(1.2);
    opacity: 1;
  }

  .toggle {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    font-size: 0.85rem;
    color: var(--text-primary);
  }

  .toggle input { display: none; }

  .checkmark {
    width: 18px;
    height: 18px;
    background: var(--card-bg-elevated);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    position: relative;
  }

  .toggle input:checked + .checkmark {
    background: var(--accent-orange);
    border-color: var(--accent-orange);
  }

  .toggle input:checked + .checkmark::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #000;
    font-size: 10px;
  }

  .card-text {
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.6;
  }

  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.75rem;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: transform 0.1s, opacity 0.2s;
    border: none;
  }

  .connect-btn {
    background: var(--accent-orange);
    color: #000;
    text-decoration: none;
    margin-top: auto;
    opacity: 0.9;
  }

  .map-container {
    height: 150px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    background: var(--bg-color);
  }

  .map-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.6;
  }

  .map-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: rgba(255, 255, 255, 0.4);
    pointer-events: none;
  }

  .location-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
  }

  .local-time {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--accent-orange);
  }

  .counter-display {
    text-align: center;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .count {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 1rem;
    font-family: var(--font-mono);
  }

  .click-btn {
    background: var(--accent-orange);
    color: #000;
    width: 80%;
    margin: 0 auto;
    opacity: 0.9;
  }

  .local-stats {
    margin-top: 1.5rem;
    font-size: 0.8rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
  }

  .action-btn:active {
    transform: scale(0.95);
  }

  @media (max-width: 1100px) {
    .bento-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    .bento-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
