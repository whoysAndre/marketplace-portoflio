export default defineEventHandler(async (event) => {

  const session = await requireUserSession(event);
  console.log(session.user.lastname);
  const messages = await prisma.messages.findMany({
    where: {
      publicator_id: session.user.id
    }
  })

  return {
    messages
  }
});