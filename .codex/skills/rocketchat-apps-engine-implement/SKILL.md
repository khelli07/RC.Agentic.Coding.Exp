---
name: rocketchat-apps-engine-implement
description: 'Implement Rocket.Chat App features by applying a reliable workflow: update app.json permissions/implements, register features in the App subclass, implement behavior (slash commands, handlers, UI Kit, API endpoints), and package/deploy with rc-apps. Use when you are actively changing app code and need a checklist.'
---

# Apps-Engine Implementation Checklist

## 1. Decide The Feature Surface

- Slash command: implement `ISlashCommand` and register it.
- Event hook: add `implements` entry in `app/app.json` and implement handler method.
- UI Kit: implement action handler(s) and declare the interface(s).
- API endpoint: implement `IApi`/`IApiEndpoint` and register via `configuration.api`.
- Persistence: use `IPersistence` for state.
- Scheduler: register processors and schedule jobs for reminders/recurring tasks.

## 2. Update Manifest Early

- Permissions: `app/app.json` `permissions[]`
- Hook interfaces: `app/app.json` `implements[]`

## 3. Register In The App Class

- Your App subclass `extendConfiguration(...)` is the normal registration point.

## 4. Implement Feature Code

- Slash commands: `app/commands/*`
- Settings: `app/settings/*`
- Helpers/constants: `app/helpers/*`, `app/constants/*`

## 5. Package/Deploy

From your app project folder:

```bash
npm install
rc-apps package
rc-apps deploy
```

## Official Docs

- `.codex/skills/rocketchat-apps-engine-core/references/developer-docs.md`
