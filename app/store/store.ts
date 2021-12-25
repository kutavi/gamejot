import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { createContext, useContext } from "react"

import { GamesStoreModel } from "./games-store"

export const RootStoreModel = types.model("RootStore").props({
  gamesStore: types.optional(GamesStoreModel, {} as any),
})

export interface RootStore extends Instance<typeof RootStoreModel> {}

export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}

const RootStoreContext = createContext<RootStore>({} as RootStore)

export const RootStoreProvider = RootStoreContext.Provider

export const useStore = () => useContext(RootStoreContext)
