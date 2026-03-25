<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { ExternalLink, Github, Instagram, Linkedin, X } from 'lucide-svelte';
  import NavbarThemeControls from '$lib/components/navbar/NavbarThemeControls.svelte';

  interface Props {
    currentPathname: string;
    onCloseDrawer: () => void;
  }

  let { currentPathname, onCloseDrawer }: Props = $props();
</script>

<!-- Overlay -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="drawer-overlay" onclick={onCloseDrawer} transition:fade={{ duration: 200 }}></div>

<!-- Drawer -->
<div class="drawer" transition:fly={{ x: 300, duration: 300, opacity: 1 }}>
  <div class="drawer-header">
    <h2>Navigation</h2>
    <button class="close-btn" onclick={onCloseDrawer}>
      <X size={24} />
    </button>
  </div>

  <div class="drawer-content">
    <NavbarThemeControls />

    <div class="drawer-section links-section">
      <a href="/" class:active={currentPathname === '/'} onclick={onCloseDrawer}>Home</a>
      <a href="/about" class:active={currentPathname === '/about'} onclick={onCloseDrawer}>About</a>
      <a href="/projects" class:active={currentPathname === '/projects'} onclick={onCloseDrawer}>Projects</a>
    </div>

    <div class="drawer-section more-links">
      <div class="more-label">MORE</div>
      <a href="https://github.com/f9ine99" target="_blank" rel="noopener noreferrer">
        <Github size={18} />
        <span>GitHub</span>
        <span class="ext-icon">
          <ExternalLink size={14} />
        </span>
      </a>
      <a href="https://linkedin.com/in/k9ine95" target="_blank" rel="noopener noreferrer">
        <Linkedin size={18} />
        <span>LinkedIn</span>
        <span class="ext-icon">
          <ExternalLink size={14} />
        </span>
      </a>
      <a href="https://instagram.com/f9ine99" target="_blank" rel="noopener noreferrer">
        <Instagram size={18} />
        <span>Instagram</span>
        <span class="ext-icon">
          <ExternalLink size={14} />
        </span>
      </a>
    </div>
  </div>
</div>

<style>
  .drawer-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    z-index: 2000;
  }

  .drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 320px;
    background: var(--bg-color);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-left: 1px solid rgba(255, 255, 255, 0.05);
    z-index: 2001;
    display: flex;
    flex-direction: column;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
  }

  .drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .drawer-header h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--accent-orange);
    letter-spacing: -0.5px;
  }

  .close-btn {
    background: none;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.2s;
    -webkit-tap-highlight-color: transparent;
  }

  .close-btn:active {
    transform: scale(0.9);
  }

  .close-btn:hover {
    opacity: 1;
  }

  .drawer-content {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .drawer-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .links-section {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding-top: 1.5rem;
  }

  .drawer-section a {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.25rem;
    color: var(--text-primary);
    text-decoration: none;
    padding: 0.5rem 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: var(--font-mono, monospace);
    -webkit-tap-highlight-color: transparent;
    position: relative;
    overflow: hidden;
  }

  .drawer-section a::before {
    content: '';
    position: absolute;
    left: -1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 0;
    background: var(--accent-orange);
    transition: all 0.3s ease;
    border-radius: 2px;
  }

  .drawer-section a:hover::before,
  .drawer-section a.active::before {
    height: 70%;
    left: 0;
  }

  .drawer-section a:hover,
  .drawer-section a.active {
    padding-left: 1.5rem;
    color: var(--accent-orange);
  }

  .drawer-section a.active {
    color: var(--accent-orange);
  }

  .more-links {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding-top: 1.5rem;
  }

  .more-label {
    font-size: 0.7rem;
    font-weight: 800;
    color: var(--text-muted);
    letter-spacing: 2px;
    margin-bottom: 0.5rem;
  }

  .more-links a {
    font-size: 1rem;
    opacity: 0.8;
  }

  .ext-icon {
    margin-left: auto;
    opacity: 0.5;
  }
</style>
