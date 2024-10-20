const { errorHandler } = require('../utils/error')
const { prisma } = require('../utils/prisma')


const sendMessage = async (req, res, next) => {
    const { text, user, createdAt, _id } = req.body;
    const { chatId } = req.params;
    const chatMembership = await prisma.chat.findFirst({
      where: {
        id: chatId,
       memberships : { some: { userId:  req.user.id } },
      },
    });

    if (!chatMembership) {
      return next(errorHandler(403, "Not authorized to= send messages to this chat"));
    }

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
      
      return res.status(200).json({text, user, createdAt, _id});
      
    } catch (error) {
        console.log(error)
        return next(errorHandler(500, 'Error fetching message'));
      }
  }


const getMessagesByChatId = async (req, res, next) => {
  const { chatId } = req.params;
  const { page = 1, limit = 20 } = req.query; 
  const userId = req.user.id; 

  try {
    const chatMembership = await prisma.chat.findFirst({
      where: {
        id: chatId,
       memberships : { some: { userId } },
      },
    });

    if (!chatMembership) {
      return next(errorHandler(403, "Not authorized to access these chats messages"));
    }

    const messages = await prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit), 
      skip: (parseInt(page) - 1) * parseInt(limit), 
      include: {
        sender: {
          select: { id: true, username: true, profilePicture: true },
        }, 
        statuses: true, 
        replies: true, 
      },
    });

    const transformedMessages = messages.map((message) => ({
      _id: message.id,
      text: message.content,
      createdAt: message.createdAt,
      user: {
        _id: message.sender.id,
        name: message.sender.username,
        avatar: message.sender.profilePicture, 
      },
    }));

    return res.status(200).json(transformedMessages);


  } catch (error) {
    console.error('Error fetching messages:', error);
    return next(errorHandler(500, 'Error fetching message'));
  }
};

module.exports = {
  getMessagesByChatId,
  sendMessage
};


