// import { FriendsRequest } from "../../../../infraestructure/config/dataBase";
const {
  FriendsRequest,
  User,
  Conversation,
} = require("../../../../infraestructure/config/dataBase");
class SequelizeFriendsRequest {
  async create(userSend, userRejects) {
    try {
      // Validación de entrada
      if (!userSend || !userRejects) {
        return false;
        // throw new Error("Falta el usuario que envía o el que rechaza");
      }

      // Verifica si ya existe la solicitud de amistad
      const friendsRequestAlreadyExist = await FriendsRequest.findOne({
        where: {
          userSend,
          userRejects,
        },
      });

      if (friendsRequestAlreadyExist) {
        return false;
      }

      // Crea la solicitud de amistad
      const friendsRequest = await FriendsRequest.create({
        userSend,
        userRejects,
        uid: crypto.randomUUID(),
        state: "pending",
      });

      return friendsRequest ? true : false;
    } catch (error) {
      console.error("Error al crear la solicitud de amistad:", error.message);
      throw error; // Lanza el error para que pueda ser manejado externamente
    }
  }
  async delete(uid) {
    const friendsRequest = await FriendsRequest.findOne({
      where: { uid },
    });
    if (!friendsRequest) {
      throw new Error("no se encontro la solicitud");
    }
    await friendsRequest.destroy();
    return friendsRequest;
  }
  async accept(uid) {
    // Busca la solicitud de amistad
    const friendsRequest = await FriendsRequest.findOne({
      where: { uid },
    });
    if (!friendsRequest)
      throw new Error("No se encontró la solicitud de amistad");

    // Actualiza el estado de la solicitud a "accepted"
    await friendsRequest.update({ state: "accepted" });

    // Obtén los usuarios involucrados
    const userOne = await User.findOne({
      where: { uid: friendsRequest.userSend },
    });
    const userTwo = await User.findOne({
      where: { uid: friendsRequest.userRejects },
    });

    if (!userOne || !userTwo)
      throw new Error("Uno o ambos usuarios no existen");
    const conversationUid = crypto.randomUUID();
    await Conversation.create({
      user1Id: friendsRequest.userSend,
      user2Id: friendsRequest.userRejects,
      uid: conversationUid,
    });
    // Extrae y actualiza el campo "friends" de ambos usuarios
    const updatedFriendsUserOne = userOne.friends ? [...userOne.friends] : [];
    const updatedFriendsUserTwo = userTwo.friends ? [...userTwo.friends] : [];

    // Verifica si ya existen los amigos en la lista para evitar duplicados
    if (
      !updatedFriendsUserOne.some(
        (f) => f.friend === friendsRequest.userRejects
      )
    )
      updatedFriendsUserOne.push({
        friend: friendsRequest.userRejects,
        conversationUid,
      });

    if (
      !updatedFriendsUserTwo.some((f) => f.friend === friendsRequest.userSend)
    )
      updatedFriendsUserTwo.push({
        friend: friendsRequest.userSend,
        conversationUid,
      });

    // Actualiza los usuarios con las nuevas listas de amigos
    await userOne.update({
      friends: updatedFriendsUserOne,
    });

    await userTwo.update({
      friends: updatedFriendsUserTwo,
    });

    return friendsRequest;
  }
  async reject(uid) {
    const friendsRequest = await FriendsRequest.findOne({
      where: { uid },
    });
    if (!friendsRequest) {
      throw new Error("no se encontro la solicitud");
    }
    await friendsRequest.update({ state: "rejected" });
    return friendsRequest;
  }
}
module.exports = SequelizeFriendsRequest;
