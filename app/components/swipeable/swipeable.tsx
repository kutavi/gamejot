import React from "react"
import { View } from "react-native"
import { Button } from "../../components"
import { ACTION, FULL, PLACEHOLDER, TILE } from "./styles"
import { Swipeable as SwipeableGesture, TouchableOpacity } from "react-native-gesture-handler"
import DraggableFlatList from "react-native-draggable-flatlist"

type DataItem = { [key: string]: any; id: number }

interface SwipeableProps {
  data: DataItem[]
  renderChildren: (item: DataItem) => JSX.Element
  deleteAction: (id: number) => void
  reorder: (data: any) => void
  hasLeftActions?: boolean
}
export const Swipeable = ({
  data,
  renderChildren,
  deleteAction,
  hasLeftActions,
  reorder,
}: SwipeableProps) => {
  const row: Array<any> = []
  let prevOpenedRow // remove this!

  const renderItem = ({ item, drag, index = 0 }, onClick) => {
    const closeRow = (index) => {
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close()
      }
      prevOpenedRow = row[index]
    }

    const renderActions = (progress, dragX, onClick) => {
      return (
        deleteAction && (
          <Button onPress={onClick} preset="cancel" textKey="delete" style={ACTION}></Button>
        )
      )
    }

    return (
      <SwipeableGesture
        renderRightActions={(progress, dragX) =>
          !hasLeftActions && renderActions(progress, dragX, onClick)
        }
        renderLeftActions={(progress, dragX) =>
          hasLeftActions && renderActions(progress, dragX, onClick)
        }
        onSwipeableOpen={() => closeRow(index)}
        ref={(ref) => (row[index] = ref)}
      >
        <TouchableOpacity activeOpacity={0.7} onLongPress={drag}>
          <View style={TILE}>{renderChildren(item)}</View>
        </TouchableOpacity>
      </SwipeableGesture>
    )
  }
  return (
    <View style={FULL}>
      <DraggableFlatList
        data={data || []}
        onDragEnd={({ data }) => reorder(data)}
        renderItem={(v) =>
          renderItem(v, () => {
            deleteAction(v.item.id)
          })
        }
        renderPlaceholder={() => <View style={PLACEHOLDER} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}
