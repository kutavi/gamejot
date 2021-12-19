import { TextStyle } from "react-native"
import { color, typography } from "../../theme"

const BASE: TextStyle = {
  fontFamily: typography.primary,
  color: color.black,
  fontSize: 15,
}

export const presets = {
  default: BASE,
  bold: { ...BASE, fontWeight: "bold" } as TextStyle,
  header: { ...BASE, fontSize: 22, fontWeight: "bold" } as TextStyle,
  fieldLabel: { ...BASE, fontSize: 13, color: color.lightGrey } as TextStyle,
  secondary: { ...BASE, color: color.white } as TextStyle,
}

export type TextPresets = keyof typeof presets
