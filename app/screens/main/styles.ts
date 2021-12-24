import { ImageStyle, TextStyle, ViewStyle } from "react-native"
import { color, spacing, typography } from "../../theme"

export const FULL: ViewStyle = { flex: 1 }
export const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  padding: spacing[4],
}
export const TEXT: TextStyle = {
  color: color.white,
  fontFamily: typography.primary,
}
export const BOLD: TextStyle = { fontWeight: "bold" }
export const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}

export const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}

export const CONTENT: TextStyle = {
  ...TEXT,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
}

export const TILE = {
  borderColor: "rgb(99 84 100)",
  borderWidth: 1,
  padding: 12,
  backgroundColor: color.deepPurple,
}
export const BAR: ViewStyle = { backgroundColor: color.deepPurple }
export const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[2],
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
}

export const ICON: ImageStyle = {
  width: 46,
  height: 46,
}

export const TEXTAREA: TextStyle = {
  margin: 24,
  padding: 12,
}
