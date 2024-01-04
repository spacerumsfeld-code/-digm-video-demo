import Mux, { type PlaybackId } from '@mux/mux-node';
import { DynamoDB } from 'aws-sdk';
import { Table } from "sst/node/table";
import { Config } from 'sst/node/config'
import { ItemList } from 'aws-sdk/clients/dynamodb';

type UploadVideoToMuxArgs = {
  s3AssetId: string;
  bucketUrl: string;
}

export class VideoService {
  private dbClient = new DynamoDB.DocumentClient();
  private videoClient = new Mux(Config.MUX_TOKEN_ID as string, Config.MUX_TOKEN_SECRET as string);

  /** Instruct MUX to encode our video at the provided URL. We also assign the asset's ID in our storage (S3 in this case)
   * to the metadata of the MUX record, which may be useful later on.
   */
  public uploadVideoToMux = async (uploadVideoToMuxArgs: UploadVideoToMuxArgs) => {
    const { s3AssetId, bucketUrl } = uploadVideoToMuxArgs;

    let assetId: string = '';
    let playbackId = {} as PlaybackId;
    try {
      const { id, playback_ids } = await this.videoClient.Video.Assets.create({
        input: `${bucketUrl}`,
        passthrough: s3AssetId,
        playback_policy: "public"
      });
      assetId = id;
      playbackId = playback_ids?.[0] as PlaybackId;
    } catch (error) {
      console.error('woops!', error)
    }

    /** Update our database with the playbackId and MUX assetId for the file. 
     * The assetId will allow us to sync CRUD operations as needed, and the the playbackId is all 
     * the frontend needs to successfully stream the asset once it is created.
     */
    try {
     await this.dbClient.put({
        TableName: Table.videos.tableName,
        Item: {
          playbackId: playbackId.id,
          assetId,
        }
      }).promise();
    } catch (error) {
      console.error('woops!', error)
    }
  }

  public getVideos = async () => {
    const videos = [];
    try {
      const { Items } = await this.dbClient.scan({
        TableName: Table.videos.tableName
      }).promise();

      videos.push(...Items as ItemList);
      return videos;
    } catch (error) {
      console.error('woops!', error)
      return []
    }
  }
}
