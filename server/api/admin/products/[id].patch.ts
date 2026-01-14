import { z } from "zod"

const schemaProduct = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  images: z.array(z.string().url()).min(1),
  tags: z.string().min(1).trim(),
  is_active: z.boolean().optional(), // 👈 Cambiado a is_active
});

export default defineEventHandler(async (event) => {
  try {
    
    const id = parseInt(getRouterParam(event, 'id')!);

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'ID de producto requerido'
      });
    }

    const { user } = await requireUserSession(event);
    const { name, ...rest } = await readValidatedBody(event, schemaProduct.parse);

    // Verificar que el producto existe y pertenece al usuario
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      throw createError({
        statusCode: 404,
        message: 'Producto no encontrado'
      });
    }

    if (existingProduct.userId !== user.id) {
      throw createError({
        statusCode: 403,
        message: 'No tienes permiso para editar este producto'
      });
    }

    const slug = name.toLowerCase().replaceAll(' ', '_');
    const tagsArr = rest.tags.toLowerCase().split(',').map(tag => tag.trim());

    // Actualizar producto
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        description: rest.description,
        tags: tagsArr,
        images: rest.images,
        price: rest.price,
        ...(rest.is_active !== undefined && { is_active: rest.is_active })
      }
    });

    return {
      message: 'Producto actualizado exitosamente',
      product: updatedProduct
    };

  } catch (error: any) {
    console.error('Error updating product:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error al actualizar el producto'
    });
  }
});