---
name: rocketchat-uikit
description: Build and handle Rocket.Chat App UI using UI Kit (blocks, modals, action handlers, incoming interactions) via @rocket.chat/apps-engine definition/uikit. Use when asked "what is UI Kit?", when implementing modals/buttons/selects, or when wiring interaction callbacks.
---

# UI Kit (App UI)

## What UI Kit Is (In Practice)

UI Kit is the structured UI system Rocket.Chat exposes to apps: blocks, modals, buttons, selects, and interaction callbacks.

In Apps-Engine, the types live at:

- `app/node_modules/@rocket.chat/apps-engine/definition/uikit/**`

Key entry interfaces to search for:

- `IUIKitActionHandler`
- `IUIKitIncomingInteraction`
- `UIKitInteractionContext`
- `IUIKitView`

## How To Implement It

1. Add the relevant interface(s) to `app/app.json` `implements` (values come from `AppInterface`).
2. Implement the handler method(s) in your `App` subclass.
3. Use the UI Kit builders/responders to open/update views and handle user actions.

## State / View Gotchas

- `view.state` is primarily for UI input state (blockId/actionId -> value). Do not rely on it for arbitrary metadata unless you have validated the payload shape in your target client/server.
- If you need to carry metadata across interactions, prefer encoding it in a view id (or another stable field) and parsing it on submit/action.

Read the local map:

- `.codex/skills/rocketchat-uikit/references/uikit-map.md`

## Official Docs

- `.codex/skills/rocketchat-apps-engine-core/references/developer-docs.md`
