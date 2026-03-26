<script lang="ts">
  import type { Project } from '$lib/data/projects';
  import { sanitizeRichText } from '$lib/utils/sanitizeRichText';
  import { fade } from 'svelte/transition';
  import ProjectCardPreview from '$lib/components/projects/project-card/ProjectCardPreview.svelte';
  import ProjectCardInfo from '$lib/components/projects/project-card/ProjectCardInfo.svelte';
  import ProjectDemoLink from '$lib/components/projects/project-card/ProjectDemoLink.svelte';

  interface Props {
    title: string;
    date: string;
    description: string;
    tags: Project['tags'];
    preview: Project['preview'];
    languages?: Project['languages'];
    isPrivate?: boolean;
    demoUrl?: string;
    slug: string;
  }

  let { title, date, description, tags, preview, languages, isPrivate, demoUrl, slug }: Props = $props();
  const safeDescription = $derived(sanitizeRichText(description));
  let isHovered = $state(false);
</script>

<div
  class="project-card"
  in:fade={{ duration: 400 }}
>
  <a
    href="/projects/{slug}"
    class="card-link"
    onmouseenter={() => (isHovered = true)}
    onmouseleave={() => (isHovered = false)}
  >
    <ProjectCardPreview {preview} {languages} {isPrivate} {slug} {isHovered} />
    <ProjectCardInfo {title} {date} {safeDescription} {tags} />
  </a>

  {#if demoUrl}
    <ProjectDemoLink {demoUrl} />
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
</style>
