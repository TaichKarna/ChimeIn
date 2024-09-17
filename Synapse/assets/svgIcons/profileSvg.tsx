import { useThemeColor } from "@/hooks/useThemeColor"
import * as React from "react"
import Svg, { Path } from "react-native-svg"

const ProfileSvg = (props: any) => {
  const svgColor = useThemeColor({}, 'text')
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={38}
    height={45}
    fill="currentColor"
    {...props}
  >
    <Path
      fill={svgColor}
      d="M7.333 11.667C7.333 5.223 12.557 0 19 0s11.667 5.223 11.667 11.667c0 6.443-5.224 11.666-11.667 11.666S7.333 18.11 7.333 11.667Zm11.667 7a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM5.8 31.134a18.667 18.667 0 0 0-5.467 13.2H5a14 14 0 0 1 28 0h4.667A18.667 18.667 0 0 0 5.8 31.133Z"
    />
       <Path
      fill={svgColor}
      d="M5.8 31.134a18.667 18.667 0 0 0-5.467 13.2H5a14 14 0 0 1 28 0h4.667A18.667 18.667 0 0 0 5.8 31.133Z"
    />

  </Svg>
  )
}
export default ProfileSvg

