<script lang="ts">
  let name = "Firaol Gemeda";
  let isHovered = $state(false);
  let showSunglasses = $state(false);
  let interactionTimeout: any;

  function handleEnter() {
    isHovered = true;
    clearTimeout(interactionTimeout);
    interactionTimeout = setTimeout(() => {
      if (isHovered) showSunglasses = true;
    }, 1000);
  }

  function handleLeave() {
    isHovered = false;
    showSunglasses = false;
    clearTimeout(interactionTimeout);
  }
</script>

<header class="hero" id="home">
  <div class="profile-row">
    <div 
      class="avatar-container" 
      onmouseenter={handleEnter}
      onmouseleave={handleLeave}
      ontouchstart={(e) => { e.preventDefault(); handleEnter(); }}
      ontouchend={handleLeave}
      role="button"
      tabindex="0"
    >
      <svg class="circle-svg" viewBox="0 0 100 100">
        <circle 
          cx="50" cy="50" r="48" 
          class="circle-path {isHovered ? 'animate' : ''}" 
        />
      </svg>
      <div class="image-wrapper">
        <img src="/firaol.jpg" alt={name} class="avatar" />
        {#if showSunglasses}
          <div class="sunglasses">
            <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
              <!-- Lenses with Curves (Black) -->
              <path d="M5 10 Q 5 5 15 5 L 45 5 Q 45 35 25 35 Q 5 35 5 10" fill="#000000" />
              <path d="M55 5 L 85 5 Q 95 5 95 10 Q 95 35 75 35 Q 55 35 55 5" fill="#000000" />
              
              <!-- Lens Highlights -->
              <path d="M10 10 Q 10 8 15 8 L 25 8" fill="none" stroke="white" stroke-width="1" opacity="0.3" stroke-linecap="round" />
              <path d="M60 8 L 70 8 Q 75 8 75 10" fill="none" stroke="white" stroke-width="1" opacity="0.3" stroke-linecap="round" />

              <!-- Professional Frame -->
              <path d="M2 10 Q 2 2 15 2 L 45 2 Q 50 2 50 8 L 50 2 Q 55 2 85 2 Q 98 2 98 10 L 98 12 Q 98 38 75 38 Q 55 38 52 12 Q 50 12 48 12 Q 45 38 25 38 Q 2 38 2 12 Z" fill="black" fill-rule="evenodd" />
            </svg>
          </div>
        {/if}
      </div>
    </div>
    <div class="intro">
      <h1 class="greeting">
        Hey! I'm <span class="name">{name}</span> <span class="wave">👋</span>
      </h1>
    </div>
  </div>
  <p class="bio">
    <span class="highlight-group {showSunglasses ? 'active' : ''}">
      <span>Co-Founder of <a href="https://ethiohamerai.com" target="_blank" rel="noopener noreferrer">HamerAI</a> | Software Engineer & Cybersecurity Analyst</span>
    </span>. Delivering secure, scalable software solutions 
    <span class="highlight-group {showSunglasses ? 'active' : ''}">
      trusted by government and private organizations
    </span>.
  </p>
</header>

<style>
  .hero {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .profile-row {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .avatar-container {
    width: 100px;
    height: 100px;
    position: relative;
    cursor: pointer;
    flex-shrink: 0;
  }

  .circle-svg {
    position: absolute;
    inset: -5px;
    width: 110px;
    height: 110px;
    transform: rotate(-90deg);
    z-index: 10;
    pointer-events: none;
  }

  .circle-path {
    fill: none;
    stroke: var(--accent-orange);
    stroke-width: 3;
    stroke-dasharray: 302;
    stroke-dashoffset: 302;
    stroke-linecap: round;
    transition: stroke-dashoffset 1s ease-in-out;
  }

  .circle-path.animate {
    stroke-dashoffset: 0;
  }

  @keyframes drawCircle {
    to { stroke-dashoffset: 0; }
  }

  .image-wrapper {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    border: 2px solid var(--selection-bg);
    background: var(--bg-color);
    z-index: 5;
  }

  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  .avatar-container:hover .avatar {
    transform: scale(1.05);
  }

  .sunglasses {
    position: absolute;
    top: 38%;
    left: 25%;
    width: 50%;
    z-index: 20;
    pointer-events: none;
    animation: slideDown 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }

  @keyframes slideDown {
    from { transform: translateY(-30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .intro {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .greeting {
    font-size: 2.5rem;
    margin: 0;
    font-weight: 700;
    color: var(--text-primary);
  }

  .wave {
    display: inline-block;
    animation: wave 2s infinite;
    transform-origin: 70% 70%;
  }

  @keyframes wave {
    0%, 100% { transform: rotate(0deg); }
    20% { transform: rotate(-10deg); }
    40% { transform: rotate(10deg); }
    60% { transform: rotate(-10deg); }
    80% { transform: rotate(10deg); }
  }

  .name {
    color: var(--accent-orange);
    position: relative;
  }

  .bio {
    font-size: 1.15rem;
    max-width: 800px;
    color: var(--text-primary);
    line-height: 1.8;
    opacity: 0.9;
    margin-top: 1rem;
  }

  .highlight-group {
    padding: 2px 4px;
    border-radius: 4px;
    transition: all 0.4s ease;
    display: inline-block;
  }

  .highlight-group.active {
    background: rgba(255, 158, 100, 0.2);
    color: var(--accent-orange);
  }

  .bio a {
    color: var(--accent-orange);
    text-decoration: none;
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    .greeting {
      font-size: 2.2rem;
    }
    
    .bio {
      font-size: 1rem;
    }
  }
</style>
