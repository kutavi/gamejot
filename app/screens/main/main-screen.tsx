import React, { FC, useState } from "react"
import { View, SafeAreaView, Modal } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Button,
  Header,
  Screen,
  Text,
  GradientBackground,
  TextField,
  Icon,
  AutoImage,
} from "../../components"
import { color } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { CONTAINER, CONTENT, FOOTER, FOOTER_CONTENT, FULL, HEADER_TITLE, ICON, TEXTAREA, TITLE } from "./styles"
import { useStores } from "../../models"
const image = require("./images.jpg")


export const MainScreen: FC<StackScreenProps<NavigatorParamList, "main">> = observer(
  ({ navigation }) => {
    const [isTextEditorOpen, openTextEditor] = useState<boolean>(false)
    const nextScreen = () => navigation.navigate("demo")
    const { gamesStore: { games } } = useStores()

    const viewedGame = games?.[0] || {}
console.log('GAMESS', games[0])
    const gameSavedItems = [{text: 'this text here is a memo', type: 'text'}, {type: 'photo', image}]
    return (
      <>
      <Header style={FOOTER} titleStyle={HEADER_TITLE} headerText={viewedGame.name} headerId={viewedGame.id} />
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground set={'purple'} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          {gameSavedItems.map(item => 
          item.type === 'photo' ?
          <AutoImage source={item.image} />
            : <Text style={CONTENT}>
              {item.text}
            </Text>
          )}
        </Screen>
        <Modal
        animationType="slide"
      //  style={{margin: 0, height: 100}}
     //   presentationStyle={'overFullScreen'}
        visible={isTextEditorOpen}
        onRequestClose={() => {
          openTextEditor(false);
        }}
      >
        <GradientBackground set={'purple'} />
        <View style={FULL}>
          <TextField multiline autoFocus numberOfLines={10} textAlignVertical="top" style={TEXTAREA} />

          <View style={FOOTER_CONTENT}>
              <Button preset="link" onPress={() => openTextEditor(false)}>
                <Icon style={ICON} icon={"close"} />
              </Button>
              <Button preset="link" onPress={() => openTextEditor(false)}>
                <Icon style={ICON} icon={"checked"} />
              </Button>
              </View>
          </View>
        </Modal>
        <SafeAreaView style={FOOTER}>
          <View style={FOOTER_CONTENT}>
          <Button preset="link" onPress={() => openTextEditor(!isTextEditorOpen)}>
             <Icon style={ICON} icon={"edit"} />
          </Button>
          <Text style={TITLE} preset="header" textKey="or" />
          <Button preset="link" onPress={() => null}>
             <Icon style={ICON} icon={"camera"} />
          </Button>
          </View>
        </SafeAreaView>
      </View>
      </>
    )
  },
)
