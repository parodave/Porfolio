import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3Client from './s3Client';

const bucket = process.env.AWS_S3_BUCKET as string;

export async function uploadFile(
  key: string,
  body: Buffer | Uint8Array | Blob | string,
  contentType?: string
): Promise<void> {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
  });

  await s3Client.send(command);
}

export function getFileUrl(key: string): string {
  return `https://${bucket}.s3.amazonaws.com/${key}`;
}
