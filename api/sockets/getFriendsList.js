const { prisma } = require('../utils/prisma')

async function getUserFriends(userId) {
    return await prisma.friendship.findMany({
      where: { userId },
      select: { friendId: true }
    }).then(friends => friends.map(friend => friend.friendId));
  }

module.exports ={ getUserFriends }