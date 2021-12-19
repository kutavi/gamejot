import React, {useState} from "react"
import { View, ViewStyle, TextStyle, StyleProp } from "react-native"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { translate } from "../../i18n/"
import { TextField } from "../text-field/text-field"

import { IconTypes } from "../icon/icons"
import { ICON, INPUT, ROOT, TITLE, TITLE_MIDDLE } from "./styles"

export interface HeaderProps {
  headerText?: string
  leftIcon?: IconTypes
  onLeftPress?(): void
  rightIcon?: IconTypes
  onRightPress?(): void
  style?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
}
export function Header(props: HeaderProps) {
  const {
    headerText,
    style,
    titleStyle,
  } = props
  const header = headerText || translate('enterGameTitle')
  const [isEdited, useEdit] = useState<boolean>(false)

  const toggleInput = (value) => {
    useEdit(value)
  }

  return (
    <View style={[ROOT, style]}>
      <View style={TITLE_MIDDLE}>
         {isEdited ? 
         <TextField autoFocus style={INPUT} />
         : 
         <Button preset="link" onPress={() => toggleInput(true)}><Text style={[TITLE, titleStyle]} text={header} preset='header' />
        </Button>}
      </View>
      {isEdited && (
        <Button preset="link" onPress={() => {
          toggleInput(false)
        }}>
          <Icon style={ICON} icon={'checked'} />
        </Button>
      )}
    </View>
  )
}
