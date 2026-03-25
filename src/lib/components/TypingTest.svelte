<script lang="ts">
  import { onMount } from 'svelte';
  import TypingStatsHeader from '$lib/components/typing-test/TypingStatsHeader.svelte';
  import TypingBongoCat from '$lib/components/typing-test/TypingBongoCat.svelte';
  import TypingVictoryScreen from '$lib/components/typing-test/TypingVictoryScreen.svelte';

  const sentences = [
    "ship it and fix it later",
    "code all day, debug all night",
    "it works on my machine",
    "one more commit before bed",
    "clean code is happy code",
    "coffee first, then code",
    "built with love and caffeine",
    "keep it simple and ship it",
    "make it work, make it right, make it fast",
    "hello world is just the beginning",
    "done is better than perfect",
    "push to main and pray",
    "bugs are just surprise features",
    "think twice, code once",
    "building cool things on the internet",
    "less is more, always",
    "learn, build, break, repeat",
    "stay curious, keep building",
    "deploy to vercel and chill",
    "docker makes everything portable",
    "kubernetes keeps it all running",
    "ollama brings ai to your laptop",
    "open source changed the world",
    "linux is home for developers",
    "rag makes ai actually useful",
    "svelte makes the web feel fast",
    "rust is the future of systems",
    "postgres is the goat of databases",
    "tailwind makes styling fun again",
    "the terminal is my happy place",
    "better auth keeps sign in simple",
    "supabase makes postgres even more fun",
    "aws powers apps at global scale",
    "serverless helps teams ship faster",
    "convex keeps realtime data in sync",
    "cloudflare keeps latency low at the edge",
    "llms turn prompts into working products",
    "great llm apps need strong context",
    "small models can still solve big problems"
  ];

  let targetText = $state(sentences[0]);
  let userInput = $state('');
  let startTime = $state(0);
  let wpm = $state(0);
  let accuracy = $state(100);
  let isFinished = $state(false);
  let isFocused = $state(false);
  let activePaw = $state('none');
  let charElements = $state<HTMLElement[]>([]);
  let inputElement = $state<HTMLInputElement | null>(null);


  let lastTapTime = 0;
  let mistakes = $state(0);

  function reset(shouldFocus = false) {
    targetText = sentences[Math.floor(Math.random() * sentences.length)];
    userInput = '';
    startTime = 0;
    wpm = 0;
    accuracy = 100;
    isFinished = false;
    mistakes = 0;
    
    if (shouldFocus) {
      setTimeout(() => {
        inputElement?.focus();
      }, 0);
    }
  }

  function handleGlobalKeydown(e: KeyboardEvent) {
    if (e.key === 'Tab') {
      e.preventDefault();
      reset(true);
    }
  }

  onMount(() => {
    reset(false); // Do not focus on initial load to prevent scroll
  });

  const caretStyle = $derived.by(() => {
    if (userInput.length === 0) return 'left: 0; top: 0.35rem;';
    
    // Position at the NEXT character to type
    if (userInput.length < targetText.length) {
      const el = charElements[userInput.length];
      if (el) return `left: ${el.offsetLeft}px; top: ${el.offsetTop + 6}px;`;
    }
    
    // If at the very end
    const lastEl = charElements[targetText.length - 1];
    if (lastEl) return `left: ${lastEl.offsetLeft + lastEl.offsetWidth}px; top: ${lastEl.offsetTop + 6}px;`;
    
    return 'left: 0; top: 0.35rem;';
  });


  function handleInput(e: any) {
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

  function getCharClass(char: string, index: number) {
    if (index >= userInput.length) return 'char-pending';
    return userInput[index] === char ? 'char-correct' : 'char-incorrect';
  }

  const eyeTransform = $derived.by(() => {
    if (targetText.length === 0) return 'translate(0, 0)';
    const progress = userInput.length / targetText.length;
    // Map progress (0-1) to eye movement
    // x: -3px to +3px, y: stays looking down slightly
    const x = (progress * 6) - 3;
    const y = 2; 
    return `translate(${x}px, ${y}px)`;
  });
</script>
<svelte:window onkeydown={handleGlobalKeydown} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="typing-test" id="typing" onclick={() => inputElement?.focus()}>
  <TypingStatsHeader {wpm} {accuracy} onReset={() => reset(true)} />

  <TypingBongoCat {isFinished} {accuracy} {mistakes} {activePaw} {eyeTransform} />

  <div class="test-area">
    {#if isFinished}
      <TypingVictoryScreen {wpm} {accuracy} onRetry={() => reset(true)} />
    {:else}
      <div class="target-text">
        {#if !isFinished}
          <div 
            class="caret" 
            class:blinking={userInput.length === 0}
            style={caretStyle}
          ></div>
        {/if}
        {#each targetText.split('') as char, i}
          <span 
            bind:this={charElements[i]}
            class={getCharClass(char, i)}
          >{char}</span>
        {/each}
      </div>


      <input 
        type="text" 
        bind:value={userInput} 
        bind:this={inputElement}
        oninput={handleInput}
        class="typing-input"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        onfocus={() => isFocused = true}
        onblur={() => isFocused = false}
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

  .test-area {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .typing-input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    z-index: -1;
  }

  /* Monkeytype inspired styles */
  .target-text {
    position: relative;
    font-size: 1.5rem;
    font-family: var(--font-mono);
    line-height: 1.5;
    user-select: none;
    letter-spacing: 0.05em;
  }

  .caret {
    position: absolute;
    width: 2px;
    height: 1.5rem;
    background: var(--accent-orange);
    transition: all 0.1s cubic-bezier(0.19, 1, 0.22, 1);
    top: 0.35rem;
  }


  .caret.blinking {
    animation: blink 1s infinite alternate;
  }

  @keyframes blink {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  .char-pending {
    color: var(--text-muted);
    opacity: 0.3;
  }

  .char-correct {
    color: var(--text-primary);
    opacity: 1;
  }

  .char-incorrect {
    color: #f7768e;
    opacity: 1;
    background: rgba(247, 118, 142, 0.15);
    border-radius: 2px;
  }


  @media (max-width: 768px) {
    .typing-test {
      padding: 1.5rem;
      margin: 1.5rem auto;
    }

    .target-text {
      font-size: 1.1rem;
      line-height: 1.4;
    }

    .caret {
      height: 1.1rem;
      top: 0.2rem;
    }
  }
</style>
