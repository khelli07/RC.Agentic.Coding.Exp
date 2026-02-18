---
name: rocketchat-settings-permissions
description: 'Define and use Rocket.Chat App settings and permissions: create ISetting entries, register them in extendConfiguration, read settings via environmentReader.getSettings().getValueById, and map code capabilities to app.json permissions. Use when adding settings, debugging missing permissions, or explaining "why does my app need X permission?".'
---

# Settings And Permissions

## Settings Workflow (Local)

1. Define settings in `app/settings/settings.ts` as `ISetting[]`.
2. Register settings in `extendConfiguration`: `configuration.settings.provideSetting(setting)`.
3. Read settings at runtime via environment reader:
   `this.app.getAccessors().environmentReader.getSettings().getValueById('<id>')`

Local example:

- `app/settings/settings.ts` defines `model` and `add-ons`.
- `app/helpers/createTextCompletion.ts` reads `model`.
- `app/commands/SummarizeCommand.ts` reads `add-ons`.

## Permissions Checklist

Permissions are declared in `app/app.json` and should match what you do in code:

- Read messages: `message.read`
- Write messages/notify: `message.write`
- Read rooms: `room.read`
- Threads: `threads.read`
- External calls: `networking`
- UI Kit interactions (modals/buttons/selects): `ui.interact`
- Persistence (store app data): `persistence`
- Scheduler (reminders/cron-like jobs): `scheduler`

Important:

- Adding `permissions` to `app.json` can override default permissions; include *all* permissions your app needs.
- Permission names are enforced by the Rocket.Chat server and can vary by Apps-Engine / server version (for example, some docs show `networking.default`/`persistence.default`/`scheduler.default` while older setups use `networking`/`persistence`/`scheduler`).

When in doubt, verify against:

- the official permission system docs
- your target server (deploy attempt + runtime logs)

Use the checklist:

- `.codex/skills/rocketchat-settings-permissions/references/permission-mapping.md`

## Official Docs

- `.codex/skills/rocketchat-apps-engine-core/references/developer-docs.md`
