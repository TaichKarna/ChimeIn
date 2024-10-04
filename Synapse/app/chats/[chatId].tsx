import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Fontisto, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { socket } from "../../sockets/socket";
import { useCallback, useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { renderActions, renderComposer, renderInputToolbar, renderSend } from "@/components/ChatInput";
import { getUserData } from "@/store/userData";

function CustomInputToolbar(props : any) {
    return (
        <View style={{ flexDirection: "column" }}>
            <MaterialIcons name="add" size={24} />
            <InputToolbar {...props} />
        </View>
    );
}

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const { chatId } = useLocalSearchParams();
    const textClr = useThemeColor({}, 'text');
    const chatBg = useThemeColor({}, 'chatBg');
    const [user, setUser] = useState("");

    useEffect(() => {

        socket.emit('chat room', { chatRoom: "taichikarna" });

        const messageListener = (message : any) => {
            setMessages((prev) => GiftedChat.append(prev, message));
        };

        socket.on('chat message', messageListener);

        const getUser = async() => {
            const user = await getUserData();
            setUser(user);
        }
        getUser();
        
        // Cleanup on component unmount
        return () => {
            socket.off('chat message', messageListener); // Remove the specific listener
        };
    }, []);

    const onSend = useCallback((newMessages = []) => {
        setMessages((prev) => GiftedChat.append(prev, newMessages));
        setText(""); // Clear input text

        // Send message to the server
        const messageToSend = {
            content: {
                ...newMessages[0],
            },
            chatRoom: "taichikarna",
        };
        console.log(messages)
        socket.emit('chat message', messageToSend);
    }, [user]); // Use user in dependencies

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ThemedView>
                <View style={styles.pageTitle}>
                    <View style={styles.headerRow}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.navigate("/home/(tabs)/chats")}
                        >
                            <MaterialIcons name="keyboard-arrow-left" size={24} color={textClr} />
                        </TouchableOpacity>
                        <ThemedText type="sh1">{chatId}</ThemedText>
                    </View>
                    <View style={styles.headerRow}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => router.navigate("/home/(tabs)/chats")}>
                            <Fontisto name="search" size={18} color={textClr} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={() => router.navigate("/home/(tabs)/chats")}>
                            <Ionicons name="menu" size={24} color={textClr} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ThemedView>
            <GiftedChat
                messages={messages}
                user={{ _id: user.id }} 
                onSend={(message) => onSend(message)}
                text={text}
                onInputTextChanged={setText}
                messagesContainerStyle={{ backgroundColor: chatBg }}
                renderInputToolbar={renderInputToolbar}
                renderActions={renderActions}
                renderComposer={renderComposer}
                renderSend={renderSend}
                alwaysShowSend
                maxComposerHeight={60}
                minComposerHeight={40}
                minInputToolbarHeight={36}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pageTitle: {
        marginHorizontal: 22,
        marginVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    backButton: {
        marginRight: SIZES.padding2,
    },
    iconButton: {
        marginRight: SIZES.padding2,
    },
});
