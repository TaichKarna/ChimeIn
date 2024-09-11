
import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox=""
    fill="none"
    {...props}
  >
    <Path
      fill="#375FFF"
      d="M20.782 3.218a.75.75 0 0 0-.787-.173l-16.5 6a.75.75 0 0 0 0 1.402l6.442 2.573 4.756-4.77 1.057 1.058-4.777 4.777 2.58 6.442a.75.75 0 0 0 .697.473.75.75 0 0 0 .69-.495l6-16.5a.75.75 0 0 0-.158-.787Z"
    />
  </Svg>
)
export default SvgComponent
