<script>
  import { Star } from 'lucide-svelte';
</script>

<section class="featured-projects" id="projects">
  <div class="header">
    <div class="title">
      <Star size={24} />
      <h2>Featured Projects</h2>
    </div>
    <a href="/projects" class="view-all desktop-only">View all &rarr;</a>
  </div>
  
  <!-- Project list would go here -->
  <div class="projects-placeholder">
    <p>Project cards coming soon...</p>
  </div>

  <div class="mobile-footer">
    <a href="/projects" class="view-all mobile-only">View all &rarr;</a>
  </div>
</section>

<style>
  .featured-projects {
    width: 95%;
    max-width: 1000px;
    margin: 4rem auto;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--accent-orange);
  }

  .title h2 {
    font-size: 1.5rem;
    color: var(--text-primary);
    font-weight: 500;
  }

  .view-all {
    font-size: 0.9rem;
    color: var(--text-primary);
    opacity: 0.8;
    border-bottom: 1px dotted var(--text-muted);
    padding-bottom: 2px;
  }

  .view-all:hover {
    opacity: 1;
    color: var(--accent-orange);
    border-bottom-color: var(--accent-orange);
  }

  .projects-placeholder {
    padding: 4rem;
    border: 1px dashed var(--text-muted);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text-muted);
    margin-bottom: 2rem;
  }

  .mobile-footer {
    display: flex;
    justify-content: center;
  }

  /* Responsive visibility */
  @media (min-width: 769px) {
    .mobile-only {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .desktop-only {
      display: none;
    }

    .featured-projects {
      margin: 2rem auto;
    }

    .projects-placeholder {
      padding: 3rem 1.5rem;
    }
  }
</style>
