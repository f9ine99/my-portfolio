<script lang="ts">
  import { Github, Linkedin, Instagram, Mail, Send } from 'lucide-svelte';
  
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
        <img
          src="/images/avatar-anime.png"
          alt={name}
          class="avatar"
          loading="lazy"
          decoding="async"
          width="340"
          height="340"
        />
      </div>
    </div>
    
    <div class="content-column">
      <div class="bio-content">
        <p class="bio-text">
          Hey! I’m <span class="link accent">{name}</span> — a {role} at <a href="https://ethiohamerai.com" target="_blank" rel="noopener noreferrer" class="link">{company}</a> with a strong passion for exploring complex systems, solving meaningful problems, and understanding the deeper principles behind how things work.
        </p>
        
        <p class="bio-text">
          My interest in technology started early. As a kid, I loved spending time around laptops and tech gadgets, and I was especially inspired by hacking and tech-related movies. That early curiosity eventually grew into a real passion for software engineering and cybersecurity.
        </p>
        
        <p class="bio-text">
          I’m currently a third-year Computer Science student at <span class="link accent">Hope University College</span>, where I’m continuously building my knowledge and sharpening my skills in both development and security.
        </p>

        <p class="bio-text">
          Beyond the tech world, I enjoy watching and playing football, and I have a deep interest in religion, ideas, and questions that go beyond the surface.
        </p>

        <p class="bio-text">
          A few of the projects I’m especially proud of include <span class="link accent">Impact</span>, <span class="link accent">Furi Cadaster</span>, <span class="link accent">Mufti Dawud Charity</span>, and <span class="link accent">Termus-Melesu (Retra)</span> — each of which reflects my passion for building useful and meaningful digital solutions.
        </p>

        <p class="bio-text">
          Feel free to <a href="mailto:f9ine99@gmail.com" class="link">send me an email</a> if you’d like to connect or chat.
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
        <a href="https://t.me/K9ine95" target="_blank" rel="noopener noreferrer" class="social-item">
          <Send size={18} />
          <span>Telegram</span>
        </a>
        <span class="divider">★</span>
        <a href="mailto:f9ine99@gmail.com" class="social-item" title="f9ine99@gmail.com">
          <Mail size={18} />
          <span>Email</span>
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
