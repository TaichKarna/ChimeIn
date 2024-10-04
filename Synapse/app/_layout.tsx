import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";

let api_url = "http://192.168.29.112:3000/api"

export { api_url }

const queryClient = new QueryClient();

export default function RootLayout() {

  const [fontsloaded, error] = useFonts({
    black: require("../assets/fonts/static/Mulish-Black.ttf"),
    regular: require("../assets/fonts/static/Mulish-Regular.ttf"),
    bold: require("../assets/fonts/static/Mulish-Bold.ttf"),
    medium: require("../assets/fonts/static/Mulish-Medium.ttf"),
    // mediumItalic: require("../assets/fonts/static/Mulish-MediumItalic.ttf"),
    // semiBoldItalic: require("../assets/fonts/static/Mulish-SemiBoldItalic.ttf"),
    semiBold: require("../assets/fonts/static/Mulish-SemiBold.ttf")
  })

  const onLayoutRootView = useCallback(async () => {
    if(fontsloaded || error) {
      await SplashScreen.hideAsync();
    }
  },[fontsloaded,error])

  if(!fontsloaded && !error) return null;


  return (
   <QueryClientProvider client={queryClient}>
     <SafeAreaProvider >
      <Stack 
      screenOptions={{headerShown: false}}>
          <Stack.Screen name="index" />
      </Stack>
    </SafeAreaProvider>
   </QueryClientProvider>
  );
}
