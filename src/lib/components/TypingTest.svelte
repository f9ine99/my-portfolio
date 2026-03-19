<script>
  import { onMount } from 'svelte';
  import { RefreshCw, Zap, Target } from 'lucide-svelte';

  const sentences = [
    "Secure the perimeter, patch the vulnerabilities, and deploy to production.",
    "git commit -m 'Fixed critical buffer overflow in auth module'",
    "chmod +x exploit.sh && ./exploit.sh --target internal-api",
    "Writing clean, scalable code is the first step to a secure system.",
    "sudo apt-get update && sudo apt-get upgrade -y # stay patched",
    "SELECT * FROM users WHERE access_level = 'admin' -- SQLi attempt",
    "nmap -sV -p- 192.168.1.1 # discovery in progress"
  ];

  let targetText = $state(sentences[0]);
  let userInput = $state('');
  let startTime = $state(0);
  let wpm = $state(0);
  let accuracy = $state(100);
  let isFinished = $state(false);
  let activePaw = $state('none');
  let lastTapTime = 0;
  let mistakes = $state(0);

  function reset() {
    targetText = sentences[Math.floor(Math.random() * sentences.length)];
    userInput = '';
    startTime = 0;
    wpm = 0;
    accuracy = 100;
    isFinished = false;
    mistakes = 0;
  }

  onMount(() => {
    reset();
  });

  function handleInput(e) {
    if (isFinished) return;
    
    if (startTime === 0) startTime = Date.now();
    
    const newVal = e.target.value;
    const lastChar = newVal[newVal.length - 1];
    const targetChar = targetText[newVal.length - 1];

    if (newVal.length > userInput.length && lastChar !== targetChar) {
      mistakes++;
    }

    userInput = newVal;
    activePaw = activePaw === 'left' ? 'right' : 'left';
    lastTapTime = Date.now();

    // Calculate accuracy
    if (userInput.length > 0) {
      accuracy = Math.max(0, Math.round(((userInput.length - mistakes) / userInput.length) * 100));
    }

    // Calculate WPM
    const timeElapsed = (Date.now() - startTime) / 60000; // in minutes
    if (timeElapsed > 0) {
      const words = userInput.length / 5;
      wpm = Math.round(words / timeElapsed);
    }

    if (userInput === targetText) {
      isFinished = true;
    }

    setTimeout(() => {
      if (Date.now() - lastTapTime >= 100) activePaw = 'none';
    }, 150);
  }

  function getCharClass(char, index) {
    if (index >= userInput.length) return 'char-pending';
    return userInput[index] === char ? 'char-correct' : 'char-incorrect';
  }
</script>

