import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { SIZES,FONTS, COLORS } from '@/constants/theme'

export default function PageTitle(props: any){
    return(
        <View style={styles.pageTitle}>
        <TouchableOpacity
        onPress={props.onPress}
        style={{
            marginRight: SIZES.padding2
        }}>
            <MaterialIcons name="keyboard-arrow-left"
            size={SIZES.padding2 * 2}
            color={COLORS.neutralActive}/>
        </TouchableOpacity>
        {
            props.title && (
                <Text style={{
                    ...FONTS.subHeading1
                }}>
                    {props.title}
                </Text>
            )
        }
     </View> 
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