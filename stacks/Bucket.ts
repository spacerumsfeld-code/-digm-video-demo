import { Bucket, StackContext, use } from 'sst/constructs'
import * as cdk from 'aws-cdk-lib'
import { SettingsStack } from './Settings';
import { TableStack } from './Table';

export const BucketStack = ({ stack }: StackContext) => {
  /** Settings */
  const { table } = use(TableStack);
  const { MUX_TOKEN_ID, MUX_TOKEN_SECRET } = use(SettingsStack);

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
                bind: [table, MUX_TOKEN_ID, MUX_TOKEN_SECRET],
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
