import { StackContext, Api, use } from "sst/constructs";
import { BucketStack } from "./Bucket";
import { SettingsStack } from "./Settings";

export function APIStack({ stack }: StackContext) {
  /** Imports */
  const { bucket } = use(BucketStack);
  const { MUX_TOKEN_ID, MUX_TOKEN_SECRET } = use(SettingsStack);

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [bucket, MUX_TOKEN_ID, MUX_TOKEN_SECRET],
      },
    },
    routes: {
      "GET /presigned-url": "libs/functions/src/api/presignedUrlGet.handler",
      "GET /video-urls": "libs/functions/src/api/videoUrlsGet.handler"
    },
    cors: {
      allowHeaders: ['*'],
      allowMethods: ['ANY'],
      allowOrigins: [
          'http://localhost:3000',
      ],
  },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return { api }
}
