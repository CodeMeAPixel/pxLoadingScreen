# pxLoadingScreen

[![Version](https://img.shields.io/badge/version-0.2.0-7235ff?style=flat-square)](CHANGELOG.md)
[![FiveM](https://img.shields.io/badge/platform-FiveM-f40552?style=flat-square)](https://fivem.net)
[![License](https://img.shields.io/badge/license-MIT-22c55e?style=flat-square)](LICENSE)
[![Discord](https://img.shields.io/badge/discord-join-5865f2?style=flat-square)](https://discord.gg/BsEhHBTbXw)

A glassmorphism loading screen for FiveM. Frosted glass panels, a real-time system console, staff roster, auto-populated resource list, social links, music player, and a full theme system all configured through a single `config.js` file with no rebuild required.

[Shop](https://codemeapixel.dev/shop/pxloadingscreen) | [Live Preview](https://loading.cmap.lol/) | [Documentation](https://codemeapixel.dev/docs/scripts/fxserver/pxloadingscreen)

---

## Features

- **Glassmorphism UI** with frosted glass panels, backdrop blur, and accent-colored glow effects
- **Background media** with video/image support; stream large files externally without impacting download size
- **Music player** with:
  - Playlist support (prev/next track controls)
  - Track metadata (title, artist, album art)
  - Animated 5-bar equalizer visualizer
  - Scrolling marquee for long track names
  - Per-track display via camelCase-aware name parsing
  - Volume slider with platform-agnostic styling
- **Animated progress bar** with shimmer effect, color customization, and glowing end indicator
- **Now Playing section** (in left panel) showing current track info, track counter (x/y), and real-time controls
- **Social links** panel with platform-specific branding:
  - Discord, Twitter, YouTube, Twitch, TikTok, Instagram, GitHub, custom website/store links
  - Platform-specific hover colors and icons
  - Wrapping button layout with staggered entrance animation
- **Tabbed content panel** providing 5+ built-in templates:
  - **Updates**: Plain text list (patch notes, announcements)
  - **Rules**: Plain text rules with custom colors
  - **Staff**: Staff roster with avatar images and role badges
  - **Resources**: Auto-populated from FiveM loading logs at runtime
  - **Controls**: Keybind documentation or any plain text list
  - Per-tab customization: color, icon, and content type
  - Support for custom SVG icons via config
- **Info cards** with per-card colors, icons, and descriptions
- **Server branding** with optional icon, title, subtitle, and pulsing glow
- **Rotating tips** at bottom of left panel with smooth fade transitions
- **Real-time status display** with blinking indicator dot
- **Full theme customization** applied at startup as CSS variables:
  - Accent, secondary (tech), success, warning, danger colors
  - Text colors (primary, secondary, muted)
  - Background/surface colors
  - All RGB breakdowns for transparency effects
- **Responsive design** for mobile/tablet preview and ultra-wide monitors
- **Keyboard controls**:
  - Optional skip key for development (`allowSkip: true`)
- **No rebuild required** — edit `config.js` at runtime and restart the resource

---

## File Structure

```
pxLoadingScreen/
  index.html        -- HTML entry point; loads config.js then build/app.js
  config.js         -- Runtime configuration (edit without rebuilding)
  fxmanifest.lua    -- FiveM resource manifest
  client.lua        -- Shutdown handler (fires on playerSpawned)
  build/
    app.js          -- Compiled Svelte application
  media/            -- Your audio, video, and image files
  docs/
    CONFIGURATION.md
    SETUP.md
    USAGE_EXAMPLES.md
```

---

## Installation

1. Copy the `pxLoadingScreen` folder into your server's `resources/` directory.
2. Add to `server.cfg`:
   ```
   ensure pxLoadingScreen
   ```
3. Place your media files in the `media/` directory.
4. Edit `config.js` to match your server.
5. Restart or `refresh` + `ensure pxLoadingScreen`.

See the [setup docs](https://codemeapixel.dev/docs/scripts/fxserver/pxloadingscreen/setup) for a full walkthrough.

---

## Configuration

All configuration lives in `config.js` as `window.CONFIG`. Changes take effect on server restart — no rebuild required.

```js
window.CONFIG = {
  General:  { ... },
  Theme:    { ... },
  Content:  { ... },
  Media:    { ... },
  Progress: { ... },
  Social:   { ... },
  Tabs:     { ... },
  Layout:   { ... },
}
```

See the [configuration guide](https://codemeapixel.dev/docs/scripts/fxserver/pxloadingscreen/configuration) for the full reference.

---

## Tabs

The tabbed panel supports multiple content types, colors, and custom icons. Each tab can be customized independently. Remove any tab you do not want by deleting its entry from the `Tabs.tabs` array.

**Tab configuration properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | ✓ | Unique identifier for the tab |
| `label` | string | ✓ | Display name in the tab header |
| `icon` | string | | Built-in icon name (see below) or omit for default |
| `iconSvg` | string | | Custom SVG markup (overrides `icon` if provided) |
| `color` | hex | | Tab accent color; inherits `--accent` if omitted |
| `colorRGB` | string | | RGB breakdown of `color` (e.g., `'114, 53, 255'`) |
| `content` | array | ✓ | Array of items (plain text, objects, or empty for auto-populate) |

**Built-in icons**: `star`, `shield`, `users`, `gamepad2`, `question`, `info`, `settings`, `book`, `map`

**Plain text list** — rules, controls, updates:
```js
{
  id: 'rules',
  label: 'Rules',
  icon: 'shield',
  color: '#ef4444',
  colorRGB: '239, 68, 68',
  content: [
    'No RDM (Random Deathmatch).',
    'Stay in character.',
    'Respect all players.'
  ]
}
```

**Staff roster** — names, roles, with optional avatars:
```js
{
  id: 'staff',
  label: 'Staff',
  icon: 'users',
  color: '#f59e0b',
  colorRGB: '245, 158, 11',
  content: [
    { name: 'Pixel', role: 'Owner', image: 'https://github.com/CodeMeAPixel.png' },
    { name: 'Alex',  role: 'Admin', image: '' },  // Omit image for placeholder
  ]
}
```

**Custom SVG icon**:
```js
{
  id: 'customs',
  label: 'Customization',
  iconSvg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/></svg>',
  color: '#8b5cf6',
  colorRGB: '139, 92, 246',
  content: [ 'Item 1', 'Item 2' ]
}
```

**Auto-populated Resources tab** — leave `content` empty and set `id: 'resources'`:
```js
{
  id: 'resources',
  label: 'Resources',
  icon: 'book',
  content: []  // Automatically filled from FiveM loading logs at runtime
}
```

## Music Player

The now-playing section is located in the left panel below the progress bar. It displays:

- **Animated equalizer bars** — reflect playing/paused state
- **Track name** — auto-parsed from filename, with camelCase handling (e.g., `MyTrack_Name` → "My Track Name")
- **Scrolling marquee** — long names auto-scroll; short names remain static
- **Track counter** — shows `x / y` for playlists  (e.g., `2 / 5`)
- **Playback controls** — play/pause (larger button), previous, next (when playlist has 2+ tracks)
- **Volume slider** — always visible with speaker icon; icon changes based on level (muted/low/high)

**Configure audio:**

```js
Media: {
  audioFile: {
    src:    'https://embrly.ca/yourspace/track1.mp3/raw',
    title:  'Born For This',     // optional; auto-derived from filename if omitted
    artist: 'The Score',         // optional
    cover:  'https://...',       // optional; not displayed in current UI but reserved for future
  },
  audioPlaylist: [
    { src: 'https://embrly.ca/yourspace/track2.mp3/raw', title: 'Unstoppable', artist: 'Sia' },
    // Or just a string: 'https://embrly.ca/yourspace/track3.mp3/raw'
  ],
},
```

## Social Links

The social section is located in the left panel below the music player. It displays a grid of branded icon buttons for easy access to your community.

**Configure social links:**

```js
Social: {
  enabled: true,
  links: [
    { platform: 'discord', label: 'Discord',  url: 'https://discord.gg/abc123' },
    { platform: 'website', label: 'Website',  url: 'https://myserver.com' },
    { platform: 'store',   label: 'Store',    url: 'https://shop.myserver.com' },
    { platform: 'github',  label: 'GitHub',   url: 'https://github.com/myorg' },
    { platform: 'youtube', label: 'YouTube',  url: 'https://youtube.com/@myorg' },
  ],
},
```

**Supported platforms** (each with its own brand icon):
`discord`, `twitter`, `youtube`, `twitch`, `tiktok`, `instagram`, `website`, `store`, `github`

## Media

Place files in the `media/` directory or use external URLs. **External URLs are strongly recommended** for videos and large audio files to avoid inflating download size for every player.

```js
Media: {
  backgroundVideo: 'https://embrly.ca/yours/video.mp4/raw',     // External or 'media/video.mp4'
  backgroundImage: 'https://embrly.ca/yours/image.jpg',     // External or 'media/image.jpg'
  audioFile:       'https://embrly.ca/yours/track.mp3',     // External or 'media/track.mp3'
  audioPlaylist:   [                                             // Mixed external & local paths
    'https://embrly.ca/yours/track1.mp3',
    'media/track2.mp3',
  ], 
},
```

**Why use external URLs?**
- Local files are bundled with the resource and downloaded by every client
- A 100 MB video means +100 MB per player download time
- External URLs stream directly from your host (CDN) without counting against resource size
- Recommended host: [embrly.ca](https://embrly.ca) — sign up, upload files, append `/raw` to the share link (only needed for videos, gifs etc)

**Supported formats:**

| Type  | Formats        |
|-------|-----------------|
| Audio | MP3, WAV, OGG, M4A |
| Video | MP4 (H.264)    |
| Image | JPG, PNG, WebP, GIF |

---

## Building from Source

Requires [Bun](https://bun.sh) or Node + npm.

```bash
bun install
bun run build
```

Output is written to `build/app.js`. The `config.js` and `media/` folder are not affected by the build.

---

## Support

- Discord: [discord.gg/BsEhHBTbXw](https://discord.gg/BsEhHBTbXw)
- Email: [hey@codemeapixel.dev](mailto:hey@codemeapixel.dev)
- Issues: [github.com/CodeMeAPixel/pxLoadingScreen/issues](https://github.com/CodeMeAPixel/pxLoadingScreen/issues)
- Docs: [cmap.lol/docs/pxLoadingScreen](https://cmap.lol/docs/pxLoadingScreen)
