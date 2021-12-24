import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { GameModel, ListItemType } from "./game"
import { withEnvironment } from "../extensions/with-environment"
import { generateId, generateOrder } from "../../utils/helpers"

export const GamesStoreModel = types
  .model("GamesStore")
  .props({
    games: types.optional(types.array(GameModel), []),
    lastViewed: types.optional(types.number, 0),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    updateGameName: (gameId: number, newGameName: string) => {
      const updatedGames = self.games.map((game) =>
        game.id === gameId ? { ...game, name: newGameName } : game,
      )
      self.games.replace(updatedGames)
    },
    createGame: (newGameName: string) => {
      const id = generateId(self.games)
      const newGames = self.games.concat([{ id, name: newGameName }])
      self.games.replace(newGames)
      self.lastViewed = id
    },
    deleteGame: (id: number) => {
      const updatedGames = self.games.filter((game) => game.id !== id)
      self.games.replace(updatedGames)
      // self.lastViewed = id
    },
    updateLastViewed: (gameId: number) => {
      self.lastViewed = gameId
    },
    createTextItem: (gameId: number, textContent: string) => {
      const listToUpdate = self.games.find((g) => g.id === gameId).list
      const id = generateId(listToUpdate)
      const order = generateOrder(listToUpdate)
      const newItem = { type: ListItemType.text, content: textContent, order, id }
      const newList = listToUpdate ? listToUpdate.concat(newItem) : [newItem]
      const updatedGames = self.games.map((game) =>
        game.id === gameId ? { ...game, list: newList } : game,
      )
      self.games.replace(updatedGames)
    },
    createPhotoItem: (gameId: number, uri: string) => {
      const listToUpdate = self.games.find((g) => g.id === gameId).list
      const id = generateId(listToUpdate)
      const order = generateOrder(listToUpdate)
      const newItem = { type: ListItemType.photo, content: uri, order, id }
      const newList = listToUpdate ? listToUpdate.concat(newItem) : [newItem]
      const updatedGames = self.games.map((game) =>
        game.id === gameId ? { ...game, list: newList } : game,
      )
      self.games.replace(updatedGames)
    },
    deleteItem: (gameId: number, itemId: number) => {
      const updatedGames = self.games.map((game) =>
        game.id === gameId ? { ...game, list: game.list.filter((l) => l.id !== itemId) } : game,
      )
      self.games.replace(updatedGames)
    },
  }))

type GameStoreType = Instance<typeof GamesStoreModel>
export interface GameStore extends GameStoreType {}
type GameStoreSnapshotType = SnapshotOut<typeof GamesStoreModel>
export interface GameStoreSnapshot extends GameStoreSnapshotType {}
export const createGamesStoreDefaultModel = () => types.optional(GamesStoreModel, {})
