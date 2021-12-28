import { ImageStyle } from "react-native"

const ROOT: ImageStyle = {
  resizeMode: "contain",
}

export const presets: Record<string, ImageStyle> = {
  default: { ...ROOT, width: 24, height: 24 },
  mid: { ...ROOT, width: 32, height: 32 },
  big: { ...ROOT, width: 38, height: 38 },
  xl: { ...ROOT, width: 64, height: 64 },
}

export type IconPresets = keyof typeof presets
