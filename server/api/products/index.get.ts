export default defineEventHandler(async (event) => {

  const query = getQuery(event);
  let limit = parseInt(query.limit as string);
  let offset = parseInt(query.offset as string);

  // Validaciones
  if (isNaN(limit) || limit <= 1) limit = 10;
  if (isNaN(offset) || offset < 0) offset = 0;

  const products = await prisma.product.findMany({
    include: {
      user: true
    },
    take: limit,
    skip: offset,
  });

  const plainProducts = products.map(product => {
    const { user, ...rest } = product;
    return {
      email: user.email,
      firstnameUser: user.firstname,
      lastnameUser: user.lastname,
      ...rest
    }

  })



  const total = await prisma.product.count();
  const totalPages = Math.ceil(total / limit);

  return {
    plainProducts,
    totalPages,
    currentPage: offset / limit + 1,
    perPage: limit,
    total,
  };
});