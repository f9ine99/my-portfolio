<script lang="ts">
  import { Menu, X } from 'lucide-svelte';

  interface Props {
    currentPath: string;
    currentPathname: string;
    isDrawerOpen: boolean;
    isScrolled: boolean;
    onToggleDrawer: () => void;
    onCloseDrawer: () => void;
  }

  let { currentPath, currentPathname, isDrawerOpen, isScrolled, onToggleDrawer, onCloseDrawer }: Props =
    $props();
</script>

<div class="navbar-wrapper" class:scrolled={isScrolled}>
  <div class="navbar">
    <a href="/" class="brand" onclick={onCloseDrawer}>
      <span class="prompt">~/{currentPath}</span>
      <div class="cursor"></div>
    </a>

    <ul class="nav-links">
      <li><a href="/" class:active={currentPathname === '/'}>Home</a></li>
      <li><a href="/about" class:active={currentPathname === '/about'}>About</a></li>
      <li><a href="/projects" class:active={currentPathname === '/projects'}>Projects</a></li>
    </ul>

    <button class="menu-toggle" onclick={onToggleDrawer} aria-label="Toggle Menu">
      {#if isDrawerOpen}
        <X size={24} />
      {:else}
        <Menu size={24} />
      {/if}
    </button>
  </div>
</div>

<style>
  .navbar-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    padding: 1.5rem 0;
    pointer-events: none;
  }

  .navbar-wrapper.scrolled {
    padding: 0.75rem 0;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1210px;
    margin: 0 auto;
    padding: 1rem 2rem;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    width: 95%;
    pointer-events: auto;
  }

  .navbar-wrapper.scrolled .navbar {
    max-width: 800px;
    background: rgba(17, 17, 27, 0.2);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 100px;
    padding: 0.6rem 1.75rem;
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.05);
  }

  :global(.Frappe) .navbar-wrapper.scrolled .navbar {
    background: rgba(48, 52, 70, 0.3);
  }

  :global(.Macchiato) .navbar-wrapper.scrolled .navbar {
    background: rgba(36, 39, 58, 0.3);
  }

  :global(.Latte) .navbar-wrapper.scrolled .navbar {
    background: rgba(230, 233, 239, 0.4);
    border-color: rgba(0, 0, 0, 0.05);
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    text-decoration: none;
    transition: transform 0.3s ease;
  }

  .brand:hover {
    transform: translateX(4px);
  }

  .prompt {
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--accent-orange);
    white-space: nowrap;
    letter-spacing: -0.01em;
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .cursor {
    width: 8px;
    height: 18px;
    background-color: var(--accent-orange);
    animation: blink 1s step-end infinite;
  }

  .nav-links {
    display: flex;
    gap: 1.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-links a {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-primary);
    opacity: 0.6;
    padding: 0.4rem 0.2rem;
    transition: all 0.3s ease;
    text-decoration: none;
    white-space: nowrap;
    position: relative;
    font-family: var(--font-mono);
    -webkit-tap-highlight-color: transparent;
  }

  .nav-links a:active {
    transform: scale(0.96);
    opacity: 0.8;
  }

  .nav-links a:hover,
  .nav-links a.active {
    opacity: 1;
    color: var(--accent-orange);
  }

  .nav-links a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--accent-orange);
    transition: width 0.3s ease;
  }

  .nav-links a.active::after {
    width: 100%;
  }

  .menu-toggle {
    display: none;
    background: none;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    padding: 0.5rem;
    z-index: 1001;
    -webkit-tap-highlight-color: transparent;
    transition: transform 0.2s ease;
  }

  .menu-toggle:active {
    transform: scale(0.9);
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  @media (max-width: 800px) {
    .nav-links {
      display: none;
    }

    .menu-toggle {
      display: block;
    }
  }
</style>
