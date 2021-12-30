import { TextStyle, ViewStyle } from "react-native"
import { color, spacing } from "../theme"

export const DRAWER: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
  paddingBottom: 0,
  paddingTop: spacing[6],
}
export const DRAWER_MENU_CONTAINER: ViewStyle = {
  paddingVertical: spacing[3],
  paddingHorizontal: spacing[3],
}
export const ACTION: ViewStyle = {
  backgroundColor: color.orange,
  marginHorizontal: 0,
  borderRadius: 0,
}

export const ACTION_LABEL: TextStyle = {
  color: color.white,
  fontWeight: "bold",
  fontSize: 20,
  marginHorizontal: spacing[3],
}

export const ACTION_CONTAINER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: spacing[3],
}
