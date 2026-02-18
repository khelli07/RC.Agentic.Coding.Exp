---
name: rocketchat-persistence
description: Persist and retrieve app data in Rocket.Chat Apps-Engine using IPersistence and persistence associations, including common patterns for storing per-room/per-user config, caching, and state machines. Use when implementing memory, caching, preferences, or any feature needing durable state.
---

# Persistence (App Storage)

## Where To Look

- `app/node_modules/@rocket.chat/apps-engine/definition/persistence/**`
- Access through handlers/endpoints via the `persis`/`persistence` parameter or via accessors (depending on context).

## Practical Patterns

- Prefer stable keys and associations (room id, user id, thread id) depending on scope.
- Store only what you can migrate later (keep schema small and versionable).

Search recipes:

```powershell
rg -n "interface IPersistence|Persistence" app/node_modules/@rocket.chat/apps-engine/definition/persistence
```

## Official Docs

- `.codex/skills/rocketchat-apps-engine-core/references/developer-docs.md`
