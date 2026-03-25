<script lang="ts">
  import { Palette } from 'lucide-svelte';
  import { themeState, applyTheme, setAccentColor, setBgEffect, themes, colors } from '$lib/theme.svelte';
</script>

<div class="drawer-section">
  <div class="section-title">
    <Palette size={16} />
    <span>FLAVOR</span>
  </div>
  <div class="flavor-grid">
    {#each themes as theme}
      <button class="flavor-btn" class:active={themeState.currentTheme === theme} onclick={() => applyTheme(theme)}>
        {theme}
      </button>
    {/each}
  </div>
</div>

<div class="drawer-section">
  <div class="section-title">
    <div class="color-dot" style="background: var(--accent-orange)"></div>
    <span>ACCENT COLOR</span>
  </div>
  <div class="color-grid">
    {#each colors as color}
      <button
        class="color-circle"
        style="background: {color}; --glow-color: {color}"
        class:active={themeState.currentAccentColor === color}
        onclick={() => setAccentColor(color)}
        aria-label="Set accent color to {color}"
      ></button>
    {/each}
  </div>
</div>

<div class="drawer-section effect-toggle">
  <label class="toggle">
    <input
      type="checkbox"
      checked={themeState.bgEffect}
      onchange={(event) => setBgEffect((event.currentTarget as HTMLInputElement).checked)}
    />
    <span class="checkmark"></span>
    <span class="label-text">Background effect: <span class="status">{themeState.bgEffect ? 'on' : 'off'}</span></span>
  </label>
</div>

<style>
  .drawer-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: var(--text-muted);
    font-size: 0.9rem;
    font-weight: 600;
  }

  .flavor-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.03);
    padding: 0.5rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .flavor-btn {
    background: none;
    border: 1px solid transparent;
    border-radius: 8px;
    padding: 0.6rem;
    color: var(--text-muted);
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
    -webkit-tap-highlight-color: transparent;
  }

  .flavor-btn:active {
    transform: scale(0.98);
  }

  .flavor-btn.active {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
    color: var(--text-primary);
  }

  .color-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
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
    -webkit-tap-highlight-color: transparent;
  }

  .color-circle:active {
    transform: scale(0.9);
  }

  .color-circle.active {
    opacity: 1;
    outline: 2px solid var(--glow-color, currentColor);
    outline-offset: 3px;
    box-shadow: 0 0 4px 1px var(--glow-color, currentColor), 0 0 8px 2px var(--glow-color, currentColor);
    animation: color-glow-pulse 2s ease-in-out infinite;
  }

  .effect-toggle {
    margin-top: 0.5rem;
  }

  .toggle {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .toggle input {
    display: none;
  }

  .checkmark {
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.05);
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
    font-size: 12px;
  }

  .status {
    color: var(--accent-orange);
    font-weight: 600;
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
</style>
