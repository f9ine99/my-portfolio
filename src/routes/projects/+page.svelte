<script lang="ts">
  import { Folder } from 'lucide-svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { fade } from 'svelte/transition';
  import { projects } from '$lib/data/projects';
</script>

<svelte:head>
  <title>Projects | Firaol Gemeda</title>
</svelte:head>

<div class="projects-page" in:fade={{ duration: 600 }}>
  <header class="page-header">
    <div class="header-content">
      <Folder size={32} class="header-icon" />
      <h1 class="page-title">Projects</h1>
    </div>
    <p class="subtitle">A collection of things I've built, mostly in the open.</p>
  </header>

  <div class="projects-grid">
    {#each projects as project}
      <ProjectCard {...project} />
    {/each}
  </div>
</div>

<style>
  .projects-page {
    max-width: 1200px;
    margin: 0 auto 4rem;
    padding: 10rem 2rem 0;
  }

  .page-header {
    margin-bottom: 4rem;
  }

  .header-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  :global(.header-icon) {
    color: var(--accent-orange);
  }

  .page-title {
    font-size: 3rem;
    font-weight: 800;
    margin: 0;
    color: var(--text-primary);
    font-family: var(--font-mono);
    letter-spacing: -0.02em;
  }

  .subtitle {
    font-size: 1.1rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
    opacity: 0.8;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 2rem;
  }

  @media (max-width: 768px) {
    .projects-page {
      padding-top: 7rem;
    }

    .page-title {
      font-size: 2.2rem;
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
