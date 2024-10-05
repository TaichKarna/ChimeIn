const { errorHandler } = require('../utils/error');
const { prisma } = require('../utils/prisma');

const createGroupChat = async (req, res, next) => {
    if (!req.user) {
        return next(errorHandler(401, "Unauthorized"));
    }

    const { name, members } = req.body;

    try {
        const chat = await prisma.chat.create({
            data: {
                name,
                memberships: {
                    create: members.map((memberId) => ({
                        userId: memberId,
                        role: 'member', 
                    })),
                },
            },
        });
        res.status(201).json(chat);
    } catch (error) {
        return next(errorHandler(500, 'Error creating chat'));
    }
};

const createChat = async (req, res, next) => {
    if (!req.user) {
        return next(errorHandler(401, "Unauthorized"));
    }
    const { name, members } = req.body;

    if (!Array.isArray(members) || members.length !== 2) {
        return next(errorHandler(400, "Chat creation requires exactly two members"));
    }

    try {
        const existingChat = await prisma.chat.findFirst({
            where: {
                memberships: {
                    every: {
                        userId: {
                            in: members,
                        },
                    },
                },
            }
        });

        if (existingChat) {
            return res.status(200).json(existingChat);
        }

        const chat = await prisma.chat.create({
            data: {
                name,
                memberships: {
                    create: members.map((memberId) => ({
                        userId: memberId,
                        role: 'member',
                    })),
                },
            },
            });



        res.status(201).json(chat);
    } catch (error) {
        console.log(error)
        return next(errorHandler(500, 'Error creating chat'));
    }
};



const getAllChats = async (req, res) => {
    const userId = req.user.id; 
    try {
        const chats = await prisma.chat.findMany({
            where: {
                memberships: {
                    some: {
                        userId: userId,
                    },
                },
            },
            include: {
                memberships: {
                    where: {
                        userId: {
                            not: userId, 
                        },
                    },
                    include: {
                        user: {
                            select: {
                                id: true,
                                profilePicture: true,
                                displayName: true,
                                username: true,
                            },
                        },
                    },
                },
                messages: {
                    orderBy: {
                        createdAt: 'desc', 
                    },
                    take: 1, 
                },
            },
        });

        const formattedChats = chats.map(chat => ({
            id: chat.id,
            name: chat.name,
            isGroup: chat.isGroup,
            createdAt: chat.createdAt,
            updatedAt: chat.updatedAt,
            latestMessage: chat.messages.length > 0 ? chat.messages[0] : null, 
            otherUser: chat.memberships.length > 0 ? chat.memberships[0].user : null, 
        }));

        res.status(200).json(formattedChats);
    } catch (error) {
        console.error('Error fetching chats:', error);
        return next(errorHandler(500, 'Error retrieving chats'));

    }
};

const getChatById = async (req, res, next) => {
    const { chatId } = req.params;
    const { userId } = req.user;

    try {
        const chat = await prisma.chat.findUnique({
            where: { id: chatId },
            include: { 
                memberships: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                profilePicture: true,
                                displayName: true,
                                username: true,
                            },
                        },
                    },
                },
                messages: {
                    orderBy: {
                        createdAt: 'desc', 
                    },
                    take: 20, 
            },
        }
    });

        if (!chat) {
            return next(errorHandler(404, 'Chat not found'));
        }

        const otherMember = chat.memberships
            .map(membership => membership.user)
            .find(member => member.id !== userId);

        res.status(200).json({
            chatId: chat.id,
            otherMember,
            messages: chat.messages, 
        })
    } catch (error) {
        return next(errorHandler(500, 'Error retrieving chat'));
    }
};


const addMemberToChat = async (req, res, next) => {
    const { chatId, memberId } = req.body;

    const membership = await prisma.membership.findUnique({
        where: {
            chatId_userId: {
                chatId,
                userId: req.user.id,
            },
        },
    });

    if (!membership || membership.role !== 'admin') {
        return next(errorHandler(403, 'Only admins can add members to this chat'));
    }

    try {
        const newMembership = await prisma.membership.create({
            data: {
                userId: memberId,
                chatId,
                role: 'member', // Default role for new members
            },
        });
        res.status(201).json(newMembership);
    } catch (error) {
        return next(errorHandler(500, 'Error adding member to chat'));
    }
};

const removeMemberFromChat = async (req, res, next) => {
    const { chatId, memberId } = req.body;

    // Check if the user is an admin of the chat
    const membership = await prisma.membership.findUnique({
        where: {
            chatId_userId: {
                chatId,
                userId: req.user.id,
            },
        },
    });

    if (!membership || membership.role !== 'admin') {
        return next(errorHandler(403, 'Only admins can remove members from this chat'));
    }

    try {
        await prisma.membership.deleteMany({
            where: {
                chatId,
                userId: memberId,
            },
        });
        res.status(204).send(); // No content
    } catch (error) {
        return next(errorHandler(500, 'Error removing member from chat'));
    }
};

// Promote a member to admin in a chat (only admins can do this)
const promoteMemberToAdmin = async (req, res, next) => {
    const { chatId, memberId } = req.body;

    // Check if the user is an admin of the chat
    const membership = await prisma.membership.findUnique({
        where: {
            chatId_userId: {
                chatId,
                userId: req.user.id,
            },
        },
    });

    if (!membership || membership.role !== 'admin') {
        return next(errorHandler(403, 'Only admins can promote members to admin'));
    }

    try {
        const updatedMembership = await prisma.membership.update({
            where: {
                chatId_userId: {
                    chatId,
                    userId: memberId,
                },
            },
            data: {
                role: 'admin', // Promote the user to admin
            },
        });
        res.status(200).json(updatedMembership);
    } catch (error) {
        return next(errorHandler(500, 'Error promoting member to admin'));
    }
};

// Leave a chat
const leaveChat = async (req, res, next) => {
    const { chatId } = req.body;

    try {
        await prisma.membership.delete({
            where: {
                chatId_userId: {
                    chatId,
                    userId: req.user.id,
                },
            },
        });
        res.status(204).send(); // No content
    } catch (error) {
        return next(errorHandler(500, 'Error leaving chat'));
    }
};

// Export all controller functions
module.exports = {
    createChat,
    getChatById,
    addMemberToChat,
    removeMemberFromChat,
    promoteMemberToAdmin,
    leaveChat,
    getAllChats
};
