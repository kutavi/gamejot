import { getRoot, IStateTreeNode } from "mobx-state-tree"
import { RootStore, RootStoreModel } from "../root-store/root-store"

export const withRootStore = (self: IStateTreeNode) => ({
  views: {
    get rootStore(): RootStore {
      return getRoot<typeof RootStoreModel>(self)
    },
  },
})
