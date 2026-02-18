# Slash Command Skeleton And Gotchas

## Skeleton (Minimal)

Use this as a mental template (not copy/paste gospel).

```ts
export class MyCommand implements ISlashCommand {
  public command = 'my-command';
  public i18nParamsExample = 'Example text';
  public i18nDescription = '';
  public providesPreview = false;

  public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp) {
    const user = context.getSender();
    const room = context.getRoom();
    // Decide between room vs thread behavior.
    // Read messages, call services, then notify user.
  }
}
```

## Gotchas Seen In This Repo

- Thread reader can include the first message twice (local code removes it). See `app/commands/SummarizeCommand.ts`.
- `IRead.getNotifier()` is a convenient way to reply to the invoker without needing a full message create flow. See `app/helpers/notifyMessage.ts`.

