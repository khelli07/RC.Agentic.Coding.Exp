# API Skeleton (Pointers)

Search the definitions:

```powershell
rg -n "export interface IApi\\b|export interface IApiEndpoint\\b|abstract class ApiEndpoint\\b" app/node_modules/@rocket.chat/apps-engine/definition/api
rg -n "provideApi\\(" app/node_modules/@rocket.chat/apps-engine/definition/accessors
```

Key types:

- `IApi` (`definition/api/IApi.d.ts`)
- `IApiEndpoint` (`definition/api/IApiEndpoint.d.ts`)
- `ApiEndpoint` (`definition/api/ApiEndpoint.d.ts`)
