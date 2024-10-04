import { View,  Pressable, TouchableOpacity, Image, FlatList, StatusBar, Modal , Text, Alert} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import {  MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import  { ThemedInput } from "@/components/ThemedInput";
import { useState} from "react";
import {  SIZES } from "@/constants/theme";
import Button from "@/components/buttons/Button";
import { getToken } from "@/store/authToken";
import { api_url } from "@/app/_layout";


export type FormErrors = {
    friend?: string
}


export default function AddFriendsModal({
    modalVisible, 
    setModalVisible,textColor } : {modalVisible: boolean, textColor: string, setModalVisible: any}){

    const [friend, setFriend] = useState<string>();
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = (field: keyof FormErrors, value: string) => {
        setFriend(value)
        setErrors({ ...errors, [field]: undefined }); 
    };


    const handleSubmit = async () => {
        const token = await getToken()
        if(friend?.trim() === "" || !friend){
            setErrors({...errors, friend: "Username is required"})
        }

        setLoading(true);

        try {
            const response = await fetch(`${api_url}/invites`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ receiverUsername: friend?.trim()}),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Friend request failed.");
            }

            Alert.alert("Sent", `Friend request sent to ${friend}`)
            setModalVisible(false);
            setLoading(false)
        } catch (error: any) {
            setLoading(false);
            Alert.alert("Error", error.message);
        }
    };

    return (
        <Modal
        animationType="slide"
        visible={modalVisible}
        style={{width: '100%'}}
    >
        <ThemedView style={{flex: 1, paddingHorizontal: 24, paddingVertical: 16}}>
            <Pressable onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={24} color={textColor} />
            </Pressable>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                gap: 15,
                paddingTop: 80,
            }}>
                <View style={{
                    
                }}>
                    <ThemedText type="sh1">Add a friend by Username</ThemedText>
                </View>
                <ThemedInput
                    placeholder={"Enter username"}
                    errorText={errors.friend}
                    onChangeText={(text: string) => handleInputChange('friend', text)}
                />
            </View>
        </ThemedView>
        <View style={{ width: "100%", paddingHorizontal: SIZES.padding4, position: 'absolute', bottom: 30 }}>
            <Button title="Send Request"
                style={{
                    width: "100%",
                    alignItems: "center",
                    paddingVertical: SIZES.padding2,
                    borderRadius: SIZES.radius,
                    paddingHorizontal: SIZES.padding2
                }}
                disabled={loading}
                onPress={handleSubmit}
            />
        </View>
    </Modal>
    )
}