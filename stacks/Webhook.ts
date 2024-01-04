import { StackContext, use } from 'sst/constructs'
import { Function } from 'sst/constructs'

export function WebhookStack({ stack }: StackContext) {
    const videoUploadComplete = new Function(stack, 'video-upload-complete', {
        runtime: 'nodejs18.x',
        handler: 'libs/functions/src/webhook/muxWebhook.handler',
        url: true,
    })

    stack.addOutputs({
        videoUploadComplete: videoUploadComplete.url,
    })

    return {
        videoUploadComplete,
    }
}
