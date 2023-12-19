import { StackContext, Table } from "sst/constructs";

export function TableStack({ stack }: StackContext) {
  // Create the table
  const table = new Table(stack, "Counter", {
    fields: {
      videoUrl: "string",
    },
    primaryIndex: { partitionKey: "videoUrl" },
  });

  return { table }
}