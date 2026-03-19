<script>
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  let { children } = $props();
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
