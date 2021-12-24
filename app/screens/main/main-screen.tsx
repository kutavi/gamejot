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
import { CONTAINER, CONTENT, FOOTER, FOOTER_CONTENT, FULL, HEADER_TITLE, ICON, IMAGE, SEPARATOR, TEXTAREA, TITLE } from "./styles"
import { useStores } from "../../models"
import { ListItemType } from "../../models/games-store/game"
import { ImagePicker } from "../../components/image-picker/image-picker"

export const MainScreen: FC<StackScreenProps<NavigatorParamList, "main">> = observer(
  ({ navigation }) => {
    const nextScreen = () => navigation.navigate("demo")
    const [isTextEditorOpen, useOpenTextEditor] = useState<boolean>(false)
    const inputRef = React.useRef(null);
    const [updatedItemText, useUpdateItemText] = useState<string>()
    const { gamesStore: { games, createTextItem } } = useStores()

    const viewedGame = games?.[0]
    const sortedList = viewedGame?.list?.slice().sort((a, b) => b.order - a.order)
    return (
      <>
      <Header style={FOOTER} titleStyle={HEADER_TITLE} headerText={viewedGame?.name} headerId={viewedGame?.id} />
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground set={'purple'} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          {sortedList?.map(item => 
          <>
          {item.type === ListItemType.photo ?
          <AutoImage source={{uri: item.content}} key={item.id} type="image" style={IMAGE}  />
            : <Text style={CONTENT} key={item.id}>
              {item.content}
            </Text>}
            <View style={SEPARATOR} />
          </>
          )}
        </Screen>
        <Modal
        animationType="slide"
      //  style={{margin: 0, height: 100}}
     //   presentationStyle={'overFullScreen'}
        visible={isTextEditorOpen}
        onShow={() => {
          const timeout = setTimeout(() => {
          inputRef.current.focus()
          }, 100);
          return () => clearTimeout(timeout)
        }}
        onRequestClose={() => {
          useOpenTextEditor(false);
        }}
      >
        <GradientBackground set={'purple'} />
        <View style={FULL}>
          <TextField multiline onChangeText={useUpdateItemText} forwardedRef={inputRef} numberOfLines={15} textAlignVertical="top" style={TEXTAREA} />

          <SafeAreaView style={FOOTER_CONTENT}>
              <Button preset="link" onPress={() => useOpenTextEditor(false)}>
                <Icon style={ICON} icon={"close"} />
              </Button>
              <Button preset="link" onPress={() => {
                createTextItem(viewedGame?.id, updatedItemText)
                useOpenTextEditor(false)
              }}>
                <Icon style={ICON} icon={"checked"} />
              </Button>
          </SafeAreaView>
          </View>
        </Modal>
        <SafeAreaView style={FOOTER}>
          <View style={FOOTER_CONTENT}>
          <Button preset="link" onPress={() => useOpenTextEditor(!isTextEditorOpen)}>
             <Icon style={ICON} icon={"edit"} />
          </Button>
          <Text style={TITLE} preset="header" textKey="or" />
          <ImagePicker gameId={viewedGame?.id} />
          </View>
        </SafeAreaView>
      </View>
      </>
    )
  },
)
