const errorHandler = require('../utils/error')
const {prisma} = require('../utils/prisma')


const createMessage = async (req, res, next) => {
    if(!req.user){
        return next(errorHandler(401, "Unathorized"))
    }

    if( !req.body.content || !req.body.type){
        return next(errorHandler(400, "Please provide all data"))
    }


    try{
        const newMessage = await prisma.message.create({
            data: {userId: req.user.id, ...req.body}
        })

        res.status(200).json(newMessage)

    } catch (error){
        next(error)
    }
}


const getMessages = async (req, res, next) => {
    if(!req.user){
        return next(errorHandler(401, "Unathorized"))
    }

    if( !req.body.groupId && !req.body.chatId){
        return next(errorHandler(400, "Please provide either chat or group id"))
    }


    try{
        const newMessage = await prisma.message.findMany({
            where: {userId: req.user.id, ...req.body}
        })

        res.status(200).json(newMessage)

    } catch (error){
        next(error)
    }
}

module.exports = {createMessage, getMessages}