import { View,  TouchableOpacity, Image, Pressable} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { COLORS, SIZES } from "@/constants/theme";
import { colorUtils } from "@/hooks/getColors";
import { Entypo } from "@expo/vector-icons";


export default function FriendRequestList({item, index, handleRequest} : any){
    return (
        <View
            key={index}
            style={{
                width: "100%",
                paddingHorizontal: 24,
                paddingVertical: 5,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}
        >
            <View style={{
                flexDirection: "row",
                alignItems: 'flex-start',
            }}>
                <View style={{
                    marginRight: 22,
                    justifyContent: "flex-start",
                    padding: 4
                }}>
                    <Image 
                        source={{
                            uri: item.sender.profilePicture
                        }}
                        resizeMode="contain"
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 16
                    }}/>
                </View>
                <View style={{
                    justifyContent: 'flex-start',
                    flexDirection: "column",
                }}>
                    <ThemedText type="body1" style={{marginBottom: 6}}>
                        {item.sender.username}
                    </ThemedText>
                </View>

            </View>
            <View style={{
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 20
                }}>
                    <View style={{
                    }}>
                        <Pressable
                            onPress={() => handleRequest(item, 'ACCEPTED')}
                        >
                            <ThemedText>
                                <Entypo name="check" size={26} color={COLORS.accentSuccess}/>
                            </ThemedText>
                    </Pressable>
                    </View>
                    <View style={{

                    }}>
                        <Pressable 
                            onPress={() => handleRequest(item, 'REJECTED')}
                        >
                            <ThemedText>
                                <Entypo name="cross" size={28} color={COLORS.accentDanger}/>
                            </ThemedText>
                    </Pressable>
                    </View>
                </View>
        </View>
    )
}