<script>
  import { audio } from '../stores.js'

  export let config = {}

  let isPlaying = false
  let volume = config?.General?.audioVolume || 0.5
  let showVolume = false
  let trackTotal = 0

  $: isPlaying = $audio.playing
  $: trackTotal = $audio.trackTotal ?? 0

  function toggleAudio() {
    audio.toggle()
  }

  function handleVolume(e) {
    const newVolume = parseFloat(e.target.value)
    volume = newVolume
    audio.setVolume(newVolume)
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="player" on:mouseenter={() => showVolume = true} on:mouseleave={() => showVolume = false}>

  <!-- Prev -->
  {#if trackTotal > 1}
    <button class="player-btn secondary" on:click={() => audio.prevTrack()} title="Previous">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="19 20 9 12 19 4 19 20"/>
        <line x1="5" y1="19" x2="5" y2="5"/>
      </svg>
    </button>
  {/if}

  <!-- Play/Pause -->
  <button class="player-btn" on:click={toggleAudio} title={isPlaying ? 'Pause' : 'Play'}>
    {#if isPlaying}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <rect x="6" y="4" width="4" height="16" rx="1"/>
        <rect x="14" y="4" width="4" height="16" rx="1"/>
      </svg>
    {:else}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    {/if}
  </button>

  <!-- Next -->
  {#if trackTotal > 1}
    <button class="player-btn secondary" on:click={() => audio.nextTrack()} title="Next">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="5 4 15 12 5 20 5 4"/>
        <line x1="19" y1="5" x2="19" y2="19"/>
      </svg>
    </button>
  {/if}

  <!-- Visualizer bars when playing -->
  {#if isPlaying}
    <div class="bars">
      <span class="bar" /><span class="bar" /><span class="bar" /><span class="bar" />
    </div>
  {/if}

  <!-- Volume on hover -->
  {#if showVolume}
    <input
      class="volume"
      type="range"
      min="0"
      max="1"
      step="0.05"
      value={volume}
      on:input={handleVolume}
      title="Volume"
    />
  {/if}
</div>

<style>
  .player {
    position: fixed;
    top: 2rem;
    right: 2.5rem;
    z-index: 100;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: rgba(17, 17, 22, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: var(--radius-md);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    transition: all var(--transition-fast);
  }

  .player:hover {
    background: rgba(17, 17, 22, 0.92);
    border-color: rgba(255, 255, 255, 0.12);
  }

  .player-btn {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(var(--accent-rgb), 0.1);
    border: 1px solid rgba(var(--accent-rgb), 0.2);
    border-radius: var(--radius-sm);
    color: var(--accent);
    cursor: pointer;
    transition: all var(--transition-fast);
    padding: 0;
    flex-shrink: 0;
  }

  .player-btn.secondary {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.08);
    color: var(--text-secondary);
  }

  .player-btn:hover {
    background: rgba(var(--accent-rgb), 0.22);
    border-color: rgba(var(--accent-rgb), 0.35);
    color: var(--accent);
    transform: scale(1.08);
  }

  /* Audio visualizer bars */
  .bars {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 16px;
  }

  .bar {
    width: 3px;
    background: var(--accent);
    border-radius: 1px;
    animation: barBounce 0.8s ease-in-out infinite;
  }

  .bar:nth-child(1) { height: 6px; animation-delay: 0s; }
  .bar:nth-child(2) { height: 12px; animation-delay: 0.15s; }
  .bar:nth-child(3) { height: 8px; animation-delay: 0.3s; }
  .bar:nth-child(4) { height: 14px; animation-delay: 0.45s; }

  @keyframes barBounce {
    0%, 100% { transform: scaleY(0.4); }
    50% { transform: scaleY(1); }
  }

  /* Hover panel: track name + volume */
  /* Volume slider */
  .volume {
    width: 70px;
    height: 3px;
    -webkit-appearance: none;
    appearance: none;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    outline: none;
    cursor: pointer;
    flex-shrink: 0;
  }

  .volume::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--accent);
    cursor: pointer;
    border: none;
  }
</style>
