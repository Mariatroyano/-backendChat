const {
  Message,
  Conversation,
} = require("../../../../infraestructure/config/dataBase");

//   console.log(`
//         dvsfbvlkjdfbvkdfv
//         f

//         v
//         bb
//         b
//         b
//         b

//         b
//         b
//         b
//         b
//         b
//         b
//         b
//         b
//         b
//         b
//         b

//         b
//         b
//         b

//         b
//         b
//         b
//         b
//         b
//         b
//         b
//         b

//         b
//         b
//         b
//         b
//         b
//         b
//         b
//         b
//         b

//         b
//         b
//         b
//         b
//         b
//         `);
// Verifica si existe la conversación
//   const conversation = await Conversation.findOne({
//     where: { uid: uidConversation },
//   });
//   if (!conversation) {
//     throw new Error("No se encontró la conversación");
//   }

// Crea el mensaje
// Agrega el mensaje a la conversación
//   await conversation.addMessage(message);

class MessageRepository {
  async create(uidConversation, content, senderId) {
    try {
      const message = await Message.create({
        uidConversation,
        state: "sent",
        content,
        senderId,
        uid: crypto.randomUUID(),
      });

      return message;
    } catch (error) {
      console.error("Error al crear el mensaje:", error.message);
      throw error; // Lanza el error para que pueda ser manejado externamente
    }
  }
  async getAll(uidConversation) {
    try {
      // Verifica si existe la conversación
      const conversation = await Conversation.findOne({
        where: { uid: uidConversation },
      });
      if (!conversation) {
        throw new Error("No se encontró la conversación");
      }

      // Obtiene todos los mensajes de la conversación
      const messages = await Message.findAll({
        where: { uidConversation },
      });

      return messages;
    } catch (error) {
      console.error("Error al obtener los mensajes:", error.message);
      throw error; // Lanza el error para que pueda ser manejado externamente
    }
  }
}

module.exports = MessageRepository;
