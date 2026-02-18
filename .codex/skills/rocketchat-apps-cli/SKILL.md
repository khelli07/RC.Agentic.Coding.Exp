---
name: rocketchat-apps-cli
description: Package, deploy, and troubleshoot Rocket.Chat Apps using the Rocket.Chat Apps CLI (rc-apps), including configuring .rcappsconfig, running rc-apps package/deploy, and understanding what gets built. Use when asked how to build/deploy an app, why deploy fails, or how to validate app.json/permissions.
---

# Rocket.Chat Apps CLI (rc-apps)

## Typical Workflow

You usually:

1. Install the CLI: `@rocket.chat/apps-cli`
2. Configure a target server via `.rcappsconfig`
3. Build a package: `rc-apps package`
4. Deploy: `rc-apps deploy`

Repo-specific example files (if present in the project you're in):

- `README.md`
- `.rcappsconfig` (often located at the app root)

Key commands (from `app/`):

```bash
npm install
rc-apps package
rc-apps deploy
```

## Local Docker Deploy Notes (Private Apps)

If you are deploying to a local Rocket.Chat (often Docker), the server must accept *private app* uploads and your app must declare a compatible `requiredApiVersion`.

- If the server rejects upload with: "requires vX.Y.Z of the App API however your server comes with vA.B.C"
  - Set `requiredApiVersion` in `app.json` to `A.B.C`
  - Pin `@rocket.chat/apps-engine` to `A.B.C` (or compatible) for local builds

Also note: in newer Rocket.Chat versions, uploading private apps can be restricted by plan/settings. If you see upload/enable blocked, use a local dev server that still allows private apps (or enable the required enterprise features).

## If `rc-apps` Breaks: Run With Node 20

Some environments (notably newer global Node versions) can break older `rc-apps` builds. If so, run the CLI with Node 20:

```bash
npx -y -p node@20 node <path-to-rc-apps-run> package
npx -y -p node@20 node <path-to-rc-apps-run> deploy
```

## Fallback: Manual Package + Upload (No `rc-apps deploy`)

If `rc-apps package` or `deploy` is unreliable, you can still deploy by building `dist/`, zipping, and uploading to `/api/apps`.

Minimum zip contents:

- `app.json` (with `classFile` pointing to compiled JS, e.g. `dist/MyApp.js`)
- `icon.png` (if referenced by `iconFile`)
- `dist/**`

Upload via REST (requires admin auth):

- `POST /api/apps` to upload a new app
- `POST /api/apps/<appId>` to update an existing app

PowerShell tip: use `curl.exe` (not `curl`, which can alias to `Invoke-WebRequest`).

Full walkthrough:

- `.codex/skills/rocketchat-apps-cli/references/local-private-app-upload.md`
- `.codex/skills/rocketchat-apps-cli/references/docker-local-dev.md`

## Debug Deploy/Package Failures

1. Validate `app/app.json`: `id` is UUID v4, `nameSlug` is unique, `classFile` matches your TS entry.
2. Confirm your slash command name is unique: `app/commands/SummarizeCommand.ts` (`command` property).
3. Confirm permissions match what your code uses: `app/app.json` vs your reads/writes/network calls.
4. If the server rejects the app, check server logs and reduce scope: remove permissions or features until it deploys.

Read the CLI notes:

- `.codex/skills/rocketchat-apps-cli/references/commands-and-files.md`

## Official Docs

- `.codex/skills/rocketchat-apps-engine-core/references/developer-docs.md`
- `.codex/skills/rocketchat-apps-cli/references/local-private-app-upload.md`
