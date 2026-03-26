<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { projects } from '$lib/data/projects';
  import NavbarTopBar from '$lib/components/layout/navbar/NavbarTopBar.svelte';
  import NavbarDrawer from '$lib/components/layout/navbar/NavbarDrawer.svelte';

  let isScrolled = $state(false);
  let isDrawerOpen = $state(false);
  let scrollRaf = 0;

  let currentPath = $derived.by(() => {
    const path = page.url.pathname;
    if (path === '/') return 'Home/Firaol';
    
    return path
      .split('/')
      .filter(Boolean)
      .map(part => {
        const project = projects.find(p => p.slug === part);
        const name = project ? project.title : part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
        return name.length > 12 ? name.slice(0, 10) + '..' : name;
      })
      .join('/');
  });

  function toggleDrawer() {
    isDrawerOpen = !isDrawerOpen;
    document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
  }

  function closeDrawer() {
    isDrawerOpen = false;
    document.body.style.overflow = '';
  }

  onMount(() => {
    const updateScrollState = () => {
      isScrolled = window.scrollY > 20;
      scrollRaf = 0;
    };

    const handleScroll = () => {
      if (scrollRaf) return;
      scrollRaf = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (scrollRaf) {
        window.cancelAnimationFrame(scrollRaf);
      }
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    };
  });
</script>

<NavbarTopBar
  {currentPath}
  currentPathname={page.url.pathname}
  {isDrawerOpen}
  {isScrolled}
  onToggleDrawer={toggleDrawer}
  onCloseDrawer={closeDrawer}
/>

{#if isDrawerOpen}
  <NavbarDrawer currentPathname={page.url.pathname} onCloseDrawer={closeDrawer} />
{/if}
