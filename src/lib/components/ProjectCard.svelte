<script lang="ts">
  import { 
    Folder, 
    Star, 
    Users, 
    Code2, 
    Shield, 
    Cpu, 
    Globe, 
    Zap,
    Boxes,
    ExternalLink,
    Lock,
    Database,
    Key,
    Server,
    Smartphone,
    Layout,
    Terminal as TerminalIcon,
    FileCode,
    Paintbrush,
    Package,
    Activity,
    CircuitBoard,
    Hash,
    Sparkles,
    Cable,
    Flame,
    Cloud,
    Triangle,
    Hexagon
  } from 'lucide-svelte';
  import { fade } from 'svelte/transition';

  interface Tag {
    name: string;
    icon?: any;
    color?: string;
  }

  interface Props {
    title: string;
    date: string;
    description: string;
    tags: Tag[];
    preview: {
      repo: string;
      description: string;
      stars?: number;
      contributors?: string[];
    };
    languages?: { name: string; color: string; percentage: number }[];
    isPrivate?: boolean;
    demoUrl?: string;
    slug: string;
  }

  let { title, date, description, tags, preview, languages, isPrivate, demoUrl, slug }: Props = $props();

  // Map tag names to proper identity icons
  const getIcon = (tagName: string) => {
    const lower = tagName.toLowerCase();
    
    // Core Frameworks
    if (lower.includes('next')) return Triangle;
    if (lower.includes('svelte')) return Flame;
    if (lower.includes('react')) return Zap;
    if (lower.includes('vite')) return Zap;
    
    // Languages
    if (lower.includes('typescript') || lower.includes('javascript')) return FileCode;
    if (lower.includes('python')) return TerminalIcon;
    if (lower.includes('assembly') || lower.includes('x86')) return CircuitBoard;
    if (lower.includes('html') || lower.includes('css')) return Layout;
    
    // Backend & Cloud
    if (lower.includes('nest')) return Hexagon;
    if (lower.includes('flask') || lower.includes('fastapi')) return Server;
    if (lower.includes('cloudflare')) return Cloud;
    if (lower.includes('docker')) return Boxes;
    
    // Auth & Security
    if (lower.includes('better') || lower.includes('auth') || lower.includes('jwt')) return Key;
    if (lower.includes('security') || lower.includes('shield')) return Shield;
    
    // Data & API
    if (lower.includes('supabase') || lower.includes('sql') || lower.includes('postgre')) return Database;
    if (lower.includes('websocket') || lower.includes('cable')) return Cable;
    
    // Labels & Categories
    if (lower.includes('pwa')) return Smartphone;
    if (lower.includes('ai') || lower.includes('groq')) return Cpu;
    if (lower.includes('monitoring')) return Activity;
    if (lower.includes('low-level')) return CircuitBoard;
    if (lower.includes('web') || lower.includes('site')) return Globe;
    
    return Hash;
  };
</script>

<div class="project-card" in:fade={{ duration: 400 }}>
  <a href="/projects/{slug}" class="card-link">
    <!-- Mini Terminal Preview -->
  <div class="preview-container">
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
            {#each preview.contributors as avatar}
              <img src={avatar} alt="Contributor" class="mini-avatar" />
            {/each}
          </div>
          <span class="ctb-count">{preview.contributors.length} Contributors</span>
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

  <!-- Project Info -->
  <div class="project-info">
    <div class="title-row">
      <h3 class="title">{title}</h3>
      <span class="date">{date}</span>
    </div>
    <p class="description">{@html description}</p>
    
    <div class="tags">
      {#each tags as tag}
        {@const TagIcon = tag.icon || getIcon(tag.name)}
        <div class="tag" style="--tag-color: {tag.color || 'var(--accent-orange)'}">
          <TagIcon size={14} />
          <span>{tag.name}</span>
        </div>
      {/each}
    </div>
  </div>
</a>

    {#if demoUrl}
      <a href={demoUrl} target="_blank" rel="noopener noreferrer" class="demo-link">
        <div class="demo-icon-wrapper">
          <Globe size={14} />
          <span>Live Demo</span>
        </div>
        <span class="external-icon">
          <ExternalLink size={14} />
        </span>
      </a>
    {/if}
</div>

<style>
  .project-card {
    background: var(--card-bg);
    border: 1px solid var(--border-subtle);
    border-radius: 16px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    height: 100%;
    position: relative;
    -webkit-tap-highlight-color: transparent;
  }

  .project-card:active {
    transform: scale(0.98);
    opacity: 0.95;
  }

  .project-card:hover .card-link {
    transform: scale(1.01);
  }

  .card-link {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    flex: 1;
    color: inherit;
    transition: transform 0.3s ease;
  }

  .project-card:hover {
    transform: translateY(-5px);
    border-color: var(--accent-orange);
    background: var(--card-hover);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }

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

  .red { background: #ff5f56; }
  .yellow { background: #ffbd2e; }
  .green { background: #27c93f; }

  .private-badge, .public-badge {
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

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-2px); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
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

  .owner { color: var(--accent-orange); opacity: 0.8; }
  .separator { color: var(--text-muted); padding: 0 2px; }
  .name { color: var(--text-primary); }

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
  }

  .mini-avatar {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid var(--terminal-bg);
    margin-right: -6px;
  }

  .ctb-count {
    font-size: 0.7rem;
    color: var(--text-muted);
    opacity: 0.7;
  }

  /* GitHub-style Language Bar */
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

  .project-card:hover .bar-segment {
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

  .project-info {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    flex: 1;
  }

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
  }

  .title {
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0;
    color: var(--text-primary);
    font-family: var(--font-mono);
  }

  .date {
    font-size: 0.75rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
    white-space: nowrap;
  }

  .description {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text-muted);
    margin: 0;
    font-family: var(--font-mono);
    line-clamp: 3;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .description :global(a) {
    color: var(--accent-orange);
    text-decoration: none;
    border-bottom: 1px dotted rgba(255, 158, 100, 0.4);
    padding-bottom: 1px;
    transition: all 0.2s ease;
  }

  .description :global(a:hover) {
    color: var(--text-primary);
    border-bottom-color: var(--accent-orange);
    background: rgba(255, 158, 100, 0.1);
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 0.5rem;
  }

  .tag {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.3rem 0.7rem;
    background: var(--tag-bg);
    border-radius: 6px;
    font-size: 0.75rem;
    font-family: var(--font-mono);
    color: var(--text-primary);
    border: 1px solid var(--border-subtle);
    transition: all 0.2s;
  }

  .tag:hover {
    border-color: var(--tag-color);
    background: rgba(var(--tag-color), 0.1);
  }

  .demo-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    margin-top: auto;
    padding: 1rem 1.25rem;
    background: rgba(var(--accent-orange-rgb, 255, 158, 100), 0.08);
    border: 1px solid rgba(var(--accent-orange-rgb, 255, 158, 100), 0.15);
    border-radius: 12px;
    color: var(--accent-orange);
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: var(--font-mono);
    -webkit-tap-highlight-color: transparent;
  }

  .demo-link:active {
    transform: scale(0.96);
    filter: brightness(0.9);
  }

  .demo-icon-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .external-icon {
    opacity: 0.5;
    transition: all 0.3s ease;
  }

  .demo-link:hover {
    background: var(--accent-orange);
    color: #000;
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 20px rgba(255, 158, 100, 0.4);
    border-color: transparent;
  }

  .demo-link:hover .external-icon {
    opacity: 1;
    transform: translate(2px, -2px);
  }

  @media (max-width: 600px) {
    .title { font-size: 1.15rem; }
  }
</style>
