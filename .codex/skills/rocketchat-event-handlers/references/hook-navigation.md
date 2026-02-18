# Hook Navigation (Local)

Start here:

- `app/node_modules/@rocket.chat/apps-engine/definition/metadata/AppInterface.d.ts`

Then jump to the corresponding folder:

- Messages: `app/node_modules/@rocket.chat/apps-engine/definition/messages`
- Rooms: `app/node_modules/@rocket.chat/apps-engine/definition/rooms`
- Users: `app/node_modules/@rocket.chat/apps-engine/definition/users`

Search recipes:

```powershell
rg -n "enum AppInterface" app/node_modules/@rocket.chat/apps-engine/definition/metadata/AppInterface.d.ts
rg -n "IPreMessage|IPostMessage" app/node_modules/@rocket.chat/apps-engine/definition/messages
```
