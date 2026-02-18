## ADDED Requirements

### Requirement: Dad Joke Command Registration
The app SHALL register a slash command named `dadjoke` that is available in rooms where the app is enabled.

#### Scenario: Command is discoverable
- **WHEN** a user views available slash commands after app deployment
- **THEN** the `dadjoke` command is listed and can be invoked

### Requirement: Dad Joke Retrieval And Response
When a user executes `/dadjoke`, the app SHALL request one random joke from `https://icanhazdadjoke.com/` and post the returned joke text as a room message.

#### Scenario: Successful joke request
- **WHEN** a user runs `/dadjoke` and the upstream API returns a valid joke payload
- **THEN** the app posts a non-empty joke text response in the same room

### Requirement: Failure Handling For Dad Joke Requests
If the upstream request fails, times out, or returns an invalid payload, the app SHALL return a friendly fallback message instead of failing silently.

#### Scenario: Upstream API is unavailable
- **WHEN** a user runs `/dadjoke` and the upstream API cannot be reached or returns an error
- **THEN** the app posts a fallback message indicating that a joke could not be fetched right now
