# claudeparty

A macOS menubar app that tracks your active Claude Code sessions across projects. Each session is represented as an animated cat sprite — grouped by project, colored by project name, and updated in real time.

## How it works

1. **Tray icon** — claudeparty lives in your macOS menu bar. Click to toggle the window; right-click for settings (Always on Top, Launch at Login, Quit).
2. **Claude Code plugin** — A bundled plugin (`claude-plugin/`) reports session state to the app over HTTP. When a session starts, stops, or transitions to "waiting for input", the app updates instantly and plays a meow sound.
3. **Cat sprites** — Each session gets a deterministic cat character (color, pattern) based on its session ID. Cats are grouped into rows by project name, with a shared palette color per project.

## Setup

```bash
pnpm install
pnpm dev
```

### Claude Code plugin

To have Claude Code sessions auto-register with the app:

```bash
claude --plugin-dir ./claude-plugin
```

The plugin sends session lifecycle events to the app's local HTTP server on port 4689.

## Scripts

```bash
pnpm dev              # Start dev server (electron-forge)
pnpm package          # Package the app
pnpm make             # Build distributable
pnpm test             # Run all tests
pnpm lint:fix         # Prettier autofix
pnpm sync-cats        # Sync Figma SVG exports into character.ts
```

## Tech stack

- Electron Forge + Vite
- Vue 3 + TypeScript
- SVG cat sprites exported from Figma

## API

The app runs a local HTTP server on `127.0.0.1:4689` (configurable via `CLAUDEPARTY_PORT`).

| Endpoint | Method | Description |
|---|---|---|
| `/api/session` | `POST` | Register or update a session. Body: `{ session_id, project, state, tty?, term_program?, cwd? }` |
| `/api/session/:id` | `DELETE` | Remove a session |

Valid states: `idle`, `working`, `waiting_for_input`.
