<script lang="ts">
  import { Star } from 'lucide-svelte';
  import ProjectCard from './ProjectCard.svelte';

  import { projects } from '$lib/data/projects';
  const featuredProjects = projects
    .filter(p => !['nyx-portfolio', 'detectify', 'xor-encryptor', 'furi-cadaster'].includes(p.slug))
    .slice(0, 2);
</script>

<section class="featured-projects" id="projects">
  <div class="header">
    <div class="title">
      <Star size={32} />
      <h2>Featured Projects</h2>
    </div>
    <a href="/projects" class="view-all desktop-only">View all &rarr;</a>
  </div>
  
  <div class="projects-grid">
    {#each featuredProjects as project}
      <ProjectCard {...project} />
    {/each}
  </div>

  <div class="mobile-footer">
    <a href="/projects" class="view-all mobile-only">View all &rarr;</a>
  </div>
</section>

<style>
  .featured-projects {
    width: 95%;
    max-width: 1200px;
    margin: 6rem auto;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
  }

  .title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--accent-orange);
  }

  .title h2 {
    font-size: 2.25rem;
    color: var(--text-primary);
    font-weight: 700;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .view-all {
    font-size: 0.9rem;
    color: var(--text-primary);
    opacity: 0.8;
    border-bottom: 1px dotted var(--text-muted);
    padding-bottom: 2px;
  }

  .view-all:hover {
    opacity: 1;
    color: var(--accent-orange);
    border-bottom-color: var(--accent-orange);
  }

  .mobile-footer {
    display: flex;
    justify-content: center;
  }

  @media (min-width: 769px) {
    .mobile-only {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .desktop-only {
      display: none;
    }

    .featured-projects {
      margin: 2rem auto;
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }

    .title h2 {
      font-size: 1.75rem;
    }

    .title :global(svg) {
      width: 28px !important;
      height: 28px !important;
    }
  }
</style>
