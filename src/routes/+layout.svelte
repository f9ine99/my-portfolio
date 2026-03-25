<script lang="ts">
  import { onMount } from 'svelte';
  import { themeState, loadSavedTheme } from '$lib/theme.svelte';
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  let { children } = $props();

  onMount(() => {
    loadSavedTheme();
  });

  // Apply background effect class to body & persist changes
  let prevBgEffect: boolean | undefined;
  $effect(() => {
    if (themeState.bgEffect) {
      document.body.classList.add('bg-effect-on');
    } else {
      document.body.classList.remove('bg-effect-on');
    }
    // Persist bgEffect when it changes (not on initial load)
    if (prevBgEffect !== undefined && prevBgEffect !== themeState.bgEffect) {
      try {
        const saved = localStorage.getItem('theme-prefs');
        const prefs = saved ? JSON.parse(saved) : {};
        prefs.bgEffect = themeState.bgEffect;
        localStorage.setItem('theme-prefs', JSON.stringify(prefs));
      } catch { /* ignore */ }
    }
    prevBgEffect = themeState.bgEffect;
  });
</script>

<Navbar />
<div class="app-container">
  {@render children()}
</div>
<Footer />

<style>
  .app-container {
    padding: 0;
    min-height: calc(100vh - 200px);
  }
</style>
