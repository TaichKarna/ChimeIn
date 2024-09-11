import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const MoreLogo = (props:  any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={6}
    fill="none"
    {...props}
  >
    <Path
      fill="currentColor"
      d="M19 5.667a2.667 2.667 0 1 1 0-5.334 2.667 2.667 0 0 1 0 5.334Zm-8 0a2.667 2.667 0 1 1 0-5.334 2.667 2.667 0 0 1 0 5.334Zm-8 0A2.667 2.667 0 1 1 3 .333a2.667 2.667 0 0 1 0 5.334Z"
    />
  </Svg>
)
export default MoreLogo

