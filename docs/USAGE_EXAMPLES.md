# Usage Examples

Practical examples for common configurations. All changes are made in `config.js` only — no rebuild required.

---

## Custom Theme Colors

Override the default purple palette with your own brand colors. Both a hex value and its RGB breakdown are required so the UI can construct `rgba()` values for transparency effects.

```js
Theme: {
  colors: {
    accent:       '#7c3aed',
    accentRGB:    '124, 58, 237',
    secondary:    '#a78bfa',
    secondaryRGB: '167, 139, 250',
    success:      '#10b981',
    warning:      '#f59e0b',
    danger:       '#ef4444',
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
  loopVideo:   true,
},
Media: {
  backgroundVideo: 'media/city.mp4',
  backgroundImage: '',
},
```

---

## Background Image Only

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

Set a primary track followed by additional tracks. When more than one track is configured, the music player shows prev/next buttons.

```js
General: {
  enableAudio: true,
  audioVolume: 0.4,
},
Media: {
  audioFile: {
    src:    'https://embrly.ca/yourspace/track1.mp3/raw',
    title:  'Born For This',
    artist: 'The Score',
    cover:  'https://embrly.ca/yourspace/cover1.jpg/raw',  // optional
  },
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
    // Plain strings still work — title is derived from the filename
    'media/music/local-track.mp3',
  ],
},
```

Tracks play in order and loop back to the beginning after the last track.

