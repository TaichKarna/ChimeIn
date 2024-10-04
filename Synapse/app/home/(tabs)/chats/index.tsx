import { View, Text, Pressable, TouchableOpacity, Image, FlatList, StatusBar } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { FontAwesome6, Fontisto, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedInput } from "@/components/ThemedInput";
import { useState, useEffect } from "react";
import {contacts} from '../../../../constants/data'
import { router } from "expo-router";
import { COLORS } from "@/constants/theme";
import * as Contacts from 'expo-contacts' 


export default function Chats(){
    const txtColor = useThemeColor({}, 'text')
    const inputBgColor = useThemeColor({}, 'inputbg')
    const inputTxtClr = useThemeColor({}, 'inputtxt')
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState<any>(contacts)
    const bgColor = useThemeColor({}, 'background')
    const lineClr = useThemeColor({}, 'line')
    
    const handlSearch = (text : string) => {
        setSearch(text);
        const filteredData = contacts.filter( (data) => {
           return  data.userName.toLowerCase().includes(text.toLowerCase())
        })
        setFilteredData(filteredData);
    }

    useEffect(() => {
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.Emails],
            });
    
            if (data.length > 0) {
              const contact = data[0];
            }
          }
        })();
      }, []);

    const renderItem = ({ item, index} ) => (
        <TouchableOpacity
            key={index}
            onPress={() => router.navigate(`/chats/${item.userName}`)}
            style={{
                width: "100%",
                paddingHorizontal: 24,
                paddingTop: 22,
            }}
        >
            <View style={{
                flexDirection: "row",
                alignItems: 'flex-start',
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
                        source={item.userImg}
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
                        {item.userName}
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
                    <ThemedText type="sh1" style={{}}>Chats</ThemedText>
                    <Pressable onPress={() => console.log('add contacts')}>
                        <FontAwesome6 name="add" size={22} color={txtColor}/>
                    </Pressable>
                </View>
                <View style={{
                    marginHorizontal: 24,
                    marginTop: 16,
                    
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
                <View style={{
                    paddingBottom: 100
                }}>
                    <FlatList
                        data={filteredData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            
            </ThemedView>
        </SafeAreaView>
    )
}