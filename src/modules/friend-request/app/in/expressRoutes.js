const express = require("express");
const router = express.Router();
const SequelizeFriendsRequest = require("../out/SequelizeFriendsRequest");
const FriendsRequest = new SequelizeFriendsRequest();

router.post("/request", async (req, res) => {
  try {
    const { userSend, userRejects } = req.body;
    const friendsRequest = await FriendsRequest.create(userSend, userRejects);
    res.json(friendsRequest);
  } catch (error) {
    console.log(error);
    res.status(401).json(false);
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { uid } = req.body;
    const friendsRequest = await FriendsRequest.delete(uid);
    res.json(friendsRequest ? true : false);
  } catch (error) {
    console.log(error);
    res.status(401).json(false);
  }
});

router.post("/request/accept", async (req, res) => {
  try {
    const { uid } = req.body;
    const friendsRequest = await FriendsRequest.accept(uid);
    res.json({ friendsRequest });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "error al enviar solicitud", res: error });
  }
});

router.post("/request/reject", async (req, res) => {
  try {
    const { uid } = req.body;
    const friendsRequest = await FriendsRequest.reject(uid);
    res.json({ friendsRequest });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "error al enviar solicitud", res: error });
  }
});
module.exports = router;
