## ADDED Requirements

### Requirement: Dad Joke Command Accepts Optional Search Terms
The `/dadjoke` command SHALL accept optional arguments and interpret the joined argument text as a search term.

#### Scenario: Command invoked with search text
- **WHEN** a user runs `/dadjoke space` or `/dadjoke space aliens`
- **THEN** the app uses `space` or `space aliens` as the search term for API query construction

### Requirement: Random Joke Behavior Is Preserved
The app SHALL request a random dad joke when `/dadjoke` is executed without arguments.

#### Scenario: Command invoked with no args
- **WHEN** a user runs `/dadjoke`
- **THEN** the app calls the random joke endpoint and posts one joke response

### Requirement: Search API Request Uses Query Parameters
When arguments are provided, the app SHALL call the Dad Joke search endpoint and pass the parsed term as query parameter data.

#### Scenario: Search request is formed correctly
- **WHEN** a user runs `/dadjoke banana`
- **THEN** the app calls `https://icanhazdadjoke.com/search` with `term=banana` and a bounded result size

### Requirement: No-Result Search Feedback
If a search request succeeds but returns no jokes, the app SHALL post a user-facing no-results message.

#### Scenario: Search response has zero results
- **WHEN** a user runs `/dadjoke <term>` and the API returns an empty result set
- **THEN** the app posts a message indicating no jokes were found for that term
