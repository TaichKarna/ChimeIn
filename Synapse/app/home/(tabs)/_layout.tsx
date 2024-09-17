import { COLORS, FONTS } from "@/constants/theme"
import { Tabs, useSegments } from "expo-router"
import { Text, View } from "react-native"
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons"
import ChatLogo from "@/assets/svgIcons/ChatLogo"
import MoreLogo from "@/assets/svgIcons/MoreLogo"
import ContactsLogo from "@/assets/svgIcons/ContactsLogo"
import { useThemeColor } from "@/hooks/useThemeColor"

export default function TabLayout(){
    const segment = useSegments()
    const txtClr = useThemeColor({}, 'text');
    const bgBlr = useThemeColor({}, 'background')
    return(
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
                position: "absolute",
                backgroundColor: bgBlr,
                bottom: 0,
                right: 0,
                left: 0,
                elevation: 0,
                height: 60,
                borderWidth: 0,
                borderTopColor: 'transparent'
            },
            
        }}>
            <Tabs.Screen
                name="contacts"
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <View style={{
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                {
                                    focused ? (
                                    <>
                                        <Text style={{
                                            ...FONTS.body1,
                                            color: txtClr
                                        }}>
                                            Contacts
                                        </Text>
                                        <FontAwesome name="circle" size={8} color={txtClr}/>
                                    </> 
                                    ) : (
                                        <ContactsLogo style={{
                                            color: txtClr
                                        }}/>
                                    )
                                }

                            </View>
                        )
                    }
                }}
            />
            <Tabs.Screen
                name="chats"
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <View style={{
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                {
                                    focused ? (
                                    <>
                                        <Text style={{
                                            ...FONTS.body1,
                                            color: txtClr
                                        }}>
                                            Chats
                                        </Text>
                                        <FontAwesome name="circle" size={8} color={txtClr}/>
                                    </> 
                                    ) : (
                                        <ChatLogo style={{
                                            color: txtClr
                                        }}/>
                                    )
                                }

                            </View>
                        )
                    },
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <View style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                {
                                    focused ? (
                                    <>
                                        <Text style={{
                                            ...FONTS.body1,
                                            color: txtClr
                                        }}>
                                            More
                                        </Text>
                                        <FontAwesome name="circle" size={8} color={txtClr}/>
                                    </> 
                                    ) : (
                                        <MoreLogo style={{
                                            color: txtClr
                                        }}
                                            color={txtClr}
                                        />
                                    )
                                }

                            </View>
                        )
                    }
                }}
            />
        </Tabs>
    )
}