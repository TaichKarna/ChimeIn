import { View,  Pressable, TouchableOpacity, Image, FlatList, StatusBar,  Alert, ScrollView, SectionList} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { FontAwesome6, Fontisto, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import  { ThemedInput } from "@/components/ThemedInput";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { COLORS, } from "@/constants/theme";
import { getToken } from "@/store/authToken";
import { api_url } from "@/app/_layout";
import AddFriendsModal from "@/components/friends/AddFriendsModal";
import { getUserData } from "@/store/userData";
import FriendRequestList from "@/components/friends/FriendRequestList";

export default function friends(){
    const txtColor = useThemeColor({}, 'text');
    const inputBgColor = useThemeColor({}, 'inputbg');
    const inputTxtClr = useThemeColor({}, 'inputtxt');
    const bgColor = useThemeColor({}, 'background')
    const lineClr = useThemeColor({}, 'line')
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState<any>([])
    const [modalVisible, setModalVisible] = useState(false);
    const [friendRequests, setFriendRequests] = useState([]);
    const [friends, setFriends] = useState([]);
    
    const handlSearch = (text : string) => {
        setSearch(text);
        const filteredData = friends.filter( (data : any) => {
           return  data.friend.username.toLowerCase().includes(text.toLowerCase())
        })
        setFilteredData(filteredData);
    }

    const handleRequest = async (item : any, status: string) => {
        const token = await getToken();
        try {
          const response = await fetch(`${api_url}/invites/respond`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,  
            },
            body: JSON.stringify({
              requestId: item.id,  
              status: status       
            })
          });
          const result = await response.json();
      
          if (response.ok) {
            Alert.alert(
              'Success',
              `Friend request ${status.toLowerCase()} successfully!`,
              [{ text: 'OK' }]
            );
            setFriendRequests((prevRequests) => 
                prevRequests.filter((request : any) => request.id !== item.id)
              );

          } else {
            Alert.alert(
              'Error',
              result.message || 'Failed to update friend request',
              [{ text: 'OK' }]
            );
          }
        } catch (error) {
          Alert.alert(
            'Error',
            'Error responding to friend request. Please try again later.',
            [{ text: 'OK' }]
          );
          console.error('Error responding to friend request:', error);
        }
      };
      
    useEffect(() => {

        const getFriendRequests = async() => {
            try{
                const { id } = await getUserData() ;
                const token = await getToken();

                const res = await fetch(`${api_url}/invites/${id}`, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
                })
                const data = await res.json();
                setFriendRequests(data);
            }catch(error){
                console.log(error)
            }
        }
        const getFriends = async() => {
            try{
                const token = await getToken();

                const res = await fetch(`${api_url}/friends`, {
                    method: 'GET',
                    headers: {
                    'Authorization': `Bearer ${token}`, 
                },
                })
                const data = await res.json();
                setFriends(data);
                setFilteredData(data);
            }catch(error){
                console.log(error)
            }
        }

        getFriends();
        getFriendRequests();
      }, [friendRequests]);

    const renderItem = ({ item, index} : any) => (
        <TouchableOpacity
            key={index}
            onPress={() => router.navigate(`/chats/${item.friend.username}`)}
            style={{
                width: "100%",
                paddingHorizontal: 24,
                paddingTop:16,
            }}
        >
            <View style={{
                flexDirection: "row",
                alignItems: 'flex-start',
                paddingBottom: 16,
                borderBottomWidth: 1.5,
                borderColor: lineClr
            }}>
                <View style={{
                    marginRight: 22,
                    justifyContent: "flex-start",
                    padding: 4
                }}>
                    {
                        item.isOnline && item.isOnline === true && (
                            <View style={{
                                height: 15,
                                width: 15,
                                borderRadius: 7,
                                backgroundColor: COLORS.accentSuccess,
                                position: "absolute",
                                top: 0,
                                right: 2,
                                zIndex: 1000,
                                borderColor: COLORS.neutralWhite,
                                borderWidth: 2
                            }}>

                            </View>
                        )
                    }
                    <Image 
                        source={{
                            uri: item.friend.profilePicture
                        }}
                        resizeMode="contain"
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 16
                    }}/>
                </View>
                <View style={{
                    justifyContent: 'flex-start',
                    flexDirection: "column",
                }}>
                    <ThemedText type="body1" style={{marginBottom: 6}}>
                        {item.friend.username}
                    </ThemedText>
                    <ThemedText type="md1" style={{
                        color: inputTxtClr
                    }}>{item.lastSeen}</ThemedText>
                </View>
            </View>
        </TouchableOpacity>
    )

    return(
        <SafeAreaView style={{flex: 1}}>
                 <StatusBar 
                backgroundColor={bgColor}
            />
            <ThemedView style={{flex: 1}}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 24,
                    paddingVertical: 16
                }}>
                    <ThemedText type="sh1" style={{}}>Contacts</ThemedText>
                    <Pressable onPress={() => setModalVisible(true)}>
                        <FontAwesome6 name="add" size={22} color={txtColor}/>
                    </Pressable>
                </View>
                <View style={{
                    marginHorizontal: 24,
                    marginVertical: 16,
                    
                }}>
                    <View style={{
                        flexDirection: 'row',
                        paddingHorizontal: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: inputBgColor,
                        borderRadius: 4,
                        height: 44
                    }}>
                        <TouchableOpacity style={{marginRight: 8}}>
                            <Fontisto name="search" size={16} color={inputTxtClr}/>
                        </TouchableOpacity>
                        <ThemedInput 
                            placeholder="Search"
                            style={{
                                color: inputTxtClr
                            }}
                            onChangeText={handlSearch}
                        />
                    </View>
                </View>
                {/* <ScrollView style={{
                    paddingBottom: 100
                }}
                >{
                    friendRequests.length > 0 ? (
                        <>
                           <View>
                            <ThemedText type="sh1" style={{
                                  marginHorizontal: 24,
                                  marginVertical: 16,              
                            }}>
                                    Friend Request
                                </ThemedText>
                                <FlatList 
                                    data={friendRequests}
                                    renderItem={({item, index}) => (
                                        <FriendRequestList
                                            item={item}
                                            index={index}
                                            handleRequest={handleRequest}
                                        
                                        />
                                    )}
                                    keyExtractor={ ( item : any ) => item.id.toString()}
                                    scrollEnabled={false}
                                />
                           </View>
                        </>
                    ) : (
                        <View>
                            <ThemedText type="sh1" style={{
                                  marginHorizontal: 24,
                                  marginVertical: 16,              
                            }}>
                                    Friend Request
                                </ThemedText>
                                <ThemedText style={{
                                    marginHorizontal: 24,
                                    marginBottom: 10        
                                 }}>
                                     No friend requests available
                                </ThemedText>
                           </View>
                        
                    )
                }
                    <View>
                    <ThemedText type="sh1" style={{
                        marginHorizontal: 24,
                        marginVertical: 16,      
                        marginBottom: 10        
                    }}>
                            Friends
                        </ThemedText>
                        <FlatList
                        data={filteredData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        scrollEnabled={false}
                         />
                    </View>
                    
                </ScrollView> */}
                <SectionList
                    sections={[
                        { title: 'Friend Request', data: friendRequests.length > 0 ? friendRequests : [{ id: 'no-requests', message: 'No friend requests available' }] },
                        { title: 'Friends', data: filteredData || [] },
                    ]}
                    renderSectionHeader={({ section }) => (
                        <ThemedText
                        type="sh1"
                        style={{
                            marginHorizontal: 24,
                            marginVertical: 16,
                        }}>
                        {section.title}
                        </ThemedText>
                    )}
                    renderItem={({ item, index, section }) =>
                        section.title === 'Friend Request' ? (
                        item.message ? ( // Check if it's the no requests item
                            <ThemedText style={{
                            marginHorizontal: 24,
                            marginBottom: 10,
                            }}>
                            {item.message}
                            </ThemedText>
                        ) : (
                            <FriendRequestList
                            item={item}
                            index={index}
                            handleRequest={handleRequest}
                            />
                        )
                        ) : (
                        renderItem({ item, index }) // Render for "Friends"
                        )
                    }
                    keyExtractor={(item) => item.id ? item.id.toString() : 'no-requests'} // Unique key
         
                    />


                <AddFriendsModal 
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    textColor={txtColor}
                />
            </ThemedView>

        </SafeAreaView>
    )
}