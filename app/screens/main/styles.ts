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
export const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
export const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
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
  marginTop: spacing[3],
  marginBottom: spacing[3],
}

export const IMAGE: ImageStyle = {
  marginTop: spacing[3],
  marginBottom: spacing[3],
}

export const SEPARATOR = {
  borderBottomColor: color.orangeDarker,
  borderBottomWidth: 1,
}
export const FOOTER: ViewStyle = { backgroundColor: color.deepPurple }
export const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  flexDirection: "row",
  justifyContent: "space-between",
}

export const ICON: ImageStyle = {
  width: 48,
  height: 48,
}

export const TEXTAREA: TextStyle = {
  margin: 24,
  padding: 12,
  backgroundColor: "white",
}
