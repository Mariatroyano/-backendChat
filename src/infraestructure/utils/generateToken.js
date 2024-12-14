const jwt = require("jsonwebtoken");
const config = require("../config/config");

const generateToken = (user, time) => {
  const token = jwt.sign(
    { id: user.id, nombre: user.nombre },
    config.JWT_SECRET,
    { expiresIn: time }
  );
  return token;
};

module.exports = generateToken;
