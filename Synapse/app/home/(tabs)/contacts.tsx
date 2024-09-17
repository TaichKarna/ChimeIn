import { View, Text, Pressable, TouchableOpacity, Image, FlatList } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { FontAwesome6, Fontisto, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedInput from "@/components/ThemedInput";
import { useState, useEffect } from "react";
import {contacts} from '../../../constants/data'
import { router } from "expo-router";
import { COLORS } from "@/constants/theme";
import * as Contacts from 'expo-contacts' 

export default function ContactsComp(){
    const txtColor = useThemeColor({}, 'text')
    const inputBgColor = useThemeColor({}, 'inputbg')
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState<any>(contacts)

    const handlSearch = (text : string) => {
        setSearch(text);
        console.log(text)
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
              console.log(contact);
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
                flexDirection: "row",
                paddingHorizontal: 22,
                alignItems: 'flex-start'
            }}
        >
            <View style={{
                paddingVertical: 0,
                marginRight: 22,
                paddingBottom: 15,
        
                justifyContent: "flex-start"
            }}>
                {
                    item.isOnline && item.isOnline === true && (
                        <View style={{
                            height: 14,
                            width: 14,
                            borderRadius: 7,
                            backgroundColor: COLORS.accentSuccess,
                            position: "absolute",
                            top: 14,
                            right: 2,
                            zIndex: 1000
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
                        borderRadius: 15
                }}/>
            </View>
            <View style={{
                flexDirection: "column",
            }}>
                <ThemedText type="body1" style={{marginBottom: 4}}>
                    {item.userName}
                </ThemedText>
                <ThemedText type="md1">{item.lastSeen}</ThemedText>
            </View>
        </TouchableOpacity>
    )

    return(
        <SafeAreaView style={{flex: 1}}>
            <ThemedView style={{flex: 1}}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 22,
                    paddingVertical: 22
                }}>
                    <ThemedText type="sh1" style={{}}>Contacts</ThemedText>
                    <Pressable onPress={() => console.log('add contacts')}>
                        <FontAwesome6 name="add" size={22} color={txtColor}/>
                    </Pressable>
                </View>
                <View style={{
                    marginHorizontal: 22,
                    paddingVertical: 16,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        paddingHorizontal: 22,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: inputBgColor,
                        borderRadius: 3,
                        height: 42
                    }}>
                        <TouchableOpacity style={{marginRight: 10}}>
                            <Fontisto name="search" size={16} color={txtColor}/>
                        </TouchableOpacity>
                        <ThemedInput 
                            placeholder="Search contact..."
                            style={{
                                width: '100%',
                                color: txtColor
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