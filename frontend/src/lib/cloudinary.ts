import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'zqple9s3',
  api_key: process.env.CLOUDINARY_API_KEY || '557849623145733',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'ilZFJOQREHDaaHeM-OrJ7Woe9ns',
  secure: true,
});

export default cloudinary;

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  folder: string = 'general',
  resourceType: 'image' | 'raw' | 'auto' = 'auto'
): Promise<{ url: string; public_id: string; secure_url: string }> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: `govtprep/${folder}`,
          resource_type: resourceType,
        },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error('Upload to Cloudinary failed'));
          } else {
            resolve({
              url: result.url,
              public_id: result.public_id,
              secure_url: result.secure_url,
            });
          }
        }
      )
      .end(fileBuffer);
  });
}
