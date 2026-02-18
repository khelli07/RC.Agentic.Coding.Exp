## Why

The current `/dadjoke` command only returns a random joke and does not accept user input to influence the result. Adding argument support enables more useful interactions, such as searching jokes by keyword, while reusing the existing command flow.

## What Changes

- Extend `/dadjoke` to parse command arguments from user input.
- Support an argument-driven API request path using the Dad Joke search endpoint when a search term is provided.
- Add clear usage and fallback behavior for invalid/empty arguments and no-match search results.

## Capabilities

### New Capabilities
- `dadjoke-command-arguments`: Allow `/dadjoke` to accept optional arguments and pass them as query parameters to the Dad Joke API.

### Modified Capabilities
- None.

## Impact

- Affected code: `app/rctutorial/RcTutorialApp.ts` command execution and HTTP request logic.
- External API: `https://icanhazdadjoke.com/search` with query parameters (`term`, `limit`).
- UX impact: users can request context-specific jokes and receive clearer command guidance.
