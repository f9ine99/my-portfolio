<script lang="ts">
  import {
    Shield,
    Cpu,
    Globe,
    Zap,
    Boxes,
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
    Cloud,
    Triangle,
    Hexagon
  } from 'lucide-svelte';
  import type { Project } from '$lib/data/projects';

  interface Props {
    title: string;
    date: string;
    safeDescription: string;
    tags: Project['tags'];
  }

  let { title, date, safeDescription, tags }: Props = $props();

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

<div class="project-info">
  <div class="title-row">
    <h3 class="title">{title}</h3>
    <span class="date">{date}</span>
  </div>

  <p class="description">{@html safeDescription}</p>

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

<style>
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

  @media (max-width: 600px) {
    .title {
      font-size: 1.15rem;
    }
  }
</style>
