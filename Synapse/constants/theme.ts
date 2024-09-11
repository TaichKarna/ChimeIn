import { Dimensions } from "react-native";
import { LightSpeedInRight } from "react-native-reanimated";
import { green } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

const { height, width } = Dimensions.get("window");

export const COLORS = {
    brandDark: "#001A83" , // used for on pressed
    brandDefault: "#002DE3", // used for button
    brandDarkMode: "#375FFF", // used for dark mode 
    brandLight: "#879FFF", 
    brandBackground: "#D2D5F9", // used for bakcground

    neutralActive : "#0F182B", // used for font
    neutralDark : "#152033",  //used for dark mode background
    neutralBody : "#1B2B4B",  // used for text
    neutralWeak : "#A4A4A4",  // used for secondary text
    neutralDisabled : "#ADB5BD", // disabled
    neutralLine : "#EDEDED", // line divider
    neutralOffWhite : "#F7F7FC",// secondary white
    neutralWhite : "#FFFFFF", // background

    accentDanger : "#E94242",
    accentWarning : "#FDCF41",
    accentSuccess : "#2CC069",
    accentSafe : "#7BCBCF",
}



export const SIZES = {
    ///global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,
    padding3: 16,
    padding4: 22,

    ///font sizes

    h1: 32, //headings
    h2: 24,
    sh1: 18, // subheadings
    sh2: 16,
    body1: 14, // body
    body2: 14,
    md1: 12,
    md2: 10,
    md3: 10, // metadata

    ///app dimensions
   width,
   height
}

export const FONTS = {
    h1: { fontFamily: 'bold', fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: 'bold', fontSize: SIZES.h2, lineHeight: 30 },
    sh1: { fontFamily: 'semiBold', fontSize: SIZES.sh1, lineHeight: 30 },
    sh2: { fontFamily: 'semiBold', fontSize: SIZES.sh2, lineHeight: 28 },
    body1: { fontFamily: 'semiBold', fontSize: SIZES.body1, lineHeight: 24 },
    body2: { fontFamily: 'regular', fontSize: SIZES.body2, lineHeight: 24 },
    md1: {fontFamily: 'regular', fontSize: SIZES.md1, lineHeight: 20},
    md2: {fontFamily: 'regular', fontSize: SIZES.md2, lineHeight: 16},
    md3: {fontFamily: 'semiBold', fontSize: SIZES.md3, lineHeight: 16}


}

const appTheme =  { COLORS, SIZES, FONTS };

export default appTheme;