import Mux, { PlaybackId } from '@mux/mux-node';
import { DynamoDB } from 'aws-sdk';
import { Table } from "sst/node/table";
import { Config } from 'sst/node/config'
import { ItemList } from 'aws-sdk/clients/dynamodb';

export class VideoService {
    private dbClient = new DynamoDB.DocumentClient();
    private videoClient = new Mux(Config.MUX_TOKEN_ID as string, Config.MUX_TOKEN_SECRET as string);

    public uploadVideoToMux = async (bucketUrl: string) => {
        const { id: assetId, playback_ids } = await this.videoClient.Video.Assets.create({
            input: `${bucketUrl}`,
            playback_policy: "public"
          });
        const playbackIds = playback_ids as PlaybackId[]
        
        try {
          await this.dbClient.put({
            TableName: Table.videos.tableName,
            Item: {
              playbackId: playbackIds[0].id,
              assetId,
            }
          }).promise();
        } catch (error) {
          console.log('woops!')
        }
    }

    public getVideos = async () => {
        const videos = [];
        console.log('hello?')
        try {
            const { Items } = await this.dbClient.scan({
                TableName: Table.videos.tableName
            }).promise();
            videos.push(...Items as ItemList);
            console.log('Videos in the video service', videos);
        } catch (error) {
            console.log('woops!')
        }
        return videos;
    }

    // delete asset

    // update asset

    // blah blah blah
}
