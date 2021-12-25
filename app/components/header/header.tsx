import React, { useEffect, useState } from "react"
import { View, ViewStyle, StyleProp } from "react-native"
import { Button } from "../button/button"
import { Icon } from "../icon/icon"
import { translate } from "../../i18n/"
import { TextField } from "../text-field/text-field"

import { CONFIRM, FULL, HEADER_TITLE, INPUT, ROOT } from "./styles"
import { BAR } from "../../screens/main/styles"
import { SafeAreaView } from "react-native-safe-area-context"
import { useStore } from "../../store"

export interface HeaderProps {
  headerText?: string
  headerId?: number
  style?: StyleProp<ViewStyle>
  navigation: any
}

const isDefaultText = (headerText) =>
  [translate("enterGameTitle"), translate("empty")].includes(headerText)
export function Header(props: HeaderProps) {
  const { headerText, headerId, style, navigation } = props
  const [isEdited, setEditMode] = useState<boolean>(false)
  const displayText = headerText || translate("enterGameTitle")
  const [headerTitle, setText] = useState<string>(headerText || "")

  const {
    gamesStore: { updateGameName },
  } = useStore()

  useEffect(() => {
    setText(!isDefaultText(headerText) ? headerText : "")
  }, [headerText])

  const saveInput = () => {
    updateGameName(headerId, headerTitle)
    setEditMode(false)
  }

  return (
    <SafeAreaView style={BAR}>
      <View style={[ROOT, style]}>
        {isEdited ? (
          <TextField
            inputStyle={INPUT}
            autoFocus
            onChangeText={setText}
            value={headerTitle}
            cancelEditOnBackPress={() => setEditMode(false)}
            saveEditOnEnter={saveInput}
          />
        ) : (
          <Button
            preset="link"
            onPress={() => setEditMode(true)}
            text={displayText}
            style={FULL}
            textStyle={HEADER_TITLE}
          ></Button>
        )}
        {isEdited ? (
          <Button preset="confirm" onPress={saveInput} textKey="ok" style={CONFIRM}></Button>
        ) : (
          <Button onPress={() => navigation.openDrawer()}>
            <Icon icon={"menu"} />
          </Button>
        )}
      </View>
    </SafeAreaView>
  )
}
