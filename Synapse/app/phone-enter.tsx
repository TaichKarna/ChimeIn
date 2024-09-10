import Button from "@/components/buttons/Button";
import PageTitle from "@/components/PageTitle";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet, Image, Modal, TouchableWithoutFeedback, FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ContryData = {
    code: string,
    name: string,
    flag: string
}

export default function PhoneNumber(){
    const [modalVisible, setModalVisible] = useState(false);
    const [country ,setCountry] = useState(null);
    const [countries, setCountries] = useState([]);

    useEffect( () => {
        const getData = async() => {
            try{
                const res = await fetch("https://restcountries.com/v2/all");
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
                    let defaultData = countryData.filter(a => a.code === "US")
    
                    if(defaultData.length > 0) setCountry(defaultData[0]);

                }
            } catch(error){
                console.log(error);
            }

        }
        getData()

    },[])

    function CountryCodeModal(){
        const renderItems = ({ item } ) => {
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
                    <Text style={{ ...FONTS.body3, color: COLORS.neutralOffWhite
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
                            keyExtractor={(country) => country.code }
                            showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </Modal>
        )
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor: COLORS.neutralWhite }}>
            <PageTitle onPress={() => router.navigate('/')}/>
            <ScrollView>
                <View style={{flex:1, alignItems: "center",  marginTop: 80, gap: 8}}>
                    <Text style={styles.headingText}>
                        Enter Your Phone Number
                    </Text>
                    <Text style={{...FONTS.body4, textAlign:"center", marginHorizontal: 50,}}>
                        Please Confirm your country code and enter your phone number
                    </Text>
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
                                        ...FONTS.body3
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
                                ...FONTS.body3,
                                height: 48,
                                borderRadius: SIZES.padding,
                                paddingHorizontal: 10,
                            }}
                            placeholder="Phone Number"
                            keyboardType="numeric"
                            />

                        </View>
                    </View>
                </View>
            <View style={{width: "100%", paddingHorizontal: SIZES.padding4}}>
                <Button title="Continue"
                onPress={ () => router.navigate("../home")}
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
            </ScrollView>
            {countries && <CountryCodeModal/> }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headingText: {
        ...FONTS.h2,
        color: COLORS.neutralActive,
        marginHorizontal: 40,
    }

})