<script>
  import { onMount, onDestroy } from 'svelte'
  import { progress, audio, config } from '../stores.js'
  import ProgressBar from './ProgressBar.svelte'
  import Cards from './Cards.svelte'
  import Tips from './Tips.svelte'
  import Tabs from './Tabs.svelte'
  import MusicPlayer from './MusicPlayer.svelte'

  let currentConfig = null
  let currentProgress = 0
  let currentLabel = 'Loading...'
  let videoUrl = ''
  let imageUrl = ''
  let showMusicPlayer = false
  let initialized = false
  let showContent = false

  // Subscribe to config store
  const unsubscribeConfig = config.subscribe((value) => {
    if (value) {
      currentConfig = value
      if (!initialized) {
        initialized = true
        initializeScreen()
      }
    }
  })

  onMount(() => {
    // Stagger content entrance
    setTimeout(() => { showContent = true }, 200)

    // Subscribe to progress store
    const unsubscribeProgress = progress.subscribe((value) => {
      currentProgress = value.value
      currentLabel = value.label
    })

    return () => {
      unsubscribeProgress()
      unsubscribeConfig()
    }
  })

  function initializeScreen() {
    if (!currentConfig) return

    // Start audio if enabled
    if (currentConfig.General?.enableAudio && currentConfig.Media?.audioFile) {
      const primary = currentConfig.Media.audioFile
      const extras = currentConfig.Media.audioPlaylist || []
      const tracks = [primary, ...extras].filter(Boolean)
      audio.loadPlaylist(tracks)
      audio.setVolume(currentConfig.General.audioVolume || 0.5)
      audio.play()
      showMusicPlayer = true
    }

    // Set background video
    if (currentConfig.General?.enableVideo && currentConfig.Media?.backgroundVideo) {
      videoUrl = currentConfig.Media.backgroundVideo
    }

    // Set background image (fallback when no video)
    if (!videoUrl && currentConfig.Media?.backgroundImage) {
      imageUrl = currentConfig.Media.backgroundImage
    }
  }
</script>

<div class="loading-screen">
  <!-- Background Layer -->
  {#if videoUrl}
    <div class="bg-layer">
      <video src={videoUrl} autoplay muted loop={currentConfig?.General?.loopVideo !== false} playsinline />
    </div>
  {:else if imageUrl}
    <div class="bg-layer">
      <img src={imageUrl} alt="" class="bg-image" />
    </div>
  {/if}
  <div class="bg-overlay" />
  <div class="bg-grain" />

  <!-- Main Content -->
  <div class="screen-content" class:visible={showContent}>

    <!-- Top: Branding -->
    {#if currentConfig?.Theme?.branding?.enabled}
      <header class="header">
        <div class="brand">
          {#if currentConfig.Theme.branding.icon?.show}
            <div class="brand-icon">
              {#if currentConfig.Theme.branding.icon.showGlow}
                <div class="brand-glow" />
              {/if}
              <img
                src={currentConfig.Theme.branding.icon.url}
                alt="Server Icon"
                class="brand-img"
                onerror="this.style.display='none'"
              />
            </div>
          {/if}
          <div class="brand-text">
            <h1 class="brand-name">{currentConfig.Theme.branding.title}</h1>
            {#if currentConfig.Theme.branding.subtitle}
              <p class="brand-sub">{currentConfig.Theme.branding.subtitle}</p>
            {/if}
          </div>
        </div>
      </header>
    {/if}

    <!-- Center: Cards & Tabs -->
    <main class="main-area">
      {#if currentConfig?.Content?.cards && currentConfig.Content.cards.length > 0}
        <Cards cards={currentConfig.Content.cards} />
      {/if}

      {#if currentConfig?.Tabs?.enabled && currentConfig.Tabs.tabs?.length > 0}
        <Tabs tabs={currentConfig.Tabs.tabs} />
      {/if}
    </main>

    <!-- Bottom: Tips + Progress -->
    <footer class="footer">
      {#if currentConfig?.Content?.tips && currentConfig.Content.tips.length > 0}
        <div class="footer-tips">
          <Tips tips={currentConfig.Content.tips} />
        </div>
      {/if}

      {#if currentConfig?.Progress?.showProgressBar}
        <div class="footer-progress">
          <ProgressBar
            value={currentProgress}
            label={currentLabel}
            color={currentConfig.Progress.progressColor}
          />
        </div>
      {/if}
    </footer>
  </div>

  <!-- Music Player -->
  {#if showMusicPlayer && currentConfig}
    <MusicPlayer config={currentConfig} />
  {/if}

  <!-- Watermark -->
  <div class="watermark">
    <img src="https://cmap.lol/icon.svg" alt="CodeMeAPixel" class="watermark-img" />
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: #000;
  }

  /* ── Screen ── */
  .loading-screen {
    position: fixed;
    inset: 0;
    display: flex;
    background: var(--bg-base);
    overflow: hidden;
  }

  /* ── Background ── */
  .bg-layer {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .bg-layer video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.35;
  }

  .bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.35;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    background:
      linear-gradient(180deg, rgba(11,11,15,0.6) 0%, rgba(11,11,15,0.2) 40%, rgba(11,11,15,0.7) 100%),
      radial-gradient(ellipse at 20% 50%, rgba(var(--accent-rgb), 0.04) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 80%, rgba(var(--tech-rgb), 0.03) 0%, transparent 60%);
  }

  .bg-grain {
    position: absolute;
    inset: 0;
    z-index: 2;
    opacity: 0.02;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  /* ── Content ── */
  .screen-content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 2.5rem 3rem;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .screen-content.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── Header / Branding ── */
  .header {
    flex-shrink: 0;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  .brand-icon {
    position: relative;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    overflow: visible;
  }

  .brand-glow {
    position: absolute;
    inset: -8px;
    border-radius: var(--radius-lg);
    background: radial-gradient(circle, rgba(var(--accent-rgb), 0.25) 0%, transparent 70%);
    filter: blur(12px);
    animation: glowPulse 3s ease-in-out infinite;
  }

  @keyframes glowPulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
  }

  .brand-img {
    width: 36px;
    height: 36px;
    object-fit: contain;
    position: relative;
    z-index: 1;
  }

  .brand-name {
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.3px;
    margin: 0;
    line-height: 1.2;
  }

  .brand-sub {
    font-size: 0.75rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 500;
    margin: 0.2rem 0 0;
  }

  /* ── Main Area ── */
  .main-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 1.5rem;
    padding-bottom: 1rem;
    max-width: 900px;
  }

  /* ── Footer ── */
  .footer {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .footer-tips {
    max-width: 600px;
  }

  .footer-progress {
    width: 100%;
  }

  /* ── Watermark ── */
  .watermark {
    position: fixed;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 50;
    opacity: 0.25;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .watermark-img {
    width: 32px;
    height: 32px;
    object-fit: contain;
    filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.5));
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .screen-content {
      padding: 1.5rem;
    }

    .brand-name {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 480px) {
    .screen-content {
      padding: 1rem;
    }

    .brand-icon {
      width: 42px;
      height: 42px;
    }

    .brand-img {
      width: 28px;
      height: 28px;
    }

    .brand-name {
      font-size: 1rem;
    }
  }
</style>
