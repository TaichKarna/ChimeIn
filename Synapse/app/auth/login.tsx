import Button from "@/components/buttons/Button";
import PageTitle from "@/components/PageTitle";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SIZES } from "@/constants/theme";
import { router } from "expo-router";
import { useState } from "react";
import { View, ScrollView, StatusBar, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colorUtils } from "@/hooks/getColors";
import { ThemedInput } from '@/components/ThemedInput';
import { storeToken } from "@/store/authToken";
import { saveUserData } from "@/store/userData";
import { api_url } from "../_layout";

interface UserData {
    identifier: string; 
    password: string;
}

interface FormErrors {
    identifier?: string;
    password?: string;
}

export default function Login() {
    const [userData, setUserData] = useState<UserData>({
        identifier: '', 
        password: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const backgroundColor = colorUtils.backgroundColor();

    const validateInputs = (): boolean => {
        const newErrors: FormErrors = {};

        if (!userData.identifier) {
            newErrors.identifier = "Username or Email is required.";
        }

        if (!userData.password) {
            newErrors.password = "Password is required.";
        } else if (userData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; 
    };

    const handleInputChange = (field: keyof UserData, value: string) => {
        setUserData({ ...userData, [field]: value });
        setErrors({ ...errors, [field]: undefined }); 
    };

    const handleSubmit = async () => {
        if (validateInputs()) {
            try {
                const response = await fetch(`${api_url}/auth/signin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });
    
                const data = await response.json();
    
                if (!response.ok) {
                    throw new Error(data.message || "Login failed.");
                }
    
                await storeToken(data.token); 
                await saveUserData(data.user)
    
                Alert.alert("Success", "Login successful!");
                router.navigate('/home/(tabs)/friends'); 
            } catch (error: any) {
                Alert.alert("Error", error.message);
            }
        }
    };
    

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={backgroundColor} />
            <ThemedView style={{ flex: 1 }}>
                <PageTitle onPress={() => router.navigate('/auth/signup')} />
                <ScrollView>
                    <View style={{ flex: 1, alignItems: "center", marginTop: 80, gap: 8 }}>
                        <ThemedText type="h2">Login to your account</ThemedText>
                        <View style={{
                            paddingHorizontal: 24,
                            gap: 10,
                            paddingTop: 30
                        }}>
                            <ThemedInput
                                placeholder={"Enter Username or Email"}
                                errorText={errors.identifier}
                                onChangeText={(text: string) => handleInputChange("identifier", text)}
                                value={userData.identifier}
                            />
                            <ThemedInput
                                placeholder={"Your password"}
                                errorText={errors.password}
                                onChangeText={(text: string) => handleInputChange("password", text)}
                                value={userData.password}
                                secureTextEntry
                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={{ width: "100%", paddingHorizontal: SIZES.padding4, alignSelf: 'flex-end', paddingBottom: 30 }}>
                    <Button
                        title="Login"
                        style={{
                            width: "100%",
                            alignItems: "center",
                            paddingVertical: SIZES.padding2,
                            borderRadius: SIZES.radius,
                            paddingHorizontal: SIZES.padding2
                        }}
                        disabled={false}
                        onPress={handleSubmit} 
                    />
                </View>
            </ThemedView>
        </SafeAreaView>
    );
}
