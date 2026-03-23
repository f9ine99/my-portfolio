<script lang="ts">
  import { page } from '$app/state';
  import { projects } from '$lib/data/projects';
  import { 
    Calendar, 
    Github, 
    ArrowLeft,
    Star,
    Globe,
    ExternalLink,
    Code2,
    Users,
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
    Flame,
    Zap,
    Shield,
    Cpu,
    CheckCircle2,
    Sparkles,
    Cloud,
    Triangle,
    Hexagon
  } from 'lucide-svelte';
  import { fly, fade, scale } from 'svelte/transition';
  import { backOut, quintOut } from 'svelte/easing';

  const slug = page.params.slug;
  const project = projects.find(p => p.slug === slug);

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

<svelte:head>
  <title>{project?.title || 'Project'} | Firaol Gemeda</title>
  <meta name="description" content={project?.longDescription?.slice(0, 160) || 'Project details'} />
</svelte:head>

{#if project}
  <main class="project-detail">
    <div class="container">

      <!-- Back Navigation -->
      <a href="/projects" class="back-link" in:fly={{ x: -20, duration: 400 }}>
        <ArrowLeft size={16} />
        <span>Back to Projects</span>
      </a>

      <!-- Hero Section -->
      <div class="hero" in:fly={{ y: 30, duration: 600, easing: backOut }}>
        <!-- Terminal Preview Card -->
        <div class="terminal-card">
          <div class="terminal-preview">
            <div class="terminal-header">
              <div class="dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              {#if project.isPrivate}
                <div class="private-badge">
                  <Lock size={12} />
                  <span>Private</span>
                </div>
              {:else if project.preview.stars}
                <div class="stars-badge">
                  <span>{project.preview.stars}</span>
                  <Star size={12} fill="currentColor" />
                </div>
              {/if}
            </div>
            <div class="terminal-body">
              <div class="repo-info">
                <span class="owner">f9ine99</span>
                <span class="separator">/</span>
                <span class="repo-name">{project.preview.repo}</span>
              </div>
              <p class="repo-desc">{@html project.preview.description}</p>
              
              {#if project.preview.contributors}
                <div class="contributors">
                  <div class="avatar-stack">
                    {#each project.preview.contributors as avatar}
                      <img src={avatar} alt="Contributor" class="avatar" />
                    {/each}
                  </div>
                  <span class="ctb-text">{project.preview.contributors.length} Contributors</span>
                </div>
              {/if}

              <!-- Language Bar inside terminal -->
              {#if project.languages && project.languages.length > 0}
                <div class="language-bar">
                  <div class="bar-track">
                    {#each project.languages as lang}
                      <div class="bar-segment" style="width: {lang.percentage}%; background: {lang.color}"></div>
                    {/each}
                  </div>
                  <div class="bar-labels">
                    {#each project.languages as lang}
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
        </div>
      </div>

      <!-- Project Info Section -->
      <div class="info-section" in:fly={{ y: 30, duration: 600, delay: 200, easing: backOut }}>
        <div class="title-row">
          <h1 class="project-title">{project.title}</h1>
        </div>
        
        <div class="meta-row">
          <div class="meta-item">
            <Calendar size={16} />
            <span>{project.date}</span>
          </div>
          {#if project.preview.contributors}
            <div class="meta-item">
              <Users size={16} />
              <span>{project.preview.contributors.length} {project.preview.contributors.length === 1 ? 'Contributor' : 'Contributors'}</span>
            </div>
          {/if}
        </div>

        <!-- Tags -->
        <div class="tags" in:fade={{ delay: 350, duration: 400 }}>
          {#each project.tags as tag, i}
            <div class="tag" style="--tag-color: {tag.color || 'var(--accent-orange)'}">
              <svelte:component this={getIcon(tag.name)} size={12} />
              <span>{tag.name}</span>
            </div>
          {/each}
        </div>

        <!-- Action Buttons -->
        <div class="actions" in:fade={{ delay: 400, duration: 400 }}>
          {#if project.githubUrl && !project.isPrivate}
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" class="action-btn github">
              <Github size={18} />
              <span>View Source</span>
              <ExternalLink size={14} class="ext-icon" />
            </a>
          {/if}
          {#if project.demoUrl}
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" class="action-btn demo">
              <Globe size={18} />
              <span>Live Demo</span>
              <ExternalLink size={14} class="ext-icon" />
            </a>
          {/if}
        </div>

        <!-- Divider -->
        <div class="divider"></div>

        <!-- Long Description -->
        <div class="content" in:fly={{ y: 20, duration: 500, delay: 500 }}>
          <h2 class="section-heading">About this project</h2>
          <p class="long-description">
            {@html project.longDescription}
          </p>

          {#if project.story}
            <div class="details-section">
              <h3 class="subsection-heading">The Inspiration</h3>
              <p class="project-story">
                {@html project.story}
              </p>
            </div>
          {/if}

        </div>
      </div>
    </div>
  </main>
{:else}
  <div class="not-found" in:fade>
    <Code2 size={48} />
    <h1>Project Not Found</h1>
    <p>The project you're looking for doesn't exist.</p>
    <a href="/projects" class="back-btn">
      <ArrowLeft size={16} />
      Back to Projects
    </a>
  </div>
{/if}

<style>
  /* ===== Layout ===== */
  .project-detail {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10rem 2rem 5rem;
    position: relative;
  }

  /* ===== Back Link ===== */
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.9rem;
    font-family: var(--font-mono);
    margin-bottom: 2.5rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.25s ease;
    border: 1px solid transparent;
    -webkit-tap-highlight-color: transparent;
  }

  .back-link:active {
    transform: scale(0.96);
    opacity: 0.8;
  }

  .back-link:hover {
    color: var(--accent-orange);
    background: rgba(255, 158, 100, 0.06);
    border-color: rgba(255, 158, 100, 0.15);
    transform: translateX(-4px);
  }

  /* ===== Terminal Card ===== */
  .terminal-card {
    background: var(--card-bg);
    border: 1px solid var(--border-subtle);
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 3rem;
    box-shadow: 0 16px 48px var(--shadow-medium);
  }


  .terminal-preview {
    background: var(--terminal-bg);
    border: 1px solid var(--border-medium);
    border-radius: 12px;
    overflow: hidden;
  }

  .terminal-header {
    background: var(--overlay-light);
    padding: 0.75rem 1.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dots { display: flex; gap: 6px; }
  .dot { width: 10px; height: 10px; border-radius: 50%; }
  .red { background: #ff5f56; }
  .yellow { background: #ffbd2e; }
  .green { background: #27c93f; }

  .private-badge {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.75rem;
    color: var(--text-muted);
    background: var(--overlay-medium);
    border: 1px solid var(--border-medium);
    padding: 0.25rem 0.65rem;
    border-radius: 6px;
    font-family: var(--font-mono);
  }

  .stars-badge {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
  }

  .terminal-body {
    padding: 2rem;
  }

  .repo-info {
    font-family: var(--font-mono);
    font-size: 1.4rem;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .owner { color: var(--accent-orange); opacity: 0.85; }
  .repo-name { color: #5cb3fa; font-weight: 600; }
  .separator { opacity: 0.3; color: var(--text-muted); }

  .repo-desc {
    color: var(--text-muted);
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .contributors {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .avatar-stack { display: flex; }

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid rgba(0, 0, 0, 0.4);
    margin-left: -8px;
    transition: transform 0.2s ease;
  }

  .avatar:first-child { margin-left: 0; }
  .avatar:hover { transform: scale(1.15); z-index: 2; }

  .ctb-text {
    font-size: 0.8rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
    opacity: 0.7;
  }

  /* ===== Language Bar ===== */
  .language-bar {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-subtle);
  }

  .bar-track {
    display: flex;
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
    gap: 2px;
  }

  .bar-segment {
    border-radius: 4px;
    min-width: 4px;
  }

  .bar-labels {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 0.75rem;
  }

  .lang-label {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;
    font-family: var(--font-mono);
  }

  .lang-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .lang-name {
    color: var(--text-primary);
    font-weight: 500;
    opacity: 0.85;
  }

  .lang-pct {
    color: var(--text-muted);
    opacity: 0.6;
  }

  /* ===== Info Section ===== */
  .info-section {
    margin-bottom: 4rem;
  }

  .project-title {
    font-size: 3rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: -0.03em;
    line-height: 1.1;
    color: var(--text-primary);
  }

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 2rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }


  .meta-row {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 1.75rem;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: var(--text-muted);
    font-size: 0.95rem;
    font-family: var(--font-mono);
  }

  /* ===== Tags ===== */
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-bottom: 2rem;
  }

  .tag {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: var(--overlay-light);
    border: 1px solid var(--border-medium);
    padding: 0.4rem 0.85rem;
    border-radius: 8px;
    font-size: 0.8rem;
    color: var(--text-primary);
    font-family: var(--font-mono);
    transition: all 0.2s ease;
  }

  .tag:hover {
    border-color: var(--tag-color);
    background: var(--overlay-medium);
  }

  /* ===== Action Buttons ===== */
  .actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .action-btn {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.85rem 1.5rem;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    font-family: var(--font-mono);
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid transparent;
    -webkit-tap-highlight-color: transparent;
  }

  .action-btn:active {
    transform: scale(0.96);
    filter: brightness(0.9);
  }

  .action-btn.github {
    background: var(--overlay-medium);
    color: var(--text-primary);
    border-color: var(--border-medium);
  }

  .action-btn.github:hover {
    background: var(--overlay-heavy);
    border-color: var(--border-medium);
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  .action-btn.demo {
    background: var(--accent-orange);
    color: #000;
    border-color: var(--accent-orange);
  }

  .action-btn.demo:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(255, 158, 100, 0.35);
    filter: brightness(1.1);
  }

  .action-btn :global(.ext-icon) {
    opacity: 0.5;
    transition: all 0.2s ease;
  }

  .action-btn:hover :global(.ext-icon) {
    opacity: 1;
    transform: translate(2px, -2px);
  }

  /* ===== Divider ===== */
  .divider {
    height: 1px;
    background: linear-gradient(to right, rgba(255, 158, 100, 0.2), var(--border-subtle), transparent);
    margin-bottom: 3rem;
  }

  /* ===== Content ===== */
  .section-heading {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
    opacity: 0.9;
  }

  .long-description {
    font-size: 1.1rem;
    line-height: 1.9;
    color: var(--text-muted);
    max-width: 800px;
    margin-bottom: 3rem;
  }

  .long-description :global(a), .project-story :global(a) {
    color: var(--accent-orange);
    text-decoration: none;
    border-bottom: 1px dotted rgba(255, 158, 100, 0.4);
    transition: all 0.2s ease;
  }

  .long-description :global(a:hover), .project-story :global(a:hover) {
    color: var(--text-primary);
    border-bottom-color: var(--accent-orange);
    background: rgba(255, 158, 100, 0.1);
  }

  .details-section {
    margin-top: 3rem;
  }

  .subsection-heading {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
  }

  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    background: var(--subtle-bg);
    border: 1px solid var(--border-subtle);
    padding: 1rem 1.25rem;
    border-radius: 12px;
    font-size: 0.95rem;
    color: var(--text-muted);
    transition: all 0.3s ease;
  }

  .feature-item:hover {
    background: var(--overlay-medium);
    border-color: var(--border-medium);
    transform: translateY(-2px);
  }

  .project-story {
    font-size: 1.05rem;
    line-height: 1.8;
    color: var(--text-muted);
    font-style: italic;
    border-left: 2px solid var(--accent-orange);
    padding-left: 1.5rem;
    margin-top: 0.5rem;
    opacity: 0.9;
  }

  .feature-icon {
    color: var(--accent-orange);
    margin-top: 0.15rem;
    opacity: 0.8;
  }

  .tech-icon {
    color: #5cb3fa;
    margin-top: 0.15rem;
    opacity: 0.8;
  }

  /* ===== 404 ===== */
  .not-found {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    text-align: center;
    color: var(--text-muted);
    padding: 2rem;
  }

  .not-found h1 {
    font-size: 2rem;
    color: var(--text-primary);
  }

  .not-found p {
    margin-bottom: 1rem;
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--accent-orange);
    text-decoration: none;
    font-family: var(--font-mono);
    padding: 0.6rem 1.25rem;
    border: 1px solid rgba(255, 158, 100, 0.2);
    border-radius: 10px;
    transition: all 0.2s ease;
  }

  .back-btn:hover {
    background: rgba(255, 158, 100, 0.08);
  }

  /* ===== Responsive: Tablet ===== */
  @media (max-width: 768px) {
    .project-detail {
      padding: 11rem 1.25rem 6rem;
    }

    .terminal-card {
      padding: 1.25rem;
      border-radius: 16px;
      margin-bottom: 2.5rem;
    }

    .terminal-body {
      padding: 1.25rem;
    }

    .repo-info {
      font-size: 1.1rem;
    }

    .repo-desc {
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .project-title {
      font-size: 2.25rem;
    }

    .meta-row {
      gap: 1.25rem;
    }

    .meta-item {
      font-size: 0.85rem;
    }

    .actions {
      flex-direction: column;
    }

    .action-btn {
      justify-content: center;
    }

    .section-heading {
      font-size: 1.3rem;
    }

    .long-description {
      font-size: 1rem;
      line-height: 1.75;
    }
  }

  /* ===== Responsive: Mobile ===== */
  @media (max-width: 480px) {
    .project-detail {
      padding: 4.5rem 1rem 5rem;
    }

    .back-link {
      font-size: 0.8rem;
      padding: 0.4rem 0.75rem;
      margin-bottom: 1.75rem;
    }

    .terminal-card {
      padding: 0.75rem;
      border-radius: 12px;
      margin-bottom: 2rem;
    }

    .terminal-header {
      padding: 0.6rem 1rem;
    }

    .terminal-body {
      padding: 1rem;
    }

    .repo-info {
      font-size: 0.95rem;
      flex-wrap: wrap;
    }

    .repo-desc {
      font-size: 0.85rem;
    }

    .avatar {
      width: 24px;
      height: 24px;
    }

    .bar-track {
      height: 6px;
    }

    .bar-labels {
      gap: 0.6rem;
    }

    .lang-label {
      font-size: 0.7rem;
    }

    .lang-dot {
      width: 8px;
      height: 8px;
    }

    .project-title {
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }

    .meta-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }

    .tags {
      gap: 0.4rem;
      margin-bottom: 1.5rem;
    }

    .tag {
      font-size: 0.7rem;
      padding: 0.3rem 0.65rem;
    }

    .actions {
      margin-bottom: 2rem;
    }

    .action-btn {
      font-size: 0.85rem;
      padding: 0.75rem 1.25rem;
    }

    .divider {
      margin-bottom: 2rem;
    }

    .section-heading {
      font-size: 1.15rem;
      margin-bottom: 1rem;
    }

    .long-description {
      font-size: 0.95rem;
      line-height: 1.7;
    }
  }
</style>
