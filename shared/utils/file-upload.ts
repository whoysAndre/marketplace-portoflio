import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

interface UploadResponse {
  success: boolean;
  result?: UploadApiResponse;
  error?: any;
}

export const fileUpload = async (fileBuffer: Buffer): Promise<string> => {
  try {
    const uuidFileName = uuidv4();

    const uploadResult = await new Promise<UploadResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: 'image',
              public_id: uuidFileName,
              folder: 'nuxt-uploads',
            },
            (err, result) => {
              if (err) {
                console.error('Cloudinary error:', err);
                return reject({ success: false, error: err });
              }
              return resolve({ success: true, result });
            }
          )
          .end(fileBuffer);
      }
    );

    if (!uploadResult.success || !uploadResult.result) {
      throw new Error('No se pudo subir la imagen');
    }

    const cloudinaryPublicId = uploadResult.result.public_id;

    const optimizeUrl = cloudinary.url(cloudinaryPublicId, {
      fetch_format: 'auto',
      quality: 'auto',
      width: 600,
      height: 400,
      crop: 'limit',
    });

    return optimizeUrl;

  } catch (error) {
    console.error('Error in fileUpload:', error);
    throw new Error('Error al procesar el archivo');
  }
};