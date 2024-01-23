const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const cloudinary = require("../cloud");
const { PrismaClient } = require("@prisma/client");
const { validateToken } = require("../JWT");
const sharp = require("sharp");

const prisma = new PrismaClient();

router.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, surname, address, description, email, telNumber } = req.body;

  try {
    let profileImageSrc;

    if (req.files) {
      const image = req.files.image; // 'image' is the name of the input field

      const resizedImagePath = "./temp/resized-image.jpg";
      await sharp(image.tempFilePath).resize(400).toFile(resizedImagePath);

      // Upload the image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(resizedImagePath);
      imageSrc = uploadResponse.url;
    }

    const updatedProfile = await prisma.profile.update({
      where: { userId: userId },
      data: {
        name: name,
        surname: surname,
        address: address,
        description: description,
        email: email,
        telNumber: telNumber,
        profileImg: profileImageSrc,
      },
    });

    res
      .status(200)
      .json({ message: "Profile updated successfully", updatedProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const usersProfile = await prisma.profile.findUnique({
      where: { userId: userId },
    });
    res
      .status(200)
      .json({ message: "Profile sended successfully", usersProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
