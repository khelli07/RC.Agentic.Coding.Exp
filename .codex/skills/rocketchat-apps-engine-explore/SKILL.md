---
name: rocketchat-apps-engine-explore
description: Understand and navigate Rocket.Chat Apps (Apps-Engine) projects by identifying app entry points (app.json, App subclass), locating API types and lifecycle hooks in @rocket.chat/apps-engine (usually under app/node_modules), and mapping where slash commands, settings, UI Kit, and event handlers live. Use for requests like "how does this Rocket.Chat app work?", "where is X defined in @rocket.chat/apps-engine?", or "what interface do I implement for Y?".
---

# Rocket.Chat Apps-Engine: Explore

## Quick Orientation (This Repo)

- App manifest: `app/app.json` (id, requiredApiVersion, permissions, classFile).
- App entry class: `app/ThreadSummarizerApp.ts` (extends `App`, commonly overrides `extendConfiguration`).
- Slash commands: `app/commands/*` (example: `app/commands/SummarizeCommand.ts`).
- Settings: `app/settings/*` (example: `app/settings/settings.ts`).
- Helpers/constants: `app/helpers/*`, `app/constants/*`.

If you need to answer "where does this behavior come from?", trace from a trigger (slash command, event handler, UI interaction) back to these entry points.

## How To Find The Right Apps-Engine API

Rocket.Chat Apps are written against the "definition" surface in `@rocket.chat/apps-engine`:

- Primary type surface (what app authors import): `app/node_modules/@rocket.chat/apps-engine/definition/**`
- Engine internals/runtime code: `app/node_modules/@rocket.chat/apps-engine/server/**`, `.../client/**`, `.../lib/**`

When the question is "what can I do?" or "what shape is this object?", prefer the `.d.ts` files under `definition/`.

## Fast Search Recipes

Run these from repo root.

```powershell
# Find where an interface/type is exported from
rg -n "export \\{.*IRead|export interface IRead" app/node_modules/@rocket.chat/apps-engine/definition

# Find all places the app registers things (settings, slash commands, API endpoints)
rg -n "extendConfiguration\\(|provideSlashCommand\\(|provideSetting\\(" app

# Find Apps-Engine event handler interfaces (pre/post message, room, etc.)
rg -n "IPreMessage|IPostMessage|IPreRoom|IPostRoom" app/node_modules/@rocket.chat/apps-engine/definition

# Find UI Kit-related definitions
rg -n "UIKit|uikit" app/node_modules/@rocket.chat/apps-engine/definition
```

For a larger "where do I look" map, read:

- `.codex/skills/rocketchat-apps-engine-explore/references/apps-engine-map.md`
- `.codex/skills/rocketchat-apps-engine-explore/references/rg-patterns.md`

## Official Docs

- `.codex/skills/rocketchat-apps-engine-core/references/developer-docs.md`
