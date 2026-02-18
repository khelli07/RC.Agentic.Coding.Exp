## 1. Argument Parsing And UX

- [x] 1.1 Update `/dadjoke` command metadata to include argument usage examples in `i18nParamsExample`.
- [x] 1.2 Parse optional slash-command arguments from `SlashCommandContext` and normalize them into a single search term string.
- [x] 1.3 Preserve no-argument flow so `/dadjoke` continues to fetch a random joke.

## 2. API Request Branching

- [x] 2.1 Add conditional endpoint routing: random endpoint for no args and search endpoint for non-empty term.
- [x] 2.2 Pass search input as query parameters (`term`, bounded `limit`) when calling Dad Joke search API.
- [x] 2.3 Validate search response shape and extract joke text safely from result payloads.
- [x] 2.4 Add explicit no-result response message when search returns zero matches.

## 3. Validation And Deployment

- [x] 3.1 Verify behavior in local Rocket.Chat for: random mode, keyword search mode, and no-result search mode.
- [x] 3.2 Package and deploy updated app build successfully.
