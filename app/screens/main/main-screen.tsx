import React, { FC, useState } from "react"
import { View, SafeAreaView, Modal } from "react-native"
import { DrawerScreenProps } from "@react-navigation/drawer"
import { observer } from "mobx-react-lite"
import { Button, Header, Text, GradientBackground, Icon, AutoImage } from "../../components"
import { BAR, FOOTER_CONTENT, FULL, IMAGE, ITEM_IMAGE, ITEM_TEXT } from "./styles"
import { ImagePicker } from "../../components/image-picker/image-picker"
import { Swipeable } from "../../components/swipeable/swipeable"
import ImageViewer from "react-native-image-zoom-viewer"
import { TouchableHighlight } from "react-native-gesture-handler"
import { NavigatorParamList } from "../../navigators/navigator"
import { useStore } from "../../store"
import { ListItemType } from "../../utils/consts"
import { EditTextArea } from "./edit-text-area"

export const MainScreen: FC<DrawerScreenProps<NavigatorParamList, "main">> = observer(
  ({ navigation }) => {
    const [itemToEdit, setTextEditor] = useState<any>()
    const [photoEnlarged, setPhotoEnlarged] = useState<string>()
    const {
      gamesStore: { games, lastViewed, deleteItem, reorderGameList, createTextItem, updateItem },
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
            data={viewedGame.list.slice()}
            reorder={(data) => reorderGameList(viewedGame.id, data)}
            deleteAction={(id) => deleteItem(viewedGame.id, id)}
            renderChildren={(item) =>
              item.type === ListItemType.photo ? (
                <TouchableHighlight onPress={() => setPhotoEnlarged(item.content)} style={ITEM_IMAGE}>
                  <AutoImage source={{ uri: item.content }} key={item.id} style={IMAGE} />
                </TouchableHighlight>
              ) : (
                <TouchableHighlight onPress={() => setTextEditor(item)} style={ITEM_TEXT}>
                  <Text key={item.id} text={item.content} />
                </TouchableHighlight>
              )
            }
          />
          <Modal
            visible={!!photoEnlarged}
            transparent
            onRequestClose={() => setPhotoEnlarged(undefined)}
          >
            <ImageViewer
              enableSwipeDown
              swipeDownThreshold={5}
              imageUrls={[{ url: photoEnlarged }]}
              onCancel={() => setPhotoEnlarged(undefined)}
              renderIndicator={() => null}
            />
          </Modal>
          <EditTextArea
            defaultText={itemToEdit?.content}
            isOpen={Boolean(itemToEdit)}
            close={() => setTextEditor(undefined)}
            save={(text) =>
              itemToEdit.id
                ? updateItem(viewedGame.id, itemToEdit.id, text)
                : createTextItem(viewedGame.id, text)
            }
          />
          <SafeAreaView style={BAR}>
            <View style={FOOTER_CONTENT}>
              <Button onPress={() => setTextEditor({ content: "" })} accessibilityKey="create_text">
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
