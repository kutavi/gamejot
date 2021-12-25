import * as React from "react"
import { View, ImageStyle, StyleProp, ViewStyle } from "react-native"
import { AutoImage } from "../auto-image/auto-image"
import { icons, IconTypes } from "./icons"
import { IconPresets, presets } from "./styles"


export interface IconProps {
  style?: StyleProp<ImageStyle>
  containerStyle?: StyleProp<ViewStyle>
  icon?: IconTypes
  preset?: IconPresets
}


export function Icon(props: IconProps) {
  const { style: styleOverride, icon, preset = 'default' } = props

  const styles = [presets[preset], styleOverride]
  
  return (
    <View>
      <AutoImage style={styles} source={icons[icon]} />
    </View>
  )
}
