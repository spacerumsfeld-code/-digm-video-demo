export const handler = (event: any) => {
    const eventBody = JSON.parse(event.body);
    const eventType = eventBody.type;
    
    console.info('Mux webhook event type', eventType)
    switch (eventType) {
        case 'video.asset.ready':
            console.info('video.asset.ready')
            break;
        default: 
            console.info('default')
            break;
    }

    return {
        status: 200,
    }
}

/** Sample MUX Event.
 * We will want to make a SWITCH statement with different logic for all the relevant events.
 * https://docs.mux.com/guides/listen-for-webhooks
 */
// {
//     "type": "video.asset.ready",
//     "object": {
//       "type": "asset",
//       "id": "0201p02fGKPE7MrbC269XRD7LpcHhrmbu0002"
//     },
//     "id": "3a56ac3d-33da-4366-855b-f592d898409d",
//     "environment": {
//       "name": "Demo pages",
//       "id": "j0863n"
//     },
//     "data": {
//       "tracks": [
//         {
//           "type": "video",
//           "max_width": 1280,
//           "max_height": 544,
//           "max_frame_rate": 23.976,
//           "id": "0201p02fGKPE7MrbC269XRD7LpcHhrmbu0002",
//           "duration": 153.361542
//         },
//         {
//           "type": "audio",
//           "max_channels": 2,
//           "max_channel_layout": "stereo",
//           "id": "FzB95vBizv02bYNqO5QVzNWRrVo5SnQju",
//           "duration": 153.361497
//         }
//       ],
//       "status": "ready",
//       "max_stored_resolution": "SD",
//       "max_stored_frame_rate": 23.976,
//       "id": "0201p02fGKPE7MrbC269XRD7LpcHhrmbu0002",
//       "duration": 153.361542,
//       "created_at": "2018-02-15T01:04:45.000Z",
//       "aspect_ratio": "40:17"
//     },
//     "created_at": "2018-02-15T01:04:45.000Z",
//     "accessor_source": null,
//     "accessor": null,
//     "request_id": null
//   }

