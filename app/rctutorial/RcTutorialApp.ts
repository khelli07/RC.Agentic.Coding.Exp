import {
    IAppAccessors,
    IConfigurationExtend,
    IEnvironmentRead,
    IHttp,
    ILogger,
    IModify,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { ISlashCommand } from '@rocket.chat/apps-engine/definition/slashcommands';
import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands/SlashCommandContext';

const DAD_JOKE_API_URL = 'https://icanhazdadjoke.com/';
const DAD_JOKE_FALLBACK = 'Could not fetch a dad joke right now. Try again in a bit.';

export class RcTutorialApp extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    protected async extendConfiguration(configuration: IConfigurationExtend, _environmentRead: IEnvironmentRead): Promise<void> {
        await configuration.slashCommands.provideSlashCommand(new DadJokeCommand());
    }
}

class DadJokeCommand implements ISlashCommand {
    public command = 'dadjoke';
    public i18nParamsExample = '';
    public i18nDescription = 'Get a random dad joke';
    public providesPreview = false;

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        _persistence: IPersistence,
    ): Promise<void> {
        const jokeText = await this.getJokeText(http);
        const appUser = await read.getUserReader().getAppUser();

        if (!appUser) {
            return;
        }

        const messageBuilder = modify.getCreator().startMessage();
        messageBuilder
            .setRoom(context.getRoom())
            .setSender(appUser)
            .setText(jokeText ?? DAD_JOKE_FALLBACK);

        await modify.getCreator().finish(messageBuilder);
    }

    private async getJokeText(http: IHttp): Promise<string | undefined> {
        try {
            const response = await http.get(DAD_JOKE_API_URL, {
                headers: {
                    Accept: 'application/json',
                    'User-Agent': 'rctutorial/0.0.1 (Rocket.Chat App)',
                },
                timeout: 5000,
            });

            if (response.statusCode < 200 || response.statusCode >= 300) {
                return undefined;
            }

            if (response.data && typeof response.data.joke === 'string' && response.data.joke.trim().length > 0) {
                return response.data.joke.trim();
            }

            if (!response.content) {
                return undefined;
            }

            const parsed = JSON.parse(response.content) as { joke?: unknown };
            if (typeof parsed.joke === 'string' && parsed.joke.trim().length > 0) {
                return parsed.joke.trim();
            }

            return undefined;
        } catch {
            return undefined;
        }
    }
}
