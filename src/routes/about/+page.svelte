<script lang="ts">
  import About from '$lib/components/About.svelte';
</script>

<div class="about-page">
  <About />
</div>

<style>
  .about-page {
    padding-top: 10rem;
    padding-bottom: 4rem;
  }

  @media (max-width: 768px) {
    .about-page {
      padding-top: 7rem;
    }
  }
</style>
