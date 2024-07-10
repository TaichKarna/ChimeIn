const errorHandler = require('../utils/error')
const {prisma} = require('../utils/prisma')

const addFriends = async (req, res, next) => {
    try{
        if(!req.user){
            return next(errorHandler(400, "Login to add peeple"))
         }
     
         const friend = await prisma.user.findUnique({
             where: {
                 id: req.params.friendId
             }
         })
     
         if(!friend){
             return next(errorHandler(404, "User not found"))
         }
     
         const friendRelation = await prisma.user_Friends.findMany({
             where: {
                 OR: [
                     {
                         user1: req.user.id,
                         user2: req.params.friendId
                     },
                     {
                         user1: req.params.friendId,
                         user2: req.user.id
                     }
                 ]
             }
         })
     
         if(friendRelation.length > 0){
             return next(errorHandler(404, "Already friends"))
         }
     
         const newFriend = await prisma.user_Friends.create({
             data: {
                 user1: req.user.id,
                 user2: req.params.friendId
             }
         })
     
     
         res.json({message: "New contact added"});
         
    } catch(error){
        next(error)
    }
}

module.exports = { addFriends } 