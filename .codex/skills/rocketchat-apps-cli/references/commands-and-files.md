# rc-apps Commands And Files (Local)

## Files That Matter

- `app/app.json`: manifest (id/version/permissions/classFile).
- `app/.rcappsconfig`: deployment target and ignored files.
- `app/package.json`: app dependencies and lint/format scripts.

## Common Commands

```bash
# Build a deployable bundle
rc-apps package

# Deploy using app/.rcappsconfig
rc-apps deploy
```

## Typical Failure Causes

- `id` not a valid UUID v4 or duplicated.
- `nameSlug` collides with an existing app.
- Missing permission for a capability used in code (networking, message.read, message.write, threads.read, upload.read, etc.).
- Wrong `classFile` or entry class export mismatch.

