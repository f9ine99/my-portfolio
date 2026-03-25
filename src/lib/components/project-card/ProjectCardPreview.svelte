<script lang="ts">
  import { Lock, Star } from 'lucide-svelte';
  import type { Project } from '$lib/data/projects';

  interface Props {
    preview: Project['preview'];
    languages?: Project['languages'];
    isPrivate?: boolean;
    slug: string;
    isHovered?: boolean;
  }

  let { preview, languages, isPrivate = false, slug, isHovered = false }: Props = $props();
</script>

<div class="preview-container" class:card-hovered={isHovered}>
  <div class="terminal-header">
    <div class="dots">
      <span class="dot red"></span>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
    </div>

    {#if isPrivate}
      <div class="private-badge">
        <Lock size={11} />
        <span>Private</span>
      </div>
    {:else if slug === 'termus-melesu'}
      <div class="public-badge">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="os-icon-enhanced">
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
          <path d="m3.3 7 8.7 5 8.7-5" class="inner-path"/>
          <path d="M12 22V12" class="inner-path"/>
          <path d="m10 14-2 2 2 2" class="code-symbol"/>
          <path d="m14 18 2-2-2-2" class="code-symbol"/>
        </svg>
        <span>Open Source</span>
      </div>
    {:else if preview.stars}
      <div class="stars">
        <span>{preview.stars}</span>
        <Star size={12} fill="currentColor" />
      </div>
    {/if}
  </div>

  <div class="terminal-body">
    <div class="repo-info">
      <span class="owner">f9ine99</span>
      <span class="separator">/</span>
      <span class="name">{preview.repo}</span>
    </div>

    <p class="repo-desc">{preview.description}</p>

    {#if preview.contributors}
      <div class="contributors">
        <div class="avatar-stack">
          {#each preview.contributors as contributor}
            <div class="avatar-wrapper">
              <img
                src={contributor.avatar}
                alt={contributor.name}
                class="mini-avatar"
                loading="lazy"
                decoding="async"
                width="36"
                height="36"
              />
              <div class="avatar-tooltip">{contributor.name}</div>
            </div>
          {/each}
        </div>
        <span class="ctb-count">
          {preview.contributors.length}
          {preview.contributors.length === 1 ? 'Contributor' : 'Contributors'}
        </span>
      </div>
    {/if}

    {#if languages && languages.length > 0}
      <div class="language-bar">
        <div class="bar-track">
          {#each languages as lang}
            <div class="bar-segment" style="width: {lang.percentage}%; background: {lang.color}"></div>
          {/each}
        </div>
        <div class="bar-labels">
          {#each languages as lang}
            <div class="lang-label">
              <span class="lang-dot" style="background: {lang.color}"></span>
              <span class="lang-name">{lang.name}</span>
              <span class="lang-pct">{lang.percentage}%</span>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .preview-container {
    background: var(--terminal-bg);
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid var(--border-subtle);
  }

  .terminal-header {
    background: var(--overlay-light);
    padding: 0.6rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border-subtle);
  }

  .dots {
    display: flex;
    gap: 0.4rem;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .red {
    background: #ff5f56;
  }

  .yellow {
    background: #ffbd2e;
  }

  .green {
    background: #27c93f;
  }

  .private-badge,
  .public-badge {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.65rem;
    font-family: var(--font-mono);
    padding: 0.2rem 0.55rem;
    border-radius: 6px;
    opacity: 0.8;
  }

  .private-badge {
    color: var(--text-muted);
    background: var(--overlay-medium);
    border: 1px solid var(--border-medium);
  }

  .public-badge {
    color: var(--accent-orange);
    background: rgba(var(--accent-orange-rgb, 255, 158, 100), 0.1);
    border: 1px solid rgba(var(--accent-orange-rgb, 255, 158, 100), 0.2);
    transition: all 0.3s ease;
  }

  .public-badge:hover {
    background: rgba(var(--accent-orange-rgb, 255, 158, 100), 0.15);
    border-color: rgba(var(--accent-orange-rgb, 255, 158, 100), 0.4);
    box-shadow: 0 0 8px rgba(var(--accent-orange-rgb, 255, 158, 100), 0.2);
    transform: translateY(-1px);
  }

  .os-icon-enhanced {
    animation: float 3s ease-in-out infinite;
    filter: drop-shadow(0 0 2px rgba(var(--accent-orange-rgb, 255, 158, 100), 0.4));
  }

  .inner-path {
    opacity: 0.4;
  }

  .code-symbol {
    animation: pulse 2s ease-in-out infinite;
  }

  .stars {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.75rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
  }

  .terminal-body {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    font-family: var(--font-mono);
  }

  .repo-info {
    font-size: 0.85rem;
    font-weight: 600;
  }

  .owner {
    color: var(--accent-orange);
    opacity: 0.8;
  }

  .separator {
    color: var(--text-muted);
    padding: 0 2px;
  }

  .name {
    color: var(--text-primary);
  }

  .repo-desc {
    font-size: 0.8rem;
    color: var(--text-muted);
    line-height: 1.5;
    margin: 0;
  }

  .contributors {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  .avatar-stack {
    display: flex;
    align-items: center;
    padding-left: 5px;
  }

  .avatar-wrapper {
    margin-left: -12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 1;
  }

  .avatar-wrapper:hover {
    z-index: 10;
    transform: translateY(-8px) scale(1.15);
    margin-right: 8px;
    margin-left: 4px;
  }

  .avatar-wrapper:first-child {
    margin-left: 0;
  }

  .avatar-wrapper:hover .avatar-tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(-15px);
    pointer-events: auto;
  }

  .avatar-tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(0);
    background: rgba(13, 13, 15, 0.95);
    backdrop-filter: blur(12px);
    border: 1px solid var(--accent-orange);
    color: var(--accent-orange);
    padding: 0.5rem 1rem;
    border-radius: 10px;
    font-size: 0.8rem;
    font-weight: 500;
    font-family: var(--font-mono);
    letter-spacing: 0.04em;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 50;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 158, 100, 0.2);
  }

  .avatar-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px;
    border-style: solid;
    border-color: var(--accent-orange) transparent transparent transparent;
  }

  .mini-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid var(--terminal-bg);
    display: block;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .ctb-count {
    font-size: 0.75rem;
    color: var(--text-muted);
    opacity: 0.8;
    margin-left: 0.5rem;
  }

  .language-bar {
    margin-top: 1rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border-subtle);
  }

  .bar-track {
    display: flex;
    height: 6px;
    border-radius: 3px;
    overflow: hidden;
    gap: 2px;
  }

  .bar-segment {
    border-radius: 3px;
    transition: opacity 0.2s ease;
  }

  .preview-container.card-hovered .bar-segment {
    opacity: 0.85;
  }

  .bar-labels {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 0.6rem;
  }

  .lang-label {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.7rem;
    color: var(--text-muted);
  }

  .lang-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .lang-name {
    font-weight: 500;
    color: var(--text-primary);
    opacity: 0.85;
  }

  .lang-pct {
    opacity: 0.6;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-2px);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.6;
    }

    50% {
      opacity: 1;
    }
  }
</style>
