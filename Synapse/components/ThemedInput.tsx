import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { ThemedText } from "./ThemedText";

export  function ThemedInput(props: any){
    const inputBg = useThemeColor({},'inputbg')
    const inputTxt = useThemeColor({}, 'inputtxt')
    const inputBackgroundColor = props.inputBackgroundColor || inputBg;

    return(
        <View style={styles.container}>
            <View style={[styles.inputContainer, {backgroundColor: inputBackgroundColor}]}>
                <TextInput
                    style={[styles.input, {color: inputTxt}]}
                    {...props}
                    placeholder={props.placeholder}
                    placeholderTextColor={inputTxt}
                    onChange={props.onChange}
                    onChangeText={props.onChangeText}
                />
            </View>{
                props.errorText && (
                    <View style={styles.errorContainer}>
                        <ThemedText type="body1" style={styles.errorText}>
                             {props.errorText}
                        </ThemedText>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: SIZES.padding,
        paddingVertical: 8,
        borderRadius: 8,
        flexDirection: 'row',
        marginVertical: 5
    },
    input: {
        ...FONTS.body1,
        flex: 1,
        paddingTop: 0,
    },
    errorContainer: {
        paddingLeft: 8
    },
    errorText: {
        color: COLORS.accentDanger
    }
})