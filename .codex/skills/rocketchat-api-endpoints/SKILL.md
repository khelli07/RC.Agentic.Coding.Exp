---
name: rocketchat-api-endpoints
description: 'Expose HTTP API endpoints from a Rocket.Chat App using Apps-Engine API definitions: implement IApi/IApiEndpoint (or extend ApiEndpoint), register via configuration.api.provideApi, and handle request/response with IHttp/IRead/IModify/IPersistence. Use when adding webhooks, inbound callbacks, or an app-owned REST surface.'
---

# App API Endpoints

## Where To Look

- `app/node_modules/@rocket.chat/apps-engine/definition/api/**`
- Registration surface: `app/node_modules/@rocket.chat/apps-engine/definition/accessors/IApiExtend.d.ts`

## Implementation Steps

1. Create an `IApi` object with one or more endpoints.
2. Implement endpoints via `IApiEndpoint` methods (`get`, `post`, etc.) or extend `ApiEndpoint`.
3. Register it in `extendConfiguration` via `configuration.api.provideApi(api)`.

Read the skeleton:

- `.codex/skills/rocketchat-api-endpoints/references/api-skeleton.md`

## Official Docs

- `.codex/skills/rocketchat-apps-engine-core/references/developer-docs.md`
