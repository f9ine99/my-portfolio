<script>
  import { onMount } from 'svelte';
  
  let currentPath = $state('home');

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentPath = entry.target.id || 'home';
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id], main > *[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  });
</script>

<nav class="navbar">
  <div class="brand">
    <span class="prompt">~/{currentPath === 'home' ? '' : currentPath}</span>
    <span class="cursor"></span>
  </div>
  <ul class="nav-links">
    <li><a href="/about">About</a></li>
    <li><a href="/posts">Posts</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="/pics">Pics</a></li>
    <li><a href="/more">More...</a></li>
  </ul>
</nav>

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: 2rem;
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
    gap: 2rem;
  }

  .nav-links a {
    font-size: 0.9rem;
    color: var(--text-primary);
    opacity: 0.8;
  }

  .nav-links a:hover {
    opacity: 1;
    color: var(--accent-orange);
  }

  @media (max-width: 600px) {
    .nav-links {
      display: none; /* Mobile menu can be added later */
    }
  }
</style>
