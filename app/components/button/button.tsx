import * as React from "react"
import { TouchableOpacity , StyleProp, TextStyle, TouchableOpacityProps, ViewStyle } from "react-native"
import { Text } from "../text/text"
import { viewPresets, textPresets , ButtonPresetNames } from "./styles"
import { TransKeyPath } from "../../i18n"

export interface ButtonProps extends TouchableOpacityProps {
  textKey?: TransKeyPath
  text?: string
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  preset?: ButtonPresetNames
  children?: React.ReactNode
}

export function Button(props: ButtonProps) {
  const {
    preset = "primary",
    textKey,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    ...rest
  } = props

  const viewStyle = viewPresets[preset] || viewPresets.primary
  const viewStyles = [viewStyle, styleOverride]
  const textStyle = textPresets[preset] || textPresets.primary
  const textStyles = [textStyle, textStyleOverride]

  const content = children || <Text textKey={textKey} text={text} style={textStyles} />

  return (
    <TouchableOpacity style={viewStyles} {...rest}>
      {content}
    </TouchableOpacity>
  )
}
