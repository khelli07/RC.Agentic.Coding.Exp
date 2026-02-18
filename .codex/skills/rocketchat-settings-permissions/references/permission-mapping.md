# Permission Mapping (Code -> app.json)

Use this as a debugging checklist when a capability fails at runtime or deploy.

- `read.getRoomReader().getMessages(...)` -> ensure `message.read`, `room.read`
- `read.getThreadReader()` -> ensure `threads.read`
- `read.getNotifier()` / sending messages -> ensure `message.write`
- `http.get/post/...` -> ensure `networking`
- Upload read APIs -> ensure `upload.read`
- UI Kit interactions (open modal, handle submit/actions) -> ensure `ui.interact`
- Persistence (store/retrieve app data) -> ensure `persistence`
- Scheduler (scheduled reminders/jobs) -> ensure `scheduler`
- App-owned endpoints (IApi/IApiEndpoint) -> ensure the API permission your server requires (varies by version; cross-check docs/server)

Also cross-check:

- `app/app.json` `permissions[]`
- `app/node_modules/@rocket.chat/apps-engine/definition/permissions/**` for permission type names
