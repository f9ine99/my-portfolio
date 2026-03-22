<script lang="ts">
  import { Github, Linkedin, Instagram, Mail } from 'lucide-svelte';
  
  let name = "Firaol Gemeda";
  let handle = "@f9ine99";
  let role = "Software Engineer & Cybersecurity Analyst";
  let company = "HamerAI";
  let location = "Addis Ababa, Ethiopia";
</script>

<div class="about-section">
  <h1 class="about-title">About Me</h1>
  
  <div class="about-container">
    <div class="avatar-column">
      <div class="avatar-frame">
        <img src="/images/avatar-anime.png" alt={name} class="avatar" />
      </div>
    </div>
    
    <div class="content-column">
      <div class="bio-content">
        <p class="bio-text">
          Hey! I'm {name} (<a href="https://github.com/f9ine99" target="_blank" rel="noopener noreferrer" class="handle">{handle}</a>) — a {role} at <a href="https://hamerai.com" target="_blank" rel="noopener noreferrer" class="link">{company}</a> based out of {location}. I like to make <span class="link accent">secure software</span> when I'm bored.
        </p>
        
        <p class="bio-text">
          Some of my more notable projects include <a href="https://hamerai.com" target="_blank" rel="noopener noreferrer" class="link">HamerAI</a>, where I lead the development of AI-driven tools for local businesses, and various <span class="link accent">security auditing tools</span> used by government and private entities. My work focuses on backend development, system architecture, and cybersecurity.
        </p>
        
        <p class="bio-text">
          Outside of software, I enjoy <span class="link accent">cybersecurity research</span>, <span class="link accent">photography</span>, and <span class="link accent">participating in CTFs</span>. I also have a passion for mentoring aspiring developers and exploring new technologies. Feel free to <a href="mailto:f9ine99@gmail.com" class="link">shoot me an email</a> if you'd like to chat.
        </p>
      </div>

      <div class="social-footer">
        <a href="https://github.com/f9ine99" target="_blank" rel="noopener noreferrer" class="social-item">
          <Github size={18} />
          <span>GitHub</span>
        </a>
        <span class="divider">★</span>
        <a href="https://linkedin.com/in/k9ine95" target="_blank" rel="noopener noreferrer" class="social-item">
          <Linkedin size={18} />
          <span>LinkedIn</span>
        </a>
        <span class="divider">★</span>
        <a href="https://instagram.com/f9ine99" target="_blank" rel="noopener noreferrer" class="social-item">
          <Instagram size={18} />
          <span>Instagram</span>
        </a>
        <span class="divider">★</span>
        <a href="mailto:f9ine99@gmail.com" class="social-item">
          <Mail size={18} />
          <span>f9ine99[at][gmail.com]</span>
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  .about-section {
    max-width: 1100px;
    margin: 4rem auto;
    padding: 0 2rem;
    font-family: var(--font-mono);
    color: var(--text-primary);
  }

  .about-title {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 3rem;
    color: var(--text-primary);
    letter-spacing: -0.01em;
  }

  .about-container {
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: 3.5rem;
    align-items: start;
  }

  .avatar-frame {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content-column {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .bio-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .bio-text {
    font-size: 1.05rem;
    line-height: 1.8;
    opacity: 0.85;
  }

  .link {
    color: var(--text-primary);
    text-decoration: none;
    border-bottom: 2px dashed rgba(255, 255, 255, 0.2);
    transition: all 0.2s;
  }

  .link:hover {
    color: var(--accent-orange);
    border-bottom-color: var(--accent-orange);
  }

  .link.accent {
    border-bottom-style: dotted;
  }

  .handle {
    color: var(--accent-blue);
    text-decoration: none;
    border-bottom: 1px dotted rgba(138, 173, 244, 0.5);
  }

  .handle:hover {
    border-bottom-color: var(--accent-blue);
  }

  .social-footer {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin-top: 1rem;
    font-size: 0.95rem;
  }

  .social-item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: var(--text-primary);
    text-decoration: none;
    opacity: 0.8;
    transition: all 0.2s;
  }

  .social-item:hover {
    opacity: 1;
    color: var(--accent-orange);
    transform: translateY(-1px);
  }

  .divider {
    opacity: 0.3;
    font-size: 0.8rem;
  }

  @media (max-width: 900px) {
    .about-container {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }

    .avatar-column {
      max-width: 340px;
      margin: 0 auto;
    }

    .about-title {
      font-size: 2.2rem;
      margin-bottom: 2rem;
    }

    .social-footer {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .divider {
      display: none;
    }
  }
</style>
