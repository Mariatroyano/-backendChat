const express = require("express");
const router = express.Router();
const NotificationRepository = require("../out/NotificationRepository");
const Notification = new NotificationRepository();
router.post("/", async (req, res) => {
  try {
    const { uid } = req.body;
    const notificationes = await Notification.getNotifications(uid);
    res.json(notificationes);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "error al enviar notificacion", res: error });
  }
});
module.exports = router;
