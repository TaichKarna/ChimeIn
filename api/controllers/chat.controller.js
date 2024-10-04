const { errorHandler } = require('../utils/error');
const { prisma } = require('../utils/prisma');

// Create a chat
const createChat = async (req, res, next) => {
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
                        role: 'member', // Default role
                    })),
                },
            },
        });
        res.status(201).json(chat);
    } catch (error) {
        return next(errorHandler(500, 'Error creating chat'));
    }
};

// Get chat by ID
const getChatById = async (req, res, next) => {
    const { chatId } = req.params;

    try {
        const chat = await prisma.chat.findUnique({
            where: { id: chatId },
            include: { memberships: true, messages: true }, // Include related data
        });

        if (!chat) {
            return next(errorHandler(404, 'Chat not found'));
        }

        res.status(200).json(chat);
    } catch (error) {
        return next(errorHandler(500, 'Error retrieving chat'));
    }
};

// Add a member to a chat (only admin can do this)
const addMemberToChat = async (req, res, next) => {
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

// Remove a member from a chat (only admin can do this)
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
};
