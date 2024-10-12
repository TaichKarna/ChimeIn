import { Redirect,  useRootNavigationState } from "expo-router";

export default function App(){
    const rootNavigation = useRootNavigationState();
    if(!rootNavigation?.key) return null;

    const user = false;

    if(user){
         return <Redirect href="/home/(tabs)/chats"/>
    } 
    
    return <Redirect href="/home/(tabs)/chats/"/>
    
}