## Context

The app already supports a `/dadjoke` slash command that always returns a random joke from `https://icanhazdadjoke.com/`. Users now need optional arguments so they can request jokes by topic without introducing a separate command.

## Goals / Non-Goals

**Goals:**
- Parse optional arguments from `/dadjoke`.
- Keep existing no-argument behavior as random joke retrieval.
- Use provided argument text as `term` in Dad Joke search API requests.
- Return clear user-facing messages for no results and invalid usage.

**Non-Goals:**
- Multi-command routing beyond `/dadjoke`.
- Persistent per-user preferences for topics.
- Advanced ranking/filtering of search results beyond `limit=1`.

## Decisions

1. Use argument-presence switching within one command.
Rationale: preserves current UX while adding power for targeted requests.
Alternative considered: new command (`/dadjoke-search`) was rejected to avoid command sprawl.

2. Map joined arguments to `term` query parameter on `/search`.
Rationale: aligns directly with upstream API semantics and minimizes translation logic.
Alternative considered: custom parsing of flags first was deferred for a later iteration.

3. Keep random endpoint for empty args and search endpoint for non-empty args.
Rationale: backward-compatible behavior with explicit enhancement path.

4. Add explicit no-match response when search returns zero results.
Rationale: distinguishes empty result sets from transport failures.

## Risks / Trade-offs

- [Ambiguous argument intent] -> Keep v1 parsing simple (`args.join(' ')`) and document usage text.
- [Search endpoint shape differs from random endpoint] -> Validate payloads independently for random and search responses.
- [User confusion on syntax] -> Provide command help text and `i18nParamsExample` hint.

## Migration Plan

1. Update command metadata to expose argument usage example.
2. Implement argument parsing and endpoint branching in command executor.
3. Add search-response parsing (`results[0].joke`) and no-result message.
4. Deploy to local test workspace and validate random/search/no-result flows.
5. Rollback strategy: revert to no-argument random-only behavior if regressions are observed.

## Open Questions

- Whether to support explicit subcommands (e.g., `help`, `random`) in this change or defer to a follow-up.
