<script lang="ts">
  import { Palette } from 'lucide-svelte';
  import { fade } from 'svelte/transition';
  import { themeState, themes, colors, applyTheme, setAccentColor, setBgEffect } from '$lib/theme.svelte';
</script>

<div class="bento-card theme-card" in:fade={{ duration: 400, delay: 100 }}>
  <div class="card-header">
    <Palette size={18} class="header-icon" />
    <h3>Theme</h3>
  </div>

  <div class="theme-options">
    {#each themes as theme}
      <button class="theme-btn {themeState.currentTheme === theme ? 'active' : ''}" onclick={() => applyTheme(theme)}>
        {theme}
      </button>
    {/each}
  </div>

  <div class="color-grid">
    {#each colors as color}
      <button
        class="color-circle {themeState.currentAccentColor === color ? 'active' : ''}"
        style="background: {color}; --glow-color: {color}"
        onclick={() => setAccentColor(color)}
        aria-label="Set accent color to {color}"
      ></button>
    {/each}
  </div>

  <div class="effect-toggle">
    <label class="toggle">
      <input
        type="checkbox"
        checked={themeState.bgEffect}
        onchange={(event) => setBgEffect((event.currentTarget as HTMLInputElement).checked)}
      />
      <span class="checkmark"></span>
      <span class="label-text">Background effect: {themeState.bgEffect ? 'on' : 'off'}</span>
    </label>
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

  .theme-options {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.4rem;
  }

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

  .color-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.4rem;
  }

  .color-circle {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    opacity: 0.7;
    border: 2px solid transparent;
    outline: 2px solid transparent;
    outline-offset: 3px;
    cursor: pointer;
    transition: transform 0.25s ease, opacity 0.25s ease, outline-color 0.25s ease, box-shadow 0.25s ease;
  }

  .color-circle:hover {
    opacity: 1;
  }

  .color-circle.active {
    opacity: 1;
    outline: 2px solid var(--glow-color, currentColor);
    outline-offset: 3px;
    box-shadow: 0 0 4px 1px var(--glow-color, currentColor), 0 0 8px 2px var(--glow-color, currentColor);
    animation: color-glow-pulse 2s ease-in-out infinite;
  }

  .toggle {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    font-size: 0.85rem;
    color: var(--text-primary);
  }

  .toggle input {
    display: none;
  }

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

  @keyframes color-glow-pulse {
    0%,
    100% {
      box-shadow: 0 0 4px 1px var(--glow-color, currentColor), 0 0 8px 2px var(--glow-color, currentColor);
    }

    50% {
      box-shadow: 0 0 6px 2px var(--glow-color, currentColor), 0 0 12px 4px var(--glow-color, currentColor);
    }
  }

  @media (max-width: 600px) {
    .theme-options {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
