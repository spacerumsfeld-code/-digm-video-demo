import { VideoService } from '../../../core/src/video.service';

export const handler = async (event: any) => {
  const videoService = new VideoService();

  const s3Record = event.Records[0].s3;
  const Key = s3Record.object.key;
  const Bucket = s3Record.bucket.name;
  const bucketUrl = `https://${Bucket}.s3.amazonaws.com/${Key}`;

  try {
    await videoService.uploadVideoToMux(bucketUrl);
  } catch (error) {
    console.log('woops!')
  }

  return {
    statusCode: 200,
  }
}
