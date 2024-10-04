const { prisma } = require('../utils/prisma');
const { errorHandler } = require('../utils/error'); 

// Send friend request
const sendFriendRequest = async (req, res, next) => {
    const { receiverUsername } = req.body; 
    const senderId = req.user.id; 
    
    try {
        const sender = await prisma.user.findUnique({ where: { id: senderId } });
        const receiver = await prisma.user.findUnique({ where: { username: receiverUsername } });

        if(sender.id === receiver.id){
            return next(errorHandler(500, 'Cannot send a friend request to yourself'))
        }

        if (!sender) {
            return next(errorHandler(404, 'Sender not found'));
        }
        if (!receiver) {
            return next(errorHandler(404, 'Receiver not found'));
        }

        // Check if users are already friends
        const existingFriendship = await prisma.friendship.findFirst({
            where: {
                OR: [
                    { userId: sender.id, friendId: receiver.id },
                    { userId: receiver.id, friendId: sender.id }
                ]
            }
        });

        if (existingFriendship) {
            return next(errorHandler(400, 'You are already friends with this user'));
        }

        const existingRequest = await prisma.friendRequest.findUnique({
            where: { senderId_receiverId: { senderId: sender.id, receiverId: receiver.id } }
        });
        if (existingRequest) {
            return next(errorHandler(400, 'Friend request already sent'));
        }

        const friendRequest = await prisma.friendRequest.create({
            data: {
                senderId: sender.id,
                receiverId: receiver.id
            }
        });

        res.status(201).json(friendRequest);
    } catch (error) {
        console.log(error)
        next(errorHandler(500, 'Failed to send friend request'));
    }
};

// Respond to friend request
const respondToFriendRequest = async (req, res, next) => {
    const { requestId, status } = req.body; 
    const userId = req.user.id;

    try {
        const friendRequest = await prisma.friendRequest.findUnique({
            where: { id: requestId }
        });

        if (!friendRequest) {
            return next(errorHandler(404, 'Friend request not found'));
        }

        if (friendRequest.receiverId !== userId) {
            return next(errorHandler(403, 'Not authorized to respond to this request'));
        }

        if (status === 'ACCEPTED') {
            // Create friendship in both directions
            await prisma.friendship.createMany({
                data: [
                    { userId: friendRequest.senderId, friendId: friendRequest.receiverId },
                    { userId: friendRequest.receiverId, friendId: friendRequest.senderId }
                ]
            });

            // Delete the friend request after acceptance
            await prisma.friendRequest.delete({
                where: { id: requestId }
            });

            return res.status(200).json({ message: 'Friend request accepted' });
        }

        if (status === 'DECLINED') {
            // Delete the friend request after rejection
            await prisma.friendRequest.delete({
                where: { id: requestId }
            });

            return res.status(200).json({ message: 'Friend request declined' });
        }

        return next(errorHandler(400, 'Invalid status'));
    } catch (error) {
        next(errorHandler(500, 'Failed to respond to friend request'));
    }
};

// Get friend requests
const getFriendRequests = async (req, res, next) => {
    const userId = req.user.id; 
    try {
        const requests = await prisma.friendRequest.findMany({
            where: { 
                receiverId: userId,
                status: 'PENDING'
            },
            include: { 
                sender: {
                    select: {
                        username: true,
                        email: true,
                        id: true,
                        profilePicture: true
                    }
                }
            },
        });

        if (!requests || requests.length === 0) {
            return next(errorHandler(404, 'No friend requests found'));
        }

        res.status(200).json(requests);
    } catch (error) {
        next(errorHandler(500, 'Failed to fetch friend requests'));
    }
};

module.exports = {
    sendFriendRequest,
    respondToFriendRequest,
    getFriendRequests
};
