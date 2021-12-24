import React from "react"
import { View, FlatList } from "react-native"
import {
  Button,
} from "../../components"
import {  ACTION, TILE } from "./styles"
import { Swipeable as SwipeableGesture } from "react-native-gesture-handler"

type DataItem = { [key: string]: any; id: number };

interface SwipeableProps {
 data: DataItem[]
 renderChildren: (item: DataItem) => JSX.Element
 deleteAction: (id: number) => void
}
export const Swipeable = ({data, renderChildren, deleteAction}: SwipeableProps) => {
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
          deleteAction && <Button onPress={onClick} preset="cancel" textKey="delete" style={ACTION}></Button>
        );
      };
  
      return (
        <SwipeableGesture
          renderRightActions={(progress, dragX) =>
            renderRightActions(progress, dragX, onClick)
          }
          onSwipeableOpen={() => closeRow(index)}
          ref={(ref) => (row[index] = ref)}>
          <View
            style={TILE}>
            {renderChildren(item)}
          </View>
        </SwipeableGesture>
      );
    };
    return (
        <FlatList
        data={data}
        renderItem={(v) =>
          renderItem(v, () => {
            deleteAction(v.item.id);
          })
        }
        keyExtractor={(item) => item.id.toString()}></FlatList>
    )
  }
