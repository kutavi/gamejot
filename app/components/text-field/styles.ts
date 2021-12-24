import { TextStyle, ViewStyle } from "react-native"
import { color, typography } from "../../theme"

export const INPUT: TextStyle = {
  fontFamily: typography.primary,
  color: color.black,
  minHeight: 40,
  fontSize: 18,
  alignSelf: "stretch",
  backgroundColor: color.white,
}

export const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}
