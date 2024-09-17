import Button from "@/components/buttons/Button";
import PageTitle from "@/components/PageTitle";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet, Image, Modal, TouchableWithoutFeedback, FlatList } from "react-native";
import { TouchableOpacity , Pressable} from "react-native";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useColorScheme } from "react-native";
import auth from '@react-native-firebase/auth'
import OTPTextInput from 'react-native-otp-textinput'

export default function PhoneNumber(){
    const [modalVisible, setModalVisible] = useState(false);
    const [country ,setCountry] = useState<any>(null);
    const [countries, setCountries] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [confirm, setConfirm] = useState(null);
    const inputBg = useThemeColor({},'inputbg');
    const inputtxt = useThemeColor({},'inputtxt')
    const theme = useColorScheme();
    const resendClr = theme === 'light' ? COLORS.brandDefault : COLORS.neutralOffWhite;

    console.log(confirm)

    useEffect( () => {
        const getData = async() => {
            try{
                const res = await fetch("https://restcountries.com/v2/all");
                console.log(res, "res is")
                const data = await res.json();
                const countryData = data.map((ele : any) => {
                    return {
                        code: ele.alpha2Code,
                        name: ele.name,
                        callingCodes: Number(ele.callingCodes[0]),
                        flag: `https://flagsapi.com/${ele.alpha2Code}/flat/64.png`
                    }
                })
                setCountries(countryData);
                if(countryData.length > 0){
                    let defaultData = countryData.filter((a : any) => a.code === "US")
    
                    if(defaultData.length > 0) setCountry(defaultData[0]);

                }
            } catch(error){
                console.log(error);
            }

        }
        getData()

    },[])

    const signInWithNumber = async () => {
        try{
            const confirmation = await auth().signInWithPhoneNumber(`+${country.callingCodes}${phoneNumber}`);
            setConfirm(confirmation);
            console.log(confirmation)
        } catch(error) {
            console.log(error)
        }
    }

    const confirmCode = async(code: string) => {
        if(code.length < 6) return;
        
        try{
            await confirm.confirm(code)
            router.navigate('/profile')
        }catch(error){
            console.log(error);
        }
    }

    function CountryCodeModal(){
        const renderItems = ({ item } : any ) => {
            return (
                <TouchableOpacity style={{
                    padding: 10,
                    flexDirection: "row"
                }} onPress={() => {
                    setCountry(item);
                    setModalVisible(false);
                }}>
                    <Image
                        source={{uri : item.flag}}
                        style={{
                            height: 30,
                            width: 30,
                            marginRight: 10
                        }}
                    />
                    <Text style={{ ...FONTS.body2, color: COLORS.neutralOffWhite
                    }}>{item.name}</Text>
                </TouchableOpacity>
            )
        }
        return(
            <Modal
             animationType="slide"
             transparent={true}
             visible={modalVisible}
             >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View style={{
                        flex:1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            height: 500,
                            width: SIZES.width * 0.8,
                            backgroundColor: COLORS.neutralDark,
                            borderRadius: SIZES.padding2
                        }}>
                            <FlatList data={countries}
                            renderItem={renderItems}
                            keyExtractor={(country : any) => country.code }
                            showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </Modal>
        )
    }

    if(!confirm)
        return (
        <SafeAreaView style={{flex:1}}>
            <ThemedView style={{flex: 1}}>
            <PageTitle onPress={() => router.navigate('/')}/>
            <ScrollView>
                <View style={{flex:1, alignItems: "center",  marginTop: 80, gap: 8}}>
                    <ThemedText type="h2">
                        Enter Your Phone Number
                    </ThemedText>
                    <ThemedText 
                        type="body2"
                        style={{ textAlign:"center", marginHorizontal: 50,}}
                    >
                        Please Confirm your country code and enter your phone number
                    </ThemedText>
                    <View style={{
                        width: "100%",
                        paddingHorizontal:22,
                        paddingVertical: 60,
                    }}>
                        <View
                         style={{
                            flexDirection: "row",
                            alignItems:"center",
                            marginBottom: 88,
                         }}>
                            <TouchableOpacity style={{
                                width: 120,
                                height:48,
                                marginHorizontal: 5,
                                backgroundColor: COLORS.neutralOffWhite,
                                flexDirection: "row",
                                borderRadius: SIZES.padding,
                                paddingHorizontal: SIZES.padding
                            }} onPress={() => setModalVisible(true)}>
                                <View style={{justifyContent: "center"}}>
                                    <Image source={require("../assets/images/down.png")}
                                    style={{
                                        width: 10,
                                        height: 10,
                                        tintColor: COLORS.neutralDisabled
                                    }}/>
                                </View>
                                <View style={{justifyContent:"center", marginLeft: 5
                                }}>
                                    <Image  source = {country? {uri: country.flag} : require("../assets/images/us-flag.jpg")}
                                    resizeMode="contain"
                                    style={{
                                        width:30,
                                        height:30
                                    }}/>
                                </View>
                                <View style={{
                                    justifyContent:"center",
                                    marginLeft: 5
                                }}>
                                    <Text style={{
                                        color : COLORS.neutralDisabled,
                                        ...FONTS.body2
                                    }}>
                                        {!country ? "+ 1": `+ ${country.callingCodes}`}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TextInput style={{
                                flex: 1,
                                marginVertical: 10,
                                backgroundColor: COLORS.neutralOffWhite,
                                color: COLORS.neutralDisabled,
                                ...FONTS.body2,
                                height: 48,
                                borderRadius: SIZES.padding,
                                paddingHorizontal: 10,
                            }}
                            placeholder="Phone Number"
                            keyboardType="numeric"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            />

                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{width: "100%", paddingHorizontal: SIZES.padding4, position: 'absolute', bottom: 30}}>
                <Button title="Continue"
                onPress={ signInWithNumber }
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
            {countries && <CountryCodeModal/> }
            </ThemedView>
        </SafeAreaView>
    )

    return(
        <SafeAreaView style={{flex: 1}}>
            <ThemedView style={{flex: 1}}>
                <PageTitle onPress={() => router.navigate('/')}/>
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
                            width: 30,
                            height: 30,
                            color: inputtxt
                        }}
                        inputCount={6}
                        handleTextChange={confirmCode}
                        />
                    </View>
                    <Pressable onPress={signInWithNumber}>
                    <Text style={{color: resendClr, ...FONTS.sh2 }} >
                        Resend OTP
                    </Text>
                </Pressable>
                </View>

            </ThemedView >
        </SafeAreaView>
    )
}

