// infraestructura/config/sequelize.js
const { Sequelize } = require("sequelize");
const ConversationModel = require("../../modules/conversation/domain/entities/Conversation"); // Importa la función para definir el modelo
const MessageModel = require("../../modules/message/domain/entities/Menssage"); // Importa la función para definir el modelo
const UserModel = require("../../modules/user/domain/entities/User"); // Importa la función para definir el modelo
const FriendsRequestModel = require("../../modules/friend-request/domain/entities/FrinedsRequest"); // Importa la función para definir el modelo
const sequelize = new Sequelize(
  process.env.DATABASE_URL ||
    "postgres://eider:12345678@localhost:5432/proyect-chat",
  {
    dialect: "postgres",
    logging: false,
  }
);
// Inicializa los modelos
// Inicializar modelos
const models = {};
models.User = UserModel(sequelize);
models.Conversation = ConversationModel(sequelize);
models.Message = MessageModel(sequelize);
models.FriendsRequest = FriendsRequestModel(sequelize);

// Configurar asociaciones
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Sincroniza la base de datos
sequelize
  .sync()
  .then(() => console.log("Base de datos sincronizada correctamente"))
  .catch((error) =>
    console.error("Error al sincronizar la base de datos:", error)
  );
// Exporta los modelos inicializados
module.exports = { ...models, sequelize };
