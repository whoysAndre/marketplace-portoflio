export default defineEventHandler(async (event) => {

  const { user } = await requireUserSession(event);

  const products = await prisma.product.findMany({
    where: {
      userId: user.id
    }
  });
  
  const productsMapper = products.map(product => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    price: product.price,
    images: product.images,
    tags: product.tags,
    isActive: product.is_active
  }))

  return {
    products: productsMapper
  }
})
