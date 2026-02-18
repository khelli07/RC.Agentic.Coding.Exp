---
name: rocketchat-logging-errors
description: Log and troubleshoot Rocket.Chat Apps using ILogger (debug/info/warn/error) and App.getLogger(), including when to notify users vs logging, and how to capture context for failures (HTTP responses, missing settings, permissions). Use when asked how to debug an app or add diagnostics.
---

# Logging And Errors

## Logger API

- `ILogger` lives at `app/node_modules/@rocket.chat/apps-engine/definition/accessors/ILogger.d.ts`
- Your App has a logger accessible via `this.getLogger()` (see `App.d.ts`).

Recommended practice:

- Log with enough context to reproduce (room id, thread id, endpoint, status code), but avoid leaking secrets.
- Notify the user for actionable errors; log the details for debugging.

## Fast Search

```powershell
rg -n "export interface ILogger\\b" app/node_modules/@rocket.chat/apps-engine/definition/accessors/ILogger.d.ts
rg -n "getLogger\\(" app/node_modules/@rocket.chat/apps-engine/definition/App.d.ts
```
