<script lang="ts">
  import { ArrowLeft, Code2 } from 'lucide-svelte';
  import { fade } from 'svelte/transition';
</script>

<div class="not-found" in:fade>
  <Code2 size={48} />
  <h1>Project Not Found</h1>
  <p>The project you're looking for doesn't exist.</p>
  <a href="/projects" class="back-btn">
    <ArrowLeft size={16} />
    Back to Projects
  </a>
</div>

<style>
  .not-found {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    text-align: center;
    color: var(--text-muted);
    padding: 2rem;
  }

  .not-found h1 {
    font-size: 2rem;
    color: var(--text-primary);
  }

  .not-found p {
    margin-bottom: 1rem;
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--accent-orange);
    text-decoration: none;
    font-family: var(--font-mono);
    padding: 0.6rem 1.25rem;
    border: 1px solid rgba(255, 158, 100, 0.2);
    border-radius: 10px;
    transition: all 0.2s ease;
  }

  .back-btn:hover {
    background: rgba(255, 158, 100, 0.08);
  }
</style>
