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
import { api_url } from "../_layout";
import { useThemeColor } from "@/hooks/useThemeColor";

interface UserData {
    username: string;
    email: string;
    password: string;
}

interface FormErrors {
    username?: string;
    email?: string;
    password?: string;
}

export default function Signup() {
    const [userData, setUserData] = useState<UserData>({
        username: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const backgroundColor = useThemeColor({},'background');

    const validateInputs = (): boolean => {
        const newErrors: FormErrors = {};

        if (!userData.username) {
            newErrors.username = "Username is required.";
        } else if (!/^[a-zA-Z0-9._-]+$/.test(userData.username)) {
            newErrors.username = "Username can only contain letters, numbers, and _ . -";
        }

        if (!userData.email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
            newErrors.email = "Email is invalid.";
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
        let sanitizedValue = value;
    
        if (field === "username") {
            if (/[^a-zA-Z0-9._-]/.test(value)) {
                setErrors({ ...errors, [field]: 'Username can only contain letters, numbers, ".", "_", and "-" ' });
                return; 
            }
        }
    
        if (field === "email") {
            sanitizedValue = value.toLowerCase(); 
        }
    
        setUserData({ ...userData, [field]: sanitizedValue });
        setErrors({ ...errors, [field]: undefined });
    };
    
    const handleSubmit = async () => {
        if (validateInputs()) {
            try {
                const response = await fetch(`${api_url}/auth/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Signup failed.");
                }

                Alert.alert("Success", "Account created successfully!");
                router.navigate('/auth/login'); 
            } catch (error: any) {
                Alert.alert("Error", error.message);
            }
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={backgroundColor} />
            <ThemedView style={{ flex: 1 }}>
                <PageTitle onPress={() => router.navigate('/')} />
                <ScrollView>
                    <View style={{ flex: 1, alignItems: "center", marginTop: 80, gap: 8 }}>
                        <ThemedText type="h2">Create an account</ThemedText>
                        <View style={{
                            paddingHorizontal: 22,
                            gap: 10,
                            paddingTop: 30
                        }}>
                            <ThemedInput
                                placeholder={"Enter Username"}
                                errorText={errors.username}
                                onChangeText={(text: string) => handleInputChange("username", text)}
                            />
                            <ThemedInput
                                placeholder={"Your Email"}
                                errorText={errors.email}
                                onChangeText={(text: string) => handleInputChange("email", text)}
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
                        title="Continue"
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
