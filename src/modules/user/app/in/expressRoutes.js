const express = require("express");
const router = express.Router();
const UserRepository = require("../out/UserRepository");
const User = new UserRepository();
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const time = 0.5;
    const token = await User.create({
      name,
      email,
      password,
      time,
    });
    res
      .cookie("access_token", token, {
        maxAge: time * 60 * 1000,
      })
      .status(200)
      .json({ token });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ mensaje: error.message, res: "error al crear el usuario" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const time = 0.5;
    const token = await User.login(email, password, time);
    res
      .cookie("access_token", token, {
        maxAge: time * 60 * 1000,
      })
      .status(200)
      .json({ token });
  } catch (error) {
    res.status(401).json({ mensaje: error.message });
  }
});
router.post("/friends/search", async (req, res) => {
  try {
    const { name } = req.body;
    const users = await User.getAll();
    const usersClient = users.filter((user) =>
      user.dataValues.name.includes(name)
    );
    const usersClient2 = usersClient.map((user) => ({
      name: user.dataValues.name,
      email: user.dataValues.email,
      uid: user.dataValues.uid,
    }));
    res.json(usersClient2);
  } catch (error) {
    console.log(error);
    res.json({ error: "error al obtner usuarios" });
  }
});
router.post("/verificar", async (req, res) => {
  try {
    // const veryfyUserExist = await User.veryfyUserExist(req.params.name);
    const { name, email } = req.body;
    const veryfyUserExist = await User.veryfyUserExist(name, email);
    console.log(veryfyUserExist);
    res.json(veryfyUserExist);
  } catch (error) {
    res.status(404).json({ error: "error al verificar nombre" });
  }
});
module.exports = router;
