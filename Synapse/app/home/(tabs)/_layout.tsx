import { COLORS, FONTS } from "@/constants/theme"
import { Tabs, useSegments } from "expo-router"
import { Text, View } from "react-native"
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons"

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
                                        <Feather
                                            name="users"
                                            size={24}
                                            color={COLORS.neutralActive}
                                        />
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
                                        <Ionicons
                                            name="chatbubble-outline"
                                            size={24}
                                            color={COLORS.neutralActive}
                                            
                                        />
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
                                        <Feather
                                            name="more-horizontal"
                                            size={24}
                                            color={COLORS.neutralActive}
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