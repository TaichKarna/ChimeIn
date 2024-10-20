import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Fontisto, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useCallback, useEffect, useState, useMemo } from "react";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { renderActions, renderComposer, renderInputToolbar, renderSend } from "@/components/ChatInput";
import { useQuery, useQueryClient } from "react-query";
import { fetchAllChats } from "@/queries/chatApi";
import { fetchChatMessages } from "@/queries/messageApi"; 
import useSendMessage from "@/hooks/useSendMessage"; // Import the sendMessage hook
import useAppStore from "@/store/zustand/appStore";

export const useChatDetails = (chatId: any, page: number, limit: number) => {
    return useQuery(
        ['chatMessages', chatId, page], 
        () => fetchChatMessages(chatId, page, limit), 
        {
            enabled: !!chatId,
            staleTime: 1000 * 60 * 5,
            keepPreviousData: true, 
        }
    );
};

export default function Chat() {
    const getGlobalMessages = useAppStore(state => state.getMessages);
    const [text, setText] = useState("");
    const { chatId } : { chatId: string } = useLocalSearchParams();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const textClr = useThemeColor({}, 'text');
    const chatBg = useThemeColor({}, 'chatBg');
    const user = useAppStore(state => state.user);
    const [page, setPage] = useState(1); 
    const [limit] = useState(20); 

    const { data: chats } = useQuery(['chats'], fetchAllChats, {
        refetchOnWindowFocus: false, 
        refetchOnMount: false
    });
    
    const chat = useMemo(() => chats?.find((chat: any) => chat.id === chatId), [chats, chatId]);

    const { addMessages } = useAppStore(); 
    const { data: chatMessages } = useChatDetails(chatId, page, limit);

    useEffect(() => {
        if (chatMessages) {
            addMessages(chatId, chatMessages);
        }
    }, [chatMessages, addMessages, chatId]);

    const queryClient = useQueryClient();

    useEffect(() => {
        return () => {
            queryClient.invalidateQueries(['chatMessages', chatId]);
        };
    }, [chatId, queryClient]);


    useEffect(() => {
        const unsubscribe = useAppStore.subscribe(
            ({ chatRooms }) => {
                const updatedMessages = chatRooms[chatId]?.messages || [];
                const sortedMessages = updatedMessages.sort((a: IMessage, b: IMessage) => {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                });
                setMessages(sortedMessages); 
            },
            (state) => state.chatRooms[chatId]?.messages || []
        );

        return () => unsubscribe(); // Clean up subscription on unmount
    }, [chatId]);

    const loadMoreMessages = () => {
        setPage(prevPage => prevPage + 1);
    };

    const sendMessage = useSendMessage(); 

    const onSend = useCallback((newMessages = []) => {
        const message = newMessages[0];
        setText("");     
        sendMessage(chat, message); // This will also update the global store
    }, [sendMessage, chat]);

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
                        <ThemedText type="sh1">{chat?.otherUser?.displayName}</ThemedText>
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
                user={user?.id ? { _id: user.id } : { _id: 'guest' }} 
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
                listViewProps={{
                    onEndReachedThreshold: 0.3, 
                    onEndReached: loadMoreMessages,
                }}
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
