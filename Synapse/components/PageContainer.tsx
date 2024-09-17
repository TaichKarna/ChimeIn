import { ReactNode } from "react";
import { ThemedView } from "./ThemedView";

export default function PageContainer({children} : any){
    return(
        <ThemedView style={{flex: 1}}>
            {children}
        </ThemedView>
    )
}