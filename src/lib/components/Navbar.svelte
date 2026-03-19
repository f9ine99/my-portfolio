<script>
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  
  let scrollPath = $state('home');
  let isScrolled = $state(false);
  
  // Derive the display path based on the current route and scroll position
  let currentPath = $derived.by(() => {
    const routeId = page.route.id;
    if (routeId === '/') {
      // Capitalize 'home' or return the specific scrolled section id
      return scrollPath === 'home' ? 'Home' : scrollPath;
    }
    // Remove leading slash and return route name (capitalized)
    const name = routeId ? routeId.replace(/^\//, '') : 'Home';
    return name.charAt(0).toUpperCase() + name.slice(1);
  });

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 20;
    };
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scrollPath = entry.target.id || 'home';
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id], main > *[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  });
</script>

<div class="navbar-wrapper" class:scrolled={isScrolled}>
  <nav class="navbar">
    <div class="brand">
      <span class="prompt">~/{currentPath}</span>
      <span class="cursor"></span>
    </div>
    <ul class="nav-links">
      <li><a href="/about" class:active={page.route.id === '/about'}>About</a></li>
      <li><a href="/posts" class:active={page.route.id === '/posts'}>Posts</a></li>
      <li><a href="/#projects" class:active={scrollPath === 'projects'}>Projects</a></li>
      <li><a href="/pics" class:active={page.route.id === '/pics'}>Pics</a></li>
      <li><a href="/more" class:active={page.route.id === '/more'}>More...</a></li>
    </ul>
  </nav>
</div>

<style>
  .navbar-wrapper {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1000;
    transition: background 0.4s ease, backdrop-filter 0.4s ease;
    background: transparent;
    margin-bottom: 5rem;
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
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .prompt {
    font-weight: 700;
    color: var(--accent-orange);
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
  }

  .nav-links a {
    font-size: 0.85rem;
    color: var(--text-primary);
    opacity: 0.7;
    padding: 0.5rem 1.2rem;
    border-radius: 100px;
    transition: all 0.2s ease;
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

  @media (max-width: 600px) {
    .nav-links {
      display: none; /* Mobile menu can be added later */
    }
  }
</style>
