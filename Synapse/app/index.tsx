import { Text, View, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import Button from "@/components/buttons/Button";
import { router } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.neutralWhite}}>
    <View
        style={{
            flex:1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        }}
    >
        <Image
            width={SIZES.width * 0.7}
            height={SIZES.height * 0.7}
            source={require("../assets/images/illustration.png")}
            style={{
                marginBottom: 50
            }}
        />
        <Text
         style = {{
            ...( SIZES.width <= 360 ?
                {...FONTS.h2}:
                {...FONTS.h1}
            ),
            textAlign: 'center',
            marginHorizontal: SIZES.padding3 * 2
         }}>
            Connect easily with your family and friends over countries
        </Text>
        <View style={{
            width: "100%",
            alignItems:"center",
            justifyContent: "flex-end",
            position: "absolute",
            bottom: 30,
        }}>
            <Text
            style={{
                ...FONTS.body4,
                marginVertical: 12
            }}
            >
                Terms and Privacy Policy
            </Text>
            <View style={{width: "100%", paddingHorizontal: SIZES.padding3}}>
                <Button title="Start Messaging"
                onPress={ () => router.navigate("/phone-enter")}
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
    </View>
</SafeAreaView>
  );
}
