import PageTitle from "@/components/PageTitle";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileSvg from '../assets/svgIcons/profileSvg'
import { View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { AntDesign } from "@expo/vector-icons";
import ThemedInput from "@/components/ThemedInput";
import { SIZES } from "@/constants/theme";
import Button from "@/components/buttons/Button";
import { createUser } from '../database/database'
import { useState } from "react";

type UserData = {
    firstName: string,
    lastName?: string,
    phoneNumber?: number
}

export default function Profile(){
    const [ userData, setUserData ] = useState<UserData>({
        firstName: '',
        lastName: '',
        phoneNumber: 121231231312
    })
    
    const inputBg = useThemeColor({},'inputbg');
    const inputtxt = useThemeColor({},'inputtxt')

    const saveUser = async() => {
        try{
            const res = await createUser(userData);
            router.navigate('/home')
        } catch(error){
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <ThemedView style={{flex: 1}}>
                <PageTitle 
                    onPress={ () => router.navigate('/verification')} 
                    title="Your Profile"
                />
                <View style={{flex: 1, alignItems: "center", marginTop:80}}>
                    <View style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        backgroundColor: inputBg,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} >
                        <ProfileSvg/>
                        <View style={{
                            position: "absolute",
                            bottom: 0,
                            right: 10
                        }}>
                           <ThemedText>
                            <AntDesign
                                    name="pluscircle"
                                    size={22}
                                    color={"currentColor"}
                                />
                           </ThemedText>
                        </View>
                    </View>
                    <View style={{width:"100%", paddingHorizontal: 22, marginTop: 30}}>
                        <ThemedInput
                            id="firstName"
                            placeholder="First Name (Required)"
                            onTextChange={(text : string) => setUserData({...userData, firstName: text})}
                            Required
                         />
                        <ThemedInput
                            id="lastName"
                            placeholder="Last Name(optional)"
                            onTextChange={(text : string) => setUserData({...userData, lastName: text})}
                         />
                    </View>
                </View>
                <View style={{width: "100%", paddingHorizontal: SIZES.padding4, position: 'absolute', bottom: 30}}>
                <Button title="Save"
                onPress={ saveUser}
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
            </ThemedView>
        </SafeAreaView>
    )
}