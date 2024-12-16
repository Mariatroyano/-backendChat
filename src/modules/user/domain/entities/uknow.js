const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Relaciones con conversaciones
      this.hasMany(models.Conversation, { foreignKey: "uidUser1", as: "conversationsAsUser1" });
      this.hasMany(models.Conversation, { foreignKey: "uidUser2", as: "conversationsAsUser2" });

      // Relaciones con mensajes
      this.hasMany(models.Message, { foreignKey: "uidSend", as: "messages" });

      // Relaciones con solicitudes de amistad
      this.hasMany(models.FriendRequest, { foreignKey: "userSend", as: "sentFriendRequests" });
      this.hasMany(models.FriendRequest, { foreignKey: "userReject", as: "receivedFriendRequests" });
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
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      friends: {
        type: DataTypes.JSON, // Guarda una lista de amigos en formato JSON
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
    }
  );

  return User;
};