import * as React from "react"
import Svg, { Path } from "react-native-svg"

const ChatLogo = (props : any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      fill="currentColor"
      d="m11.235 23.771.872.466a9.28 9.28 0 0 0 4.389 1.096h.004A9.333 9.333 0 0 0 25.833 16 9.333 9.333 0 0 0 16.5 6.667 9.333 9.333 0 0 0 7.167 16v.004a9.28 9.28 0 0 0 1.096 4.39l.466.87-.717 3.224 3.223-.717ZM4.5 28l1.411-6.35A11.947 11.947 0 0 1 4.5 16c0-6.628 5.372-12 12-12s12 5.372 12 12-5.372 12-12 12a11.947 11.947 0 0 1-5.65-1.411L4.5 28Z"
    />
  </Svg>
)
export default ChatLogo

