import { StackContext, Config } from 'sst/constructs'

export function ConfigStack({ stack }: StackContext) {
    const settings = {
        WEB_URL: new Config.Secret(stack, 'WEB_URL'),
    }

    return settings
}
