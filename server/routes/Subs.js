const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    // Replace 'subscriberId' with the actual subscriber's ID
    const subscriberId = req.query.userId;

    console.log(subscriberId);

    if (!subscriberId) {
      return res.status(400).json({ error: "Missing subscriberId" });
    }

    const subscribedPosts = await prisma.subscription.findMany({
      where: {
        subscriberId: subscriberId,
      },
      include: {
        subscribedTo: {
          include: {
            posts: {
              include: {
                user: {
                  select: {
                    id: true,
                    username: true,
                    profile: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Flatten the posts array
    const posts = subscribedPosts.flatMap(
      (subscription) => subscription.subscribedTo.posts
    );

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  const { subscriberId, subscribedToId } = req.body;

  if (!subscriberId || !subscribedToId) {
    return res
      .status(400)
      .json({ error: "Missing subscriber or subscribedTo" });
  }

  try {
    const subscription = await prisma.subscription.create({
      data: {
        subscriberId: subscriberId,
        subscribedToId: subscribedToId,
      },
    });

    res.json(subscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/", async (req, res) => {
  const { subscriberId, subscribedToId } = req.body;

  if (!subscriberId || !subscribedToId) {
    return res
      .status(400)
      .json({ error: "Missing subscriber or subscribedTo IDs" });
  }

  try {
    const subscription = await prisma.subscription.deleteMany({
      where: {
        subscriberId: subscriberId,
        subscribedToId: subscribedToId,
      },
    });

    if (subscription.count > 0) {
      res.json({ message: "Subscription deleted successfully" });
    } else {
      res.status(404).json({ error: "Subscription not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/check", async (req, res) => {
  try {
    const { subscriberId, subscribedToId } = req.query;

    if (!subscriberId || !subscribedToId) {
      return res.status(400).json({ error: "Missing subscriberId or subscribedToId" });
    }

    const subscription = await prisma.subscription.findFirst({
      where: {
        AND: [
          { subscriberId: subscriberId },
          { subscribedToId: subscribedToId }
        ]
      }
    });

    if(subscription){
    res.json({ isSubscribed: true });
    }
    if(!subscription){
    res.json({ isSubscribed: false });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
