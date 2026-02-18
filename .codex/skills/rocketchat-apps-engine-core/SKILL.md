---
name: rocketchat-apps-engine-core
description: 'Explain Rocket.Chat Apps-Engine fundamentals: what an App is, how app.json maps to IAppInfo, how an App subclass registers features via extendConfiguration, and where to find methods/types in app/node_modules/@pps-engine (usually under app/node_modules). Use when asked "what is an app?", "how does Apps-Engine work?", "what methods exist?", or "where is X defined?".'
---

# Rocket.Chat Apps-Engine Core

## Define The Core Mental Model

- A Rocket.Chat "App" is a plugin bundle executed by Rocket.Chat, written against the `@rocket.chat/apps-engine` APIs.
- `app/app.json` is the manifest. It maps to `IAppInfo` in the engine definitions.
- `classFile` points at your App entry class (usually `extends App`).
- The App entry class typically overrides `extendConfiguration(configuration)` to register capabilities.

Local examples in this repo:

- Manifest: `app/app.json`
- Entry class: `app/ThreadSummarizerApp.ts`
- Example registrations: `configuration.settings.provideSetting(...)`, `configuration.slashCommands.provideSlashCommand(...)`

## Where "Methods And Types" Live

Prefer the "definition" surface:

- `node_modules/@rocket.chat/apps-engine/definition/**`
- In this repo: `app/node_modules/@rocket.chat/apps-engine/definition/**`

Start from:

- `app/node_modules/@rocket.chat/apps-engine/definition/App.d.ts`
- `app/node_modules/@rocket.chat/apps-engine/definition/accessors/IConfigurationExtend.d.ts`
- `app/node_modules/@rocket.chat/apps-engine/definition/metadata/IAppInfo.d.ts`
- `app/node_modules/@rocket.chat/apps-engine/definition/metadata/AppInterface.d.ts`

## Official Docs

Doc pointers (kept as a curated list so this skill stays stable):

- `.codex/skills/rocketchat-apps-engine-core/references/developer-docs.md`

## How The Docs Map To Code

- Developer docs explain concepts and "happy path" examples.
- `@rocket.chat/apps-engine/definition/**` is the source of truth for what your app code can call and what types/methods exist.
- `app/app.json` permissions are enforced by the Rocket.Chat server; permission _names_ can vary by server/engine version, so cross-check docs and test against your target server.

## Fast Answers (Search)

```powershell
# App manifest shape + implemented interfaces enum app/node_modules/@
rg -n "export interface IAppInfo|enum AppInterface" app/node_modules/@rocket.chat/apps-engine/definition/metadata

# Configuration extension points (what app/node_modules/@er)
rg -n "interface IConfigurationExtend" app/node_modules/@rocket.chat/apps-engine/definition/accessors

# Find the base App  app/node_modules/@
rg -n "class App\\b" app/node_modules/@rocket.chat/apps-engine/definition/App.d.ts
 
```

Read the glossary when you need vocabulary alignment:

- `.codex/skills/rocketchat-apps-engine-core/references/glossary.md`
