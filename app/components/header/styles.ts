import { ImageStyle, TextStyle, ViewStyle } from "react-native"
import { color, spacing } from "../../theme"

export const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing[4],
  alignItems: "center",
  paddingTop: spacing[3],
  paddingBottom: spacing[3],
  justifyContent: "flex-start",
}

export const TITLE: TextStyle = {
  color: color.white,
}
export const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "center" }
export const ICON: ImageStyle = { width: 24, height: 24 }
export const INPUT: TextStyle = { marginRight: 16 }
