import { COLORS, FONTS, SIZES } from "@/constants/theme";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons,Fontisto, Feather, Ionicons } from '@expo/vector-icons'
import { router, useLocalSearchParams, usePathname, useSegments } from "expo-router";
import { GiftedChat } from "react-native-gifted-chat";
import { socket } from "../../sockets/socket"
import { useCallback, useEffect, useState } from "react";

const USER = {
    name : "TaichiKarna"
}


export default function Chat(){
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const { chatId } = useLocalSearchParams();

    console.log(chatId )

    useEffect(() => {
        socket.emit('chat room', {chatRoom: "taichikarna"})

        socket.on('chat message', (messages) => {
            setMessages(prev => GiftedChat.append(prev, messages))
        })

        return () =>  {
            socket.off('chat message') 
        }
    },[])



    const onSend = useCallback((messages = []) => {
        setMessages(prev => GiftedChat.append(prev, messages))
        setText("");
        
        socket.emit('chat message', {content: {
            ...messages[0], user : { _id : chatId === 12 ? 1 : 2}
        } , chatRoom: "taichikarna"})
    },[])

    

    socket.emit("message", "hellow world")
    return(
        <SafeAreaView style={{flex:1, backgroundColor: COLORS.neutralWhite}}>
            <View style={styles.pageTitle}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <TouchableOpacity style={{
                        marginRight: SIZES.padding2
                    }}
                     onPress={() => router.navigate("/home/(tabs)/chats")}>
                        <MaterialIcons name="keyboard-arrow-left" size={24} color={COLORS.neutralActive}/>
                    </TouchableOpacity>
                    <Text style={{
                        ...FONTS.subHeading1, color: COLORS.neutralActive
                    }}
                    >
                        {USER.name}
                    </Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <TouchableOpacity style={{
                        marginRight: SIZES.padding2
                    }}
                     onPress={() => router.navigate("/home/(tabs)/chats")}>
                        <Fontisto name="search" size={18} color={COLORS.neutralActive}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        marginRight: SIZES.padding2
                    }}
                     onPress={() => router.navigate("/home/(tabs)/chats")}>
                        <Ionicons name="menu" size={24} color={COLORS.neutralActive}/>
                    </TouchableOpacity>
                </View>
            </View>
            <GiftedChat
                messages={messages}
                user={{
                    _id: 1
                }}
                onSend={messages => onSend(messages)}
                text={text}
                onInputTextChanged={(text) => setText(text)}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    pageTitle: {
        marginHorizontal: 22,
        marginVertical: 22,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"      
    }
})
