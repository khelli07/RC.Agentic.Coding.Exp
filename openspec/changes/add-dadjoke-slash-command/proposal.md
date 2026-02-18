## Why

The app currently has no user-facing feature to validate end-to-end command handling and external HTTP integration. Adding a lightweight `/dadjoke` command provides an immediate, low-risk feature to prove the integration path before building more complex commands.

## What Changes

- Add a new slash command, `/dadjoke`, that fetches one joke from a public Dad Joke API and posts it in the current room.
- Add clear runtime behavior for successful responses, upstream API failures, and malformed responses.
- Add required app permissions/settings updates needed for outbound HTTP requests.

## Capabilities

### New Capabilities
- `dadjoke-command`: Fetch and post a random dad joke through a Rocket.Chat slash command.

### Modified Capabilities
- None.

## Impact

- Affected code: `app/rctutorial` command registration and command handler implementation.
- External API: `https://icanhazdadjoke.com/` JSON endpoint.
- Permissions/systems: Rocket.Chat Apps-Engine networking permission and outbound HTTP handling path.
