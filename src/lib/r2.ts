import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { config } from "@/lib/config";

const R2_Client = new S3Client({
    region: "auto",
    endpoint: `https://${config.r2AccountId}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: config.r2AccessKeyId,
        secretAccessKey: config.r2SecretAccessKey,
    },
});


export const fetchObject = async (
    module: string,
    local: string,
    name: string
): Promise<[boolean, string]> => {
    const fileKey = module + '/' + local + '/' + name + '.mdx';
    try {
        const params = {
            Bucket: 'game',
            Key: fileKey
        };
        const command = new GetObjectCommand(params);
        const data = await R2_Client.send(command);
        if (data.Body) {
            if (data.Body instanceof Uint8Array) {
                const bodyContents = new TextDecoder().decode(data.Body);
                return [true, bodyContents];
            } else if (data.Body instanceof ReadableStream) {
                const reader = data.Body.getReader();
                const chunks = [];
                let result;
                while (!(result = await reader.read()).done) {
                    chunks.push(result.value);
                }
                const bodyContents = new TextDecoder().decode(Buffer.concat(chunks));
                return [true, bodyContents];
            }
        }
        return [true, ''];
    } catch (error: any) {
        if (error?.name === 'NoSuchKey') {
            console.log('The fileKey does not exist:', fileKey);
        } else {
            console.error('Failed to fetch the object:', fileKey);
        }
        return [false, ''];
    }
}