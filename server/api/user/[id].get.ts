export default defineEventHandler(async (event) => {

  const id = parseInt(getRouterParam(event, 'id')!);

  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if (!user) throw createError({
    status: 400,
    message: "User Not found"
  })

  return {
    user
  }
});