When using external URLs (such as from [embrly.ca](https://embrly.ca)), use the object format with `title` and `artist` so the music player displays proper track info instead of the raw CDN filename. Both formats can be mixed freely within `audioPlaylist`.

> **embrly.ca URLs:** Always append `/raw` to the share URL (e.g. `https://embrly.ca/yourspace/track.mp3/raw`) so the browser fetches the file directly instead of the preview page. This applies to MP3s, MP4s, and GIFs.

---

## Disable Audio

```js
General: {
  enableAudio: false,
},
```

---

## Custom Progress Checkpoints

```js
Progress: {
  showProgressBar:  true,
  progressColor:    '#7c3aed',
  simulateProgress: true,
  minDuration:      8000,
  checkpoints: [
    { label: 'Booting Framework',  progress: 10 },
    { label: 'Loading Map Data',   progress: 20 },
    { label: 'Spawning Entities',  progress: 40 },
    { label: 'Syncing Economy',    progress: 60 },
    { label: 'Loading Player Data',progress: 80 },
    { label: 'Joining Session',    progress: 95 },
  ],
},
```

---

## Disable Progress Simulation

Use this if you want the bar to only reflect what FiveM reports.

```js
Progress: {
  simulateProgress: false,
},
```

---

## Social Links

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

Set `Social.enabled: false` to hide the panel.

---

## Server Info Cards

Cards appear in the center panel. Each card can have its own colors.

```js
Content: {
  cards: [
    {
      title:       'Custom Jobs',
      icon:        'wrench',
      description: 'Over 50 unique jobs from mechanic to lawyer.',
      bgColor:     'rgba(124, 58, 237, 0.1)',
      borderColor: 'rgba(124, 58, 237, 0.3)',
    },
    {
      title:       'Active Community',
      icon:        'person',
      description: 'Join thousands of active players.',
      bgColor:     'rgba(16, 185, 129, 0.1)',
      borderColor: 'rgba(16, 185, 129, 0.3)',
    },
    {
      title:       'Custom Vehicles',
      icon:        'tools',
      description: '500+ custom vehicles and liveries.',
      bgColor:     'rgba(245, 158, 11, 0.1)',
      borderColor: 'rgba(245, 158, 11, 0.3)',
    },
  ],
},
```

Available icons: `wrench`, `tools`, `person`.

---

## Rotating Tips

```js
Content: {
  tips: [
    'Use /report to contact staff in-game.',
    'Check #announcements on Discord for updates.',
    'You can change your outfit at any clothing store.',
    'Press E to interact with most objects and NPCs.',
  ],
},
```

---

## Tabs — Rules Tab

```js
Tabs: {
  enabled: true,
  tabs: [
    {
      id:       'rules',
      label:    'Rules',
      icon:     'shield',
      color:    '#ef4444',
      colorRGB: '239, 68, 68',
      content: [
        'No RDM (Random Deathmatch).',
        'No VDM (Vehicle Deathmatch).',
        'Stay in character at all times.',
        'Respect all players and staff.',
      ],
    },
  ],
},
```

---

## Tabs — Staff Roster

Staff items show an avatar image (or an initial placeholder if `image` is empty), the member name, and a role label.

```js
{
  id:       'staff',
  label:    'Staff',
  icon:     'users',
  color:    '#f59e0b',
  colorRGB: '245, 158, 11',
  content: [
    { name: 'Pixel', role: 'Server Owner',      image: 'https://github.com/CodeMeAPixel.png' },
    { name: 'Alex',  role: 'Head Administrator', image: 'https://example.com/alex.png' },
    { name: 'Sarah', role: 'Community Manager',  image: '' },
    { name: 'Mike',  role: 'Developer',          image: '' },
  ],
},
```

---

## Tabs — Resources (Auto-Populated)

Leave `content` as an empty array. The tab with `id: 'resources'` is recognized automatically and populated at runtime from FiveM loading logs.

```js
{
  id:       'resources',
  label:    'Resources',
  icon:     'book',
  color:    '#06b6d4',
  colorRGB: '6, 182, 212',
  content:  [],
},
```

As FiveM loads, lines like `Started resource qb-core` are parsed and each resource name is added as a row. No manual list needed.

---

## Tabs — Key/Value Info

Use key/value rows to display structured server information.

```js
{
  id:       'info',
  label:    'Server Info',
  icon:     'info',
  color:    '#06b6d4',
  colorRGB: '6, 182, 212',
  content: [
    { label: 'Framework',  value: 'QB-Core' },
    { label: 'Inventory',  value: 'Ox-Inventory' },
    { label: 'Phone',      value: 'GKS-Phone' },
    { label: 'Voice',      value: 'PMA-Voice' },
    { label: 'Map',        value: 'Custom MLO Pack' },
    { label: 'Players',    value: '128 slots' },
  ],
},
```

---

## Tabs — Custom SVG Icon

Provide a raw SVG string via `iconSvg` to use any icon. This overrides the `icon` field.

```js
{
  id:      'custom',
  label:   'Custom',
  iconSvg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>',
  color:   '#7235ff',
  content: [ 'Item one', 'Item two' ],
},
```

---

## Social Links

Display branded social media links in the left panel below the music player.

```js
Social: {
  enabled: true,
  links: [
    {
      label:    'Discord',
      platform: 'discord',
      url:      'https://discord.gg/your-server-id',
    },
    {
      label:    'Store',
      platform: 'store',
      url:      'https://shop.example.com',
    },
    {
      label:    'Website',
      platform: 'website',
      url:      'https://example.com',
    },
    {
      label:    'GitHub',
      platform: 'github',
      url:      'https://github.com/your-repo',
    },
    {
      label:    'YouTube',
      platform: 'youtube',
      url:      'https://youtube.com/@your-channel',
    },
  ],
},
```

Supported platforms: `discord`, `twitter`, `youtube`, `twitch`, `tiktok`, `instagram`, `website`, `store`, `github`.

Each platform has a distinct icon and hover color. Leave the `enabled` flag as `false` to hide the entire social links section.

---

## Audio with Metadata (Title, Artist, Cover)

Mix plain audio file paths with full metadata objects in your playlist:

```js
Media: {
  audioPlaylist: [
    'https://embrly.ca/raw/ncs/track1.mp3', // Plain string (auto-parsed filename)
    {
      src:    'https://embrly.ca/raw/ncs/song-with-metadata.mp3',
      title:  'Song Title',
      artist: 'Artist Name',
      cover:  'https://example.com/album-art.jpg',
    },
    {
      src:    'https://embrly.ca/raw/ncs/another-track.mp3',
      title:  'Another Track',
      artist: 'Another Artist',
      cover:  'https://another.url/cover.jpg',
    },
  ],
},
```

When metadata is provided, it overrides automatic filename parsing. When not provided, the filename is automatically parsed and formatted (camelCase/underscores converted to readable text).

Track covers are displayed in the music player if provided. All URLs should be external (HTTPS recommended) to avoid FiveM bloat.

---

## Hiding Individual Tabs

To hide a tab, delete its entry from the `Tabs.tabs` array. To hide the entire panel:

```js
Tabs: {
  enabled: false,
},
```

---

## Allow Skip (Development)

Useful while testing. Press the configured key to immediately trigger the shutdown sequence.

```js
General: {
  allowSkip:      true,
  skipKeyBinding: 'ENTER',
},
```

Disable this in production builds.

---

## Minimal Config with No Media

If you want to test the loading screen without any media files:

```js
window.CONFIG = {
  General: {
    enableAudio: false,
    enableVideo: false,
    allowSkip:   true,
  },
  Theme: {
    branding: {
      enabled: true,
      icon:    { show: false },
      title:   'Test Server',
      subtitle: 'Development mode',
    },
  },
  Content: {
    loadingText: 'Loading...',
    cards: [],
    tips: ['This is a test.'],
  },
  Media:    { backgroundVideo: '', backgroundImage: '', audioFile: '', audioPlaylist: [] },
  Progress: { showProgressBar: true, simulateProgress: true, minDuration: 3000, checkpoints: [] },
  Social:   { enabled: false, links: [] },
  Tabs:     { enabled: false, tabs: [] },
  Layout:   { fontFamily: 'sans-serif' },
};
```
