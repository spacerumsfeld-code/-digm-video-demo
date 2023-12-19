Goal: Spin up a demo of MUX, with an attractive frontend to display the full flow and easy infra with SST.

1. Next project.
2. Tailwind templates for frontend.
3. Simple Next lambdas (/api) for server functionality
4. S3 bucket with lambda handler for file upload event.
   --if video file, get the file location and send to MUX for processing
5. Webhook lambda that will receive confirmation that video is done.
6. What will this lambda do? hmm good question. I'd say we just write the url to a single table.

we'll have topnav and side nav for fun, but the sole functional page will be the one where we upload vidoes.