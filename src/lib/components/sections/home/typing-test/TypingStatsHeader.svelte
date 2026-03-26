<script lang="ts">
  import { RefreshCw, Target, Zap } from 'lucide-svelte';

  interface Props {
    wpm: number;
    accuracy: number;
    onReset: () => void;
  }

  let { wpm, accuracy, onReset }: Props = $props();
</script>

<div class="stats-header">
  <div class="stat">
    <Zap size={14} class="icon-wpm" />
    <span>{wpm} WPM</span>
  </div>

  <div class="stat">
    <Target size={14} class="icon-acc" />
    <span>{accuracy}% ACC</span>
  </div>

  <button class="reset-btn" onclick={() => onReset()} title="Reset Test (Tab)">
    <RefreshCw size={14} />
    <span class="reset-hint">tab to restart</span>
  </button>
</div>

<style>
  .stats-header {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    align-items: center;
    font-family: var(--font-mono);
  }

  .stat {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  :global(.icon-wpm) {
    color: var(--accent-orange);
  }

  :global(.icon-acc) {
    color: var(--accent-blue);
  }

  .reset-btn {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
    transition: all 0.2s;
    margin-left: auto;
  }

  .reset-btn:hover {
    color: var(--accent-orange);
    background: rgba(255, 158, 100, 0.1);
  }

  .reset-hint {
    font-size: 0.7rem;
    opacity: 0.6;
    margin-left: 0.5rem;
    text-transform: lowercase;
  }

  @media (max-width: 768px) {
    .stats-header {
      gap: 1rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }
  }
</style>
