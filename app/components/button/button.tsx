import * as React from "react"
import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
  TouchableOpacity as TouchableOpacityRN
} from "react-native"
import { Text } from "../text/text"
import { viewPresets, textPresets, ButtonPresetNames } from "./styles"
import { TransKeyPath, translate } from "../../i18n"
import { TouchableOpacity } from "react-native-gesture-handler"
import { GenericTouchableProps } from "react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable"

type TouchableOpacityGestureProps = TouchableOpacityProps & GenericTouchableProps
export interface ButtonProps extends TouchableOpacityGestureProps {
  textKey?: TransKeyPath
  text?: string
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  preset?: ButtonPresetNames
  children?: React.ReactNode
  accessibilityKey?: TransKeyPath
  loadFromGesture?: boolean // used for different component import. RN component doesnt work with swipe and drag and Gesture one does not work within modals
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
    loadFromGesture, 
    ...rest
  } = props

  const viewStyle = viewPresets[preset]
  const viewStyles = [viewStyle, styleOverride]
  const textStyle = textPresets[preset]
  const textStyles = [textStyle, textStyleOverride]

  const content = children || <Text disableAccessibility={Boolean(accessibilityKey)} textKey={textKey} text={text} style={textStyles} />

  const accessibilityLabel = accessibilityKey ? translate(accessibilityKey) : undefined
  const component = {load: loadFromGesture ? TouchableOpacity : TouchableOpacityRN} 
  return (
    <component.load style={viewStyles} {...rest} accessibilityLabel={accessibilityLabel}>
      {content}
    </component.load>
  )
}
