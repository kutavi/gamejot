import { ImageStyle, TextStyle, ViewStyle } from "react-native"
import { color, spacing } from "../theme"

export const DRAWER: ViewStyle = { flex: 1, justifyContent: "space-between", paddingBottom: 0 }
export const DRAWER_MENU_ITEM: ViewStyle = { marginHorizontal: 0, marginVertical: 0 }
export const ACTION: ViewStyle = {
  backgroundColor: color.orange,
  marginHorizontal: 0,
  paddingVertical: spacing[3],
  borderRadius: 0,
}

export const LABEL: TextStyle = {
  color: color.lighterGrey,
  fontWeight: "bold",
}

export const ICON: ImageStyle = {
  width: 32,
  height: 32,
  marginRight: spacing[2],
}

export const ACTION_LABEL: TextStyle = {
  color: color.white,
  fontWeight: "bold",
  fontSize: 20,
}

export const ACTION_CONTAINER: ViewStyle = { flexDirection: "row", alignItems: "center" }
