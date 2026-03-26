<script lang="ts">
  interface Props {
    isFinished: boolean;
    accuracy: number;
    mistakes: number;
    activePaw: string;
    eyeTransform: string;
  }

  let { isFinished, accuracy, mistakes, activePaw, eyeTransform }: Props = $props();
</script>

<div class="cat-container">
  <div class="bongo-cat">
    <svg viewBox="0 0 100 65" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="52" width="50" height="10" rx="2" fill="#24283b" stroke="#414868" stroke-width="1" />
      <path d="M30 55h5M40 55h5M50 55h15M70 55h5" stroke="#565f89" stroke-width="2" stroke-linecap="round" />
      <path d="M10 55 Q 10 20, 50 20 T 90 55" fill="white" stroke="#1a1b26" stroke-width="2.5" />
      <path d="M22 25 L 12 8 L 32 18" fill="white" stroke="#1a1b26" stroke-width="2.5" stroke-linejoin="round" />
      <path d="M78 25 L 88 8 L 68 18" fill="white" stroke="#1a1b26" stroke-width="2.5" stroke-linejoin="round" />

      <g style="transform: {eyeTransform}; transition: transform 0.1s ease-out;">
        {#if isFinished && accuracy > 95}
          <path d="M35 32l6 6M41 32l-6 6M59 32l6 6M65 32l-6 6" stroke="#1a1b26" stroke-width="2" />
        {:else if mistakes > 3}
          <path d="M34 38 Q 38 34, 42 38" fill="none" stroke="#1a1b26" stroke-width="2" />
          <path d="M58 38 Q 62 34, 66 38" fill="none" stroke="#1a1b26" stroke-width="2" />
        {:else}
          <circle cx="38" cy="35" r="2.5" fill="#1a1b26" />
          <circle cx="62" cy="35" r="2.5" fill="#1a1b26" />
        {/if}
      </g>

      <path d="M46 42 Q 50 45, 54 42" fill="none" stroke="#1a1b26" stroke-width="2" stroke-linecap="round" />
      <g class="paw-left {activePaw === 'left' ? 'tapping' : ''}">
        <path d="M18 48 Q 12 48, 12 58 T 24 58" fill="white" stroke="#1a1b26" stroke-width="2.5" />
      </g>
      <g class="paw-right {activePaw === 'right' ? 'tapping' : ''}">
        <path d="M82 48 Q 88 48, 88 58 T 76 58" fill="white" stroke="#1a1b26" stroke-width="2.5" />
      </g>
    </svg>
  </div>
</div>

<style>
  .cat-container {
    position: absolute;
    top: -45px;
    right: 30px;
    width: 100px;
  }

  .bongo-cat {
    width: 100%;
    transition: transform 0.1s;
  }

  .paw-left,
  .paw-right {
    transition: transform 0.05s ease-out;
    transform-origin: 50% 50%;
  }

  .paw-left.tapping {
    transform: translateY(6px) translateX(4px) rotate(-5deg);
  }

  .paw-right.tapping {
    transform: translateY(6px) translateX(-4px) rotate(5deg);
  }

  @media (max-width: 768px) {
    .cat-container {
      width: 70px;
      top: -30px;
      right: 15px;
    }
  }
</style>
