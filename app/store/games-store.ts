import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { GameItem, GameModel } from "./game-model"
import { withEnvironment } from "./extensions/with-environment"
import { generateId } from "../utils/helpers"
import { ListItemType, startingId } from "../utils/consts"
export const GamesStoreModel = types
  .model("GamesStore")
  .props({
    games: types.optional(types.array(GameModel), [{ id: startingId }]),
    lastViewed: types.optional(types.number, startingId),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    updateGameName: (gameId: number, newGameName: string) => {
      const updatedGames = self.games.map((game) =>
        game.id === gameId ? { ...game, name: newGameName } : game,
      )
      self.games.replace(updatedGames)
    },
    createGame: () => {
      const id = generateId(self.games)
      const newGames = self.games.concat([{ id }])
      self.games.replace(newGames)
      self.lastViewed = id
    },
    deleteGame: (id: number) => {
      const updatedGames = self.games.filter((game) => game.id !== id)
      self.games.replace(updatedGames.length ? updatedGames : [{ id: startingId }])
      if (self.lastViewed === id) {
        self.lastViewed = updatedGames[0]?.id || startingId
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
