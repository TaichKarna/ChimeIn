import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={8}
    fill="none"
    {...props}
  >
    <Path
      fill="#0F1828"
      d="m6 7.713 6.01-6.01L10.597.288 6 4.888 1.404.288-.01 1.702 6 7.713Z"
    />
  </Svg>
)
export default SvgComponent
