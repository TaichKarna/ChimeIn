import { COLORS, FONTS } from "@/constants/theme"
import { Tabs, useSegments } from "expo-router"
import { Text, View } from "react-native"
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons"
import ChatLogo from "@/assets/svgIcons/ChatLogo"
import MoreLogo from "@/assets/svgIcons/MoreLogo"
import ContactsLogo from "@/assets/svgIcons/ContactsLogo"

export default function TabLayout(){
    const segment = useSegments()
    return(
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
                position: "absolute",
                backgroundColor: COLORS.neutralWhite,
                bottom: 0,
                right: 0,
                left: 0,
                elevation: 0,
                height: 60
            }
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
                                            ...FONTS.body3,
                                            color: COLORS.neutralActive
                                        }}>
                                            Contacts
                                        </Text>
                                        <FontAwesome name="circle" size={8} color={COLORS.neutralDark}/>
                                    </> 
                                    ) : (
                                        <ContactsLogo style={{
                                            color: COLORS.neutralActive
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
                                            ...FONTS.body3,
                                            color: COLORS.neutralActive
                                        }}>
                                            Chats
                                        </Text>
                                        <FontAwesome name="circle" size={8} color={COLORS.neutralDark}/>
                                    </> 
                                    ) : (
                                        <ChatLogo style={{
                                            color: COLORS.neutralActive
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
                                            ...FONTS.body3,
                                            color: COLORS.neutralActive
                                        }}>
                                            More
                                        </Text>
                                        <FontAwesome name="circle" size={8} color={COLORS.neutralDark}/>
                                    </> 
                                    ) : (
                                        <MoreLogo style={{
                                            color: COLORS.neutralActive
                                        }}/>
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