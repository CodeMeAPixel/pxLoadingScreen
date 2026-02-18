# pxLoadingScreen

Premium Loading Screen for FiveM. Supports background video, background image fallback, a music playlist with skip controls, animated progress bar with icon marker, info cards, rotating tips, and tabbed content panels.

All configuration is done through a single `config.js` file  no rebuild required when making changes.

## Features

- Video background with image fallback
- Music playlist with prev/next controls and volume slider
- Animated progress bar with watermark icon marker
- Simulated progress with configurable checkpoints
- Real FiveM `loadProgress` event integration
- Info cards with custom colors and icons
- Rotating tips
- Tabbed content panels
- Theme color customization via CSS variables
- Manual shutdown  screen dismisses cleanly after player spawns
- Optional skip key support
- Hides FiveM's native "Loading game" overlay

## File Structure

```
pxLoadingScreen/
 index.html          # HTML entry point  loads config.js then build/app.js
 config.js           # Runtime configuration (edit without rebuilding)
 fxmanifest.lua      # FiveM resource manifest
 client.lua          # Manual shutdown handler (fires on playerSpawned)
 build/
    app.js          # Compiled Svelte application
 media/              # Your audio/video/image files
```

## Installation

1. Copy `pxLoadingScreen` into your server's `resources` directory.
2. Add to `server.cfg`:
   ```
   ensure pxLoadingScreen
   ```
3. Place your media files in the `media/` directory.
4. Edit `config.js` to match your server.
5. Restart the server.

## Configuration

Edit `config.js` directly. Changes take effect on server restart  no rebuild needed.

See [docs/CONFIGURATION.md](docs/CONFIGURATION.md) for the full reference.

## Adding Media

Place files in the `media/` directory and reference them in `config.js`:

```js
Media: {
  backgroundVideo: 'media/background.mp4',
  backgroundImage: 'media/background.jpg',  // shown if video is disabled
  audioFile: 'media/track1.mp3',
  audioPlaylist: [
    'media/track2.mp3',
    'media/track3.mp3',
  ],
},
```

Supported audio formats: MP3, WAV, OGG, M4A
Supported video format: MP4 (H.264)

## How Progress Works

The loading screen receives real `loadProgress` events from FiveM and updates the bar automatically. If `simulateProgress` is enabled in `config.js`, it also steps through your configured checkpoints at evenly spaced intervals  useful when the connection is fast and you want a minimum display duration. Real FiveM events always override simulated values.

## Manual Shutdown

`client.lua` listens for the `playerSpawned` event and sends a shutdown message to the loading screen before calling `ShutdownLoadingScreenNui()`. The screen fades out over the duration set in `General.audioFadeOut`.

## Support

- Discord: [discord.gg/BsEhHBTbXw](https://discord.gg/BsEhHBTbXw)
- Email: [hey@codemeapixel.dev](mailto:hey@codemeapixel.dev)
- Issues: [github.com/CodeMeAPixel/pxLoadingScreen/issues](https://github.com/CodeMeAPixel/pxLoadingScreen/issues)
- Docs: [See the Docs Directory](docs/)
