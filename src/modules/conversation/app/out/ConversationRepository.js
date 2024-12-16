const {
  Conversation,
  User,
} = require("../../../../infraestructure/config/dataBase");

class ConversationRepository {
  async getConversations(user1Id, user2Id) {
    try {
      // Encuentra todas las conversaciones entre dos usuarios
      const conversations = await Conversation.findOne({
        where: {
          user1Id,
          user2Id,
        },
      });
      if (conversations) {
        return conversations;
      }
      const conversations2 = await Conversation.findOne({
        where: {
          user2Id: user1Id,
          user1Id: user2Id,
        },
      });
      if (conversations2) {
        return conversations2;
      }
      throw new Error("No se encontró la conversación");
    } catch (error) {
      console.error("Error al obtener las conversaciones:", error);
      throw error;
    }
  }
}
module.exports = ConversationRepository;
