<script lang="ts">
  import { ExternalLink, Globe } from 'lucide-svelte';

  interface Props {
    demoUrl: string;
  }

  let { demoUrl }: Props = $props();
</script>

<a href={demoUrl} target="_blank" rel="noopener noreferrer" class="demo-link">
  <div class="demo-icon-wrapper">
    <Globe size={14} />
    <span>Live Demo</span>
  </div>
  <span class="external-icon">
    <ExternalLink size={14} />
  </span>
</a>

<style>
  .demo-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    margin-top: auto;
    padding: 1rem 1.25rem;
    background: rgba(var(--accent-orange-rgb, 255, 158, 100), 0.08);
    border: 1px solid rgba(var(--accent-orange-rgb, 255, 158, 100), 0.15);
    border-radius: 12px;
    color: var(--accent-orange);
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: var(--font-mono);
    -webkit-tap-highlight-color: transparent;
  }

  .demo-link:active {
    transform: scale(0.96);
    filter: brightness(0.9);
  }

  .demo-icon-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .external-icon {
    opacity: 0.5;
    transition: all 0.3s ease;
  }

  .demo-link:hover {
    background: var(--accent-orange);
    color: #000;
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 20px rgba(255, 158, 100, 0.4);
    border-color: transparent;
  }

  .demo-link:hover .external-icon {
    opacity: 1;
    transform: translate(2px, -2px);
  }
</style>
