<script lang="ts">
  import { page } from '$app/state';
  import { projects } from '$lib/data/projects';
  import { sanitizeRichText } from '$lib/utils/sanitizeRichText';
  import ProjectBackLink from '$lib/components/projects/project-detail/ProjectBackLink.svelte';
  import ProjectHeroCard from '$lib/components/projects/project-detail/ProjectHeroCard.svelte';
  import ProjectOverview from '$lib/components/projects/project-detail/ProjectOverview.svelte';
  import ProjectNotFound from '$lib/components/projects/project-detail/ProjectNotFound.svelte';

  const slug = page.params.slug;
  const project = projects.find((p) => p.slug === slug);
  const safePreviewDescription = $derived(project ? sanitizeRichText(project.preview.description) : '');
  const safeLongDescription = $derived(project ? sanitizeRichText(project.longDescription) : '');
  const safeStory = $derived(project?.story ? sanitizeRichText(project.story) : '');
</script>

<svelte:head>
  <title>{project?.title || 'Project'} | Firaol Gemeda</title>
  <meta name="description" content={project?.longDescription?.slice(0, 160) || 'Project details'} />
</svelte:head>

{#if project}
  <main class="project-detail">
    <div class="container">
      <ProjectBackLink />
      <ProjectHeroCard {project} {safePreviewDescription} />
      <ProjectOverview {project} {safeLongDescription} {safeStory} />
    </div>
  </main>
{:else}
  <ProjectNotFound />
{/if}

<style>
  .project-detail {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10rem 2rem 5rem;
    position: relative;
  }
  @media (max-width: 768px) {
    .project-detail {
      padding: 9.5rem 1.25rem 6rem;
    }
  }

  @media (max-width: 480px) {
    .project-detail {
      padding: 9.5rem 1rem 5rem;
    }
  }
</style>
