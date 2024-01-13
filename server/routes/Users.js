const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { createTokens } = require("../JWT");

const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const hash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        username: username,
        password: hash,
      },
    });
    res.json("USER REGISTERED");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) {
      return res.status(400).json({ error: "User doesn't exists" });
    }

    const dbPassword = user.password;
    const match = await bcrypt.compare(password, dbPassword);

    if (!match) {
      return res
        .status(400)
        .json({ error: "Wrong username and password combination" });
    } else {
      const accessToken = createTokens(user);

      console.log(accessToken);

      res.cookie("access-token", accessToken, {
        maxAge: 86400000,
        httpOnly: true,
      });

      res.json({ userInfo: { id: user.id, username: user.username } });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/logout", async (req, res) => {
  try {
    res.cookie("access-token", "", {
      maxAge: 1,
    });
    res.json({ message: "Logged out" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        profile: true,
      },
    });
    if (allUsers) {
      res.json(allUsers);
    } else {
      res.status(400).json({ error: "Problem finding data" });
    }
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
