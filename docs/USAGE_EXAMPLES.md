# Usage Examples

Practical examples for common configurations. All changes are made in `config.js` only  no rebuild required.

---

## Custom Theme Colors

Override the default orange/blue palette with your own brand colors. Both a hex value and its RGB breakdown are required so the UI can construct `rgba()` values for transparency effects.

```js
Theme: {
  colors: {
    accent: '#7c3aed',
    accentRGB: '124, 58, 237',
    secondary: '#a78bfa',
    secondaryRGB: '167, 139, 250',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
  },
},
```

---

## Custom Font

Set a font stack for the entire loading screen. If using a Google Font, add the `<link>` tag to `index.html` and reference it here.

Add to `index.html` `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&display=swap" rel="stylesheet">
```

Then in `config.js`:
```js
Layout: {
  fontFamily: 'Rajdhani, sans-serif',
},
```

---

## Background Video Only

```js
General: {
  enableVideo: true,
  loopVideo: true,
},
Media: {
  backgroundVideo: 'media/city.mp4',
  backgroundImage: '',
},
```

---

## Background Image Only (No Video)

```js
General: {
  enableVideo: false,
},
Media: {
  backgroundVideo: '',
  backgroundImage: 'media/background.jpg',
},
```

---

## Audio Playlist

Set a primary track followed by additional tracks. When more than one track is configured, the music player shows previous and next buttons.

```js
General: {
  enableAudio: true,
  audioVolume: 0.4,
},
Media: {
  audioFile: 'media/track1.mp3',
  audioPlaylist: [
    'media/track2.mp3',
    'media/track3.mp3',
    'media/track4.mp3',
  ],
},
```

Tracks play in order. The playlist loops back to the beginning after the last track.

---

## Disable Audio

```js
General: {
  enableAudio: false,
},
```

---

## Custom Progress Checkpoints

Checkpoints control what text appears in the loading label and how the bar advances during simulation.

```js
Progress: {
  showProgressBar: true,
  progressColor: '#7c3aed',
  simulateProgress: true,
  minDuration: 8000,
  checkpoints: [
    { label: 'Booting Framework', progress: 10 },
    { label: 'Loading Map Data', progress: 20 },
    { label: 'Spawning Entities', progress: 40 },
    { label: 'Syncing Economy', progress: 60 },
    { label: 'Loading Player Data', progress: 80 },
    { label: 'Joining Session', progress: 95 },
  ],
},
```

The bar steps through each checkpoint evenly over `minDuration` milliseconds. Real FiveM progress events override simulated values.

---

## Disable Progress Simulation

Use this if you want the bar to only reflect what FiveM actually reports.

```js
Progress: {
  simulateProgress: false,
},
```

---

## Server Info Cards

Cards appear in the center panel. Use them to highlight server features.

```js
Content: {
  cards: [
    {
      title: 'Custom Jobs',
      icon: 'wrench',
      description: 'Over 50 unique jobs from mechanic to lawyer.',
      bgColor: 'rgba(124, 58, 237, 0.1)',
      borderColor: 'rgba(124, 58, 237, 0.3)',
    },
    {
      title: 'Active Community',
      icon: 'person',
      description: 'Join thousands of active players.',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      borderColor: 'rgba(16, 185, 129, 0.3)',
    },
    {
      title: 'Custom Vehicles',
      icon: 'tools',
      description: '500+ custom vehicles and liveries.',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      borderColor: 'rgba(245, 158, 11, 0.3)',
    },
  ],
},
```

Available icons: `wrench`, `tools`, `person`.

---

## Rotating Tips

Tips rotate every 6 seconds.

```js
Content: {
  tips: [
    'Use /report to contact staff in-game.',
    'Check #announcements on Discord for updates.',
    'You can change your character outfit at any clothing store.',
    'Press E to interact with most objects and NPCs.',
  ],
},
```

---

## Tabs Panel

```js
Tabs: {
  enabled: true,
  tabs: [
    {
      id: 'rules',
      label: 'Rules',
      icon: 'star',
      content: [
        'No combat logging.',
        'Respect all players.',
        'Stay in character in public areas.',
        'No hacking, modding, or cheating.',
      ],
    },
    {
      id: 'controls',
      label: 'Controls',
      icon: 'gamepad2',
      content: [
        'F1 - Open Phone',
        'E - Interact',
        'G - Enter / Exit Vehicle',
        'ESC - Close Menus',
      ],
    },
    {
      id: 'faq',
      label: 'FAQ',
      icon: 'question',
      content: [
        'How do I join a job? Visit the job center.',
        'Where is the hospital? Follow the H map icon.',
        'How do I report a bug? Use #bug-reports on Discord.',
      ],
    },
  ],
},
```

Set `Tabs.enabled: false` to hide the panel entirely.

---

## Allow Skip (Development)

Useful while testing. Press the configured key to immediately trigger the shutdown sequence.

```js
General: {
  allowSkip: true,
  skipKeyBinding: 'ENTER',
},
```

Disable before deploying to production.

---

## Branding with Local Icon

Place an icon file in `media/` and reference it:

```js
Theme: {
  branding: {
    enabled: true,
    icon: {
      show: true,
      url: 'media/logo.png',
      size: 64,
      showGlow: true,
    },
    title: 'My RP Server',
    subtitle: 'Est. 2024',
  },
},
```

---

## Minimal Config (No Media)

A barebones setup with no video, no audio, and plain image background.

```js
window.CONFIG = {
  General: {
    enableAudio: false,
    audioVolume: 0.5,
    audioFadeOut: 2000,
    enableVideo: false,
    loopVideo: false,
    allowSkip: false,
    skipKeyBinding: 'ENTER',
  },
  Theme: {
    colors: {
      accent: '#3b82f6',
      accentRGB: '59, 130, 246',
      secondary: '#6366f1',
      secondaryRGB: '99, 102, 241',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
    },
    branding: {
      enabled: true,
      icon: { show: false, url: '', size: 56, showGlow: false },
      title: 'My Server',
      subtitle: '',
    },
  },
  Content: {
    loadingText: 'Loading',
    loadingDescription: '',
    cards: [],
    tips: [],
  },
  Media: {
    backgroundVideo: '',
    backgroundImage: 'media/background.jpg',
    audioFile: '',
    audioPlaylist: [],
  },
  Progress: {
    showProgressBar: true,
    progressColor: '#3b82f6',
    simulateProgress: true,
    minDuration: 4000,
    checkpoints: [
      { label: 'Connecting', progress: 30 },
      { label: 'Loading', progress: 70 },
      { label: 'Ready', progress: 95 },
    ],
  },
  Tabs: {
    enabled: false,
    tabs: [],
  },
  Layout: {
    fontFamily: 'Inter, -apple-system, sans-serif',
  },
};
```

---

## Support

- Discord: [discord.gg/BsEhHBTbXw](https://discord.gg/BsEhHBTbXw)
- Email: hey@codemeapixel.dev
- Issues: [github.com/CodeMeAPixel/pxLoadingScreen/issues](https://github.com/CodeMeAPixel/pxLoadingScreen/issues)
