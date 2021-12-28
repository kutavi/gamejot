import * as React from "react"
import { View, ImageStyle, StyleProp, ViewStyle } from "react-native"
import { TransKeyPath, translate } from "../../i18n"
import { AutoImage } from "../auto-image/auto-image"
import { icons, IconTypes } from "./icons"
import { IconPresets, presets } from "./styles"

export interface IconProps {
  style?: StyleProp<ImageStyle>
  containerStyle?: StyleProp<ViewStyle>
  icon?: IconTypes
  preset?: IconPresets
  accessibilityKey?: TransKeyPath
}

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, preset = "default", accessibilityKey } = props

  const styles = [presets[preset], styleOverride]

  const label = accessibilityKey && translate(accessibilityKey)

  return (
    <View>
      <AutoImage accessibilityLabel={label} style={styles} source={icons[icon]} />
    </View>
  )
}
