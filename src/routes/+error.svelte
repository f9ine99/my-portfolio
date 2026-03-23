<script lang="ts">
  import { page } from '$app/state';
  import { fade, fly, scale } from 'svelte/transition';
  import { Home, AlertTriangle, ArrowLeft, ServerCrash, RefreshCcw } from 'lucide-svelte';

  const status = $derived(page.status);
  const is404 = $derived(status === 404);
  const is500 = $derived(status >= 500);

  const message = $derived(
    is404 ? "You've wandered into the digital void." : 
    is500 ? "Internal Server Error in the matrix." :
    "Something unexpected happened."
  );

  const heading = $derived(
    is404 ? "Page Not Found" : 
    is500 ? "Server Core Failure" :
    "Error Occurred"
  );
</script>

<div class="error-page {is500 ? 'error-500' : ''}">
  <div class="background-effects">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
  </div>

  <div class="content-card" in:scale={{ duration: 600, delay: 200, start: 0.95 }}>
    <div class="status-code" in:fly={{ y: -20, duration: 800, delay: 400 }}>
      <span class="glitch" data-text={status}>{status}</span>
    </div>
    
    <div class="icon-wrapper" in:fade={{ duration: 600, delay: 600 }}>
      {#if is500}
        <ServerCrash size={48} class="error-icon" />
      {:else}
        <AlertTriangle size={48} class="error-icon" />
      {/if}
    </div>

    <h1 in:fade={{ duration: 600, delay: 700 }}>{heading}</h1>
    <p class="message" in:fade={{ duration: 600, delay: 800 }}>{message}</p>

    <div class="actions" in:fade={{ duration: 600, delay: 1000 }}>
      {#if is500}
        <button onclick={() => window.location.reload()} class="home-btn retry-btn">
          <RefreshCcw size={18} />
          <span>Retry Connection</span>
        </button>
      {/if}
      <a href="/" class="home-btn">
        <Home size={18} />
        <span>Return to Reality</span>
      </a>
      <button onclick={() => history.back()} class="back-link">
        <ArrowLeft size={16} />
        <span>Go Back</span>
      </button>
    </div>
  </div>
</div>

<style>
  .error-page {
    min-height: calc(100vh - 200px);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 2rem;
  }

  .background-effects {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  .orb {
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.15;
    animation: float 20s infinite alternate ease-in-out;
  }

  .orb-1 { background: var(--accent-orange); top: 10%; left: 20%; }
  .orb-2 { background: var(--accent-blue); bottom: 20%; right: 10%; animation-delay: -5s; }
  .orb-3 { background: var(--accent-purple); top: 50%; left: 50%; transform: translate(-50%, -50%); animation-delay: -10s; }

  /* 500 Error Overrides */
  .error-500 .orb-1 { background: var(--accent-red); }
  .error-500 .orb-2 { background: var(--accent-orange); }
  .error-500 .orb-3 { background: var(--accent-red); opacity: 0.1; }
  .error-500 .glitch { text-shadow: 2px 0 var(--accent-orange), -2px 0 var(--accent-purple); }
  .error-500 :global(.error-icon) { color: var(--accent-red); }

  @keyframes float {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(40px, 40px) scale(1.1); }
  }

  .content-card {
    background: rgba(36, 39, 58, 0.4);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 24px;
    padding: 4rem 3rem;
    text-align: center;
    width: 100%;
    max-width: 500px;
    position: relative;
    z-index: 10;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  }

  .status-code {
    font-size: 8rem;
    font-weight: 900;
    line-height: 1;
    margin-bottom: 1rem;
    font-family: var(--font-mono);
    color: #fff;
    position: relative;
  }

  .glitch {
    position: relative;
    display: inline-block;
    color: #fff;
    text-shadow: 2px 0 var(--accent-red), -2px 0 var(--accent-blue);
  }

  .icon-wrapper {
    margin-bottom: 1.5rem;
    color: var(--accent-orange);
    display: flex;
    justify-content: center;
  }

  h1 { font-size: 2rem; margin-bottom: 1rem; color: #fff; }

  .message {
    color: var(--text-muted);
    font-size: 1.1rem;
    margin-bottom: 3rem;
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .home-btn {
    background: var(--accent-orange);
    color: #1e2030;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    width: 100%;
    justify-content: center;
  }

  .home-btn:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 10px 20px rgba(245, 169, 127, 0.3);
    color: #1e2030;
  }

  .retry-btn {
    background: var(--accent-blue);
  }

  .retry-btn:hover {
    box-shadow: 0 10px 20px rgba(138, 173, 244, 0.3);
  }

  .error-500 .retry-btn {
    background: var(--accent-red);
  }
  .error-500 .retry-btn:hover {
    box-shadow: 0 10px 20px rgba(237, 135, 150, 0.3);
  }

  .back-link {
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: color 0.2s;
  }

  .back-link:hover { color: var(--text-primary); }

  @media (max-width: 640px) {
    .status-code { font-size: 6rem; }
    .content-card { padding: 3rem 2rem; }
  }
</style>

