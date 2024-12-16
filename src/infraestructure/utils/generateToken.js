const jwt = require("jsonwebtoken");
const config = require("../config/config");

const generateToken = (user, time) => {
  const token = jwt.sign(
    { uid: user.uid, nombre: user.name },
    config.JWT_SECRET,
    { expiresIn: time }
  );
  return token;
};

module.exports = generateToken;
