import { Text, View, Image, Pressable, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {  FONTS, SIZES } from "@/constants/theme";
import Button from "@/components/buttons/Button";
import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function Index() {
 const theme = useColorScheme() ?? 'light';

  return (
    <SafeAreaView style={{flex: 1}}>
    <ThemedView
        style={{
            flex:1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        }}
    >
        <Image
            width={SIZES.width * 0.7}
            height={SIZES.height * 0.7}
            source={theme === 'light' ? require("../assets/images/illustration.png") : require('../assets/images/welcomeDark.png')}
            style={{
                marginBottom: 30,
                
            }}
        />
        <ThemedText
         style = {{
            ...( SIZES.width <= 360 ?
                {...FONTS.h2}:
                {...FONTS.h1}
            ),
            textAlign: 'center',
            marginHorizontal: SIZES.padding3 * 2
         }}>
            Connect easily with your family and friends over countries
        </ThemedText>
        <View style={{
            width: "100%",
            alignItems:"center",
            justifyContent: "flex-end",
            position: "absolute",
            bottom: 30,
        }}>
            <ThemedText
            style={{
                marginVertical: 12
            }}
            type="body1"
            >
                Terms and Privacy Policy
            </ThemedText>
            <View style={{width: "100%", paddingHorizontal: SIZES.padding3}}>
                <Button title="Start Messaging"
                onPress={ () => router.navigate("/profile")}
                style={{
                    width: "100%",
                    alignItems:"center",
                    paddingVertical: SIZES.padding2,
                    borderRadius: SIZES.radius,
                    paddingHorizontal: SIZES.padding2   
                 }}
                    disabled={false}
                />
            </View>
        </View>
    </ThemedView>
</SafeAreaView>
  );
}
