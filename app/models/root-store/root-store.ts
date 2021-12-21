import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { GamesStoreModel } from "../games-store/games-store"

export const RootStoreModel = types.model("RootStore").props({
  gamesStore: types.optional(GamesStoreModel, {} as any),
})

export interface RootStore extends Instance<typeof RootStoreModel> {}

export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
