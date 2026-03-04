# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.2.0] - 2026-02-27

### Added

- Complete UI redesign with a glassmorphism visual language: frosted glass panels, `backdrop-filter` blur, layered box shadows, dark base palette, and accent glow effects throughout
- System console component — displays real-time initialization logs in the left panel with a macOS-style title bar, blinking caret, and scrolling log lines
- Fruit emoji loading indicator in the console that mirrors FiveM's native loading behavior, driven by `startInitFunctionOrder`, `startDataFileEntries`, and `performMapLoadFunction` events
- Social links section in the left panel with configurable platform links (`discord`, `website`, `store`, `youtube`) and hover glow effects per platform
- Rich tab content types — tabs can now contain three content formats beyond plain strings:
  - Staff member rows with avatar image (or initial placeholder), name, and colored role badge
  - Key-value rows for resource/server info lists with a dotted leader line between label and value
  - Title + description rows for structured announcements or FAQ entries
- Auto-populating Resources tab — the `resources` tab (identified by `id: 'resources'`) is populated at runtime by parsing FiveM loading log lines; no manual configuration required
- UI visibility toggle via the `Space` key — hides the entire interface with a blur/fade transition so the background video is fully visible; pressing `Space` again restores the UI
- Hint label in the bottom-right corner indicating the current toggle state
- `terminal` Svelte store managing log history, emoji string, mini-progress value, and visibility state
- JetBrains Mono loaded via CSS for the console and monospace elements
- Simulated console log loop in dev mode (when `simulateProgress` is enabled) to allow preview without a live FiveM server
- Additional built-in tab icons: `shield`, `users`, `book`, `map`, `info`, `settings`
- Per-tab accent color and RGB variant support (`color`, `colorRGB`) for independent tab highlight colors
- Social section configuration block (`Social.enabled`, `Social.links`)
- `config.js` default tabs updated to include Updates, Rules, Staff, Resources, and Controls templates

### Changed

- Left panel layout restructured to a vertically stacking glass card with branded header, status block, progress bar, now-playing strip, social links, console, and tips footer
- Right panel now contains info cards and the tabs panel side-by-side in a flex column
- Progress bar glow and color now driven by the per-tab accent color variable
- Background overlay uses a multi-stop radial + linear gradient for a more dimensional look
- Decorative top and bottom accent lines added to the top-level layout
- `config.js` shipped with fully populated default tabs rather than an empty array
- Console emoji container capped at two visible lines with overflow hidden to prevent emojis from displacing log content

### Fixed

- Malformed `@keyframes` block inside `SocialLinks.svelte` that caused a Vite build failure
- Emoji accumulation overflow where an unbounded emoji string would push the log list out of view

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
