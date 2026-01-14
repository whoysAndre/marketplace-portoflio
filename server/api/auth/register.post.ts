import bcrypt from "bcryptjs";
import { z } from "zod";

const bodySchema = z.object({
  firstname: z.string().trim().min(1),
  lastname: z.string().trim().min(1),
  email: z
    .string()
    .toLowerCase()
    .trim()
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Email is not valid',
    }),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});


export default defineEventHandler(async (event) => {

  const { email, firstname, lastname, password } = await readValidatedBody(event, bodySchema.parse);

  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (existingUser) throw createError({
    status: 401,
    message: 'User Already exist',
  });


  const passwordHashed = bcrypt.hashSync(password, 10);

  await prisma.user.create({
    data: {
      email,
      firstname,
      lastname,
      password: passwordHashed,
      roles: ['user']
    }
  })

  return {
    message: "User created"
  }
});