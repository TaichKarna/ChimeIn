import { View, Text, Pressable, TouchableOpacity, Image, FlatList, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { FontAwesome6, Fontisto } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedInput } from "@/components/ThemedInput";
import { useState } from "react";
import { router } from "expo-router";
import { useQuery } from 'react-query';
import { fetchAllChats } from "@/queries/chatApi";

export default function Chats() {
    const txtColor = useThemeColor({}, 'text');
    const bgColor = useThemeColor({}, 'background');
    const inputBgColor = useThemeColor({}, 'inputbg');
    const inputTxtClr = useThemeColor({}, 'inputtxt');
    const [search, setSearch] = useState("");

    const { data: chats, isLoading, isError } = useQuery(['chats'], fetchAllChats, {
        refetchOnWindowFocus: false
    }) ;

    const handleSearch = (text: string) => {
        setSearch(text);
    };

    const filteredData = chats?.filter((chat : any) => 
        chat.otherUser.displayName?.toLowerCase().includes(search.toLowerCase())
     || chat.otherUser.username?.toLowerCase().includes(search.toLowerCase())
    ) || [];

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            onPress={() => router.navigate(`/chats/${item.id}`)} 
            style={{
                width: "100%",
                paddingHorizontal: 24,
                paddingTop: 22,
            }}
        >
            <View style={{ flexDirection: "row", alignItems: 'flex-start' }}>
                <View style={{ marginRight: 22, padding: 4 }}>
                    <Image 
                        source={{ uri: item.otherUser.profilePicture }} 
                        resizeMode="contain"
                        style={{ width: 50, height: 50, borderRadius: 16 }}
                    />
                </View>
                <View style={{ justifyContent: 'flex-start', flexDirection: "column" }}>
                    <ThemedText type="body1" style={{ marginBottom: 6 }}>
                        {item.otherUser.displayName || item.otherUser.username} 
                    </ThemedText>
                    <ThemedText type="md1" style={{ color: inputTxtClr }}>
                        {item.latestMessage ? item.latestMessage.content : 'No messages yet'} 
                    </ThemedText>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (isLoading) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor={bgColor} />
                <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ThemedText type="sh1">Loading...</ThemedText>
                </ThemedView>
            </SafeAreaView>
        );
    }

    if (isError) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={bgColor} />
                <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ThemedText type="sh1">Error fetching chats.</ThemedText>
                </ThemedView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={bgColor} />
            <ThemedView style={{ flex: 1 }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 24,
                    paddingVertical: 16,
                }}>
                    <ThemedText type="sh1">Chats</ThemedText>
                    <Pressable onPress={() => console.log('add contacts')}>
                        <FontAwesome6 name="add" size={22} color={txtColor} />
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
                        height: 44,
                    }}>
                        <TouchableOpacity style={{ marginRight: 8 }}>
                            <Fontisto name="search" size={16} color={inputTxtClr} />
                        </TouchableOpacity>
                        <ThemedInput 
                            placeholder="Search"
                            style={{ color: inputTxtClr }}
                            onChangeText={handleSearch}
                        />
                    </View>
                </View>
                <View style={{ paddingBottom: 100 }}>
                    <FlatList
                        data={filteredData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </ThemedView>
        </SafeAreaView>
    );
}
