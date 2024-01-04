import { StackContext, Api, use } from "sst/constructs";
import { BucketStack } from "./Bucket";
import { SettingsStack } from "./Settings";
import { TableStack } from "./Table";

export function APIStack({ stack }: StackContext) {
  const { bucket } = use(BucketStack);
  const { table } = use(TableStack);
  const { MUX_TOKEN_ID, MUX_TOKEN_SECRET } = use(SettingsStack);

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        runtime: 'nodejs18.x',
        bind: [bucket, table, MUX_TOKEN_ID, MUX_TOKEN_SECRET],
      },
    },
    routes: {
      "GET /presigned-url": "libs/functions/src/api/presignedUrlGet.handler",
      "GET /video-urls": "libs/functions/src/api/videoUrlsGet.handler"
    },
    cors: {
      allowHeaders: ['*'],
      allowMethods: ['ANY'],
      allowOrigins: ['https://*.vercel.app'],
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return { api }
}
