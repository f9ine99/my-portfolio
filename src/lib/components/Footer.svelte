<script>
  import { onMount } from 'svelte';
  import { Github, Linkedin, Instagram, Monitor } from 'lucide-svelte';

  let time = $state('');
  // @ts-ignore
  let commitHash = typeof __COMMIT_HASH__ !== 'undefined' ? __COMMIT_HASH__ : 'dev';

  function updateTime() {
    const now = new Date();
    time = now.toLocaleTimeString([], { hour12: false });
  }

  onMount(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  });
</script>

<footer class="app-footer">
  <div class="footer-content">
    <div class="left-section">
      <span class="copyright">© 2026 Firaol Gemeda</span>
      <span class="separator">-</span>
      <div class="status">
        <span class="status-dot"></span>
        <span class="status-text">All Systems Nominal</span>
      </div>
    </div>

    <div class="right-section">
      <div class="stats">
        <span class="time">
          <Monitor size={12} />
          {time}
        </span>
        <span class="separator">-</span>
        <span class="views">infinite views</span>
        <span class="separator">-</span>
        <a 
          href="https://github.com/f9ine99/my-portfolio/commit/{commitHash}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="commit"
          title="View commit on GitHub"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4"/><line x1="1.05" y1="12" x2="7" y2="12"/><line x1="17.01" y1="12" x2="22.96" y2="12"/>
          </svg>
          {commitHash}
        </a>
      </div>
      
      <span class="separator">-</span>
      
      <div class="footer-socials">
        <a href="https://github.com/f9ine99" target="_blank" rel="noopener noreferrer" title="GitHub">
          <Github size={16} />
        </a>
        <a href="https://linkedin.com/in/k9ine95" target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <Linkedin size={16} />
        </a>
        <a href="https://x.com/f9ine99" target="_blank" rel="noopener noreferrer" title="X">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z" />
          </svg>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
          <Instagram size={16} />
        </a>
      </div>
    </div>
  </div>
</footer>

<style>
  .app-footer {
    width: 100%;
    margin-top: 6rem;
    padding: 2rem 0;
    display: flex;
    justify-content: center;
  }

  .footer-content {
    background: var(--card-bg);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 0 2rem;
    min-height: 3.8rem;
    width: 95%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--text-muted);
    letter-spacing: -0.01em;
  }

  .left-section, .right-section, .stats, .footer-socials, .status {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .separator {
    opacity: 0.3;
  }

  .status-dot {
    width: 6px;
    height: 6px;
    background: #4ade80;
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(74, 222, 128, 0.4);
  }

  .stats {
    gap: 1.25rem;
  }

  .time, .commit {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-primary);
    opacity: 0.8;
  }

  .footer-socials {
    gap: 0.5rem;
  }

  .footer-socials a {
    color: var(--text-muted);
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.02);
  }

  .footer-socials a:hover {
    color: var(--accent-orange);
    background: rgba(255, 158, 100, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 900px) {
    .footer-content {
      flex-direction: column;
      gap: 1rem;
      padding: 1.5rem;
      text-align: center;
    }
    
    .left-section, .right-section, .stats {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
</style>
