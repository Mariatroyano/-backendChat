const express = require("express");
const router = express.Router();
const UserRepository = require("../out/UserRepository");
const User = new UserRepository();
const jwt = require("jsonwebtoken");
const config = require("../../../../infraestructure/config/config");
const {
  User: UserModel,
  FriendsRequest: FriendsRequestModel,
} = require("../../../../infraestructure/config/dataBase");
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
    const time = 300;
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
    const { name, uid } = req.body;

    // Obtener todos los usuarios
    const users = await User.getAll();
    const usersClient = users.filter((user) =>
      user.dataValues.name.includes(name)
    );

    // Formatear los usuarios encontrados
    const usersClient2 = usersClient.map((user) => ({
      name: user.dataValues.name,
      email: user.dataValues.email,
      uid: user.dataValues.uid,
    }));

    // Obtener todas las solicitudes de amistad enviadas por el usuario actual
    const friendsRequest = await FriendsRequestModel.findAll({
      where: { userSend: uid },
    });

    // Formatear los datos con la verificación de solicitud
    const usersC = usersClient2.map((user) => {
      const hasRequest = friendsRequest.find(
        (request) => request.userRejects === user.uid // Comparamos con `userReceived`
      );
      return {
        ...user,
        solicitud: hasRequest
          ? {
              state: hasRequest.state,
              uid: hasRequest.uid,
              userSend: hasRequest.userSend,
            }
          : false, // Agregamos la información de la solicitud
      };
    });

    // Responder con los usuarios procesados
    res.json(usersC);
  } catch (error) {
    console.error(error);
    res.json({ error: "Error al obtener usuarios" });
  }
});

router.post("/verificar", async (req, res) => {
  try {
    // const veryfyUserExist = await User.veryfyUserExist(req.params.name);
    const { name, email } = req.body;
    const veryfyUserExist = await User.veryfyUserExist(name, email);
    res.json(veryfyUserExist);
  } catch (error) {
    res.status(404).json({ error: "error al verificar nombre" });
  }
});

router.post("/verify-token", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ mensaje: "Token no proporcionado" });
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ mensaje: "Token no válido" });
    jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {
      if (err)
        return res.status(403).json({ mensaje: "Token inválido o expirado" });
      const usuario = await UserModel.findByPk(decoded.uid);
      if (!usuario)
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      const now = Math.floor(Date.now() / 1000);
      const expiresIn = decoded.exp - now;

      if (expiresIn <= 0)
        return res.status(403).json({ mensaje: "Token expirado" });

      const { name, email, uid, friends } = usuario;
      return res.status(200).json({
        mensaje: "Token válido",
        datos: { name, email, uid, friends },
        expiresIn, // Tiempo restante en segundos
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error interno del servidor", error });
  }
});
router.post("/friends", async (req, res) => {
  try {
    const { uid } = req.body;
    const friends = await User.getFriends(uid);
    res.json(friends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error interno del servidor", error });
  }
});
router.post("/get/By/Uid", async (req, res) => {
  try {
    const { uid } = req.body;
    const user = await User.getByUid(uid);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error interno del servidor", error });
  }
});
module.exports = router;
