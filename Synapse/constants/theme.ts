import { Dimensions } from "react-native";
import { LightSpeedInRight } from "react-native-reanimated";
import { green } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

const { height, width } = Dimensions.get("window");

export const COLORS = {
    brandDark: "#001A83" ,
    brandDefault: "#002DE3",
    brandDarkMode: "#375FFF",
    brandLight: "#879FFF",
    brandBackground: "#D2D5F9",
    neutralActive : "#0F182B",
    neutralDark : "#152033",
    neutralBody : "#1B2B4B",
    neutralWeak : "#A4A4A4",
    neutralDisabled : "#ADB5BD",
    neutralLine : "#EDEDED",
    neutralOffWhite : "#F7F7FC",
    neutralWhite : "#FFFFFF",
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
    largeTitle: 50,
    h1: 30,
    h2: 24,
    h3: 20,
    h4: 18,
   body1: 30,
   body2: 20,
   body3: 16,
   body4: 14,
   body5: 12,
    ///app dimensions
   width,
   height
}

export const FONTS = {
    largeTitle: { fontFamily: 'black', fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: 'bold', fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: 'bold', fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: 'bold', fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: 'bold', fontSize: SIZES.h4, lineHeight: 20 },
    body1: { fontFamily: 'regular', fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: 'regular', fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: 'regular', fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: 'regular', fontSize: SIZES.body4, lineHeight: 24 },
    button: {fontFamily: 'semiBold', fontSize: 16, lineHeight: 30},
    subHeading1: { fontFamily: 'semiBold', fontSize: 18, lineHeight: 30 },

}

const appTheme =  { COLORS, SIZES, FONTS };

export default appTheme;