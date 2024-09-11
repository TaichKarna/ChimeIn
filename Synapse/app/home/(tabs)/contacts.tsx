import { View, Text } from "react-native";
import AddLogo from "@/assets/svgIcons/AddLogo";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import { COLORS } from "@/constants/theme";
import SendArrow from "@/assets/svgIcons/SendArrow";
import { FontAwesome6 } from "@expo/vector-icons";
export default function Contacts(){
    return(
        <SafeAreaView style={{flex: 1, gap: 10}}>
            <Text>Contacts</Text>
            <ScrollView >
                <AddLogo style={{ color: COLORS.neutralActive}}/>
                <SendArrow style={{ color: COLORS.neutralActive, width: 33, height: 33}} />
                <FontAwesome6 name="add" size={24} color="black"/>
            </ScrollView>
        </SafeAreaView>
    )
}