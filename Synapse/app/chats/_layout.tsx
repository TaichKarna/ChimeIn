import { Stack } from "expo-router"

export default function ChatLayout(){
    return(
        <Stack 
        screenOptions={{headerShown: false}} >
          <Stack.Screen name="[chatId]" />
        </Stack>
    )
}