/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { COLORS } from "./theme";


export const Colors = {
  light: {
    text: COLORS.neutralActive,
    background: COLORS.neutralWhite,
    buttonBg: COLORS.brandDefault,
    buttonText: COLORS.neutralOffWhite
  },
  dark: {
    text: COLORS.neutralOffWhite,
    background: COLORS.neutralDark,
    buttonBg: COLORS.brandDarkMode,
    buttonText: COLORS.neutralOffWhite
  },
};
