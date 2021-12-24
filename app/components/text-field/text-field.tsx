import React, { useEffect } from "react"
import { BackHandler, StyleProp, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native"
import { color } from "../../theme"
import { translate, TransKeyPath } from "../../i18n"
import { Text } from "../text/text"
import { INPUT, PRESETS } from "./styles"

export interface TextFieldProps extends TextInputProps {
  placeholderKey?: TransKeyPath
  placeholder?: string
  labelKey?: TransKeyPath
  label?: string
  style?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
  preset?: keyof typeof PRESETS
  forwardedRef?: any
  cancelEditOnBackPress?: () => void,
  saveEditOnEnter?: () => void,
}

export function TextField(props: TextFieldProps) {
  const {
    placeholderKey,
    placeholder,
    labelKey,
    label,
    preset = "default",
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    cancelEditOnBackPress,
    saveEditOnEnter,
    ...rest
  } = props

  const containerStyles = [PRESETS[preset], styleOverride]
  const inputStyles = [INPUT, inputStyleOverride]
  const actualPlaceholder = placeholderKey ? translate(placeholderKey) : placeholder

  useEffect(() => {
      const backAction = () => {
        cancelEditOnBackPress()
        return true;
      };
      const backHandler = cancelEditOnBackPress && BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler?.remove();
  }, []);

  return (
    <View style={containerStyles}>
      <Text preset="fieldLabel" textKey={labelKey} text={label} />
      <TextInput
        onSubmitEditing={() => saveEditOnEnter && saveEditOnEnter()}
        placeholder={actualPlaceholder}
        placeholderTextColor={color.lighterGrey}
        underlineColorAndroid={color.transparent}
        {...rest}
        style={inputStyles}
        ref={forwardedRef}
      />
    </View>
  )
}
