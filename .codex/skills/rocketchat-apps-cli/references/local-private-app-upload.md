# Local Private App Upload (Manual Zip + /api/apps)

Use this when `rc-apps package/deploy` is blocked or flaky and you still need to get an app installed on a local Rocket.Chat (often Docker).

## 0. Private App Upload Can Be Restricted

Depending on Rocket.Chat version and plan, private app upload/enable may be restricted. If you cannot upload/enable apps in your local server, switch to a Rocket.Chat version that allows private apps for development, or enable the required enterprise features/settings.

## 1. Ensure `requiredApiVersion` Matches The Server

If upload fails with a message like:

- "requires vX.Y.Z of the App API however your server comes with vA.B.C"

Then set:

- `requiredApiVersion: "A.B.C"` in `app.json`

And pin your build-time `@rocket.chat/apps-engine` version accordingly.

## 2. Build `dist/`

Compile TypeScript to JS (example):

```bash
npx tsc -p tsconfig.build.json
```

You need the compiled entry, for example:

- `dist/ThreadSummarizerApp.js`

## 3. Zip Package Structure

Your zip should contain:

- `app.json`
  - `classFile` must point to the compiled JS entry in `dist/`
  - Example: `dist/ThreadSummarizerApp.js`
- `icon.png` (if referenced by `iconFile`)
- `dist/**`

Zip entry paths should be forward slashes:

- Good: `dist/ThreadSummarizerApp.js`
- Risky on Windows: `dist\\ThreadSummarizerApp.js`

Also ensure `app.json` is valid JSON (avoid UTF-8 BOM issues if you generate it programmatically).

## 4. Upload Via REST

The upload endpoint is **not** under `/api/v1`. It is:

- `POST /api/apps` (upload new)
- `POST /api/apps/<appId>` (update existing)

### PowerShell (Windows)

PowerShell tip: use `curl.exe`, not `curl` (which can map to `Invoke-WebRequest`).

1. Login:

```powershell
$base = 'http://localhost:3000'
$resp = Invoke-RestMethod -Method Post -Uri "$base/api/v1/login" -ContentType 'application/json' -Body (@{ user='admin'; password='admin12345' } | ConvertTo-Json)
$token = $resp.data.authToken
$uid = $resp.data.userId
```

2. Upload:

```powershell
$zip = 'C:\path\to\your-app.zip'
curl.exe -s -H "X-Auth-Token: $token" -H "X-User-Id: $uid" -F "app=@$zip" "$base/api/apps"
```

3. Update:

```powershell
$appId = '<app-id-from-app.json>'
curl.exe -s -H "X-Auth-Token: $token" -H "X-User-Id: $uid" -F "app=@$zip" "$base/api/apps/$appId"
```

## 5. Enable + Smoke Test

In Rocket.Chat UI:

- Administration -> Apps -> Installed -> enable your app

Then test:

- Slash commands show up and respond
- UI Kit modals can open + submit (if used)
*** End Patch"}]}Couldn't parse JSON: unexpected character: line 1 column 1 (char 0)"}Oops tool expects freeform not JSON; I used JSON due to wrapper. Need call apply_patch with freeform directly. Let's redo. We'll ensure no nested bullets? It's markdown ok.
