import PageTitle from "@/components/PageTitle";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileSvg from '../../assets/svgIcons/profileSvg';
import { View, Image, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { AntDesign } from "@expo/vector-icons";
import { ThemedInput } from "@/components/ThemedInput";
import { SIZES } from "@/constants/theme";
import Button from "@/components/buttons/Button";
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { saveUserData, getUserData } from "@/store/userData"; 
import { colorUtils } from "@/hooks/getColors";
import { getToken } from "@/store/authToken";
import { api_url } from "../_layout";

type UserData = {
    displayName: string,
    profilePicture?: string,
    username: string
};

export default function Profile() {
    const [userData, setUserData] = useState<UserData>({
        displayName: '',
        profilePicture: '',
        username: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ displayName?: string; username?: string }>({});
    const inputBg = colorUtils.inputBackgroundColor();
    const textColor = colorUtils.textColor();

    useEffect(() => {
        const getUserName = async () => {
            const { username } = await getUserData();
            setUserData({ ...userData, username: username });
        };
        getUserName();
    }, []);

    const saveUser = async () => {
        setLoading(true);
        let hasError = false;
        const newErrors: { [key: string]: string } = {};
        const { id } = await getUserData(); 
        const token  = await getToken();

        if (!userData.displayName) {
            newErrors.displayName = "Display Name is required.";
            hasError = true;
        }

        if (!userData.username || userData.username.startsWith("Username: ")) {
            newErrors.username = "Username is required.";
            hasError = true;
        }

        

        setErrors(newErrors);

        if (hasError) {
            setLoading(false)
            return; 
        }

        const formData : any = new FormData();
        let profileUrl = ""
        
        if (userData.profilePicture) {

            const parts = userData.profilePicture.split('.');
            const fileType = parts[parts.length - 1];

            formData.append('file', {
                uri: userData.profilePicture,
                type: `image/${fileType}`,
                name: `profile.${fileType}`
            });

            try {
                const response = await fetch(`${api_url}/uploads/images`, {
                    method: 'POST',
                    headers: {
                    'Content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`, 
                },
                    body: formData,
                });
    
                const data = await response.json();
    
                if (!response.ok) {
                    throw new Error(data.message || "Uploading profile picture failed.");
                }
                profileUrl = data.url
            
            } catch (error: any) {
                setLoading(false);
                Alert.alert("Error", error.message);
            }

        }


        try {
            const response = await fetch(`${api_url}/user/update/${id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
                body: JSON.stringify({...userData, profilePicture: profileUrl}),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Update failed.");
            }
            await saveUserData(data)
            Alert.alert("Success", "Profile update successful!");
            router.navigate('/auth/'); 
        } catch (error: any) {
            setLoading(false)
            Alert.alert("Error", error.message);
        }
    };

    const handleImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setUserData({ ...userData, profilePicture: result.assets[0].uri });
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ThemedView style={{ flex: 1 }}>
                <PageTitle
                    onPress={() => router.navigate('/auth/login')}
                    title="Your Profile"
                />
                <View style={{ flex: 1, alignItems: "center", marginTop: 80 }}>
                    <View style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        backgroundColor: inputBg,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} onTouchEnd={handleImagePicker}>
                        {userData.profilePicture ? (
                            <Image
                                source={{ uri: userData.profilePicture }}
                                style={{ width: 100, height: 100, borderRadius: 50 }}
                            />
                        ) : (
                            <ProfileSvg fill={textColor}/>
                        )}
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
                    <View style={{ width: "100%", paddingHorizontal: 22, marginTop: 30 }}>
                        <ThemedInput
                            id="displayName"
                            placeholder="Display Name"
                            value={userData.displayName}
                            onChangeText={(text: string) => setUserData({ ...userData, displayName: text })}
                            errorText={errors.displayName}
                        />
                        <ThemedInput
                            id="username"
                            placeholder="Username"
                            value={userData.username}
                            underlineColorAndroid={'transparent'}
                            disabled
                            editable={false}
                            onChangeText={(text: string) => setUserData({ ...userData, username: text })}
                            errorText={errors.username}
                        />
                    </View>
                </View>
                <View style={{ width: "100%", paddingHorizontal: SIZES.padding4, position: 'absolute', bottom: 30 }}>
                    <Button title="Save"
                        onPress={saveUser}
                        style={{
                            width: "100%",
                            alignItems: "center",
                            paddingVertical: SIZES.padding2,
                            borderRadius: SIZES.radius,
                            paddingHorizontal: SIZES.padding2
                        }}
                        disabled={loading}
                    />
                </View>
            </ThemedView>
        </SafeAreaView>
    );
}
