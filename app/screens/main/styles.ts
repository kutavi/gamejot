import { ImageStyle, TextStyle, ViewStyle } from "react-native"
import { color, spacing } from "../../theme"

export const FULL: ViewStyle = { flex: 1 }

export const BAR: ViewStyle = { backgroundColor: color.darkestPurple }
export const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[3],
  paddingHorizontal: spacing[2],
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
}

export const ICON: ImageStyle = {
  width: 46,
  height: 46,
}

export const MODAL: TextStyle = {
  paddingHorizontal: 24,
  paddingVertical: 24,
}
