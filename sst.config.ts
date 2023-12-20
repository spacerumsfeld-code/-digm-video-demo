import { SSTConfig } from "sst";
import { SettingsStack } from './stacks/Settings';
import { BucketStack } from   "./stacks/Bucket";
import { APIStack } from "./stacks/API";
import { TableStack } from "./stacks/Table";
import { WebhookStack } from "./stacks/Webhook";

export default {
  config(_input) {
    return {
      name: "mux-demo",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(SettingsStack)
    app.stack(BucketStack)
    app.stack(TableStack)
    app.stack(WebhookStack)
    app.stack(APIStack);
  }
} satisfies SSTConfig;
