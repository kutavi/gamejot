import React, { FC, useState } from "react"
import { View, SafeAreaView, Modal, FlatList } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
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
import { NavigatorParamList } from "../../navigators"
import { CONTENT, BAR, FOOTER_CONTENT, FULL, ICON, TEXTAREA, TILE, TITLE } from "./styles"
import { useStores } from "../../models"
import { ListItemType } from "../../models/games-store/game"
import { ImagePicker } from "../../components/image-picker/image-picker"
import { Swipeable } from "react-native-gesture-handler"

export const MainScreen: FC<StackScreenProps<NavigatorParamList, "main">> = observer(
  ({ navigation }) => {
    const nextScreen = () => navigation.navigate("demo")
    const [isTextEditorOpen, useOpenTextEditor] = useState<boolean>(false)
    const inputRef = React.useRef(null);
    const [updatedItemText, useUpdateItemText] = useState<string>()
    const { gamesStore: { games, createTextItem, deleteItem } } = useStores()

    const viewedGame = games?.[0]
    const sortedList = viewedGame?.list?.slice().sort((a, b) => b.order - a.order)
    const row: Array<any> = [];
    let prevOpenedRow;

    const renderItem = ({ item, index }, onClick) => {
      const closeRow = (index) => {
        if (prevOpenedRow && prevOpenedRow !== row[index]) {
          prevOpenedRow.close();
        }
        prevOpenedRow = row[index];
      };
  
      const renderRightActions = (progress, dragX, onClick) => {
        return (
          <Button onPress={onClick} preset="cancel" textKey="delete"></Button>
        );
      };
  
      return (
        <Swipeable
          renderRightActions={(progress, dragX) =>
            renderRightActions(progress, dragX, onClick)
          }
          onSwipeableOpen={() => closeRow(index)}
          ref={(ref) => (row[index] = ref)}>
          <View
            style={TILE}>
            {item.type === ListItemType.photo ?
        <AutoImage source={{uri: item.content}} key={item.id} type="image" />
          : <Text style={CONTENT} key={item.id}>
            {item.content}
          </Text>}
          </View>
        </Swipeable>
      );
    };
    return (
      <>
      <Header style={BAR} headerText={viewedGame?.name} headerId={viewedGame?.id} />
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground set={'purple'} />
        <FlatList
        data={sortedList}
        renderItem={(v) =>
          renderItem(v, () => {
            console.log('WAHT', v)
            deleteItem(viewedGame?.id, v.item.id);
          })
        }
        keyExtractor={(item) => item.id.toString()}></FlatList>
        <Modal
        animationType="none"
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
              <Button preset="cancel" onPress={() => useOpenTextEditor(false)} textKey="cancel"></Button>
              <Button preset="confirm" onPress={() => {
                createTextItem(viewedGame?.id, updatedItemText)
                useOpenTextEditor(false)
              }} textKey="ok">
              </Button>
          </SafeAreaView>
          </View>
        </Modal>
        <SafeAreaView style={BAR}>
          <View style={FOOTER_CONTENT}>
          <Button preset="primary" onPress={() => useOpenTextEditor(!isTextEditorOpen)}>
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
