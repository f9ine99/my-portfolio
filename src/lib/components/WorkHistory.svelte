<script>
  const history = [
    { name: 'HamerAI', image: '/hamerAI.jpg', current: true, link: 'https://ethiohamerai.com' },
    { name: 'INSA', image: '/insa-icon.png', current: false, link: 'https://www.insa.gov.et/' },
    { name: 'Alx Ethiopia', image: '/alx-pic.webp', current: false, invert: true, link: 'https://www.alxafrica.com/' }
  ];

</script>

<div class="work-history" id="work">
  {#each history as item, i}
    <a href={item.link} target="_blank" rel="noopener noreferrer" class="item-link">
      <div class="item">
        {#if item.image}
          <span class="logo-container">
            <img
              src={item.image}
              alt={item.name}
              class="logo"
              class:dark-invert={item.invert}
              loading="lazy"
              decoding="async"
              width="40"
              height="40"
            />
          </span>
        {/if}
        <span class="name {item.current ? 'current' : 'past'}">
          {item.name}
        </span>
        {#if !item.current}
          <span class="status">(Past)</span>
        {/if}
      </div>
    </a>
    {#if i < history.length - 1}
      <div class="slash">/</div>
    {/if}
  {/each}
</div>

<style>
  .work-history {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin: 1rem auto 2.5rem auto;
    flex-wrap: wrap;
    max-width: 1000px;
  }

  .item-link {
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s ease;
  }

  .item-link:hover {
    transform: translateY(-2px);
  }

  .item-link:hover .name {
    color: var(--accent-orange);
  }

  .item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .logo {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (prefers-color-scheme: dark) {
    .logo.dark-invert {
      filter: brightness(0) invert(1);
      opacity: 0.9;
    }
  }

  /* Support for explicit theme classes */
  :global(.dark-mode) .logo.dark-invert {
    filter: brightness(0) invert(1);
    opacity: 0.9;
  }



  .name {
    font-weight: 500;
    font-size: 1rem;
  }

  .current {
    color: var(--text-primary);
  }

  .past {
    color: var(--text-muted);
  }

  .status {
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-left: 0.25rem;
  }

  .slash {
    color: var(--accent-orange);
    opacity: 0.5;
    font-weight: 300;
  }
</style>
