<script>
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  export let tips = []

  let currentTipIndex = 0
  let visible = true

  onMount(() => {
    if (tips.length <= 1) return

    const interval = setInterval(() => {
      visible = false
      setTimeout(() => {
        currentTipIndex = (currentTipIndex + 1) % tips.length
        visible = true
      }, 400)
    }, 6000)

    return () => clearInterval(interval)
  })
</script>

{#if tips.length > 0}
  <div class="tips-section">
    <div class="tips-container">
      <div class="tip-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18h6"/><path d="M10 22h4"/>
          <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
        </svg>
      </div>
      <div class="tip-content">
        {#key currentTipIndex}
          {#if visible}
            <p class="tip-text" in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
              {tips[currentTipIndex]}
            </p>
          {/if}
        {/key}
      </div>
      <span class="tip-counter">{currentTipIndex + 1}/{tips.length}</span>
    </div>
  </div>
{/if}

<style>
  .tips-section {
    width: 100%;
  }

  .tips-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: var(--radius-md);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .tip-icon {
    width: 36px;
    height: 36px;
    min-width: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 215, 0, 0.1);
    border: 1px solid rgba(255, 215, 0, 0.2);
    border-radius: var(--radius-sm);
    color: var(--warning, #ffd700);
  }

  .tip-content {
    flex: 1;
    min-height: 20px;
    position: relative;
  }

  .tip-text {
    font-size: 0.85rem;
    color: var(--text-secondary);
    font-weight: 400;
    margin: 0;
    line-height: 1.4;
  }

  .tip-counter {
    font-size: 0.7rem;
    color: var(--text-muted);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
</style>
