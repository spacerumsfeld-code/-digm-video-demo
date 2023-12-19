import { Bucket, StackContext } from 'sst/constructs'
import * as cdk from 'aws-cdk-lib'

export const BucketStack = ({ stack }: StackContext) => {
    const bucket = new Bucket(stack, 'storage', {
        cdk: {
            bucket: {
                autoDeleteObjects: false,
                removalPolicy: cdk.RemovalPolicy.DESTROY,
            },
        },
        notifications: {
            processVideo: {
              function: {
                handler: "packages/functions/src/processVideo.main",
              },
              events: ["object_created"],
            },
          },
    })

    return {
        bucket,
    }
}
