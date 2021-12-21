import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const GameItemModel = types.model("GameItem").props({
  id: types.identifierNumber,
  content: types.string,
  order: types.number,
  type: types.enumeration(["photo", "text"]),
})

export const GameModel = types.model("Game").props({
  id: types.identifierNumber,
  name: types.maybe(types.string),
  list: types.optional(types.array(GameItemModel), []),
})

type GameType = Instance<typeof GameModel>
export interface Game extends GameType {}

type GameSnapshotType = SnapshotOut<typeof GameModel>
export interface GameSnapshot extends GameSnapshotType {}
export const createGameDefaultModel = () => types.optional(GameModel, {})
