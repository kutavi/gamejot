import { TextStyle, ViewStyle } from "react-native"
import { color, typography } from "../../theme"

// the base styling for the TextInput
export const INPUT: TextStyle = {
  fontFamily: typography.primary,
  color: color.black,
  minHeight: 40,
  fontSize: 18,
  alignSelf: "stretch",
  backgroundColor: color.white,
}

// currently we have no presets, but that changes quickly when you build your app.
export const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}
