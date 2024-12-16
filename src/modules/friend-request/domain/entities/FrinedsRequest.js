const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class FriendsRequest extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userSend", as: "user1" });
      this.belongsTo(models.User, { foreignKey: "userRejects", as: "user2" });
      this.hasMany(models.Message, {
        foreignKey: "uidFriendsRequest",
        as: "users",
      });
    }
  }

  FriendsRequest.init(
    {
      uid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      state: {
        type: DataTypes.ENUM("pending", "accepted", "rejected"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "FriendsRequest",
      tableName: "friendsRequests",
      timestamps: true, // Agrega automáticamente `createdAt` y `updatedAt`
    }
  );

  return FriendsRequest;
};
