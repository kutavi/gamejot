import React, {useState} from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { HeaderProps } from "./header.props"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { spacing } from "../../theme"
import { translate } from "../../i18n/"
import { TextField } from "../text-field/text-field"

// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing[4],
  alignItems: "center",
  paddingTop: spacing[5],
  paddingBottom: spacing[5],
  justifyContent: "flex-start",
}
const TITLE: TextStyle = { textAlign: "center" }
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "center" }

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
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
        <Button preset="link" onPress={() => toggleInput(true)}>
         {isEdited ? 
         <TextField />
         : <Text style={[TITLE, titleStyle]} text={header} />}
        </Button>
      </View>
      {isEdited && (
        <Button preset="link" onPress={() => toggleInput(false)}>
          <Icon style={{width: '24px', height: '24px', textAlign: 'center'}} icon={'checked'} />
        </Button>
      )}
    </View>
  )
}
