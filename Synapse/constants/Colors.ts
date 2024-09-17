/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { COLORS } from "./theme";

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: COLORS.neutralActive,
    background: COLORS.neutralWhite,
    tint: tintColorLight,
    icon: COLORS.neutralActive,
    button: COLORS.brandDefault,
    inputtxt: COLORS.neutralDisabled,
    inputbg: COLORS.neutralOffWhite
  },
  dark: {
    text: COLORS.neutralOffWhite,
    background: COLORS.neutralActive,
    tint: tintColorDark,
    icon: '#9BA1A6',
    button: COLORS.brandDarkMode,
    inputbg: COLORS.neutralDark,
    inputtxt: COLORS.neutralOffWhite
  },
};
