const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const cloudinary = require("../cloud");

const prisma = new PrismaClient();

router.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

router.post("/", async (req, res) => {
  const { text, userId, replyToId } = req.body;

  try {
    let imageSrc;

    if (req.files) {
      const image = req.files.image; // 'image' is the name of the input field

      // Upload the image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(
        image.tempFilePath
      );
      imageSrc = uploadResponse.url;
    }

    // Now save the post with the image URL
    const newPost = await prisma.post.create({
      data: {
        text: text,
        userId: userId,
        imageSrc: imageSrc,
        replytoId: replyToId || null,
      },
      include: {
        user: {
          include: {
            profile: true, // This will include the profile data for the user
          },
        },
        likes: {
          select: {
            postId: true,
          },
        },
      },
    });

    const postWithLikes = {
      ...newPost,
      likesCount: newPost.likes.length,
    };


    res
      .status(200)
      .json({ message: "Post Successfully Added", post: postWithLikes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profile: true,
          },
        },
        likes: {
          select: {
            postId: true,
          },
        },
      },
    });

    const postsWithLikes = allPosts.map((post) => ({
      ...post,
      likesCount: post.likes.length,
    }));

    res.status(200).json(postsWithLikes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/comments/count/:postId", async (req, res) => {
  const postId = req.params.postId;

  try {
    const commentsCount = await prisma.post.count({
      where: {
        replytoId: postId,
      },
    });

    res.status(200).json({ count: commentsCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
