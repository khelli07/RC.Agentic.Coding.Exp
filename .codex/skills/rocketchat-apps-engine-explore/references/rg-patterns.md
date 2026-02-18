# ripgrep Patterns For Rocket.Chat Apps

Use these when you need to quickly answer "what interface do I implement?" or "where is this type defined?".

```powershell
# Start from a known import path
rg -n "from '@rocket\\.chat/apps-engine/definition" app

# Find all App subclasses
rg -n "extends\\s+App\\b" app

# Find configuration extension points
rg -n "extendConfiguration\\(" app

# Slash commands: registration + implementation
rg -n "provideSlashCommand\\(" app
rg -n "implements\\s+ISlashCommand\\b" app

# Settings: registration + IDs used at runtime
rg -n "provideSetting\\(" app
rg -n "getValueById\\(" app

# UI Kit
rg -n "UIKit" app
rg -n "IUIKit" app/node_modules/@rocket.chat/apps-engine/definition

# Pre/post message hooks (engine surface)
rg -n "IPreMessage|IPostMessage" app/node_modules/@rocket.chat/apps-engine/definition/messages
```
