import { ViewStyle, TextStyle } from "react-native"
import { color, spacing } from "../../theme"

const BASE_VIEW: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
}

const BASE_TEXT: TextStyle = {
  paddingHorizontal: spacing[3],
  fontSize: 16,
  color: color.white,
}

export const viewPresets: Record<string, ViewStyle> = {
  primary: { ...BASE_VIEW, backgroundColor: color.orange } as ViewStyle,
  confirm: { ...BASE_VIEW, backgroundColor: color.green },
  cancel: { ...BASE_VIEW, backgroundColor: color.angry },
  link: {
    ...BASE_VIEW,
    color: color.white,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "flex-start",
  } as ViewStyle,
}

export const textPresets: Record<ButtonPresetNames, TextStyle> = {
  primary: { ...BASE_TEXT },
  confirm: { ...BASE_TEXT },
  cancel: { ...BASE_TEXT },
  link: {
    ...BASE_TEXT,
    color: color.black,
    paddingHorizontal: 0,
    paddingVertical: 0,
  } as TextStyle,
}

export type ButtonPresetNames = keyof typeof viewPresets
