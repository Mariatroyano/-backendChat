const express = require("express");
const router = express.Router();
const ConversationRepository = require("../out/ConversationRepository");
const Conversation = new ConversationRepository();
router.post("/get/users", async (req, res) => {
  try {
    const { user1Id, user2Id } = req.body;
    const conversations = await Conversation.getConversations(user1Id, user2Id);
    res.json(conversations);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "error al enviar notificacion", res: error });
  }
});
module.exports = router;
