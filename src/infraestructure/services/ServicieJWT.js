// dominio/servicios/ServicioJWT.js

const jwt = require("jsonwebtoken");
const config = require("../../infraestructure/config/config");

class ServicioJWT {
  constructor() {
    this.claveSecreta = config.JWT_SECRET || "mi_clave_secreta"; // Clave secreta
  }

  generar(id, time) {
    const token = jwt.sign({ id }, config.JWT_SECRET, { expiresIn: time });
    return token;
  }

  verificar(token) {
    try {
      return jwt.verify(token, this.claveSecreta);
    } catch (error) {
      throw new Error("Token no válido");
    }
  }
}

module.exports = ServicioJWT;
