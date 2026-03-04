# Setup Guide

This guide covers installing pxLoadingScreen on a FiveM server from scratch.

---

## Prerequisites

- A FiveM server running txAdmin or a manual `server.cfg`
- Access to the server `resources/` directory

---

## Installation

### 1. Download the resource

Download the latest release archive and extract it into your `resources/` directory so the structure looks like this:

```
resources/
  pxLoadingScreen/
    index.html
    config.js
    fxmanifest.lua
    client.lua
    build/
      app.js
    media/
    docs/
```

### 2. Add your media files

Place your audio and image files in the `media/` folder:

```
media/
  gifs/
    background.gif
  music/
    track1.mp3
```

Reference them in `config.js` as `media/music/track1.mp3`, etc.

**Videos and large audio files:** Do not serve large files through FiveM's asset transfer. A single 100 MB video adds that weight to every client's connection download. Instead, upload your media to an external file host and set `backgroundVideo` (or any `Media` field) to the full `https://` URL. FiveM will stream it directly from there without it counting against the resource download size.

[embrly.ca](https://embrly.ca) is a recommended file host. Sign up, upload your files, and copy the direct-link URL into `config.js`. No additional FiveM configuration is required.

When using embrly.ca links, always append `/raw` to the share URL so browsers and FiveM receive the raw file rather than the file-preview page:
```
https://embrly.ca/yourspace/background.mp4/raw
https://embrly.ca/yourspace/track1.mp3/raw
```

### 3. Configure

Open `config.js` and adjust to your needs. At a minimum, set your server name and media paths:

```js
Theme: {
  branding: {
    title:    'My Server Name',
    subtitle: 'A short tagline.',
  },
},
Media: {
  backgroundVideo: 'media/background.mp4',
  backgroundImage: 'media/background.jpg',
  audioFile:       'media/music.mp3',
},
```

See the [Configuration Guide](/docs/scripts/fxserver/pxloadingscreen/configuration) for the complete reference.

### 4. Add to server.cfg

```
ensure pxLoadingScreen
```

Place this line before your framework and other resources so the loading screen is registered first.

### 5. Restart or start the resource

If the server is already running:

```
refresh
ensure pxLoadingScreen
```

---

## Verifying the Setup

Connect to your server. The loading screen should appear before the game finishes loading. You should see:

- Your background video or image
- Your server name and branding in the left panel
- The progress bar stepping through checkpoints
- The system console filling with initialization logs
- Background music playing (if configured)

If the screen appears blank or you see a white page, open the FiveM browser console (F8) and check for errors. Common causes:

- Wrong path in `backgroundVideo` or `audioFile` (paths are relative to the resource root, e.g. `media/file.mp4`)
- Syntax error in `config.js` — check for missing commas or brackets

---

## UI Visibility Toggle

During loading, press `Space` to hide the entire interface so you can see the background video or image in full. Press `Space` again to restore the UI. A small hint label in the bottom-right corner shows the current state.

---

## File Manifest

`fxmanifest.lua` declares what gets served to the client:

```lua
files {
  'index.html',
  'config.js',
  'build/**/*',
  'media/**/*',
}
```

Any file you place in `media/` is automatically included. If you add files outside these directories, add them to `fxmanifest.lua` manually.

---

## Shutdown Behavior

When a player spawns, `client.lua` sends a shutdown signal to the loading screen. The screen fades out over the duration set in `General.audioFadeOut` (default 3000ms), then `ShutdownLoadingScreenNui()` is called.

You do not need to call any exports or trigger any events. The shutdown flow is self-contained.

---

## Upgrading

1. Back up your `config.js` and `media/` folder.
2. Replace all other files with the new release.
3. Restore your `config.js` and `media/` folder.
4. Check the [CHANGELOG](https://github.com/CodeMeAPixel/pxCommands/blob/main/CHANGELOG.md) for any new or changed config keys.

---

## Building from Source

If you want to modify the Svelte source:

```bash
bun install
bun run build
```

Output is written to `build/app.js`. The `config.js` and `media/` folder are not affected.

Requires [Bun](https://bun.sh) or Node + npm.

---

## Support

- Discord: [discord.gg/BsEhHBTbXw](https://discord.gg/BsEhHBTbXw)
- Email: hey@codemeapixel.dev
- Issues: [github.com/CodeMeAPixel/pxLoadingScreen/issues](https://github.com/CodeMeAPixel/pxLoadingScreen/issues)
