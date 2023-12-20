import { StackContext, Config } from 'sst/constructs'

export function SettingsStack({ stack }: StackContext) {
    const settings = {
        MUX_TOKEN_ID: new Config.Secret(stack, 'MUX_TOKEN_ID'),
        MUX_TOKEN_SECRET: new Config.Secret(stack, 'MUX_TOKEN_SECRET')
    }

    return settings
}
