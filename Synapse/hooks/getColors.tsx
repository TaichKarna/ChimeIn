import { Appearance } from "react-native";
import { Colors } from '@/constants/Colors';

export default function getColors(colorName: keyof typeof Colors.light & keyof typeof Colors.dark) {
  const preference = Appearance.getColorScheme() || 'light'; 
  return Colors[preference][colorName];
}

export const colorUtils = {
  textColor: () => getColors('text'),
  backgroundColor: () => getColors('background'),
  buttonColor: () => getColors('button'),
  inputTextColor: () => getColors('inputtxt'),
  inputBackgroundColor: () => getColors('inputbg'),
  lineColor: () => getColors('line'),
  chatBackGroundColor: () => getColors('chatBg'),
  sendButtonColor: () => getColors('send'),
};
