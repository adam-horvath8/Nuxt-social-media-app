import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { username, password } = await readBody(event);

    const hash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { username: username, password: hash },
    });

    return {
      message: "User Created",
    };
  } catch (err) {
    return { error: err };
  }
});
