# Apps-Engine Map (Local Node Modules)

This project uses `@rocket.chat/apps-engine` from:

- `app/node_modules/@rocket.chat/apps-engine`

## What Matters Most For App Development

- `definition/`
  - `definition/App.d.ts`: the `App` base class; lifecycle/entry points you override.
  - `definition/accessors/`: `IRead`, `IModify`, `IHttp`, `IPersistence`, environment/settings readers, etc.
  - `definition/slashcommands/`: `ISlashCommand`, `SlashCommandContext`.
  - `definition/settings/`: `ISetting`, `SettingType`.
  - `definition/messages/`: `IMessage*`, pre/post message handler interfaces.
  - `definition/rooms/`, `definition/users/`.
  - `definition/uikit/`: UI Kit interaction contexts and helpers.
  - `definition/metadata/`: app metadata, app interfaces/enums.

## Where To Look When You Need A Capability

- Read data: `definition/accessors` (usually through `read.getXReader()`).
- Send/modify messages: `definition/accessors` and `definition/messages` (through `modify.getCreator()` etc.).
- HTTP/network calls: `definition/accessors/IHttp.d.ts`.
- Persist data: `definition/persistence` and `definition/accessors` (persistence reader/writer).
- UI Kit: `definition/uikit`.
- Event hooks: `definition/messages` (and other `definition/*` categories). Also check `definition/metadata/AppInterface.d.ts` for a quick list of hook names.

## Local App "Living Examples"

Good local jump points:

- `app/ThreadSummarizerApp.ts`: registers settings and a slash command via `extendConfiguration`.
- `app/commands/SummarizeCommand.ts`: shows the `executor(context, read, modify, http)` shape and thread/room reads.
- `app/settings/settings.ts`: shows `SettingType.SELECT` and `SettingType.MULTI_SELECT`.
