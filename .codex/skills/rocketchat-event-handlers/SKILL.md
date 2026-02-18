---
name: rocketchat-event-handlers
description: Implement Rocket.Chat Apps-Engine event hooks (pre/post message, room, user events), choose Prevent vs Extend vs Modify vs Post handlers, and wire them by declaring the implemented interfaces in app.json (AppInterface enum) and implementing methods on the App subclass. Use when adding "listen to messages", moderation, enrichment, or automation features.
---

# Event Handlers (Pre/Post Hooks)

## Find Available Hook Interfaces

The engine enumerates hook interface names in:

- `app/node_modules/@rocket.chat/apps-engine/definition/metadata/AppInterface.d.ts`

Message hook interfaces live in:

- `app/node_modules/@rocket.chat/apps-engine/definition/messages/**`

## Wire Hooks Correctly

1. Add the interface name to `app/app.json` `implements`.
2. Implement the corresponding handler method(s) on your `App` subclass.
3. Use:
   - Prevent: block an action
   - Extend: non-destructive additions (attachments, metadata)
   - Modify: destructive changes (rewrite text, etc.)
   - Post: observe only

Read the local pointers:

- `.codex/skills/rocketchat-event-handlers/references/hook-navigation.md`
