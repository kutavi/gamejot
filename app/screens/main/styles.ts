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

export const IMAGE: ImageStyle = {
  flex: 1,
  aspectRatio: 1.5,
}
export const ITEM_TEXT: ImageStyle = {
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[5],
}
export const ITEM_IMAGE: ImageStyle = {
  padding: spacing[3],
}
export const MODAL: TextStyle = {
  paddingHorizontal: 24,
  paddingVertical: 24,
}
