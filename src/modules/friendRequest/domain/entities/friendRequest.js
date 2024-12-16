const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class FriendRequest extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userSend", as: "sender" });
      this.belongsTo(models.User, { foreignKey: "userReject", as: "receiver" });
    }
  }

  FriendRequest.init(
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
    },
    {
      sequelize,
      modelName: "FriendRequest",
      tableName: "friend_requests",
      timestamps: true,
    }
  );

  return FriendRequest;
};