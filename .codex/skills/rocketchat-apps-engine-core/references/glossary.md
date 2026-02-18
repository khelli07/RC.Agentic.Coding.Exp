# Apps-Engine Glossary (Practical)

- **Apps-Engine**: Rocket.Chat's framework/runtime that loads and executes apps, and provides the API surface (`definition/**`) for app authors.
- **App**: A plugin bundle, defined by `app.json`, with an entry class (commonly `extends App`).
- **Manifest (`app.json`)**: Declares id/name/version, permissions, and which interfaces it implements.
- **`implements` (manifest field)**: Declares which engine hook interfaces your app provides (values come from `AppInterface` enum).
- **Accessors**: Services the engine passes to your app: read-only (`IRead`), write/modify (`IModify`), HTTP (`IHttp`), persistence (`IPersistence`), etc.
- **`extendConfiguration`**: App lifecycle method used to register settings, slash commands, API endpoints, and more.
- **UI Kit**: Rocket.Chat's structured UI system for apps (blocks, modals, action handlers).

