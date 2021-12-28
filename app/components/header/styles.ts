import { TextStyle, ViewStyle } from "react-native"
import { color, spacing } from "../../theme"

export const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing[4],
  alignItems: "center",
  paddingTop: spacing[3],
  paddingBottom: spacing[3],
  justifyContent: "space-between",
}

export const CONFIRM: ViewStyle = {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
}

export const FULL: ViewStyle = {
  flex: 1,
}
export const HEADER_TITLE: TextStyle = {
  fontSize: 22,
  color: color.lighterGrey,
  paddingVertical: spacing[3],
}

export const INPUT: ViewStyle = {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
}
