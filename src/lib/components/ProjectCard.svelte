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
    Activity,
    CircuitBoard,
    Hash,
    Cable,
    Flame
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

  let { title, date, description, tags, preview, languages, isPrivate, demoUrl, slug } = $props<Props>();

  // Map tag names to proper identity icons
  const getIcon = (tagName: string) => {
    const lower = tagName.toLowerCase();
    // Frameworks & Libraries
    if (lower.includes('next')) return Globe;
    if (lower.includes('svelte')) return Flame;
    if (lower.includes('react')) return Zap;
    if (lower.includes('vite')) return Zap;
    if (lower.includes('shadcn')) return Paintbrush;
    // Languages
    if (lower.includes('typescript')) return FileCode;
    if (lower.includes('javascript')) return FileCode;
    if (lower.includes('python')) return TerminalIcon;
    if (lower.includes('assembly') || lower.includes('x86')) return CircuitBoard;
    if (lower.includes('html') || lower.includes('css')) return Layout;
    // Backend & Auth
    if (lower.includes('flask') || lower.includes('fastapi')) return Server;
    if (lower.includes('jwt')) return Key;
    if (lower.includes('websocket')) return Cable;
    // Databases
    if (lower.includes('supabase') || lower.includes('sql') || lower.includes('sqlite')) return Database;
    // Categories
    if (lower.includes('pwa')) return Smartphone;
    if (lower.includes('security')) return Shield;
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
      {/if}
      {#if preview.stars}
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
        <div class="tag" style="--tag-color: {tag.color || 'var(--accent-orange)'}">
          <svelte:component this={tag.icon || getIcon(tag.name)} size={14} />
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
        <ExternalLink size={14} class="external-icon" />
      </a>
    {/if}
</div>

<style>
  .project-card {
    background: var(--card-bg);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    height: 100%;
    position: relative;
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
    background: #1e1e2e; /* Slate/Darker background for terminal */
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .terminal-header {
    background: rgba(255, 255, 255, 0.03);
    padding: 0.6rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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

  .private-badge {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.65rem;
    color: var(--text-muted);
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.2rem 0.55rem;
    border-radius: 6px;
    font-family: var(--font-mono);
    opacity: 0.8;
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
    border: 2px solid #1e1e2e;
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
    border-top: 1px solid rgba(255, 255, 255, 0.05);
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
    background: rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    font-size: 0.75rem;
    font-family: var(--font-mono);
    color: var(--text-primary);
    border: 1px solid rgba(255, 255, 255, 0.05);
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
