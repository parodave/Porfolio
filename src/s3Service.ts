import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const bucket = import.meta.env.VITE_S3_BUCKET!;
const region = import.meta.env.VITE_AWS_REGION!;
const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID!;
const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY!;

const s3 = new S3Client({
  region,
  credentials: { accessKeyId, secretAccessKey }
});

export async function uploadFile(file: File, key: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: file,
    ContentType: file.type
  });
  await s3.send(command);
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}
