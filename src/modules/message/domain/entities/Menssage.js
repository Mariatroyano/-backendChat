const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Message extends Model {
    static associate(models) {
      // Un mensaje pertenece a una conversación
      this.belongsTo(models.Conversation, {
        foreignKey: "uidConversation",
        as: "conversation",
      });

      // Un mensaje pertenece a un usuario (el remitente)
      this.belongsTo(models.User, { foreignKey: "senderId", as: "sender" });
    }
  }

  Message.init(
    {
      uid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      state: {
        type: DataTypes.ENUM("sent", "delivered", "read"),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Message",
      tableName: "messages",
      timestamps: true, // Agrega automáticamente `createdAt` y `updatedAt`
    }
  );

  return Message;
};
