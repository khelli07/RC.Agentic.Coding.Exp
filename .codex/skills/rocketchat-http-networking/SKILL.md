---
name: rocketchat-http-networking
description: Call external services from Rocket.Chat Apps-Engine using IHttp, including JSON request/response handling, error reporting to users, and storing endpoints/models in settings. Use when implementing LLM calls, webhooks, or any networking feature in an App.
---

# HTTP And Networking

## Use IHttp (Not fetch/axios)

Local example:

- `app/helpers/createTextCompletion.ts` uses `http.post(url, { headers, content })`.

Recommended pattern:

- Store host/model/endpoint in a setting.
- Build URLs deterministically.
- Validate `response.content` before JSON.parse.
- On error: notify user and throw (or return a safe fallback).

## Permissions

- Ensure `networking` permission is present in `app/app.json`.

Read the hardened example:

- `.codex/skills/rocketchat-http-networking/references/hardened-json-post.md`

## Official Docs

- `.codex/skills/rocketchat-apps-engine-core/references/developer-docs.md`
