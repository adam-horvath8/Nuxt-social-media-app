const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const { PrismaClient } = require("@prisma/client");
const { validateToken } = require("../JWT");

const prisma = new PrismaClient();

router.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, surname, address, description } = req.body;

  try {
    let profileImageSrc;

    if (req.files) {
      const image = req.files.image; // 'image' is the name of the input field

      // Upload the image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(
        image.tempFilePath
      );
      profileImageSrc = uploadResponse.url;
    }



    const updatedProfile = await prisma.profile.update({
      where: { userId: userId },
      data: {
        name: name,
        surname: surname,
        address: address,
        description: description,
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

module.exports = router;
