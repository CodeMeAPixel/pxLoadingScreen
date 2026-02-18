# Configuration Reference

All configuration lives in `config.js` at the root of the resource. Edit it directly  no rebuild required. Changes take effect on server restart.

## Table of Contents

1. [General](#general)
2. [Theme](#theme)
3. [Content](#content)
4. [Media](#media)
5. [Progress](#progress)
6. [Tabs](#tabs)
7. [Layout](#layout)

---

## General

```js
General: {
  enableAudio: true,        // Enable background music
  audioVolume: 0.5,         // Volume (0.0 - 1.0)
  audioFadeOut: 3000,       // Screen fade duration in ms on shutdown
  enableVideo: true,        // Enable background video
  loopVideo: true,          // Loop video continuously
  allowSkip: false,         // Allow player to skip loading screen
  skipKeyBinding: 'ENTER',  // Key to skip (if allowSkip is true)
},
```

**Notes:**
- `audioFadeOut` controls how long the fade-out animation takes when the shutdown signal is received from `client.lua`.
- Setting `allowSkip: true` is useful during development.
- The `skipKeyBinding` value is matched case-insensitively against `event.key` and `event.code`.

---

## Theme

### Colors

```js
Theme: {
  colors: {
    accent: '#ff6b35',           // Primary accent color
    accentRGB: '255, 107, 53',   // RGB form for rgba() usage
    secondary: '#00d4ff',        // Secondary / tech color
    secondaryRGB: '0, 212, 255',
    success: '#06d6a0',
    warning: '#ffd700',
    danger: '#ef476f',
  },
```

These are applied as CSS custom properties (`--accent`, `--tech`, etc.) immediately on load, so they affect all colored elements including the progress bar glow, card borders, tab highlights, and the music player.

### Branding

```js
  branding: {
    enabled: true,
    icon: {
      show: true,
      url: 'https://example.com/icon.svg',  // URL or media/ path
      size: 56,
      showGlow: true,
    },
    title: 'Your Server Name',
    subtitle: 'A tagline or status text.',
  },
},
```

The icon can be any image URL or a path to a file in `media/`. Use a square PNG or SVG with a transparent background for best results.

---

## Content

```js
Content: {
  loadingText: 'Initializing Server',
  loadingDescription: 'Please wait while we get things ready...',

  cards: [
    {
      title: 'Welcome',
      icon: 'wrench',                        // wrench | tools | person
      description: 'Welcome to our server!',
      bgColor: 'rgba(255, 107, 53, 0.1)',
      borderColor: 'rgba(255, 107, 53, 0.3)',
    },
  ],

  tips: [
    'Explore the city and discover hidden locations',
    'Join our Discord for updates and support',
  ],
},
```

### Card Icons

Built-in icon options: `wrench`, `tools`, `person`. Any other string will fall back to a default icon.

### Tips

Tips rotate automatically every 6 seconds with a fade transition.

---

## Media

```js
Media: {
  backgroundVideo: 'media/background.mp4',
  backgroundImage: 'media/background.jpg',  // fallback if video is off
  audioFile: 'media/track1.mp3',
  audioPlaylist: [
    'media/track2.mp3',
    'media/track3.mp3',
  ],
},
```

- `backgroundVideo` is only shown when `General.enableVideo` is `true`.
- `backgroundImage` is shown when video is disabled or when `backgroundVideo` is empty.
- `audioPlaylist` entries are played in order after `audioFile`. When the playlist has more than one track, prev/next buttons appear in the music player.

### Supported Formats

| Type | Formats |
|------|---------|
| Audio | MP3, WAV, OGG, M4A |
| Video | MP4 (H.264) |
| Image | JPG, PNG, GIF, WebP |

### Video Recommendations

- Resolution: 1920x1080
- Codec: H.264 (libx264)
- Frame rate: 24-30 fps
- File size: under 100 MB

FFmpeg example:
```bash
ffmpeg -i input.mp4 -vcodec libx264 -crf 23 -preset fast -vf scale=1920:1080 -an output.mp4
```

---

## Progress

```js
Progress: {
  showProgressBar: true,
  progressColor: '#ff6b35',   // Bar fill and glow color
  simulateProgress: true,     // Step through checkpoints automatically
  minDuration: 5000,          // Total time (ms) to step through checkpoints
  checkpoints: [
    { label: 'Initializing Core', progress: 10 },
    { label: 'Loading Resources', progress: 25 },
    { label: 'Connecting to Server', progress: 50 },
    { label: 'Syncing Data', progress: 75 },
    { label: 'Finalizing Setup', progress: 90 },
  ],
},
```

### How Simulation Works

When `simulateProgress` is `true`, checkpoints are stepped through at equal intervals over `minDuration` milliseconds. Real FiveM `loadProgress` events always override simulated values  the simulated value only advances if it is ahead of the real progress.

The `progressColor` controls the bar fill gradient and the glow on the icon marker.

### Disabling Simulation

Set `simulateProgress: false` if you want the bar to only reflect what FiveM reports. This is accurate but the bar may appear to jump or stay at 0 briefly at the start.

---

## Tabs

```js
Tabs: {
  enabled: true,
  tabs: [
    {
      id: 'features',
      label: 'Features',
      icon: 'star',       // star | gamepad2 | question
      content: [
        'Vehicle Customization',
        'Professional Tuning',
      ],
    },
    {
      id: 'controls',
      label: 'Controls',
      icon: 'gamepad2',
      content: [
        'E - Interact with NPCs',
        'ESC - Close Menus',
      ],
    },
  ],
},
```

Set `Tabs.enabled: false` to hide the tabs panel entirely.

Built-in tab icons: `star`, `gamepad2`, `question`.

---

## Layout

```js
Layout: {
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
},
```

`fontFamily` is applied as the `--fontFamily` CSS custom property. Use any font stack. If you want a Google Font, add a `<link>` tag to `index.html` and reference the font family here.

---

## Complete Default Config

```js
window.CONFIG = {
  General: {
    enableAudio: true,
    audioVolume: 0.5,
    audioFadeOut: 3000,
    enableVideo: true,
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
        size: 56,
        showGlow: true,
      },
      title: 'Your Server Name',
      subtitle: 'Prepare for an awesome experience.',
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
    ],
    tips: [
      'Explore the city and discover hidden locations',
      'Join our Discord for updates and support',
    ],
  },
  Media: {
    backgroundVideo: 'media/background.mp4',
    backgroundImage: 'media/background.jpg',
    audioFile: 'media/music.mp3',
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
    enabled: true,
    tabs: [],
  },
  Layout: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
};
```