<div class="typing-test" id="typing">
  <div class="stats-header">
    <div class="stat">
      <Zap size={14} class="icon-wpm" />
      <span>{wpm} WPM</span>
    </div>
    <div class="stat">
      <Target size={14} class="icon-acc" />
      <span>{accuracy}% ACC</span>
    </div>
    <button class="reset-btn" onclick={reset} title="Reset Test">
      <RefreshCw size={14} />
    </button>
  </div>

  <div class="cat-container">
    <div class="bongo-cat">
      <svg viewBox="0 0 100 65" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="52" width="50" height="10" rx="2" fill="#24283b" stroke="#414868" stroke-width="1"/>
        <path d="M30 55h5M40 55h5M50 55h15M70 55h5" stroke="#565f89" stroke-width="2" stroke-linecap="round"/>
        <path d="M10 55 Q 10 20, 50 20 T 90 55" fill="white" stroke="#1a1b26" stroke-width="2.5"/>
        <path d="M22 25 L 12 8 L 32 18" fill="white" stroke="#1a1b26" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M78 25 L 88 8 L 68 18" fill="white" stroke="#1a1b26" stroke-width="2.5" stroke-linejoin="round"/>
        
        <!-- Expressive eyes -->
        {#if isFinished && accuracy > 95}
          <path d="M35 32l6 6M41 32l-6 6M59 32l6 6M65 32l-6 6" stroke="#1a1b26" stroke-width="2" />
        {:else if mistakes > 3}
          <path d="M34 38 Q 38 34, 42 38" fill="none" stroke="#1a1b26" stroke-width="2" />
          <path d="M58 38 Q 62 34, 66 38" fill="none" stroke="#1a1b26" stroke-width="2" />
        {:else}
          <circle cx="38" cy="35" r="2.5" fill="#1a1b26"/>
          <circle cx="62" cy="35" r="2.5" fill="#1a1b26"/>
        {/if}
        
        <path d="M46 42 Q 50 45, 54 42" fill="none" stroke="#1a1b26" stroke-width="2" stroke-linecap="round"/>
        <g class="paw-left {activePaw === 'left' ? 'tapping' : ''}">
          <path d="M18 48 Q 12 48, 12 58 T 24 58" fill="white" stroke="#1a1b26" stroke-width="2.5"/>
        </g>
        <g class="paw-right {activePaw === 'right' ? 'tapping' : ''}">
          <path d="M82 48 Q 88 48, 88 58 T 76 58" fill="white" stroke="#1a1b26" stroke-width="2.5"/>
        </g>
      </svg>
    </div>
  </div>

  <div class="test-area">
    {#if isFinished}
      <div class="victory-screen" in:fade>
        <h3>Challenge Complete! 🚀</h3>
        <div class="final-stats">
          <div class="f-stat"><span>WPM</span><strong>{wpm}</strong></div>
          <div class="f-stat"><span>Accuracy</span><strong>{accuracy}%</strong></div>
        </div>
        <button class="retry-btn" onclick={reset}>Try Another Challenge</button>
      </div>
    {:else}
      <div class="target-text">
        {#each targetText.split('') as char, i}
          <span class={getCharClass(char, i)}>{char}</span>
        {/each}
      </div>
      <input 
        type="text" 
        bind:value={userInput} 
        oninput={handleInput}
        placeholder="Start typing to begin..." 
        class="typing-input"
        autofocus
      />
    {/if}
  </div>
</div>

<style>
  .typing-test {
    background: var(--card-bg);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 2.5rem;
    margin: 3rem auto;
    position: relative;
  }

  .stats-header {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    align-items: center;
    font-family: var(--font-mono);
  }

  .stat {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  .icon-wpm { color: var(--accent-orange); }
  .icon-acc { color: var(--accent-blue); }

  .reset-btn {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
    transition: all 0.2s;
    margin-left: auto;
  }

  .reset-btn:hover {
    color: var(--accent-orange);
    background: rgba(255, 158, 100, 0.1);
  }

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

  .paw-left, .paw-right {
    transition: transform 0.05s ease-out;
    transform-origin: 50% 50%;
  }

  .paw-left.tapping {
    transform: translateY(6px) translateX(4px) rotate(-5deg);
  }

  .paw-right.tapping {
    transform: translateY(6px) translateX(-4px) rotate(5deg);
  }

  .test-area {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .target-text {
    font-size: 1.5rem;
    font-family: var(--font-mono);
    opacity: 0.5;
    line-height: 1.5;
    user-select: none;
  }

  .char-correct {
    color: var(--accent-blue);
    opacity: 1;
  }

  .char-incorrect {
    color: #f7768e;
    opacity: 1;
    background: rgba(247, 118, 142, 0.2);
    border-radius: 2px;
  }

  .char-pending {
    color: var(--text-primary);
  }

  .typing-input {
    background: rgba(0, 0, 0, 0.3);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 1rem 1.5rem;
    color: #fff;
    font-family: var(--font-mono);
    font-size: 1.1rem;
    width: 100%;
    outline: none;
    transition: border-color 0.2s;
  }

  .typing-input:focus {
    border-color: var(--accent-orange);
  }
  .victory-screen {
    text-align: center;
    padding: 2rem;
  }

  .victory-screen h3 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: var(--accent-orange);
  }

  .final-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-bottom: 2rem;
  }

  .f-stat {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .f-stat span {
    font-size: 0.8rem;
    color: var(--text-muted);
    text-transform: uppercase;
  }

  .f-stat strong {
    font-size: 2rem;
    color: #fff;
  }

  .retry-btn {
    background: var(--accent-orange);
    color: #000;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .retry-btn:hover {
    transform: scale(1.05);
  }
</style>
