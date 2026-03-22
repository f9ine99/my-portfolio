<script>
  import { Github, Linkedin, Instagram, ArrowRight } from 'lucide-svelte';
  // Attempt to import X logo if available in the installed version
  import { X } from 'lucide-svelte';
</script>

<div class="socials">
  <div class="links">
    <a href="https://github.com/f9ine99" target="_blank" rel="noopener noreferrer">
      <Github size={18} />
      <span>GitHub</span>
    </a>
    <span class="inline-divider">|</span>
    <a href="https://linkedin.com/in/k9ine95" target="_blank" rel="noopener noreferrer">
      <Linkedin size={18} />
      <span>LinkedIn</span>
    </a>
    <span class="inline-divider">|</span>
    <a href="https://x.com/f9ine99" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z" />
      </svg>
    </a>
    <span class="inline-divider">|</span>
    <a href="https://instagram.com/f9ine99" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
      <Instagram size={18} />
    </a>
  </div>
  <div class="divider">|</div>
  <a href="/about" class="more">
    <span>More about me</span>
    <ArrowRight size={18} />
  </a>
</div>

<style>
  .socials {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .inline-divider {
    color: var(--text-muted);
    font-weight: 300;
    opacity: 0.5;
  }

  .links a, .more {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--text-primary);
    opacity: 0.8;
  }

  .links a:hover, .more:hover {
    opacity: 1;
    color: var(--accent-orange);
  }

  .divider {
    color: var(--text-muted);
    font-weight: 300;
  }

  @media (max-width: 600px) {
    .socials {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .divider {
      display: none;
    }
  }
</style>
