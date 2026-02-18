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

const DAD_JOKE_RANDOM_API_URL = 'https://icanhazdadjoke.com/';
const DAD_JOKE_SEARCH_API_URL = 'https://icanhazdadjoke.com/search';
const DAD_JOKE_FALLBACK = 'Could not fetch a dad joke right now. Try again in a bit.';
const DAD_JOKE_NO_RESULTS = (term: string) => `No jokes found for "${term}". Try a different keyword.`;
const DAD_JOKE_HELP_TEXT = 'Usage: /dadjoke [keyword]\nExamples: /dadjoke, /dadjoke banana, /dadjoke help';

type JokeFetchResult =
    | { kind: 'ok'; text: string }
    | { kind: 'help' }
    | { kind: 'no-results'; term: string }
    | { kind: 'error' };

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
    public i18nParamsExample = '[help | optional search keywords]';
    public i18nDescription = 'Get a dad joke (random, by keyword, or help)';
    public providesPreview = false;

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        _persistence: IPersistence,
    ): Promise<void> {
        const args = context.getArguments().map((part) => part.trim()).filter((part) => part.length > 0);
        const searchTerm = args.join(' ');
        const result = await this.getJokeText(http, searchTerm);
        const appUser = await read.getUserReader().getAppUser();

        if (!appUser) {
            return;
        }

        const responseText = result.kind === 'ok'
            ? result.text
            : result.kind === 'help'
                ? DAD_JOKE_HELP_TEXT
            : result.kind === 'no-results'
                ? DAD_JOKE_NO_RESULTS(result.term)
                : DAD_JOKE_FALLBACK;

        const messageBuilder = modify.getCreator().startMessage();
        messageBuilder
            .setRoom(context.getRoom())
            .setSender(appUser)
            .setText(responseText);

        await modify.getCreator().finish(messageBuilder);
    }

    private async getJokeText(http: IHttp, searchTerm: string): Promise<JokeFetchResult> {
        if (searchTerm.toLowerCase() === 'help') {
            return { kind: 'help' };
        }

        try {
            const response = await http.get(searchTerm ? DAD_JOKE_SEARCH_API_URL : DAD_JOKE_RANDOM_API_URL, {
                params: searchTerm ? { term: searchTerm, limit: '1' } : undefined,
                headers: {
                    Accept: 'application/json',
                    'User-Agent': 'rctutorial/0.0.1 (Rocket.Chat App)',
                },
                timeout: 5000,
            });

            if (response.statusCode < 200 || response.statusCode >= 300) {
                return { kind: 'error' };
            }

            const payload = response.data ?? this.parsePayload(response.content);
            if (!payload) {
                return { kind: 'error' };
            }

            if (searchTerm) {
                const results = this.getSearchResults(payload);
                if (!results) {
                    return { kind: 'error' };
                }

                if (results.length === 0) {
                    return { kind: 'no-results', term: searchTerm };
                }

                const firstJoke = this.readJokeText(results[0]);
                if (!firstJoke) {
                    return { kind: 'error' };
                }

                return { kind: 'ok', text: firstJoke };
            }

            const randomJoke = this.readJokeText(payload);
            if (randomJoke) {
                return { kind: 'ok', text: randomJoke };
            }

            return { kind: 'error' };
        } catch {
            return { kind: 'error' };
        }
    }

    private parsePayload(content?: string): Record<string, unknown> | undefined {
        if (!content) {
            return undefined;
        }

        try {
            const parsed = JSON.parse(content) as unknown;
            return typeof parsed === 'object' && parsed !== null ? parsed as Record<string, unknown> : undefined;
        } catch {
            return undefined;
        }
    }

    private readJokeText(payload: Record<string, unknown>): string | undefined {
        const value = payload.joke;
        if (typeof value !== 'string') {
            return undefined;
        }

        const trimmed = value.trim();
        return trimmed.length > 0 ? trimmed : undefined;
    }

    private getSearchResults(payload: Record<string, unknown>): Array<Record<string, unknown>> | undefined {
        const rawResults = payload.results;
        if (!Array.isArray(rawResults)) {
            return undefined;
        }

        return rawResults.filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null);
    }
}
