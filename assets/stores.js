import { writable } from 'svelte/store'

// Config store - holds the full configuration from Lua
export const config = writable(null)

// Progress store
export const progress = (() => {
  const { subscribe, set, update } = writable({
    value: 0,
    label: 'Loading...',
    checkpoints: [],
  })

  return {
    subscribe,
    update: (value) => {
      update((state) => ({
        ...state,
        value: Math.min(value, 100),
      }))
    },
    setLabel: (label) => {
      update((state) => ({
        ...state,
        label,
      }))
    },
    setCheckpoints: (checkpoints) => {
      update((state) => ({
        ...state,
        checkpoints,
      }))
    },
    reset: () => set({ value: 0, label: 'Loading...', checkpoints: [] }),
  }
})()

// Audio store
export const audio = (() => {
  let audioElement = null
  let currentTrack = ''
  let currentVolume = 0.5
  let playlist = []
  let currentIndex = 0
  const { subscribe, set, update } = writable({
    playing: false,
    track: '',
    trackName: '',
    trackIndex: 0,
    trackTotal: 0,
    volume: 0.5,
  })

  function trackNameFromPath(path) {
    if (!path) return ''
    const base = path.split('/').pop().split('\\').pop()
    return base.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ')
  }

  function switchTo(index) {
    if (!playlist.length) return
    currentIndex = ((index % playlist.length) + playlist.length) % playlist.length
    const track = playlist[currentIndex]
    currentTrack = track
    const el = ensureAudioElement()
    el.src = track
    el.currentTime = 0
    el.play().catch(() => {})
    update((state) => ({
      ...state,
      track,
      trackName: trackNameFromPath(track),
      trackIndex: currentIndex,
      trackTotal: playlist.length,
    }))
  }

  function ensureAudioElement() {
    if (!audioElement) {
      audioElement = new Audio()
      audioElement.loop = true
      audioElement.volume = currentVolume
      // Sync playing state from actual audio events, not optimistic assumptions
      audioElement.addEventListener('play', () => {
        update((state) => ({ ...state, playing: true }))
      })
      audioElement.addEventListener('pause', () => {
        update((state) => ({ ...state, playing: false }))
      })
      audioElement.addEventListener('ended', () => {
        update((state) => ({ ...state, playing: false }))
      })
    }
    return audioElement
  }

  return {
    subscribe,
    loadPlaylist: (tracks) => {
      if (!tracks || !tracks.length) return
      playlist = tracks
      currentIndex = 0
      // Auto-advance to next track when current ends
      const el = ensureAudioElement()
      el.loop = false
      el.onended = () => switchTo(currentIndex + 1)
      currentTrack = tracks[0]
      el.src = tracks[0]
      update((state) => ({
        ...state,
        track: tracks[0],
        trackName: trackNameFromPath(tracks[0]),
        trackIndex: 0,
        trackTotal: tracks.length,
        playing: false,
      }))
    },
    nextTrack: () => switchTo(currentIndex + 1),
    prevTrack: () => switchTo(currentIndex - 1),
    setTrack: (track) => {
      currentTrack = track
      playlist = [track]
      currentIndex = 0
      const el = ensureAudioElement()
      el.src = track
      update((state) => ({
        ...state,
        track,
        trackName: trackNameFromPath(track),
        trackIndex: 0,
        trackTotal: 1,
        playing: false,
      }))
    },
    play: () => {
      const el = ensureAudioElement()
      if (!el.src && currentTrack) {
        el.src = currentTrack
      }
      el.play().catch((err) => {
        console.warn('[pxLoadingScreen] Audio autoplay blocked:', err.message)
        const tryPlay = () => el.play().catch(() => {})
        document.addEventListener('click', tryPlay, { once: true })
        document.addEventListener('keydown', tryPlay, { once: true })
      })
    },
    pause: () => {
      if (audioElement) audioElement.pause()
    },
    stop: () => {
      if (audioElement) {
        audioElement.pause()
        audioElement.currentTime = 0
      }
    },
    setVolume: (vol) => {
      currentVolume = vol
      if (audioElement) {
        audioElement.volume = vol
      }
      update((state) => ({
        ...state,
        volume: vol,
      }))
    },
    toggle: () => {
      if (audioElement && !audioElement.paused) {
        audioElement.pause()
      } else {
        const el = ensureAudioElement()
        if (!el.src && currentTrack) el.src = currentTrack
        el.play().catch(() => {})
      }
    },
  }
})()

// Settings store
export const settings = writable({
  theme: {
    accent: '#ff6b35',
    tech: '#00d4ff',
    success: '#06d6a0',
  },
  config: null,
})

// Notification store
export const notifications = (() => {
  const { subscribe, update } = writable([])

  return {
    subscribe,
    add: (message, type = 'info', duration = 3000) => {
      const id = Date.now()
      update((items) => [...items, { id, message, type }])

      if (duration > 0) {
        setTimeout(() => {
          update((items) => items.filter((item) => item.id !== id))
        }, duration)
      }

      return id
    },
    remove: (id) => {
      update((items) => items.filter((item) => item.id !== id))
    },
    clear: () => {
      update(() => [])
    },
  }
})()
