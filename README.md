# Setup

This repo demonstrates a simple Rocket.Chat app workflow using:

1. OpenSpec (`/opsx:*`) for spec-driven planning
2. Rocket.Chat Apps-Engine for implementation
3. Docker for local deployment/testing

Before starting, make sure you have:

1. Docker + Docker Compose
2. Node.js + npm
3. OpenSpec CLI (`openspec` command)

## Definitions

### Spec-Driven Development (SDD)

Instead of jumping directly to code, you first define:

1. `proposal` (why this change exists)
2. `design` (how it should work)
3. `specs` (expected behavior)
4. `tasks` (implementation checklist)

Then implementation follows those artifacts.

### Skills

Skills are local instruction packs used by Codex to do specific tasks (for example Rocket.Chat app workflows or OpenSpec workflows).

## Process

Tools used in this repo:

1. Codex
2. OpenSpec (`/opsx:new`, `/opsx:ff`, `/opsx:apply`)

High-level flow:

1. Brainstorm an app idea
2. Create a change with OpenSpec
3. Generate artifacts
4. Implement tasks
5. Deploy and test locally in Docker

# Medium Tutorial Walkthrough

## 1. Brainstorm the feature

Example prompt:

```text
Let's brainstorm. I want an app that calls an API through a slash command.
```

Chosen example in this repo:

```text
/dadjoke
```

It is a good starter because it is simple, fun, and validates HTTP + slash command plumbing.

## 2. Create a change

```text
/opsx:new add-dadjoke-slash-command
```

This creates:

`openspec/changes/add-dadjoke-slash-command/`

## 3. Fast-forward artifacts

```text
/opsx:ff add-dadjoke-slash-command
```

This generates:

1. `proposal.md`
2. `design.md`
3. `specs/dadjoke-command/spec.md`
4. `tasks.md`

## 4. Apply tasks

```text
/opsx:apply add-dadjoke-slash-command
```

Implemented app changes:

1. Register `/dadjoke` command
2. Call `https://icanhazdadjoke.com/` via `IHttp`
3. Validate response payload
4. Show fallback message on API failure
5. Add required permissions in `app/rctutorial/app.json`

## 5. Run Rocket.Chat in Docker

This repo includes:

`docker-compose.rocketchat.yml`

Start local stack:

```powershell
docker compose -f docker-compose.rocketchat.yml up -d
docker compose -f docker-compose.rocketchat.yml ps
```

Local server:

1. URL: `http://localhost:3000`
2. Admin user: `admin`
3. Admin password: `admin12345`

## 6. Package and deploy app

From `app/rctutorial`:

```powershell
npx -y -p node@20 -p '@rocket.chat/apps-cli' rc-apps package
npx -y -p node@20 -p '@rocket.chat/apps-cli' rc-apps deploy --verbose
```

Note: Node 20 is recommended for `rc-apps` stability in this environment.

## 7. Test command

In Rocket.Chat channel (for example `#general`):

```text
/dadjoke
```

Expected result:

1. Bot posts a joke when API succeeds
2. Bot posts a friendly fallback on API failure

# What More Can You Do With It?

Once this base works, you can extend the same pattern:

1. `/weather <city>` using weather APIs
2. `/define <word>` using dictionary APIs
3. `/translate <lang> <text>`
4. `/quote` daily quote commands
5. `/summarize-thread` using LLM APIs (OpenRouter/OpenAI)

You can also improve app quality:

1. Move API logic into helper modules
2. Add settings for API keys and endpoints
3. Add retries/timeouts/logging
4. Add more slash commands sharing one HTTP layer

# Useful Commands

```powershell
openspec status --change "add-dadjoke-slash-command"
docker compose -f docker-compose.rocketchat.yml logs -f rocketchat
docker compose -f docker-compose.rocketchat.yml down
```
