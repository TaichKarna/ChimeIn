import { TouchableOpacity } from "react-native"
import { StyleSheet, View, Text } from "react-native"
import { COLORS, FONTS, SIZES } from "@/constants/theme"
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Button(props : any){
    const btnColor = useThemeColor({},'button')
    const enabledBgColor = props.color || btnColor;
    const disabledBgColor = useThemeColor({}, 'disabled');
    const bgColor = props.disabled ? disabledBgColor: enabledBgColor;
    return(
        <TouchableOpacity
        onPress={props.onPress}
        style={{
            ...styles.btn,
            backgroundColor: bgColor,
            ...props.style
        }}>
            <ThemedText
                style={{
                    color: props.disabled ?COLORS.neutralOffWhite : COLORS.neutralWhite,
                }}
            >
                {props.title}
            </ThemedText>
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