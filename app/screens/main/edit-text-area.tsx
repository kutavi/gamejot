import React, { useState } from "react"
import { View, SafeAreaView, Modal } from "react-native"
import { Button, GradientBackground, TextField } from "../../components"
import { FOOTER_CONTENT, FULL, MODAL } from "./styles"

interface EditTextAreaProps {
  defaultText: string
  close: () => void
  save: (text: string) => void
  isOpen: boolean
}
export const EditTextArea = ({ defaultText, close, save, isOpen }: EditTextAreaProps) => {
  const inputRef = React.useRef(null)
  const [updatedItemText, setItemText] = useState<string>(defaultText)

  return (
    <Modal
      animationType="none"
      visible={isOpen}
      onShow={() => {
        setItemText(defaultText)
        const timeout = setTimeout(() => {
          inputRef.current.focus()
        }, 100)
        return () => clearTimeout(timeout)
      }}
      onRequestClose={close}
    >
      <GradientBackground set={"purple"} />
      <View style={[FULL, MODAL]}>
        <TextField
          multiline
          onChangeText={setItemText}
          accessibilityKey={"enter_text"}
          defaultValue={defaultText}
          forwardedRef={inputRef}
          numberOfLines={15}
          textAlignVertical="top"
        />

        <SafeAreaView style={FOOTER_CONTENT}>
          <Button preset="cancel" onPress={close} textKey="cancel"></Button>
          <Button
            preset="confirm"
            onPress={() => {
              save(updatedItemText)
              close()
            }}
            textKey="save"
          />
        </SafeAreaView>
      </View>
    </Modal>
  )
}
