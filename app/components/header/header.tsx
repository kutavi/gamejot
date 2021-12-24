import React, {useEffect, useState} from "react"
import { View, ViewStyle, StyleProp } from "react-native"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { translate } from "../../i18n/"
import { TextField } from "../text-field/text-field"

import { IconTypes } from "../icon/icons"
import { CONFIRM, FULL, HEADER_TITLE, ICON, INPUT, ROOT } from "./styles"
import { useStores } from "../../models"
import { BAR } from "../../screens/main/styles"
import { SafeAreaView } from "react-native-safe-area-context"

export interface HeaderProps {
  headerText?: string
  headerId?: number
  leftIcon?: IconTypes
  onLeftPress?(): void
  rightIcon?: IconTypes
  onRightPress?(): void
  style?: StyleProp<ViewStyle>
  navigation: any
}
export function Header(props: HeaderProps) {
  const {
    headerText,
    headerId,
    style,
    navigation,
  } = props
  const [isEdited, setEditMode] = useState<boolean>(false)
  const [headerTitle, setText] = useState<string>(headerText || '')
  const displayText = headerText || translate('enterGameTitle')
  
  const { gamesStore: {updateGameName, createGame} } = useStores()

  useEffect(() => {
    setText(headerText)
  }, [headerText])

  const saveInput = () => {
    headerId ? updateGameName(headerId, headerTitle) : createGame(headerTitle)
    setEditMode(false)
  }

  return (
    <SafeAreaView style={BAR}>
      <View style={[ROOT, style]}>
          {isEdited ? <TextField inputStyle={INPUT} autoFocus onChangeText={setText} value={headerTitle} cancelEditOnBackPress={() => setEditMode(false)} saveEditOnEnter={saveInput} />
          : <Button preset="link" onPress={() => setEditMode(true)} text={displayText} style={FULL} textStyle={HEADER_TITLE}>
          </Button>}
        {isEdited ? <Button preset="confirm" onPress={saveInput} textKey="ok" style={CONFIRM}></Button>
         : <Button preset="primary" onPress={() => navigation.openDrawer()}>
          <Icon style={ICON} icon={"menu"} />
        </Button>}
      </View>
    </SafeAreaView>
  )
}
