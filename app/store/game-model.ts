import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ListItemType } from "../utils/consts"

export const GameItemModel = types.model("GameItem").props({
  id: types.identifierNumber,
  content: types.string,
  type: types.enumeration<ListItemType>(Object.values(ListItemType)),
})

export const GameModel = types.model("Game").props({
  id: types.identifierNumber,
  name: types.maybe(types.string),
  list: types.optional(types.array(GameItemModel), []),
})

export interface Game extends Instance<typeof GameModel> {}
export interface GameSnapshot extends SnapshotOut<typeof GameModel> {}

export interface GameItem extends Instance<typeof GameItemModel> {}

export const createGameDefaultModel = () => types.optional(GameModel, {})
