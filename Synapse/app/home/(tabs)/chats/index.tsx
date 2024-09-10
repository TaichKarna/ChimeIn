import { Link, router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native";
import Button  from "../../../../components/buttons/Button";

export default function Chats(){
    return(
        <SafeAreaView style={{flex:1, top: 100, alignItems: "center", gap: 100}}>
            <Text>Chats</Text>
            <Link href={"../../chats/12"}>
                User 1
            </Link>
            <Link href={"../../chats/11"} onPress={() => router.navigate("../../chats/11")}>
                User 2
            </Link>
            <Link href={"../../chats/13"} onPress={() => router.navigate("../../chats/11")}>
                User 3
            </Link>
        </SafeAreaView>
    )
}