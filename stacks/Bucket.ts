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
                handler: "libs/functions/src/bucket/processVideo.handler",
              },
              events: ["object_created"],
            },
          },
    })
    bucket.attachPermissions([bucket]);

    return {
        bucket,
    }
}
