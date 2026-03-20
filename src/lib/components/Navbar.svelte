<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { fade, fly } from 'svelte/transition';
  import { 
    Menu, X, Home, BookOpen, Layout, 
    AtSign, Palette, ExternalLink, Moon,
    Github, Linkedin, ArrowRight
  } from 'lucide-svelte';
  import { themeState, applyTheme, setAccentColor, themes, colors } from '$lib/theme.svelte.ts';

  let isScrolled = $state(false);
  let isDrawerOpen = $state(false);

  let currentPath = $derived.by(() => {
    const routeId = page.route.id;
    if (routeId === '/') {
      return 'Home/Firaol';
    }
    const name = routeId ? routeId.replace(/^\//, '') : 'Home/Firaol';
    return name.charAt(0).toUpperCase() + name.slice(1);
  });

  function toggleDrawer() {
    isDrawerOpen = !isDrawerOpen;
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  function closeDrawer() {
    isDrawerOpen = false;
    document.body.style.overflow = '';
  }

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 20;
    };
    window.addEventListener('scroll', handleScroll);
    
    // Initial theme apply
    applyTheme(themeState.currentTheme);
    
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<div class="navbar-wrapper" class:scrolled={isScrolled}>
  <div class="navbar">
    <a href="/" class="brand" onclick={closeDrawer}>
      <span class="prompt">~/Home/Firaol</span>
      <div class="cursor"></div>
    </a>

    <ul class="nav-links">
      <li><a href="#about" class:active={page.url.hash === '#about'}>About</a></li>
      <li><a href="/posts" class:active={page.url.pathname === '/posts'}>Posts</a></li>
      <li><a href="/projects" class:active={page.url.pathname === '/projects'}>Projects</a></li>
    </ul>

    <button class="menu-toggle" onclick={toggleDrawer} aria-label="Toggle Menu">
      {#if isDrawerOpen}
        <X size={24} />
      {:else}
        <Menu size={24} />
      {/if}
    </button>
  </div>
</div>

{#if isDrawerOpen}
  <!-- Overlay -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="drawer-overlay" onclick={closeDrawer} transition:fade={{ duration: 200 }}></div>

  <!-- Drawer -->
  <div class="drawer" transition:fly={{ x: 300, duration: 300, opacity: 1 }}>
    <div class="drawer-header">
      <h2>Navigation</h2>
      <button class="close-btn" onclick={closeDrawer}>
        <X size={24} />
      </button>
    </div>

    <div class="drawer-content">
      <!-- Theme Settings -->
      <div class="drawer-section">
        <div class="section-title">
          <Palette size={16} />
          <span>FLAVOR</span>
        </div>
        <div class="flavor-grid">
          {#each themes as theme}
            <button 
              class="flavor-btn" 
              class:active={themeState.currentTheme === theme}
              onclick={() => applyTheme(theme)}
            >
              {theme}
            </button>
          {/each}
        </div>
      </div>

      <div class="drawer-section">
        <div class="section-title">
          <div class="color-dot" style="background: var(--accent-orange)"></div>
          <span>ACCENT COLOR</span>
        </div>
        <div class="color-grid">
          {#each colors as color}
            <button 
              class="color-circle" 
              style="background: {color}"
              class:active={themeState.currentAccentColor === color}
              onclick={() => setAccentColor(color)}
              aria-label="Set accent color to {color}"
            ></button>
          {/each}
        </div>
      </div>

      <div class="drawer-section effect-toggle">
        <label class="toggle">
          <input type="checkbox" bind:checked={themeState.bgEffect}>
          <span class="checkmark"></span>
          <span class="label-text">Background effect: <span class="status">{themeState.bgEffect ? 'on' : 'off'}</span></span>
        </label>
      </div>

      <!-- Navigation Links -->
      <div class="drawer-section links-section">
        <a href="/" class:active={page.url.pathname === '/'} onclick={closeDrawer}>Home</a>
        <a href="/about" class:active={page.url.pathname === '/about'} onclick={closeDrawer}>About</a>
        <a href="/posts" class:active={page.url.pathname === '/posts'} onclick={closeDrawer}>Posts</a>
        <a href="/projects" class:active={page.url.pathname === '/projects'} onclick={closeDrawer}>Projects</a>
      </div>

      <!-- More Section -->
      <div class="drawer-section more-links">
        <div class="more-label">MORE</div>
        <a href="https://github.com/f9ine99" target="_blank" rel="noopener noreferrer">
          <Github size={18} />
          <span>GitHub</span>
          <ExternalLink size={14} class="ext-icon" />
        </a>
        <a href="https://linkedin.com/in/k9ine95" target="_blank" rel="noopener noreferrer">
          <Linkedin size={18} />
          <span>LinkedIn</span>
          <ExternalLink size={14} class="ext-icon" />
        </a>
      </div>
    </div>
  </div>
{/if}

<style>
  .navbar-wrapper {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1000;
    transition: background 0.4s ease, backdrop-filter 0.4s ease;
    background: transparent;
    margin-bottom: 2rem;
    /* This mask creates a subtle fade at the very bottom to hide the 'line' */
    mask-image: linear-gradient(to bottom, black calc(100% - 8px), transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black calc(100% - 8px), transparent 100%);
  }

  .navbar-wrapper.scrolled {
    background: var(--nav-bg, rgba(30, 32, 48, 0.08));
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    max-width: 1300px;
    margin: 0 auto;
    padding: 1rem 2rem;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .prompt {
    font-weight: 700;
    color: var(--accent-orange);
    white-space: nowrap;
  }

  .cursor {
    width: 8px;
    height: 18px;
    background-color: var(--accent-orange);
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    50% { opacity: 0; }
  }

  .nav-links {
    display: flex;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.02);
    padding: 0.4rem;
    border-radius: 100px;
    backdrop-filter: blur(5px);
    list-style: none;
    margin: 0;
  }

  .nav-links a {
    font-size: 0.85rem;
    color: var(--text-primary);
    opacity: 0.7;
    padding: 0.5rem 1.2rem;
    border-radius: 100px;
    transition: all 0.2s ease;
    text-decoration: none;
    white-space: nowrap;
  }

  .nav-links a:hover {
    opacity: 1;
    color: var(--accent-orange);
    background: rgba(255, 255, 255, 0.05);
  }

  .nav-links a.active {
    opacity: 1;
    background: var(--selection-bg);
    color: var(--accent-orange);
    font-weight: 500;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .menu-toggle {
    display: none;
    background: none;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    padding: 0.5rem;
    z-index: 1001;
  }

  /* Drawer Styles */
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
    transition: opacity 0.2s;
  }

  .close-btn:hover { opacity: 1; }

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

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: var(--text-muted);
    font-size: 0.9rem;
    font-weight: 600;
  }

  .flavor-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.03);
    padding: 0.5rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .flavor-btn {
    background: none;
    border: 1px solid transparent;
    border-radius: 8px;
    padding: 0.6rem;
    color: var(--text-muted);
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
  }

  .flavor-btn.active {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
    color: var(--text-primary);
  }

  .color-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
  }

  .color-circle {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 6px;
    border: 2px solid transparent;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .color-circle.active {
    border-color: var(--text-primary);
    transform: scale(1.1);
  }

  .effect-toggle {
    margin-top: 0.5rem;
  }

  .toggle {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .toggle input { display: none; }
  .checkmark {
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    position: relative;
  }

  .toggle input:checked + .checkmark {
    background: var(--accent-orange);
    border-color: var(--accent-orange);
  }

  .toggle input:checked + .checkmark::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #000;
    font-size: 12px;
  }

  .status {
    color: var(--accent-orange);
    font-weight: 600;
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
    transition: color 0.2s;
    font-family: var(--font-mono, monospace);
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

  @media (max-width: 800px) {
    .nav-links { display: none; }
    .menu-toggle { display: block; }
  }
</style>
