import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import {  Pressable, View, Text, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OTPTextInput from 'react-native-otp-textinput';
import { useState } from "react";
import Button from "@/components/buttons/Button";
import { useThemeColor } from "@/hooks/useThemeColor";
import { COLORS, FONTS } from "@/constants/theme";
import { useBoundStore } from "@/store/store";

export default function Verification(){
    const [otp, setOtp] = useState(0);
    const inputBg = useThemeColor({},'inputbg');
    const inputtxt = useThemeColor({},'inputtxt')
    const theme = useColorScheme();
    const resendClr = theme === 'light' ? COLORS.brandDefault : COLORS.neutralOffWhite;
    const confirm = useBoundStore((state) => state.confirm)
    console.log(confirm)

    const confirmCode = async(code: string) => {
        if(code.length < 4) return;
        
        try{
            await confirm.confirm(code)
            router.navigate('/profile')
        }catch(error){
            console.log(error);
        }
    }

    return(
        <SafeAreaView style={{flex: 1}}>
            <ThemedView style={{flex: 1}}>
                <PageTitle onPress={() => router.navigate('/phone-enter')}/>
                <View style={{flex: 1, alignItems: 'center', marginHorizontal: 22, marginTop: 80}}>
                    <ThemedText type="h2" style={{marginBottom: 8}}>
                        Enter Code
                    </ThemedText>
                    <ThemedText style={{textAlign: 'center', marginHorizontal: 40}} type="body2">
                        We have sent you an SMS with the code to
                    </ThemedText>
                    <ThemedText type="body2" style={{marginHorizontal: 50}}>
                        to +91 8888 8888
                    </ThemedText>
                    <View style={{
                        marginVertical: 60
                    }}>
                        <OTPTextInput
                        textInputStyle={{
                            backgroundColor: inputBg,
                            borderRadius: 60,
                            borderBottomWidth: 0,
                            width: 50,
                            height: 50,
                            color: inputtxt
                        }}
                        inputCount={4}
                        handleTextChange={confirmCode}
                        />
                    </View>
                    <Pressable onPress={() => router.navigate('/profile')}>
                    <Text style={{color: resendClr, ...FONTS.sh2 }}>
                        Resend OTP
                    </Text>
                </Pressable>
                </View>

            </ThemedView >
        </SafeAreaView>
    )
}