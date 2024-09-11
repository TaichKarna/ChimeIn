import * as React from "react"
import Svg, { Path } from "react-native-svg"

const AddLogo = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path fill="currentColor" d="M13 13v6h-2v-6H5v-2h6V5h2v6h6v2h-6Z" />
  </Svg>
)
export default AddLogo

