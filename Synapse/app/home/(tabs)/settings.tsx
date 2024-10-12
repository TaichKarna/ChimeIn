import { Text, View, Button, TextInput } from "react-native";
import { useState } from "react";
import useSendMessage from "@/hooks/useSendMessage"; // Adjust the import path according to your project structure
import { IMessage } from 'react-native-gifted-chat';

export default function Settings() {
    const [messageText, setMessageText] = useState(""); 
    const sendMessage = useSendMessage(); 

    const user = { _id: "user1", name: "User One" }; // Replace with actual user data
    const chatId = "chatRoom1"; // Replace with actual chat ID

    const handleSend = () => {
        if (messageText.trim()) {
            const message: IMessage = {
                _id: Date.now(), // Unique ID for the message
                text: messageText,
                createdAt: new Date(),
                user,
            };

            sendMessage(chatId, message); // Send the message using the hook
            setMessageText(""); // Clear the input field after sending
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Settings</Text>
            <TextInput
                placeholder="Type your message"
                value={messageText}
                onChangeText={setMessageText}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    marginVertical: 10,
                }}
            />
            <Button title="Send Message" onPress={handleSend} />
        </View>
    );
}
