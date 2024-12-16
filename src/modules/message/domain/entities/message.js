const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Message extends Model {
    static associate(models) {
      this.belongsTo(models.Conversation, {
        foreignKey: "uidConversation",
        as: "conversation",
      });

      this.belongsTo(models.User, {
        foreignKey: "uidSend",
        as: "sender",
      });
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
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Message",
      tableName: "messages",
      timestamps: true,
    }
  );

  return Message;
};