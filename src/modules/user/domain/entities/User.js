const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Un usuario puede tener muchas conversaciones iniciadas o recibidas
      this.hasMany(models.Conversation, {
        foreignKey: "user1Id",
        as: "conversationsInitiated",
      });
      this.hasMany(models.Conversation, {
        foreignKey: "user2Id",
        as: "conversationsReceived",
      });

      // Un usuario puede enviar muchos mensajes
      this.hasMany(models.Message, { foreignKey: "senderId", as: "messages" });
    }
  }

  User.init(
    {
      uid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      friends: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true, // Agrega automáticamente `createdAt` y `updatedAt`
    }
  );

  return User;
};
