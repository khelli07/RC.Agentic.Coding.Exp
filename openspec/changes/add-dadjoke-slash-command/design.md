## Context

`app/rctutorial` is a newly scaffolded Rocket.Chat app with no implemented user-facing behavior. The first feature should exercise the full command path (registration, execution, outbound HTTP call, and room response) with minimal complexity.

## Goals / Non-Goals

**Goals:**
- Add a `/dadjoke` slash command that fetches a random joke from `icanhazdadjoke.com` and posts it in the invoking room.
- Use Rocket.Chat Apps-Engine `IHttp` for external network requests.
- Define predictable behavior for success and failure paths so users always receive a response.

**Non-Goals:**
- User personalization, favorites, or joke history storage.
- Multi-provider fallback APIs.
- Advanced moderation/content filtering workflows.

## Decisions

1. Use `https://icanhazdadjoke.com/` as the upstream source.
Rationale: no API key is required and JSON output is available with a single request.
Alternative considered: JokeAPI (`v2.jokeapi.dev`) was rejected for this first iteration to keep response parsing and constraints simple.

2. Implement networking via Apps-Engine `IHttp` in the command execution path.
Rationale: this is the supported runtime path in Rocket.Chat apps and aligns with existing local skill guidance.
Alternative considered: generic HTTP libraries were rejected because they are unnecessary and less aligned with Apps-Engine patterns.

3. Return a single message containing the joke text (or a friendly fallback on failure).
Rationale: minimizes UX ambiguity and keeps command output consistent.
Alternative considered: rich block formatting was deferred until later enhancements.

4. Add required networking permission in `app.json` and register the slash command in app configuration.
Rationale: ensures deploy-time validation and runtime behavior are aligned with permissions.

## Risks / Trade-offs

- [Upstream API outage or timeout] -> Return a friendly fallback message and log technical details for debugging.
- [Unexpected response shape] -> Validate response payload before using joke text; fallback when invalid.
- [External dependency quality/content variability] -> Accept for MVP; revisit provider policy if moderation requirements emerge.

## Migration Plan

1. Add command registration and implementation in `app/rctutorial`.
2. Update `app.json` permissions as needed for networking.
3. Package and deploy to a test Rocket.Chat workspace.
4. Validate `/dadjoke` success and failure behavior.
5. Rollback strategy: disable or undeploy the app version if command behavior is unacceptable.

## Open Questions

- None for MVP scope.
