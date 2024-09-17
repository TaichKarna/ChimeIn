import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useCallback, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Contacts from 'expo-contacts';


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

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Contacts.requestPermissionsAsync();
  //     if (status === 'granted') {
  //       const { data } = await Contacts.getContactsAsync({
  //         fields: [Contacts.Fields.Emails],
  //       });

  //       if (data.length > 0) {
  //         const contact = data[0];
  //         console.log(contact);
  //       }
  //     }
  //   })();
  // }, []);




  return (
    <SafeAreaProvider>
      <Stack 
      screenOptions={{headerShown: false}} >
        <Stack.Screen name="index" />
        <Stack.Screen name="phone-enter" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="home/(tabs)" />
        <Stack.Screen name="chats"  />
      </Stack>
    </SafeAreaProvider>
  );
}
