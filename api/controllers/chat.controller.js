const errorHandler = require('../utils/error')
const {prisma} = require('../utils/prisma')

const createChat =  async (req, res, next) => {
    if(!req.user){
        return next(errorHandler(401, "Unathorized"))
    }
    
    try{
        const chatExist = await prisma.user_Chats.findMany({
            where: {
                userId: req.user.id,
                contactId: req.body.contactId
            }

        })

        if(chatExist.length > 0){
            return next(errorHandler(400, "Chat exist"))
        }


        const result = await prisma.chat.create({
            data: {
                userChat:{
                    create: [
                        {
                            userId: req.user.id,
                            contactName: req.body.contactName,
                            contactId: req.body.contactId
                        },
                        {
                            userId: req.body.contactId,
                            contactName: req.body.username,
                            contactId: req.user.id
                        }
                    ]
                }
            },
            include:{
                userChat: true
            }
        })

        res.status(200).json(result)

    } catch(error){
        next(error)
    }
} 


const findUserChats = async (req, res, next) => {
    if(!req.user){
        return next(errorHandler(401, "Unauthorized"))
    }

    try{
        const userChats = await prisma.user_Chats.findMany({
            where: {
                userId: req.user.id
            }
        })
        res.status(200).json(userChats);
    } catch(error){
        next(error)
    }
}

module.exports = {createChat, findUserChats}