<script lang="ts">
  import BentoThemeCard from '$lib/components/sections/home/bento-stats/BentoThemeCard.svelte';
  import BentoLocationCard from '$lib/components/sections/home/bento-stats/BentoLocationCard.svelte';
  import BentoCommitsCard from '$lib/components/sections/home/bento-stats/BentoCommitsCard.svelte';

  interface Commit {
    repo: string;
    msg: string;
    add: number;
    del: number;
    date?: string;
  }

  interface Language {
    name: string;
    percent: number;
    color: string;
  }

  let { commits = [], languages = [], error = '' } = $props<{ commits?: Commit[]; languages?: Language[]; error?: string }>();
</script>

<section class="bento-stats" id="stats">
  <div class="bento-grid">
    <BentoThemeCard />
    <BentoLocationCard />
    <BentoCommitsCard {commits} {languages} {error} />
  </div>
</section>

<style>
  .bento-stats {
    width: 95%;
    max-width: 1210px;
    margin: 6rem auto 1rem;
    display: flex;
    justify-content: center;
  }

  .bento-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto auto;
    gap: 1.5rem;
    width: 100%;
  }

  :global(.bento-card) {
    background: var(--card-bg);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  :global(.bento-card:hover) {
    border-color: var(--accent-orange);
    transform: translateY(-2px);
    background: var(--card-hover);
  }


  :global(.theme-card) {
    grid-column: span 2;
  }

  :global(.location-card) {
    grid-column: span 2;
  }

  :global(.commits-card) {
    grid-column: span 4;
  }

  @media (max-width: 1200px) {
    .bento-grid { grid-template-columns: repeat(2, 1fr); }
    :global(.commits-card) { grid-column: span 2; }
  }

  @media (max-width: 600px) {
    .bento-grid { grid-template-columns: 1fr; }
    :global(.commits-card) { grid-column: span 1; }
  }
</style>
