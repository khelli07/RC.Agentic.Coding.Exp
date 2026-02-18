---
name: rocketchat-debug-test
description: 'Debug and validate Rocket.Chat Apps: use ILogger and app logger patterns, trace from slash command/event hook to helpers, verify permissions, and run local lint/format. Use when asked how to troubleshoot runtime errors, missing permissions, bad responses, or deploy-time failures.'
---

# Debugging And Validation

## Trace Execution

Start from the trigger and follow calls:

- Slash command: `app/commands/SummarizeCommand.ts`
- Helpers: `app/helpers/createTextCompletion.ts`, `app/helpers/notifyMessage.ts`
- Settings: `app/settings/settings.ts`
- Manifest/permissions: `app/app.json`

## Validate Locally

From `app/`:

```bash
npm run lint
npm run format
```

## Typical Bugs In Apps

- Missing permission in `app/app.json`.
- Assuming `response.content` exists (guard it).
- Parsing thread/room messages incorrectly (empty text, repeats, system messages).
- Hard-coding endpoints instead of using settings.
