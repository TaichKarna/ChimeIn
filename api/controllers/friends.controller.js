const { prisma } = require('../utils/prisma');
const { errorHandler } = require('../utils/error'); 

const getFriendsList = async (req, res, next) => {
    const userId = req.user.id; 

    try {
        const friends = await prisma.friendship.findMany({
            where: { userId },
            include: {
                friend: {
                    select: {
                        id: true,
                        username: true,
                        profilePicture: true,
                    },
                },
            },
        });

        if (friends.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(friends);
    } catch (error) {
        next(errorHandler(500, 'Failed to retrieve friends.'));
    }
};

module.exports = {
    getFriendsList,
};
