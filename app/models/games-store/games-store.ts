import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { GameItem, GameModel, ListItemType } from "./game"
import { withEnvironment } from "../extensions/with-environment"
import { generateId } from "../../utils/helpers"

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
      if (self.lastViewed === id) {
        self.lastViewed = updatedGames?.[0].id || 0
      }
    },
    deleteItem: (gameId: number, itemId: number) => {
      const updatedGames = self.games.map((game) =>
        game.id === gameId ? { ...game, list: game.list.filter((l) => l.id !== itemId) } : game,
      )
      self.games.replace(updatedGames)
    },
    updateLastViewed: (gameId: number) => {
      self.lastViewed = gameId
    },
    createTextItem: (gameId: number, textContent: string) => {
      const listToUpdate = self.games.find((g) => g.id === gameId).list
      const id = generateId(listToUpdate)
      const newItem = { type: ListItemType.text, content: textContent, id }
      const newList = listToUpdate ? [newItem].concat(listToUpdate) : [newItem]
      const updatedGames = self.games.map((game) =>
        game.id === gameId ? { ...game, list: newList } : game,
      )
      self.games.replace(updatedGames)
    },
    createPhotoItem: (gameId: number, uri: string) => {
      const listToUpdate = self.games.find((g) => g.id === gameId).list
      const id = generateId(listToUpdate)
      const newItem = { type: ListItemType.photo, content: uri, id }
      const newList = listToUpdate ? [newItem].concat(listToUpdate) : [newItem]
      const updatedGames = self.games.map((game) =>
        game.id === gameId ? { ...game, list: newList } : game,
      )
      self.games.replace(updatedGames)
    },
    reorderGameList: (gameId: number, newList: GameItem) => {
      const updatedGames = self.games.map((game) =>
        game.id === gameId ? { ...game, list: newList } : game,
      )
      self.games.replace(updatedGames)
    },
    reorderGames: (games) => {
      self.games.replace(games)
    },
  }))

type GameStoreType = Instance<typeof GamesStoreModel>
export interface GameStore extends GameStoreType {}
type GameStoreSnapshotType = SnapshotOut<typeof GamesStoreModel>
export interface GameStoreSnapshot extends GameStoreSnapshotType {}
export const createGamesStoreDefaultModel = () => types.optional(GamesStoreModel, {})
