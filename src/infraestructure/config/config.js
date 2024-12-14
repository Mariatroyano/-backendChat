// infraestructura/configuracion/configuracionGeneral.js

// Configuración general
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "mi_clave_secreta", // Clave secreta para los tokens JWT
  PORT: process.env.PORT || 3000, // Puerto para el servidor
  SALT_ROUNDS: 10,
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgres://user:password@localhost:5432/mi_base_de_datos", // URL de la base de datos
};
