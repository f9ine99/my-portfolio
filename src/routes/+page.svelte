<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import Socials from '$lib/components/Socials.svelte';
  import WorkHistory from '$lib/components/WorkHistory.svelte';
  import FeaturedProjects from '$lib/components/FeaturedProjects.svelte';
  import TypingTest from '$lib/components/TypingTest.svelte';
  import BentoStats from '$lib/components/BentoStats.svelte';

  let { data } = $props();
  // console.log('Loaded Data:', data);
</script>

<main>
  <Hero />
  <Socials />
  <WorkHistory />
  <TypingTest />
  <FeaturedProjects />
  <BentoStats commits={data.commits} languages={data.languages} />
</main>

<style>
  main {
    animation: fadeIn 0.8s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
