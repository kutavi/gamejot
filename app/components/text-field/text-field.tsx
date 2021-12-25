import React, { useEffect } from "react"
import {
  BackHandler,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { color } from "../../theme"
import { translate, TransKeyPath } from "../../i18n"
import { FIELD, INPUT } from "./styles"

export interface TextFieldProps extends TextInputProps {
  placeholderKey?: TransKeyPath
  placeholder?: string
  style?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
  forwardedRef?: any
  cancelEditOnBackPress?: () => void
  saveEditOnEnter?: () => void
}

export function TextField(props: TextFieldProps) {
  const {
    placeholderKey,
    placeholder,
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    cancelEditOnBackPress,
    saveEditOnEnter,
    ...rest
  } = props

  const actualPlaceholder = placeholderKey ? translate(placeholderKey) : placeholder

  useEffect(() => {
    const backAction = () => {
      cancelEditOnBackPress()
      return true
    }
    const backHandler =
      cancelEditOnBackPress && BackHandler.addEventListener("hardwareBackPress", backAction)
    return () => backHandler?.remove()
  }, [])

  return (
    <View style={[FIELD, styleOverride]}>
      <TextInput
        onSubmitEditing={() => saveEditOnEnter && saveEditOnEnter()}
        placeholder={actualPlaceholder}
        placeholderTextColor={color.lighterGrey}
        underlineColorAndroid={color.transparent}
        style={[INPUT, inputStyleOverride]}
        ref={forwardedRef}
        {...rest}
      />
    </View>
  )
}
