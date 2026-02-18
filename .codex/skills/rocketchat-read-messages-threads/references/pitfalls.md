# Pitfalls And Checks

- Thread reader can repeat the first message once; verify before you build prompts (local code removes it).
- `message.text` can be empty; skip it.
- `createdAt` formatting: if you include timestamps in prompts, keep them consistent and readable.
- Prefer stable identifiers when needed (thread id vs root message id).

