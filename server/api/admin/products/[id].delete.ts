export default defineEventHandler(async (event) => {

  const id = parseInt(getRouterParam(event, 'id')!);


  const { user } = await requireUserSession(event);

  const existing = await prisma.product.findUnique({
    where: {
      id,
      userId: user.id
    }
  });

  if (!existing) throw createError({
    status: 400,
    message: "Product not found"
  })

  await prisma.product.update({
    where: {
      id,
      userId: user.id
    },
    data: {
      is_active: false
    }
  });

  return {
    status: 200,
    message: "Producto Actualizado"
  }
});