import { StackContext, use } from 'sst/constructs'
import { Function } from 'sst/constructs'

export function WebhookStack({ stack }: StackContext) {
    /** Settings */

    const videoUploadComplete = new Function(stack, 'video-upload-complete', {
        runtime: 'nodejs18.x',
        handler: 'libs/functions/src/webhooks/videoUploadComplete.handler',
        url: true,
    })
    // stripeMainWebhook.bind([
    //     DATABASE_URL,
    //     STRIPE_KEY,
    //     STRIPE_SECRET,
    //     STRIPE_MAIN_WEBHOOK_SECRET,
    //     ORDER_COMPLETE_WEBHOOK_URL,
    //     QSTASH_URL,
    //     QSTASH_TOKEN,
    // ])

    stack.addOutputs({
        videoUploadComplete: videoUploadComplete.url,
    })

    return {
        videoUploadComplete,
    }
}
