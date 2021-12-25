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

type GameType = Instance<typeof GameModel>
export interface Game extends GameType {}

type GameItemType = Instance<typeof GameItemModel>
export interface GameItem extends GameItemType {}

type GameSnapshotType = SnapshotOut<typeof GameModel>
export interface GameSnapshot extends GameSnapshotType {}
export const createGameDefaultModel = () => types.optional(GameModel, {})
