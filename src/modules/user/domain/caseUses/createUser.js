// dominio/casosDeUso/CrearTarea.js

const ServicioJWT = require("../../../../infraestructure/services/ServicieJWT");

// const Task = require("../entities/Task");
class crearUsuario {
  constructor(repositorioUsuario) {
    this.repositorioUsuario = repositorioUsuario; // Aquí se inyecta el repositorio
    this.newService = new ServicioJWT();
  }

  async ejecutar(nombre, correo, contrasena, timeMinutos) {
    const tarea = {
      nombre,
      correo,
      contrasena,
    };
    const usuarioCreado = await this.repositorioUsuario.guardar(tarea);

    const token = this.newService.generar(usuarioCreado.id, `${timeMinutos}m`);

    return token;
  }
}

module.exports = crearUsuario;
