import * as React from "react"
import {
  Text as ReactNativeText,
  StyleProp,
  TextProps as TextProperties,
  TextStyle,
} from "react-native"
import { TextPresets, presets } from "./styles"
import { TransKeyPath, translate } from "../../i18n"

export interface TextProps extends TextProperties {
  children?: React.ReactNode
  textKey?: TransKeyPath
  text?: string
  style?: StyleProp<TextStyle>
  preset?: TextPresets
}

export function Text(props: TextProps) {
  const { preset = "default", textKey, text, children, style: styleOverride, ...rest } = props

  const i18nText = textKey && translate(textKey)
  const content = i18nText || text || children

  const styles = [presets[preset], styleOverride]

  return (
    <ReactNativeText {...rest} style={styles}>
      {content}
    </ReactNativeText>
  )
}
