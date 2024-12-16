const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Conversation extends Model {
    static associate(models) {
      // Una conversación pertenece a dos usuarios
      this.belongsTo(models.User, { foreignKey: "user1Id", as: "user1" });
      this.belongsTo(models.User, { foreignKey: "user2Id", as: "user2" });

      // Una conversación puede tener muchos mensajes
      this.hasMany(models.Message, {
        foreignKey: "uidConversation",
        as: "messages",
      });
    }
  }

  Conversation.init(
    {
      uid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
    },

    {
      sequelize,
      modelName: "Conversation",
      tableName: "conversations",
      timestamps: true, // Agrega automáticamente createdAt y updatedAt
    }
  );

  return Conversation;
};