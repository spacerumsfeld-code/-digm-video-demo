import { VideoService } from '../../../core/src/video.service';

export const handler = async (event: any) => {
  const s3Record = event.Records[0].s3;
  const key = s3Record.object.key;
  const bucket = s3Record.bucket.name;
  const bucketUrl = `https://${bucket}.s3.amazonaws.com/${key}`;

  /** Direct MUX to encode the video. */
  const videoService = new VideoService();
  try {
    await videoService.uploadVideoToMux({ s3AssetId: key, bucketUrl });
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }

  return {
    statusCode: 200,
    message: `MUX encoding started for ${key}`,
  };
};
