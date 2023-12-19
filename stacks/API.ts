import { StackContext, Api } from "sst/constructs";

export function API({ stack }: StackContext) {

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [],
      },
    },
    routes: {
      "GET /video-urls": "packages/functions/src/videoUrlsGet.handler",
      "POST /upload-video": "packages/functions/src/videoPost.handler",
    },
    cors: {
      allowCredentials: true,
      allowHeaders: ['Content-Type', 'Authorization'],
      allowMethods: ['ANY'],
      allowOrigins: [
          'http://localhost:3000',
          'https://backcastmarket-dev.com, https://backcastmarket.com',
      ],
  },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
