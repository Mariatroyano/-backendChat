const express = require("express");
const router = express.Router();
const MessageRepository = require("../out/MessageRepository");
const Message = new MessageRepository();
router.post("/send", async (req, res) => {
  try {
    const { uidConversation, content, senderId } = req.body;
    // console.log(uidConversation, content, senderId);
    const message = await Message.create(uidConversation, content, senderId);
    res.json(message);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "error al enviar mensaje", res: error });
  }
});
router.post("/get/all", async (req, res) => {
  try {
    const { uidConversation } = req.body;
    const messages = await Message.getAll(uidConversation);
    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "error al obtener mensajes", res: error });
  }
});
module.exports = router;
