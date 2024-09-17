import { StyleSheet, TouchableOpacity} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { SIZES } from '@/constants/theme'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'

export default function PageTitle(props: any){
    return(
        <ThemedView style={styles.pageTitle}>
        <TouchableOpacity
        onPress={props.onPress}
        style={{
            marginRight: SIZES.padding2
        }}>
            <ThemedText>
                <MaterialIcons name="keyboard-arrow-left"
                size={SIZES.padding2 * 2}
                color={"currentColor"}/>
            </ThemedText>
        </TouchableOpacity>
        {
            props.title && (
                <ThemedText type="sh1">
                    {props.title}
                </ThemedText>
            )
        }
     </ThemedView> 
    )
}

const styles = StyleSheet.create({
    pageTitle: {
        marginHorizontal: 22,
        marginVertical: 22,
        flexDirection: "row",
        alignItems: "center"      
    }
})