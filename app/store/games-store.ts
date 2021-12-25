import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Game, GameItem, GameModel } from "./game-model"
import { withEnvironment } from "./extensions/with-environment"
import { generateId } from "../utils/helpers"
import { ListItemType, startingId } from "../utils/consts"

const emptyGame = { id: startingId, name: "", list: [] }
export const GamesStoreModel = types
  .model("GamesStore")
  .props({
    games: types.optional(types.array(GameModel), [emptyGame]),
    lastViewed: types.optional(types.number, startingId),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    updateGameName: (gameId: number, newGameName: string) => {
      const games = self.games.map((game) =>
        game.id === gameId ? { ...game, name: newGameName } : game,
      )
      self.games.replace(games)
    },
    createGame: () => {
      const id = generateId(self.games)
      const newGames = self.games.concat([{ id }])
      self.games.replace(newGames)
      self.lastViewed = id
    },
    deleteGame: (id: number) => {
      const updatedGames = self.games.filter((game) => game.id !== id)
      const games = updatedGames.length ? updatedGames : [emptyGame]
      self.games.replace(games as Game[])
      if (self.lastViewed === id) {
        self.lastViewed = games[0].id
      }
    },
    deleteItem: (gameId: number, itemId: number) => {
      const games = self.games.map((game) =>
        game.id === gameId ? { ...game, list: game.list.filter((l) => l.id !== itemId) } : game,
      )
      self.games.replace(games as Game[])
    },
    updateLastViewed: (gameId: number) => {
      self.lastViewed = gameId
    },
    createTextItem: (gameId: number, textContent: string) => {
      const listToUpdate = self.games.find((g) => g.id === gameId).list
      const id = generateId(listToUpdate)
      const newItem = { type: ListItemType.text, content: textContent, id }
      const newList = listToUpdate ? [newItem].concat(listToUpdate) : [newItem]
      const games = self.games.map((game) =>
        game.id === gameId ? { ...game, list: newList } : game,
      )
      self.games.replace(games as Game[])
    },
    createPhotoItem: (gameId: number, uri: string) => {
      const listToUpdate = self.games.find((g) => g.id === gameId).list
      const id = generateId(listToUpdate)
      const newItem = { type: ListItemType.photo, content: uri, id }
      const newList = listToUpdate ? [newItem].concat(listToUpdate) : [newItem]
      const games = self.games.map((game) =>
        game.id === gameId ? { ...game, list: newList } : game,
      )
      self.games.replace(games as Game[])
    },
    reorderGameList: (gameId: number, newList: GameItem) => {
      const games = self.games.map((game) =>
        game.id === gameId ? { ...game, list: newList } : game,
      )
      self.games.replace(games as Game[])
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
