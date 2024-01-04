# Mux Video Demo

This repository contains a video streaming application built with Next.js, Serverless Stack (SST), and Mux. The application allows users to upload videos, which are then processed and streamed using Mux.

## Structure

The repository is structured into two main directories: `apps` and `libs`.

- `apps`: Contains the Next.js client application.
- `libs`: Contains the core business logic and AWS Lambda functions.

## Client Application

The client application is a Next.js project bootstrapped with `create-next-app`. It uses Tailwind CSS for styling. The main page of the application is located at `apps/client/src/app/page.tsx`.

## Serverless Functions

The serverless functions are located in the `libs/functions` directory. They are written in TypeScript and deployed using SST. The functions interact with AWS services such as S3 and DynamoDB, as well as the Mux API.

The main serverless functions include:

- `libs/functions/src/api/presignedUrlGet.handler`: Generates a presigned URL for uploading videos to S3.
- `libs/functions/src/api/videoUrlsGet.handler`: Retrieves the URLs of uploaded videos from the database.
- `libs/functions/src/bucket/processVideo.handler`: Processes uploaded videos and sends them to Mux for streaming.
- `libs/functions/src/webhook/muxWebhook.handler`: Handles webhook events from Mux.

## Deployment

The application is deployed using SST. The deployment configuration is defined in `sst.config.ts`. The application includes several AWS CloudFormation stacks, each responsible for a specific part of the infrastructure:

- `stacks/Settings.ts`: Contains application settings.
- `stacks/Table.ts`: Sets up the DynamoDB table.
- `stacks/Bucket.ts`: Sets up the S3 bucket for video uploads.
- `stacks/Webhook.ts`: Sets up the webhook for Mux events.
- `stacks/API.ts`: Sets up the API Gateway for the application.

## Further Reading

For more information about Next.js, check out the [Next.js Documentation](https://nextjs.org/docs) or the interactive [Next.js tutorial](https://nextjs.org/learn).

For more information about SST, check out the [SST Documentation](https://docs.serverless-stack.com/).

For more information about Mux, check out the [Mux Documentation](https://docs.mux.com/).
