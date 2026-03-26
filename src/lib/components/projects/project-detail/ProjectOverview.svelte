<script lang="ts">
  import type { Project } from '$lib/data/projects';
  import {
    Calendar,
    Github,
    Star,
    Globe,
    ExternalLink,
    Users,
    Shield,
    Cpu,
    Database,
    Key,
    Server,
    Smartphone,
    Layout,
    Terminal as TerminalIcon,
    FileCode,
    Activity,
    CircuitBoard,
    Hash,
    Cable,
    Flame,
    Zap,
    Cloud,
    Boxes,
    Triangle,
    Hexagon
  } from 'lucide-svelte';
  import { fly, fade } from 'svelte/transition';
  import { backOut } from 'svelte/easing';

  interface Props {
    project: Project;
    safeLongDescription: string;
    safeStory: string;
  }

  let { project, safeLongDescription, safeStory }: Props = $props();

  const getIcon = (tagName: string) => {
    const lower = tagName.toLowerCase();

    if (lower.includes('next')) return Triangle;
    if (lower.includes('svelte')) return Flame;
    if (lower.includes('react')) return Zap;
    if (lower.includes('vite')) return Zap;

    if (lower.includes('typescript') || lower.includes('javascript')) return FileCode;
    if (lower.includes('python')) return TerminalIcon;
    if (lower.includes('assembly') || lower.includes('x86')) return CircuitBoard;
    if (lower.includes('html') || lower.includes('css')) return Layout;

    if (lower.includes('nest')) return Hexagon;
    if (lower.includes('flask') || lower.includes('fastapi')) return Server;
    if (lower.includes('cloudflare')) return Cloud;
    if (lower.includes('docker')) return Boxes;

    if (lower.includes('better') || lower.includes('auth') || lower.includes('jwt')) return Key;
    if (lower.includes('security') || lower.includes('shield')) return Shield;

    if (lower.includes('supabase') || lower.includes('sql') || lower.includes('postgre')) return Database;
    if (lower.includes('websocket') || lower.includes('cable')) return Cable;

    if (lower.includes('pwa')) return Smartphone;
    if (lower.includes('ai') || lower.includes('groq')) return Cpu;
    if (lower.includes('monitoring')) return Activity;
    if (lower.includes('low-level')) return CircuitBoard;
    if (lower.includes('web') || lower.includes('site')) return Globe;

    return Hash;
  };
</script>

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
        <span>
          {project.preview.contributors.length}
          {project.preview.contributors.length === 1 ? 'Contributor' : 'Contributors'}
        </span>
      </div>
    {/if}

    {#if project.preview.stars}
      <div class="meta-item">
        <Star size={16} />
        <span>{project.preview.stars} stars</span>
      </div>
    {/if}
  </div>

  <div class="tags" in:fade={{ delay: 350, duration: 400 }}>
    {#each project.tags as tag}
      {@const Icon = getIcon(tag.name)}
      <div class="tag" style="--tag-color: {tag.color || 'var(--accent-orange)'}">
        <Icon size={12} />
        <span>{tag.name}</span>
      </div>
    {/each}
  </div>

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

  <div class="divider"></div>

  <div class="content" in:fly={{ y: 20, duration: 500, delay: 500 }}>
    <h2 class="section-heading">About this project</h2>
    <p class="long-description">{@html safeLongDescription}</p>

    {#if project.story}
      <div class="details-section">
        <h3 class="subsection-heading">The Inspiration</h3>
        <p class="project-story">{@html safeStory}</p>
      </div>
    {/if}
  </div>
</div>

<style>
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

  .divider {
    height: 1px;
    background: linear-gradient(to right, rgba(255, 158, 100, 0.2), var(--border-subtle), transparent);
    margin-bottom: 3rem;
  }

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

  .long-description :global(a),
  .project-story :global(a) {
    color: var(--accent-orange);
    text-decoration: none;
    border-bottom: 1px dotted rgba(255, 158, 100, 0.4);
    transition: all 0.2s ease;
  }

  .long-description :global(a:hover),
  .project-story :global(a:hover) {
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

  @media (max-width: 768px) {
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

  @media (max-width: 480px) {
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
