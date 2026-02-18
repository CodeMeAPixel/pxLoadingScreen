<script>
  import { fade } from 'svelte/transition'

  export let tabs = []

  let activeTab = tabs.length > 0 ? tabs[0].id : null

  function selectTab(tabId) {
    activeTab = tabId
  }

  const iconMap = {
    star: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    gamepad2: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="11" x2="10" y2="11"/><line x1="8" y1="9" x2="8" y2="13"/><line x1="15" y1="12" x2="15.01" y2="12"/><line x1="18" y1="10" x2="18.01" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1.11 0 2.08-.402 2.592-1.382L9 15h6l1.408 2.618C16.92 18.598 17.89 19 19 19a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>',
    question: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    default: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
  }
</script>

<div class="tabs">
  <div class="tab-header">
    {#each tabs as tab}
      <button
        class="tab-btn"
        class:active={activeTab === tab.id}
        on:click={() => selectTab(tab.id)}
      >
        <span class="tab-icon">{@html iconMap[tab.icon] || iconMap.default}</span>
        <span class="tab-label">{tab.label}</span>
      </button>
    {/each}
  </div>

  <div class="tab-body">
    {#each tabs as tab}
      {#if activeTab === tab.id}
        <div class="tab-panel" in:fade={{ duration: 200 }}>
          {#each tab.content as item}
            <div class="tab-item">
              <span class="dot" />
              <span>{item}</span>
            </div>
          {/each}
        </div>
      {/if}
    {/each}
  </div>
</div>

<style>
  .tabs {
    width: 100%;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  .tab-header {
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    overflow-x: auto;
  }

  .tab-btn {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.65rem 1rem;
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    color: var(--text-muted);
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-family: inherit;
  }

  .tab-btn:hover {
    color: var(--text-secondary);
    background: rgba(255, 255, 255, 0.02);
  }

  .tab-btn.active {
    color: var(--accent);
    border-bottom-color: var(--accent);
    background: rgba(var(--accent-rgb), 0.05);
  }

  .tab-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.7;
  }

  .tab-btn.active .tab-icon {
    opacity: 1;
  }

  .tab-body {
    padding: 1rem;
    max-height: 180px;
    overflow-y: auto;
  }

  .tab-panel {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .tab-item {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.82rem;
    color: var(--text-secondary);
    border-radius: var(--radius-sm);
    transition: all var(--transition-fast);
  }

  .tab-item:hover {
    background: rgba(255, 255, 255, 0.03);
    color: var(--text-primary);
  }

  .dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
    opacity: 0.6;
  }
</style>
