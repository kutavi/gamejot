import * as React from "react"
import {
  TouchableOpacity,
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native"
import { Text } from "../text/text"
import { viewPresets, textPresets, ButtonPresetNames } from "./styles"
import { TransKeyPath, translate } from "../../i18n"

export interface ButtonProps extends TouchableOpacityProps {
  textKey?: TransKeyPath
  text?: string
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  preset?: ButtonPresetNames
  children?: React.ReactNode
  accessibilityKey?: TransKeyPath
}

export function Button(props: ButtonProps) {
  const {
    preset = "primary",
    textKey,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    accessibilityKey,
    children,
    ...rest
  } = props

  const viewStyle = viewPresets[preset]
  const viewStyles = [viewStyle, styleOverride]
  const textStyle = textPresets[preset]
  const textStyles = [textStyle, textStyleOverride]

  const content = children || <Text disableAccessibility={Boolean(accessibilityKey)} textKey={textKey} text={text} style={textStyles} />

  const accessibilityLabel = accessibilityKey ? translate(accessibilityKey) : undefined
  return (
    <TouchableOpacity style={viewStyles} {...rest} accessibilityLabel={accessibilityLabel}>
      {content}
    </TouchableOpacity>
  )
}
