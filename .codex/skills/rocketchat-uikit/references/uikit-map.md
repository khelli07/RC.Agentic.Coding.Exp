# UI Kit Map (Where To Look)

- Definitions: `app/node_modules/@rocket.chat/apps-engine/definition/uikit`
- Blocks: `app/node_modules/@rocket.chat/apps-engine/definition/uikit/blocks`
- Interaction types: `app/node_modules/@rocket.chat/apps-engine/definition/uikit/*Interaction*`

Search recipes:

```powershell
rg -n "interface IUIKitActionHandler|interface IUIKitIncomingInteraction" app/node_modules/@rocket.chat/apps-engine/definition/uikit
rg -n "UIKitInteractionContext|IUIKitView" app/node_modules/@rocket.chat/apps-engine/definition/uikit
```
