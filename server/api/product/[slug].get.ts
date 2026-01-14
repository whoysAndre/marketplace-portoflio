export default defineEventHandler(async (event) => {

  const slug = getRouterParam(event, 'slug');

  const productOriginal = await prisma.product.findUnique({
    where: {
      slug: slug,
    },
    include: {
      user: true
    }
  });




  if (!productOriginal) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
      message: `Product with slug ${slug} not found`,
      data: {
        slug,
        state: process.env.STAGE,
      },

      stack: process.env.STAGE !== 'prod' ? new Error().stack : '',
    });
  }

  const { user, ...rest } = productOriginal;

  const product = {
    ...rest,
    firstnameUser: user.firstname,
    lastnameUser: user.lastname,
    email: user.email
  }


  return product;
});