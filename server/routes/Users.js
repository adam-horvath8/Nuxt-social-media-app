const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { sign } = require("jsonwebtoken");

const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      username: username,
      password: hash,
    },
  });
  res.json("USER REGISTERED");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) {
      return res.json({ error: "User doesn't exist" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ error: "Wrong username and password combination" });
    }

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    res.json(accessToken);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
