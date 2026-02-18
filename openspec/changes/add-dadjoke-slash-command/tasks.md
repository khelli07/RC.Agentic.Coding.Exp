## 1. Command Setup

- [x] 1.1 Update `app/rctutorial/app.json` to include required networking permission for outbound HTTP calls.
- [x] 1.2 Create a `dadjoke` slash command class in `app/rctutorial` implementing `ISlashCommand`.
- [x] 1.3 Register the `dadjoke` slash command in the app configuration (`extendConfiguration`).

## 2. Joke Fetching Behavior

- [x] 2.1 Implement `IHttp` request logic to `https://icanhazdadjoke.com/` with JSON response headers.
- [x] 2.2 Validate API response payload before posting joke text to the room.
- [x] 2.3 Add failure handling that posts a friendly fallback message when API calls fail or return invalid data.

## 3. Validation And Packaging

- [ ] 3.1 Verify command behavior manually for both success and failure scenarios in a test Rocket.Chat workspace.
- [x] 3.2 Package the app successfully and confirm artifact generation for deployment.
