
export default defineEventHandler(async (event) => {
  try {
    
    // Verificar autenticación
    const { user } = await requireUserSession(event);

    // Leer archivos del FormData
    const form = await readMultipartFormData(event);

    if (!form || form.length === 0) {
      throw createError({
        statusCode: 400,
        message: 'No se recibieron archivos'
      });
    }

    // Filtrar solo los archivos de imagen
    const imageFiles = form.filter(file => file.name === 'images' && file.type?.startsWith('image/'));

    if (imageFiles.length === 0) {
      throw createError({
        statusCode: 400,
        message: 'No se encontraron imágenes válidas'
      });
    }

    const uploadPromises = imageFiles.map(async (file) => {
      if (!file.data) {
        throw new Error('Archivo sin datos');
      }
      return await fileUpload(file.data);
    });

    const imageUrls = await Promise.all(uploadPromises);

    return {
      success: true,
      imageUrls,
      message: `${imageUrls.length} imagen(es) subida(s) exitosamente`
    };

  } catch (error: any) {
    console.error('Error uploading images:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Error al subir las imágenes'
    });
  }
});