import * as React from "react"
import { View, ImageStyle, StyleProp, ViewStyle } from "react-native"
import { AutoImage as Image } from "../auto-image/auto-image"
import { icons, IconTypes } from "./icons"

const ROOT: ImageStyle = {
  resizeMode: "contain",
}

export interface IconProps {
  style?: StyleProp<ImageStyle>
  containerStyle?: StyleProp<ViewStyle>
  icon?: IconTypes
}


export function Icon(props: IconProps) {
  const { style: styleOverride, icon } = props

  return (
    <View>
      <Image style={[ROOT, styleOverride]} source={icons[icon]} />
    </View>
  )
}
