<script>
  import { HardHat, Terminal, ChevronRight } from 'lucide-svelte';
  let { title = "Section Under Construction" } = $props();
</script>

<div class="under-construction">
  <div class="terminal-box">
    <div class="terminal-header">
      <div class="dots">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
      </div>
      <div class="title-text">system_status.sh</div>
    </div>
    
    <div class="terminal-body">
      <div class="line">
        <ChevronRight size={14} class="prompt-icon" />
        <span class="command">access_module --name "{title.toLowerCase().replace(/ /g, '_')}"</span>
      </div>
      
      <div class="output warning">
        <HardHat size={20} />
        <span>[WARNING] Module is currently under development.</span>
      </div>
      
      <div class="output info">
        <Terminal size={14} />
        <span>Estimated completion: Q3 2026</span>
      </div>
      
      <div class="line active">
        <ChevronRight size={14} class="prompt-icon" />
        <span class="cursor"></span>
      </div>
    </div>
  </div>
  
  <div class="actions">
    <a href="/" class="back-link">
      &larr; Return to Home Base
    </a>
  </div>
</div>

<style>
  .under-construction {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    padding: 2rem;
    font-family: var(--font-mono);
  }

  .terminal-box {
    width: 100%;
    max-width: 600px;
    background: var(--card-bg);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  }

  .terminal-header {
    background: var(--card-bg-elevated);
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    position: relative;
  }

  .dots {
    display: flex;
    gap: 0.5rem;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .red { background: #ff5f56; }
  .yellow { background: #ffbd2e; }
  .green { background: #27c93f; }

  .title-text {
    flex-grow: 1;
    text-align: center;
    font-size: 0.75rem;
    color: var(--text-muted);
    opacity: 0.7;
  }

  .terminal-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .line {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.95rem;
  }

  .prompt-icon {
    color: var(--accent-orange);
  }

  .command {
    color: #fff;
  }

  .output {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 6px;
    font-size: 0.9rem;
  }

  .output.warning {
    background: rgba(245, 169, 127, 0.1);
    color: var(--accent-orange);
    border: 1px solid rgba(245, 169, 127, 0.2);
  }

  .output.info {
    color: var(--text-muted);
  }

  .cursor {
    width: 8px;
    height: 18px;
    background: var(--accent-orange);
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    50% { opacity: 0; }
  }

  .back-link {
    margin-top: 2rem;
    font-size: 0.9rem;
    color: var(--text-muted);
    transition: color 0.2s;
  }

  .back-link:hover {
    color: var(--accent-orange);
  }
</style>
