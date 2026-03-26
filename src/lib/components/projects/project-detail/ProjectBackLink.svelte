<script lang="ts">
  import { ArrowLeft } from 'lucide-svelte';
  import { fly } from 'svelte/transition';
</script>

<a href="/projects" class="back-link" in:fly={{ x: -20, duration: 400 }}>
  <ArrowLeft size={16} />
  <span>Back to Projects</span>
</a>

<style>
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.9rem;
    font-family: var(--font-mono);
    margin-bottom: 2.5rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.25s ease;
    border: 1px solid transparent;
    -webkit-tap-highlight-color: transparent;
  }

  .back-link:active {
    transform: scale(0.96);
    opacity: 0.8;
  }

  .back-link:hover {
    color: var(--accent-orange);
    background: rgba(255, 158, 100, 0.06);
    border-color: rgba(255, 158, 100, 0.15);
    transform: translateX(-4px);
  }

  @media (max-width: 480px) {
    .back-link {
      font-size: 0.8rem;
      padding: 0.4rem 0.75rem;
      margin-bottom: 1.75rem;
    }
  }
</style>
