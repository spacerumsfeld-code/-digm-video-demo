import crypto from 'crypto'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { Bucket } from 'sst/node/bucket'

export const handler = async (event: any) => {
    const command = new PutObjectCommand({
        ACL: 'public-read',
        Key: crypto.randomUUID(),
        Bucket: Bucket.storage.bucketName,
    })

    let presignedUrl
    try {
        presignedUrl = await getSignedUrl(new S3Client({}), command)
    } catch (e) {
        console.log(e)
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            url: presignedUrl
        }),
      };
}
