import { ViewStyle } from "react-native"
import { color } from "../../theme"

const separator = "#17001a"
export const TILE: ViewStyle = {
  borderColor: separator,
  borderWidth: 1,
  backgroundColor: color.deepPurple,
}

export const ACTION: ViewStyle = {
  borderColor: separator,
  borderWidth: 1,
  borderRadius: 0,
}

export const FULL: ViewStyle = {
  flex: 1,
}

export const PLACEHOLDER: ViewStyle = {
  flex: 1,
  backgroundColor: color.orangeDarker,
}
