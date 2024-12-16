const express = require("express");
const repository = require("../out/userRespository");
const userRespository = new repository();
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>Hello world user</h1>");
});
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userRespository.create({ name, email, password });
    if (!user) throw new Error("no se pudo crear el usuario");

    res.status(200).json({ res: user });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
