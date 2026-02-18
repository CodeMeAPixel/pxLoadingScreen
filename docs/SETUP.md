# Setup Guide

This guide covers installing pxLoadingScreen on a FiveM server.

---

## Prerequisites

- FiveM server running txAdmin or a manual `server.cfg`
- Access to the server `resources/` directory

---

## Installation

### 1. Download the resource

Clone the repo or download and extract the release archive into your `resources/` directory:

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
```

### 2. Add your media files

Place your audio, video, and image files in the `media/` folder:

```
media/
  background.mp4
  background.jpg
  music.mp3
```

Reference them in `config.js` as `media/filename.ext`.

### 3. Configure

Open `config.js` and adjust to your needs. At minimum set your server name and media paths:

```js
Theme: {
  branding: {
    title: 'My Server Name',
    subtitle: 'A description or tagline.',
  },
},
Media: {
  backgroundVideo: 'media/background.mp4',
  backgroundImage: 'media/background.jpg',
  audioFile: 'media/music.mp3',
},
```

Full reference: [CONFIGURATION.md](CONFIGURATION.md)

### 4. Add to server.cfg

```
ensure pxLoadingScreen
```

Place this line before your other resources so the loading screen is registered first.

### 5. Restart or start the server

If the server is already running:

```
refresh
ensure pxLoadingScreen
```

---

## Verifying the Setup

Connect to your server. The loading screen should appear before the game finishes loading. You should see:

- Your background video or image
- Your server title and branding
- The progress bar stepping through checkpoints
- Background music playing (if configured)

If the screen appears blank or you see a white page, check the browser console (F8 in FiveM) for errors. Common causes:

- Wrong path in `backgroundVideo` or `audioFile`
- Syntax error in `config.js`

---

## File Manifest

`fxmanifest.lua` declares what gets served:

```lua
files {
  'index.html',
  'config.js',
  'build/**/*',
  'media/**/*',
}
```

Any file you add to `media/` is automatically included. If you add files outside these directories, add them to `fxmanifest.lua`.

---

## Shutdown Behavior

When a player spawns, `client.lua` sends a shutdown message to the loading screen. The loading screen fades out over the duration set in `General.audioFadeOut` (default 3000ms), then `ShutdownLoadingScreenNui()` is called.

You do not need to call any exports or trigger any events manually. The shutdown flow is entirely self-contained.

---

## Upgrading

To upgrade to a newer version:

1. Back up your `config.js` and `media/` folder
2. Replace all other files with the new release
3. Restore your `config.js` and `media/` folder
4. Check the changelog for any config changes

---

## Support

- Discord: [discord.gg/BsEhHBTbXw](https://discord.gg/BsEhHBTbXw)
- Email: hey@codemeapixel.dev
- Issues: [github.com/CodeMeAPixel/pxLoadingScreen/issues](https://github.com/CodeMeAPixel/pxLoadingScreen/issues)
