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
  textKey?: TransKeyPath
  text?: string
  style?: StyleProp<TextStyle>
  preset?: TextPresets
  disableAccessibility?: boolean
}

export function Text(props: TextProps) {
  const { preset = "default", textKey, text, style: styleOverride, disableAccessibility, ...rest } = props

  const i18nText = textKey && translate(textKey)
  const content = i18nText || text

  const styles = [presets[preset], styleOverride]

  return (
    <ReactNativeText {...rest} accessibilityLabel={disableAccessibility ? undefined : content} style={styles}>
      {content}
    </ReactNativeText>
  )
}
