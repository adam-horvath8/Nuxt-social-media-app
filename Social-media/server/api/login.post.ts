import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { username, password } = await readBody(event);

    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) return { error: "User doesn't exist" };

    const dbPassword = user.password;

    const match = await bcrypt.compare(password, dbPassword);

    if (!match) {
      return {
        error: "Wrong Username and Password Combination",
      };
    } else {
      return {
        message: "Loged In",
      };
    }
  } catch (error) {
    console.log(error);
  }
});
