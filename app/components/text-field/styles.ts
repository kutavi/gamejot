import { TextStyle, ViewStyle } from "react-native"
import { color, spacing, typography } from "../../theme"

export const INPUT: TextStyle = {
  fontFamily: typography.primary,
  color: color.black,
  fontSize: 18,
  backgroundColor: color.white,
  paddingHorizontal: spacing[2],
  paddingVertical: spacing[2],
  borderRadius: 4,
}

export const FIELD: ViewStyle = {
  flex: 1,
}
