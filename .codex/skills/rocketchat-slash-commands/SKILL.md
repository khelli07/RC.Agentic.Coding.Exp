---
name: rocketchat-slash-commands
description: Implement and register Rocket.Chat slash commands in Apps-Engine using ISlashCommand and SlashCommandContext, including reading room/thread context, fetching messages, calling external services via IHttp, and replying via notifier/modify. Use when adding or changing a slash command or when asked "how do slash commands work?".
---

# Rocket.Chat Slash Commands

## Follow The Local Pattern

Entry registration (App):

- `app/ThreadSummarizerApp.ts` registers the command via `configuration.slashCommands.provideSlashCommand(new SummarizeCommand(this))`.

Implementation (Command):

- `app/commands/SummarizeCommand.ts` implements `ISlashCommand` and defines `executor(context, read, modify, http)`.

## Practical Command Anatomy

- `command`: the `/...` name users type.
- `executor`: entry point on execution.
- Use `context.getSender()`, `context.getRoom()`, `context.getThreadId()` to decide behavior.
- Use `read.getRoomReader().getMessages(...)` for channel history.
- Use `read.getThreadReader().getThreadById(threadId)` for thread history.
- Reply with a notifier-based message builder (see `app/helpers/notifyMessage.ts`).

## Command UX Checklist

- Provide a `help` string and good error messages; slash commands are discoverable but unforgiving.
- Validate arguments early and reply with usage examples.
- If you open UI Kit modals from a command, ensure `ui.interact` permission is present and the App implements the required UI Kit handler interface.

Read the skeleton and gotchas:

- `.codex/skills/rocketchat-slash-commands/references/skeleton-and-gotchas.md`

## Official Docs

- `.codex/skills/rocketchat-apps-engine-core/references/developer-docs.md`
