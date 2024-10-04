export const createFriendsSlice = (set) => ({
    friends: {
      list: [],
      addFriend: (newFriend) => set((state) => ({
        friends: { ...state.friends, list: [...state.friends.list, newFriend] },
      })),
      removeFriend: (friendId) => set((state) => ({
        friends: {
          ...state.friends,
          list: state.friends.list.filter((friend) => friend.id !== friendId),
        },
      })),
    },
  });