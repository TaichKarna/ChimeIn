import { Text, type TextProps, StyleSheet } from 'react-native';
import { SIZES } from '@/constants/theme';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'h1' | 'h2' | 'sh1' | 'sh2' | 'body1' | 'body2' | 'md1' | 'md2' | 'md3' ;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'body1',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'h1' ? styles.h1 : undefined,
        type === 'h2' ? styles.h2 : undefined,
        type === 'sh1' ? styles.sh1 : undefined,
        type === 'sh2' ? styles.sh2 : undefined,
        type === 'body1' ? styles.body1 : undefined,
        type === 'body2' ? styles.body2 : undefined,
        type === 'md1' ? styles.md1 : undefined,
        type === 'md2' ? styles.md2 : undefined,
        type === 'md3' ? styles.md3 : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  h1: { fontFamily: 'bold', fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: 'bold', fontSize: SIZES.h2, lineHeight: 30 },
  sh1: { fontFamily: 'semiBold', fontSize: SIZES.sh1, lineHeight: 30 },
  sh2: { fontFamily: 'semiBold', fontSize: SIZES.sh2, lineHeight: 28 },
  body1: { fontFamily: 'semiBold', fontSize: SIZES.body1, lineHeight: 24 },
  body2: { fontFamily: 'regular', fontSize: SIZES.body2, lineHeight: 24 },
  md1: {fontFamily: 'regular', fontSize: SIZES.md1, lineHeight: 20},
  md2: {fontFamily: 'regular', fontSize: SIZES.md2, lineHeight: 16},
  md3: {fontFamily: 'semiBold', fontSize: SIZES.md3, lineHeight: 16}
});
