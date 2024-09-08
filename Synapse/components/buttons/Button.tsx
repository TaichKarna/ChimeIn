import { TouchableOpacity } from "react-native"
import { StyleSheet, View, Text } from "react-native"
import { COLORS, FONTS, SIZES } from "@/constants/theme"

export default function Button(props : any){
    const enabledBgColor = props.color || COLORS.brandDefault;
    const disabledBgColor = COLORS.neutralDisabled;
    const bgColor = props.disabled ? disabledBgColor: enabledBgColor;

    return(
        <TouchableOpacity
        onPress={props.onPress}
        style={{
            ...styles.btn,
            backgroundColor: bgColor,
            ...props.style
        }}>
            <Text
                style={{
                    ...FONTS.button,
                    color: props.disabled ? COLORS.brandDefault : COLORS.neutralWhite,
                    
                }}
            >
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        paddingHorizontal: SIZES.padding2,
        paddingVertical: SIZES.padding3,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.padding,
        borderColor: COLORS.brandDefault
    }
})