import { StackContext, Table } from "sst/constructs";

export function TableStack({ stack }: StackContext) {
  const table = new Table(stack, "videos", {
    fields: {
      playbackId: "string",
      assetId: "string",
    },
    primaryIndex: { partitionKey: "playbackId" },
  });

  return { table }
}