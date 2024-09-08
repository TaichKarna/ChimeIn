import PageTitle from "@/components/PageTitle";
import { router } from "expo-router";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PhoneNumber(){
    return(
        <SafeAreaView style={{flex:1}}>
            <PageTitle onPress={() => router.navigate('/')}/>
            <ScrollView>
                <View style={{flex:1, alignItems: "center"}}>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}