# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2026-02-18

### Added

- Initial release of pxLoadingScreen
- Video background with configurable loop support via `General.loopVideo`
- Background image fallback when video is disabled or not set
- Music player with play/pause, volume slider, and animated visualizer bars
- Playlist support via `Media.audioPlaylist` with sequential auto-advance
- Previous/next track controls (visible only when playlist has more than one track)
- Audio fade-out on shutdown controlled by `General.audioFadeOut`
- Animated progress bar with icon dot marker positioned at current progress value
- Simulated progress via `Progress.simulateProgress` and `Progress.checkpoints`
- Real FiveM `loadProgress` event integration — real values always override simulated ones
- Configurable minimum display duration via `Progress.minDuration`
- Info cards with per-card background color, border color, icon, and description
- Rotating tips panel with 6-second fade transition
- Tabbed content panel with configurable tabs, icons, and string content lists
- Full theme color system via `Theme.colors` applied as CSS custom properties at runtime
- Custom font family support via `Layout.fontFamily`
- Server branding: icon, title, subtitle, optional glow effect
- Optional skip key support via `General.allowSkip` and `General.skipKeyBinding`
- FiveM native "Loading game" overlay hidden via inline `<head>` styles
- Manual shutdown flow in `client.lua` — fires on `playerSpawned`, fades out, calls `ShutdownLoadingScreenNui()`
- Runtime configuration via `config.js` (`window.CONFIG`) — no rebuild required for config changes
- All configuration documented in `docs/CONFIGURATION.md`
- Usage examples documented in `docs/USAGE_EXAMPLES.md`
- Setup guide documented in `docs/SETUP.md`
