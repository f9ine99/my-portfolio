<script>
  import { DollarSign } from 'lucide-svelte';
  
  const history = [
    { name: 'HamerAI', icon: DollarSign, current: true },
    { name: 'INSA', image: '/insa-icon.png', current: false },
    { name: 'Alx Ethiopia', image: '/alx-pic.webp', current: false }
  ];
</script>

<div class="work-history" id="work">
  {#each history as item, i}
    <div class="item">
      {#if item.icon}
        <span class="icon">
          <svelte:component this={item.icon} size={16} />
        </span>
      {:else if item.image}
        <span class="logo-container">
          <img src={item.image} alt={item.name} class="logo" />
        </span>
      {/if}
      <span class="name {item.current ? 'current' : 'past'}">
        {item.name}
      </span>
      {#if !item.current}
        <span class="status">(Past)</span>
      {/if}
    </div>
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
    margin: 2rem auto 5rem auto;
    flex-wrap: wrap;
    max-width: 1000px;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background-color: var(--accent-purple);
    border-radius: 50%;
    color: var(--bg-color);
  }

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    overflow: hidden;
  }

  .logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .name {
    font-weight: 500;
    font-size: 1rem;
  }

  .current {
    color: #fff;
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
