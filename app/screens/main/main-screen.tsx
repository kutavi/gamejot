import React, { FC, useState } from "react"
import { View, SafeAreaView, Modal } from "react-native"
import { DrawerScreenProps } from "@react-navigation/drawer"
import { observer } from "mobx-react-lite"
import {
  Button,
  Header,
  Text,
  GradientBackground,
  TextField,
  Icon,
  AutoImage,
} from "../../components"
import { BAR, FOOTER_CONTENT, FULL, IMAGE, MODAL } from "./styles"
import { ImagePicker } from "../../components/image-picker/image-picker"
import { Swipeable } from "../../components/swipeable/swipeable"
import ImageViewer from "react-native-image-zoom-viewer"
import { TouchableHighlight } from "react-native-gesture-handler"
import { NavigatorParamList } from "../../navigators/navigator"
import { useStore } from "../../store"
import { ListItemType } from "../../utils/consts"

export const MainScreen: FC<DrawerScreenProps<NavigatorParamList, "main">> = observer(
  ({ navigation }) => {
    const [isTextEditorOpen, setTextEditor] = useState<boolean>(false)
    const inputRef = React.useRef(null)
    const [updatedItemText, setItemText] = useState<string>()
    const [photoEnlarged, setPhotoEnlarged] = useState<string>()
    const {
      gamesStore: { games, lastViewed, createTextItem, deleteItem, reorderGameList },
    } = useStore()

    const viewedGame = games.find((g) => g.id === lastViewed)

    return (
      <>
        <Header
          style={BAR}
          headerText={viewedGame.name}
          headerId={viewedGame.id}
          navigation={navigation}
        />
        <View testID="WelcomeScreen" style={FULL}>
          <GradientBackground set={"purple"} />
          <Swipeable
            data={viewedGame?.list.slice()}
            reorder={(data) => reorderGameList(viewedGame.id, data)}
            deleteAction={(id) => deleteItem(viewedGame.id, id)}
            renderChildren={(item) =>
              item.type === ListItemType.photo ? (
                <TouchableHighlight onPress={() => setPhotoEnlarged(item.content)}>
                  <AutoImage source={{ uri: item.content }} key={item.id} style={IMAGE} />
                </TouchableHighlight>
              ) : (
                <Text key={item.id}>{item.content}</Text>
              )
            }
          />
          <Modal visible={!!photoEnlarged} transparent onRequestClose={() => setPhotoEnlarged(undefined)}>
            <ImageViewer
              enableSwipeDown
              swipeDownThreshold={5}
              imageUrls={[{ url: photoEnlarged }]}
              onCancel={() => setPhotoEnlarged(undefined)}
              renderIndicator={() => null}
            />
          </Modal>
          <Modal
            animationType="none"
            visible={isTextEditorOpen}
            onShow={() => {
              const timeout = setTimeout(() => {
                inputRef.current.focus()
              }, 100)
              return () => clearTimeout(timeout)
            }}
            onRequestClose={() => {
              setTextEditor(false)
            }}
          >
            <GradientBackground set={"purple"} />
            <View style={[FULL, MODAL]}>
              <TextField
                multiline
                onChangeText={setItemText}
                forwardedRef={inputRef}
                numberOfLines={15}
                textAlignVertical="top"
              />

              <SafeAreaView style={FOOTER_CONTENT}>
                <Button
                  preset="cancel"
                  onPress={() => setTextEditor(false)}
                  textKey="cancel"
                ></Button>
                <Button
                  preset="confirm"
                  onPress={() => {
                    createTextItem(viewedGame.id, updatedItemText)
                    setTextEditor(false)
                  }}
                  textKey="ok"
                ></Button>
              </SafeAreaView>
            </View>
          </Modal>
          <SafeAreaView style={BAR}>
            <View style={FOOTER_CONTENT}>
              <Button onPress={() => setTextEditor(!isTextEditorOpen)}>
                <Icon preset="big" icon={"edit"} />
              </Button>
              <Text preset="header" textKey="or" />
              <ImagePicker gameId={viewedGame.id} />
            </View>
          </SafeAreaView>
        </View>
      </>
    )
  },
)
