const { prisma } = require('../utils/prisma')

const saveMessage = async (chatId, messageData) => {
    const { text, user, createdAt, _id } = messageData;
      
    try {
      const savedMessage = await prisma.message.create({
        data: {
          id: _id,  
          content: text,  
          senderId: user._id,  
          chatId: chatId,  
          messageType: 'TEXT',  
          createdAt: new Date(createdAt), 
        },
      });
      
      
    } catch (error) {
        next(error)
      console.error('Error saving or forwarding message:', error);
    }
  }

  module.exports = { saveMessage }