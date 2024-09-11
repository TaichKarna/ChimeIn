import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={8}
    height={12}
    fill="none"
    {...props}
  >
    <Path
      fill="#0F1828"
      d="m.288 6 6.01 6.01 1.414-1.414-4.6-4.6 4.6-4.6L6.298-.01.288 6Z"
    />
  </Svg>
)
export default SvgComponent
