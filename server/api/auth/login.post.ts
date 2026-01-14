import bcrypt from "bcryptjs";
import { z } from "zod";

const bodySchema = z.object({
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

  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });


  if (!user) {
    throw createError({
      status: 401,
    });
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);

  if (!isValidPassword) {
    throw createError({
      statusCode: 401,
      message: 'Bad credentials (password)',
    });
  }

  const userSession = {
    id: user.id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    roles: user.roles
  }

  await setUserSession(event, {
    user: userSession,
    loggedInAt: new Date()
  });


  return {
    message: "Login Successfull",
    user: userSession
  }
});