<script>
  import { onMount, onDestroy } from 'svelte'
  import LoadingScreen from './components/LoadingScreen.svelte'
  import { progress, audio, config } from './stores.js'

  onMount(() => {
    const cfg = window.CONFIG || getDevConfig()
    config.set(cfg)

    // Apply theme colors as CSS custom properties
    const colors = cfg.Theme?.colors
    if (colors) {
      const root = document.documentElement
      if (colors.accent)        root.style.setProperty('--accent', colors.accent)
      if (colors.accentRGB)     root.style.setProperty('--accent-rgb', colors.accentRGB)
      if (colors.secondary)     root.style.setProperty('--tech', colors.secondary)
      if (colors.secondaryRGB)  root.style.setProperty('--tech-rgb', colors.secondaryRGB)
      if (colors.success)       root.style.setProperty('--success', colors.success)
      if (colors.warning)       root.style.setProperty('--warning', colors.warning)
      if (colors.danger)        root.style.setProperty('--danger', colors.danger)
    }

    // Apply font family
    if (cfg.Layout?.fontFamily) {
      document.documentElement.style.setProperty('--fontFamily', cfg.Layout.fontFamily)
    }

    // Allow skip
    let skipEnabled = false
    if (cfg.General?.allowSkip) {
      const key = (cfg.General.skipKeyBinding || 'ENTER').toUpperCase()
      const onKey = (e) => {
        if (e.key.toUpperCase() === key || e.code.toUpperCase() === key) {
          skipEnabled = true
          document.removeEventListener('keydown', onKey)
          const screen = document.querySelector('.loading-screen')
          if (screen) {
            screen.style.transition = 'opacity 0.5s ease-out'
            screen.style.opacity = '0'
          }
        }
      }
      document.addEventListener('keydown', onKey)
    }

    // Simulated progress
    let simTimer = null
    let realProgress = 0

    if (cfg.Progress?.simulateProgress) {
      const duration = cfg.Progress.minDuration || 8000
      const checkpoints = cfg.Progress.checkpoints || [
        { label: 'Initializing...', progress: 15 },
        { label: 'Loading Resources...', progress: 35 },
        { label: 'Connecting...', progress: 55 },
        { label: 'Syncing Data...', progress: 75 },
        { label: 'Almost There...', progress: 90 },
      ]

      let cpIndex = 0
      const interval = duration / (checkpoints.length + 1)

      simTimer = setInterval(() => {
        if (cpIndex < checkpoints.length) {
          const cp = checkpoints[cpIndex]
          if (realProgress < cp.progress) {
            progress.update(cp.progress)
            progress.setLabel(cp.label)
          }
          cpIndex++
        } else {
          clearInterval(simTimer)
        }
      }, interval)
    }

    window.addEventListener('message', (event) => {
      let item = event.data
      if (!item) return

      if (typeof item === 'string') {
        try { item = JSON.parse(item) } catch (e) { return }
      }

      if (item.eventName === 'loadProgress') {
        const fraction = item.loadFraction ?? 0
        const pct = Math.round(fraction * 100)
        realProgress = pct
        progress.update(pct)

        if (pct >= 100) {
          progress.setLabel('Ready!')
          if (simTimer) clearInterval(simTimer)
        } else if (pct >= 75) {
          progress.setLabel('Almost there...')
        } else if (pct >= 50) {
          progress.setLabel('Loading resources...')
        } else if (pct >= 25) {
          progress.setLabel('Connecting...')
        } else if (pct > 0) {
          progress.setLabel('Initializing...')
        }
      }

      if (item.eventName === 'startInitFunctionOrder') {
        progress.setLabel('Loading game...')
      }

      if (item.type === 'shutdown') {
        if (simTimer) clearInterval(simTimer)
        const fadeMs = cfg.General?.audioFadeOut ?? 1000
        audio.stop()
        const screen = document.querySelector('.loading-screen')
        if (screen) {
          screen.style.transition = `opacity ${fadeMs}ms ease-out`
          screen.style.opacity = '0'
        }
      }
    })

    return () => {
      if (simTimer) clearInterval(simTimer)
    }
  })

  onDestroy(() => {
    audio.stop()
  })

  function getDevConfig() {
    return {
      General: {
        enableAudio: false,
        audioVolume: 0.5,
        audioFadeOut: 1000,
        enableVideo: false,
        loopVideo: true,
        allowSkip: false,
        skipKeyBinding: 'ENTER',
      },
      Theme: {
        colors: {
          accent: '#ff6b35',
          accentRGB: '255, 107, 53',
          secondary: '#00d4ff',
          secondaryRGB: '0, 212, 255',
          success: '#06d6a0',
          warning: '#ffd700',
          danger: '#ef476f',
        },
        branding: {
          enabled: true,
          icon: {
            show: true,
            url: 'https://cmap.lol/icon.svg',
            size: 120,
            showGlow: true,
          },
          title: 'Your Server Name',
          subtitle: 'Loading...',
        },
      },
      Content: {
        loadingText: 'Initializing Server',
        loadingDescription: 'Please wait while we get things ready...',
        cards: [
          {
            title: 'Welcome',
            icon: 'wrench',
            description: 'Welcome to our server!',
            bgColor: 'rgba(255, 107, 53, 0.1)',
            borderColor: 'rgba(255, 107, 53, 0.3)',
          },
          {
            title: 'Features',
            icon: 'tools',
            description: 'Tons of custom content',
            bgColor: 'rgba(0, 212, 255, 0.1)',
            borderColor: 'rgba(0, 212, 255, 0.3)',
          },
          {
            title: 'Community',
            icon: 'person',
            description: 'Join our growing community',
            bgColor: 'rgba(6, 214, 160, 0.1)',
            borderColor: 'rgba(6, 214, 160, 0.3)',
          },
        ],
        tips: [
          'Explore the city and discover hidden locations',
          'Join our Discord for updates and support',
          'Check out the controls in the settings menu',
          'Report bugs to help us improve',
        ],
      },
      Media: {
        backgroundVideo: '',
        backgroundImage: '',
        audioFile: '',
        audioPlaylist: [],
      },
      Progress: {
        showProgressBar: true,
        progressColor: '#ff6b35',
        simulateProgress: true,
        minDuration: 5000,
        checkpoints: [
          { label: 'Initializing Core', progress: 10 },
          { label: 'Loading Resources', progress: 25 },
          { label: 'Connecting to Server', progress: 50 },
          { label: 'Syncing Data', progress: 75 },
          { label: 'Finalizing Setup', progress: 90 },
        ],
      },
      Tabs: {
        enabled: false,
        tabs: [],
      },
      Layout: {
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      },
    }
  }
</script>

<LoadingScreen />

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  :global(#app) {
    width: 100%;
    height: 100%;
  }
</style>
