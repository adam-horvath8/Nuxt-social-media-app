const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const foundLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: userId,
          postId: postId,
        },
      },
    });

    if (!foundLike) {
      const newLike = await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
      res.status(200).json({ message: "Like added", like: newLike, isLiked: true });
    } else {
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId: userId,
            postId: postId,
          },
        },
      });
      res.status(200).json({ message: "Like removed", isLiked: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/check", async (req, res) => {
  try {
    const { userId, postId } = req.query;

    if (!userId || !postId) {
      return res.status(400).json({ error: "Missing userId or postId" });
    }

    const like = await prisma.like.findFirst({
      where: {
        AND: [{ userId: userId }, { postId: postId }],
      },
    });

    if (like) {
      res.json({ isLiked: true });
    }
    if (!like) {
      res.json({ isLiked: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
