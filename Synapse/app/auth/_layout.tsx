import { SplashScreen, Stack } from "expo-router";

export default function AuthLayout() {
  
  return (
      <Stack 
      screenOptions={{headerShown: false}}>
        <Stack.Screen name="index" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="login" />
      </Stack>
  );
}
