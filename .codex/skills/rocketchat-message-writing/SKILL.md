---
name: rocketchat-message-writing
description: Send and modify messages in Rocket.Chat Apps-Engine using notifier and modify creators/builders (INotifier, IMessageBuilder, IModifyCreator.startMessage/finish), including when to use notify vs create messages and required permissions. Use when implementing replies, announcements, thread replies, or message edits.
---

# Message Writing

## Two Common Paths

1. Notify (ephemeral, user must be online)
   - Use `read.getNotifier()` / `modify.getNotifier()`.
   - Local example: `app/helpers/notifyMessage.ts` uses `read.getNotifier()` + `getMessageBuilder()` + `notifyUser(...)`.

2. Create persistent messages
   - Use `modify.getCreator().startMessage(...)` and `modify.getCreator().finish(builder)`.

## Where The APIs Live

- Notifier: `app/node_modules/@rocket.chat/apps-engine/definition/accessors/INotifier.d.ts`
- Message builder: `app/node_modules/@rocket.chat/apps-engine/definition/accessors/IMessageBuilder.d.ts`
- Creator: `app/node_modules/@rocket.chat/apps-engine/definition/accessors/IModifyCreator.d.ts`

## Permissions

- Notifications and message sends typically require `message.write` in `app/app.json`.
- Thread replies require you to set thread id on the message builder (see local helper).

## Fast Search

```powershell
rg -n "interface INotifier\\b" app/node_modules/@rocket.chat/apps-engine/definition/accessors/INotifier.d.ts
rg -n "startMessage\\(|finish\\(" app/node_modules/@rocket.chat/apps-engine/definition/accessors/IModifyCreator.d.ts
```
