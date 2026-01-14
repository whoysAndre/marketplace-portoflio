import { z } from "zod"



const schemaMessage = z.object({
  nameProduct: z.string().min(1),
  quantity: z.number().min(0),
  price: z.number().min(0),
  buyerId: z.number().min(0),
  publicatorId: z.number().min(0),
});


export default defineEventHandler(async (event) => {


  const body = await readValidatedBody(event, schemaMessage.parse);
  await requireUserSession(event);

  await prisma.messages.create({
    data: {
      name_product: body.nameProduct,
      price: body.price,
      quantity: body.quantity,
      buyer_id: body.buyerId,
      publicator_id: body.publicatorId
    }
  })

  return {
    status: true
  }
});