# Configuration Reference

All configuration lives in `config.js` at the root of the resource as `window.CONFIG`. Edit it directly — no rebuild required. Changes take effect on server restart.

## Table of Contents

1. [General](#general)
2. [Theme](#theme)
3. [Content](#content)
4. [Media](#media)
5. [Progress](#progress)
6. [Social](#social)
7. [Tabs](#tabs)
8. [Layout](#layout)
9. [Complete Default Config](#complete-default-config)

---

## General

```js
General: {
  enableAudio:    true,     // Enable background music
  audioVolume:    0.3,      // Volume (0.0 - 1.0)
  audioFadeOut:   3000,     // Fade-out duration in ms on shutdown
  enableVideo:    true,     // Enable background video
  loopVideo:      false,    // Loop video continuously
  allowSkip:      false,    // Allow player to skip the loading screen
  skipKeyBinding: 'ENTER',  // Key to trigger skip (if allowSkip is true)
},
```

- `audioFadeOut` controls how long the screen takes to fade out when the shutdown signal arrives from `client.lua`.
- `skipKeyBinding` is matched case-insensitively against `event.key` and `event.code`.
- `allowSkip: true` is useful during development. Disable it in production.

---

## Theme

### Colors

```js
Theme: {
  colors: {
    // Required: Primary brand colors
    accent:        '#7235ff',       // Primary accent (buttons, glows, highlights)
    accentRGB:     '114, 53, 255',  // RGB form for rgba() usage (transparency effects)
    secondary:     '#6f00ff',       // Secondary / tech color
    secondaryRGB:  '111, 0, 255',   // RGB breakdown

    // Status colors
    success:       '#06d6a0',       // Success messages, "online" indicators
    warning:       '#ffd700',       // Warnings, caution messages
    danger:        '#ef476f',       // Errors, danger states

    // Optional: Override default text colors
    // textPrimary:   '#e8e8ef',    // Main text (headings, labels)
    // textSecondary: '#8a8f9d',    // Secondary text (descriptions, info)
    // textMuted:     '#4a4e5a',    // Muted text (metadata, hints)

    // Optional: Override default surface colors
    // bgBase:        '#0b0b0f',    // Page background
    // bgSurface:     '#141419',    // Card/panel background
  },
```

Every color property is applied as a **CSS custom property** at startup, making it instantly available throughout the UI. Use both a **hex value** and its **RGB breakdown** for any color you set — the RGB form enables `rgba()` calculations for transparency effects like glows and overlays.

**Color customization tips:**
- Start with just `accent` and `accentRGB` to change the primary UI color
- Add `secondary`/`secondaryRGB` for a tech or secondary accent
- Override `textPrimary`, `textSecondary`, `textMuted` for a full dark/light theme transform
- Override `bgBase` and `bgSurface` to change panel backgrounds

### Branding

```js
  branding: {
    enabled: true,
    icon: {
      show:     true,
      url:      'https://cmap.lol/icon.svg',  // URL or media/ path
      size:     120,
      showGlow: true,
    },
    title:    'Your Server Name',
    subtitle: 'A tagline or status text.',
  },
},
```

The icon URL can be a remote URL or a relative path like `media/logo.png`. Use a square PNG or SVG with a transparent background for best results.

---

## Content

```js
Content: {
  loadingText:        'Initializing Server',
  loadingDescription: 'Please wait while we get things ready...',

  cards: [
    {
      title:       'Welcome',
      icon:        'wrench',                      // wrench | tools | person
      description: 'Welcome to our server!',
      bgColor:     'rgba(255, 107, 53, 0.1)',
      borderColor: 'rgba(255, 107, 53, 0.3)',
    },
  ],

  tips: [
    'Explore the city and discover hidden locations.',
    'Join our Discord for updates and support.',
  ],
},
```

Built-in card icons: `wrench`, `tools`, `person`. Any unrecognised value falls back to a generic box icon. Tips rotate automatically every 6 seconds with a fade transition.

---

## Media

```js
Media: {
  backgroundVideo: 'https://embrly.ca/yourspace/background.mp4/raw',
  backgroundImage: 'https://embrly.ca/yourspace/background.gif/raw',

  // Plain string — title is derived from the filename
  audioFile: 'media/music/local-track.mp3',

  // Object with metadata — recommended when using external URLs
  // audioFile: {
  //   src:    'https://embrly.ca/yourspace/track1.mp3/raw',
  //   title:  'Track Name',
  //   artist: 'Artist Name',
  //   cover:  'https://embrly.ca/yourspace/cover.jpg/raw',  // optional album art
  // },

  audioPlaylist: [
    {
      src:    'https://embrly.ca/yourspace/track2.mp3/raw',
      title:  'Another Track',
      artist: 'Artist Name',
    },
    'media/music/local-track.mp3',  // plain strings still work
  ],
},
```

Every media field accepts either a **local path** (e.g. `media/music/track.mp3`) or a **full external URL** (e.g. `https://cdn.example.com/track.mp3`). Both formats work for any field video, image, and all audio tracks including playlist entries.

**External URLs are strongly preferred.** Files served through FiveM's asset transfer are downloaded by every connecting client before the loading screen appears. A single 100 MB video or even a full playlist of MP3s adds that weight to your connection time. Hosting media on an external file host removes that overhead entirely — files stream directly from your host.

**[embrly.ca](https://embrly.ca)** is a recommended file host for this resource. Sign up at [embrly.ca](https://embrly.ca), upload your videos, GIFs, and audio files, and copy the direct link URL into `config.js`. No additional configuration is required on the FiveM side.

> **embrly.ca URLs:** Always append `/raw` to the share URL so the browser receives the file directly rather than the file-preview page. For example:
> `https://embrly.ca/yourUserId/background.mp4/raw`

**Local paths** require the file to exist in `media/` and be listed in `fxmanifest.lua`. If all your media are external URLs, you can remove the `media/` entries from `fxmanifest.lua` entirely.

- `backgroundVideo` only displays when `General.enableVideo` is `true`.
- `backgroundImage` is the fallback when video is off or `backgroundVideo` is empty.
- When more than one track is configured (counting `audioFile`), prev/next buttons appear in the music player.

### Track Metadata

Every audio entry in `audioFile` and `audioPlaylist` accepts either a plain string (path or URL) or an object with metadata:

```js
// Plain string — title is auto-derived from the filename
'media/music/track.mp3'

// Object — title, artist, and cover are displayed in the music player
{
  src:    'https://embrly.ca/yourspace/track.mp3/raw',  // append /raw for embrly.ca URLs
  title:  'Track Name',    // optional
  artist: 'Artist Name',  // optional
  cover:  'https://embrly.ca/yourspace/cover.jpg/raw',  // optional, URL to album art image
}
```

Both formats can be mixed freely within `audioPlaylist`. When using external CDN URLs (such as embrly.ca), adding metadata is recommended because filenames from CDN URLs are typically opaque and would otherwise display as meaningless strings in the player.

### Supported Formats

| Type  | Formats             |
|-------|---------------------|
| Audio | MP3, WAV, OGG, M4A  |
| Video | MP4 (H.264)         |
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
  showProgressBar:  true,
  progressColor:    '#ff6b35',  // Bar fill and glow color
  simulateProgress: true,       // Step through checkpoints automatically
  minDuration:      5000,       // Total time (ms) to step through all checkpoints
  checkpoints: [
    { label: 'Initializing Core',    progress: 10 },
    { label: 'Loading Resources',    progress: 25 },
    { label: 'Connecting to Server', progress: 50 },
    { label: 'Syncing Data',         progress: 75 },
    { label: 'Finalizing Setup',     progress: 90 },
  ],
},
```

Checkpoints step through evenly over `minDuration` milliseconds. Real FiveM `loadProgress` events always override simulated values — the simulated position only advances when it is ahead of what FiveM has reported.

Set `simulateProgress: false` to have the bar reflect only what FiveM reports. The bar may jump or sit at zero briefly at the start.

---

## Social

```js
Social: {
  enabled: true,
  links: [
    { platform: 'discord', label: 'Discord', url: 'https://discord.gg/example' },
    { platform: 'website', label: 'Website', url: 'https://example.com' },
    { platform: 'store',   label: 'Store',   url: 'https://example.com/store' },
    { platform: 'youtube', label: 'YouTube', url: 'https://youtube.com/@example' },
  ],
},
```

Set `Social.enabled: false` to hide the social links panel entirely.

### Supported Platforms

The following platform names have built-in icons and brand-specific hover colors:

| `platform` | Icon | Hover Color | Notes |
|-----------|------|-------------|-------|
| `discord` | Discord logo | #5865f2 | Use full Discord server invite URL |
| `twitter` | Twitter/X logo | Brand blue | Public profile URL |
| `youtube` | YouTube logo | #ff0000 | Channel URL (e.g., `@yourhandle` format) |
| `twitch` | Twitch logo | #9146ff | Channel URL |
| `tiktok` | TikTok logo | #000000 | Profile URL |
| `instagram` | Instagram logo | Gradient | Profile URL |
| `website` | Globe icon | accent color | Any website URL |
| `store` | Shopping bag | #06d6a0 | Shop/store URL |
| `github` | GitHub logo | #24292f | GitHub profile or repo URL |

Any unrecognized `platform` value displays with a generic link icon and falls back to the accent color on hover.

---

## Tabs

```js
Tabs: {
  enabled: true,
  tabs: [ ... ],
},
```

Set `Tabs.enabled: false` to hide the tabs panel entirely. To hide a specific tab, remove its entry from the `tabs` array.

### Tab Object Properties

| Property   | Type   | Required | Description |
|------------|--------|----------|-------------|
| `id`       | string | Yes      | Unique identifier. Use `'resources'` for the auto-populating tab. |
| `label`    | string | Yes      | Text shown in the tab header. |
| `icon`     | string | No       | Built-in icon name (see list below). |
| `iconSvg`  | string | No       | Raw SVG string — overrides `icon` when provided. |
| `color`    | string | No       | Hex color for the active tab indicator and accent elements. |
| `colorRGB` | string | No       | RGB breakdown of `color` for `rgba()` transparency effects. |
| `content`  | array  | Yes      | Array of content items (see types below). |

### Built-in Icons

`star`, `shield`, `users`, `book`, `map`, `gamepad2`, `info`, `settings`, `question`, `wrench`, `tools`, `person`

### Content Types

Tabs support four content types. You can mix types within a single tab.

**Plain string** — a simple bulleted row:
```js
content: [
  'No RDM (Random Deathmatch).',
  'Stay in character at all times.',
]
```

**Staff member** — avatar (or initial fallback), name, and role:
```js
content: [
  { name: 'Pixel', role: 'Server Owner', image: 'https://example.com/avatar.png' },
  { name: 'Alex',  role: 'Head Admin',   image: '' },
]
```

When `image` is empty or omitted, the first letter of `name` is shown as a placeholder avatar.

**Key/value row** — a label, dotted leader line, and value:
```js
content: [
  { label: 'Framework', value: 'QB-Core' },
  { label: 'Voice',     value: 'PMA-Voice' },
]
```

**Title + description** — a bold title with a muted description beneath it:
```js
content: [
  { title: 'Economy Update', description: 'Prices adjusted across all job tiers.' },
]
```

### Auto-Populating Resources Tab

A tab with `id: 'resources'` and an empty `content` array populates itself at runtime. The loading screen parses FiveM initialization logs for lines matching patterns like `Started resource qb-core` and appends each unique resource name as a key/value row. No manual list required.

If you pre-populate `content` for this tab, those items are kept and new entries are appended after them.

---

## Layout

```js
Layout: {
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
},
```

Applied as the `--fontFamily` CSS custom property. To use a Google Font, add the `<link>` tag to `index.html` and reference the font family name here.

---

## Complete Default Config

```js
window.CONFIG = {
  General: {
    enableAudio:    true,
    audioVolume:    0.3,
    audioFadeOut:   3000,
    enableVideo:    true,
    loopVideo:      false,
    allowSkip:      false,
    skipKeyBinding: 'ENTER',
  },

  Theme: {
    colors: {
      accent:       '#7235ff',
      accentRGB:    '114, 53, 255',
      secondary:    '#6f00ff',
      secondaryRGB: '111, 0, 255',
      success:      '#06d6a0',
      warning:      '#ffd700',
      danger:       '#ef476f',
    },
    branding: {
      enabled: true,
      icon: {
        show:     true,
        url:      'https://cmap.lol/icon.svg',
        size:     120,
        showGlow: true,
      },
      title:    'Your Server Name',
      subtitle: 'Prepare for an awesome experience.',
    },
  },

  Content: {
    loadingText:        'Initializing Server',
    loadingDescription: 'Please wait while we get things ready...',
    cards: [
      {
        title:       'Welcome',
        icon:        'wrench',
        description: 'Welcome to our server!',
        bgColor:     'rgba(255, 107, 53, 0.1)',
        borderColor: 'rgba(255, 107, 53, 0.3)',
      },
    ],
    tips: [
      'Explore the city and discover hidden locations.',
      'Join our Discord for updates and support.',
    ],
  },

  Media: {
    backgroundVideo: 'https://embrly.ca/yourspace/background.mp4/raw',
    backgroundImage: 'https://embrly.ca/yourspace/background.gif/raw',
    
    // Audio with metadata
    audioFile: {
      src:    'https://embrly.ca/yourspace/track1.mp3/raw',
      title:  'Born For This',      // optional; auto-derived from filename if omitted
      artist: 'The Score',          // optional
      cover:  'https://embrly.ca/yourspace/cover.jpg/raw',  // optional album art
    },
    
    // Playlist with mixed formats (strings and objects)
    audioPlaylist: [
      {
        src:    'https://embrly.ca/yourspace/track2.mp3/raw',
        title:  'Unstoppable',
        artist: 'Sia',
      },
      {
        src:    'https://embrly.ca/yourspace/track3.mp3/raw',
        title:  'Hall of Fame',
        artist: 'The Script',
      },
      // Plain string format also works
      'https://embrly.ca/yourspace/track4.mp3/raw',
      'media/local-track.mp3',  // local paths work too
    ],
  },

  Progress: {
    showProgressBar:  true,
    progressColor:    '#ff6b35',
    simulateProgress: true,
    minDuration:      5000,
    checkpoints: [
      { label: 'Initializing Core',    progress: 10 },
      { label: 'Loading Resources',    progress: 25 },
      { label: 'Connecting to Server', progress: 50 },
      { label: 'Syncing Data',         progress: 75 },
      { label: 'Finalizing Setup',     progress: 90 },
    ],
  },

  Social: {
    enabled: true,
    links: [
      { platform: 'discord', label: 'Discord', url: 'https://discord.gg/BsEhHBTbXw' },
      { platform: 'website', label: 'Website', url: 'https://cmap.lol' },
      { platform: 'store',   label: 'Store',   url: 'https://cmap.lol/shop' },
      { platform: 'youtube', label: 'YouTube', url: 'https://youtube.com' },
    ],
  },

  Tabs: {
    enabled: true,
    tabs: [
      {
        id: 'updates', label: 'Updates', icon: 'star',
        color: '#7235ff', colorRGB: '114, 53, 255',
        content: [
          'New vehicle customization options available.',
          'Added 5 new heist missions.',
          'Performance optimizations.',
        ],
      },
      {
        id: 'rules', label: 'Rules', icon: 'shield',
        color: '#ef4444', colorRGB: '239, 68, 68',
        content: [
          'Respect all players and staff members.',
          'No RDM or VDM.',
          'Stay in character at all times.',
        ],
      },
      {
        id: 'staff', label: 'Staff', icon: 'users',
        color: '#f59e0b', colorRGB: '245, 158, 11',
        content: [
          { name: 'Pixel', role: 'Server Owner', image: 'https://github.com/CodeMeAPixel.png' },
          { name: 'Alex',  role: 'Head Admin',   image: '' },
        ],
      },
      {
        id: 'resources', label: 'Resources', icon: 'book',
        color: '#06b6d4', colorRGB: '6, 182, 212',
        content: [],
      },
      {
        id: 'controls', label: 'Controls', icon: 'gamepad2',
        color: '#22c55e', colorRGB: '34, 197, 94',
        content: [
          'F1 - Phone',
          'F2 - Inventory',
          'F3 - Animation Menu',
          'Alt - Eye Target',
          'K - Vehicle Menu',
        ],
      },
    ],
  },

  Layout: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
};
```
