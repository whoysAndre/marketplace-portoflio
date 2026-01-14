import { z } from "zod"

const schemaProduct = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  images: z.array(z.string().url()).min(1),
  tags: z.string().min(1).trim(),
});

export default defineEventHandler(async (event) => {
  
  const { user } = await requireUserSession(event);
  const { name, ...rest } = await readValidatedBody(event, schemaProduct.parse);

  const slug = name.toLowerCase().replaceAll(' ', '_');
  const tagsArr = rest.tags.toLowerCase().split(',').map(tag => tag.trim());

  const product = await prisma.product.create({
    data: {
      name,
      slug,
      description: rest.description,
      userId: user.id,
      tags: tagsArr,
      images: rest.images,
      price: rest.price
    }
  });

  return {
    message: 'Product created successfully',
    product: product,
  }
});