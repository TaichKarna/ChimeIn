import { View, Pressable, TouchableOpacity, Image,  StatusBar, Alert, SectionList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { FontAwesome6, Fontisto } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedInput } from "@/components/ThemedInput";
import { useState } from "react";
import { router } from "expo-router";
import { COLORS } from "@/constants/theme";
import { api_url } from "@/app/_layout";
import AddFriendsModal from "@/components/friends/AddFriendsModal";
import FriendRequestList from "@/components/friends/FriendRequestList";
import { getToken } from "@/store/authToken";
import { getUserData } from "@/store/userData";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { createChat, fetchAllChats } from "@/queries/chatApi";
import { fetchFriends } from "@/queries/friendsApi";

const fetchFriendRequests = async () => {
  const { id } = await getUserData();
  const token = await getToken();
  const res = await fetch(`${api_url}/invites/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return res.json();
};


export default function Friends() {
  const txtColor = useThemeColor({}, 'text');
  const inputBgColor = useThemeColor({}, 'inputbg');
  const inputTxtClr = useThemeColor({}, 'inputtxt');
  const bgColor = useThemeColor({}, 'background');
  const lineClr = useThemeColor({}, 'line');
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const queryClient = useQueryClient();


  const { data: friendRequests = [], isLoading: isLoadingRequests } = useQuery('friendRequests', fetchFriendRequests);
  const { data: friends = [], isLoading: isLoadingFriends } = useQuery('friends', fetchFriends);
  const { data: chats = [] } = useQuery('chats', fetchAllChats);

  const filteredData = friends.filter((data: any) =>
    data.friend.username.toLowerCase().includes(search.toLowerCase())
  );


  const { mutate: handleCreateChat } = useMutation(createChat, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['chats'])
      router.navigate(`/chats/${data.id}`); 
    },
    onError: (error : any) => {
        Alert.alert('Error', error.message || 'Error fetching chat. Please try again later.', [{ text: 'OK' }]);
    },
});

  const { mutate: handleRequest } = useMutation({
    mutationFn: async ({ requestId, status }: { requestId: string; status: string }) => {
      const token = await getToken();
      const response = await fetch(`${api_url}/invites/respond`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          requestId,
          status,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update friend request');
      }
      return response.json();
    },
    onSuccess: (_, { status }) => {
      Alert.alert(
        'Success',
        `Friend request ${status.toLowerCase()} successfully!`,
        [{ text: 'OK' }]
      );
      queryClient.invalidateQueries(['friendRequests']);
      queryClient.invalidateQueries(['friends']);

    },
    onError: (error: Error) => {
      Alert.alert(
        'Error',
        error.message || 'Error responding to friend request. Please try again later.',
        [{ text: 'OK' }]
      );
    },
  });

  const handleFriendsPress = async(friendId : string) => {
    const { id } = await getUserData();
    const existingChat = chats.find(( chat  : any) =>
      chat.otherUser.id === friendId
    );

    if (existingChat) {
      console.log(existingChat)
      router.navigate(`/chats/${existingChat.id}`);
    } else {
      const chatName = `Chat between ${id} and ${friendId}`;
      handleCreateChat({ chatName, members: [id, friendId] });
    }

  }


  const renderItem = ({ item, index }: any) => (
    <TouchableOpacity
      key={index}
      onPress={() => handleFriendsPress(item.friend.id)}
      style={{
        width: "100%",
        paddingHorizontal: 24,
        paddingTop: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: 'flex-start',
          paddingBottom: 16,
          borderBottomWidth: 1.5,
          borderColor: lineClr,
        }}
      >
        <View
          style={{
            marginRight: 22,
            justifyContent: "flex-start",
            padding: 4,
          }}
        >
          {item.isOnline && (
            <View
              style={{
                height: 15,
                width: 15,
                borderRadius: 7,
                backgroundColor: COLORS.accentSuccess,
                position: "absolute",
                top: 0,
                right: 2,
                zIndex: 1000,
                borderColor: COLORS.neutralWhite,
                borderWidth: 2,
              }}
            />
          )}
          <Image
            source={{
              uri: item.friend.profilePicture,
            }}
            resizeMode="contain"
            style={{
              width: 50,
              height: 50,
              borderRadius: 16,
            }}
          />
        </View>
        <View style={{ justifyContent: 'flex-start', flexDirection: "column" }}>
          <ThemedText type="body1" style={{ marginBottom: 6 }}>
            {item.friend.username}
          </ThemedText>
          <ThemedText type="md1" style={{ color: inputTxtClr }}>
            {item.lastSeen}
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={bgColor} />
      <ThemedView style={{ flex: 1, paddingBottom: 60 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 24,
            paddingVertical: 16,
          }}
        >
          <ThemedText type="sh1">Friends</ThemedText>
          <Pressable onPress={() => setModalVisible(true)}>
            <FontAwesome6 name="add" size={22} color={txtColor} />
          </Pressable>
        </View>
        <View style={{ marginHorizontal: 24, marginVertical: 16 }}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 25,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: inputBgColor,
              borderRadius: 4,
              height: 44,
            }}
          >
            <TouchableOpacity style={{ marginRight: 8 }}>
              <Fontisto name="search" size={16} color={inputTxtClr} />
            </TouchableOpacity>
            <ThemedInput
              placeholder="Search"
              style={{ color: inputTxtClr }}
              onChangeText={setSearch}
            />
          </View>
        </View>
        <SectionList
          sections={[
            {
              title: 'Friend Request',
              data: friendRequests.length > 0 ? friendRequests : [{ id: 'no-requests', message: 'No friend requests available' }],
            },
            { title: 'Friends', data: filteredData },
          ]}
          renderSectionHeader={({ section }) => (
            <ThemedText
              type="sh1"
              style={{
                marginHorizontal: 24,
                marginVertical: 16,
              }}
            >
              {section.title}
            </ThemedText>
          )}
          renderItem={({ item, index, section }) =>
            section.title === 'Friend Request' ? (
              item.message ? (
                <ThemedText
                  style={{
                    marginHorizontal: 24,
                    marginBottom: 10,
                  }}
                >
                  {item.message}
                </ThemedText>
              ) : (
                <FriendRequestList item={item} index={index} handleRequest={handleRequest} />
              )
            ) : (
              renderItem({ item, index }) 
            )
          }
          keyExtractor={(item) => item.id ? item.id.toString() : 'no-requests'}
    
        />

        <AddFriendsModal modalVisible={modalVisible} setModalVisible={setModalVisible} textColor={txtColor} />
      </ThemedView>
    </SafeAreaView>
  );
}
