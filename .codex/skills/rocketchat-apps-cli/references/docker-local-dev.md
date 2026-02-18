# Local Rocket.Chat (Docker) For App Development

Use this when you need a local Rocket.Chat server to deploy/test an Apps-Engine app.

Official admin docs:

```text
https://docs.rocket.chat/docs/deploy-rocketchat
```

## Practical Checklist

- Pick a Rocket.Chat version that supports private app uploads in your environment.
- Ensure MongoDB + Rocket.Chat are running and healthy.
- Create an admin user and log in.
- Upload/update your app (via `rc-apps deploy` or manual `/api/apps` upload).

## Common Failure Modes

- Upload rejected due to App API version mismatch:
  - Set `requiredApiVersion` in `app.json` to match the server's App API version.
  - Pin your build-time `@rocket.chat/apps-engine` to the same version (or compatible).
- Upload/enable blocked by plan/settings:
  - Use a dev-friendly Rocket.Chat version or enable the required features.
- UI Kit interactions do nothing:
  - Missing `ui.interact` permission or missing UI Kit handler interface in `app.json`.

