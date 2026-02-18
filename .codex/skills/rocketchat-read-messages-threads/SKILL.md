---
name: rocketchat-read-messages-threads
description: Read messages, threads, rooms, and users in Rocket.Chat Apps-Engine using IRead readers (roomReader, threadReader, etc.), including paging/sorting and basic message shaping for prompting/summarization. Use when implementing "read conversation context" features or troubleshooting message/thread fetching.
---

# Read Messages And Threads

## Room Messages

Local pattern:

- `app/commands/SummarizeCommand.ts` uses `read.getRoomReader().getMessages(room.id, { limit, sort })`.

Typical concerns:

- Sort order (`createdAt: 'asc'`) affects prompt quality.
- Limit/pagination affects context completeness.
- Filter out system messages / empty text as needed.

## Thread Messages

Local pattern:

- `read.getThreadReader().getThreadById(threadId)`

Then shape text as:

- `sender.name: message.text`

See pitfalls and checks:

- `.codex/skills/rocketchat-read-messages-threads/references/pitfalls.md`

