import { StatusBar } from "react-native";
import { ThemedView } from "./ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";


export default function PageContainer({children} : any){
    const bgColor = useThemeColor({}, 'background')

    return(
        <>  
            <SafeAreaView style={{flex: 1}}>
                <ThemedView style={{flex: 1}}>
                    {children}
                </ThemedView>
            </SafeAreaView>
        </>
    )
}