import { Redirect,  useRootNavigationState } from "expo-router";
import { getUser } from "@/database/database";

export default function App(){
    const rootNavigation = useRootNavigationState();
    if(!rootNavigation?.key) return null;

    const user = getUser();

    if(user){
         return <Redirect href="/home/(tabs)/chats"/>
    } 
    
    return <Redirect href="/home/(tabs)/friends"/>
    
}