---
name: rocketchat-app-lifecycle
description: Explain and implement Rocket.Chat App lifecycle methods (initialize, onEnable, onDisable, onInstall, onUpdate, onUninstall, onSettingUpdated, onPreSettingUpdate) and where they are defined (App.d.ts). Use when asked "when does this run?", "where do I register settings/commands?", or when adding install/enable logic.
---

# App Lifecycle

## Source Of Truth (Local)

- `app/node_modules/@rocket.chat/apps-engine/definition/App.d.ts`

## Practical Guidance

- Use `extendConfiguration(configuration, environmentRead)` to register settings, slash commands, API endpoints, UI, etc.
- Use `onEnable(environment, configurationModify)` to validate required settings and decide whether the app can run. Returning `false` prevents enablement.
- Use `onDisable(configurationModify)` for teardown/unregister or cleanup.
- Use `onInstall(...)` / `onUpdate(...)` / `onUninstall(...)` for one-time install/update/uninstall workflows.
- Use `onSettingUpdated(...)` and `onPreSettingUpdate(...)` to react to admin setting changes.

## Fast Lookup

```powershell
rg -n "initialize\\(|onEnable\\(|onDisable\\(|onInstall\\(|onUpdate\\(|onUninstall\\(" app/node_modules/@rocket.chat/apps-engine/definition/App.d.ts
```
