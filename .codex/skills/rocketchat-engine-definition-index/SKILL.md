---
name: rocketchat-engine-definition-index
description: Quickly locate Rocket.Chat Apps-Engine capabilities by navigating the @rocket.chat/apps-engine definition surface (definition/**), including which folder contains which APIs (accessors, messages, slashcommands, uikit, uploads, persistence, api). Use when asked "where is the type/method for X?" or when you need an index of Apps-Engine features.
---

# Apps-Engine Definition Index

## The Rule

When you want to know what an App can do, read `definition/**` first (types + method signatures). Only drop into `server/**` internals if you are debugging engine behavior.

Local path:

- `node_modules/@rocket.chat/apps-engine/definition`
- In this repo: `app/node_modules/@rocket.chat/apps-engine/definition`

## Primary Folders (What They Mean)

- `definition/accessors`: `IRead`, `IModify`, `IHttp`, `ILogger`, `INotifier`, etc.
- `definition/slashcommands`: slash command interfaces/context.
- `definition/settings`: `ISetting`, `SettingType`, setting update hooks.
- `definition/messages`: message types and pre/post message hook interfaces.
- `definition/rooms`, `definition/users`, `definition/roles`, `definition/threads` (via `IThreadRead` in accessors).
- `definition/uikit`: UI Kit blocks and interaction handler types.
- `definition/api`: app-owned API endpoints (`IApi`, `IApiEndpoint`, `ApiEndpoint`).
- `definition/persistence`: app storage primitives (`IPersistence`, associations).
- `definition/uploads`: upload types and upload hook interfaces.
- `definition/metadata`: `IAppInfo`, `AppInterface` (hook names), `AppMethod` (handler method keys).

## Fast Navigation

```powershell
# Open the base App lifecycle + override points
rg -n "abstract class App\\b" app/node_modules/@rocket.chat/apps-engine/definition/App.d.ts

# What can I register in extendConfiguration?
rg -n "interface IConfigurationExtend\\b" app/node_modules/@rocket.chat/apps-engine/definition/accessors/IConfigurationExtend.d.ts

# What are all hook interface names?
rg -n "enum AppInterface\\b" app/node_modules/@rocket.chat/apps-engine/definition/metadata/AppInterface.d.ts

# What handler method keys exist (AppMethod)?
rg -n "enum AppMethod\\b" app/node_modules/@rocket.chat/apps-engine/definition/metadata/AppMethod.d.ts
```
