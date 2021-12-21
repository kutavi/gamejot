import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { GameModel, GameSnapshot } from "./game"
import { withEnvironment } from "../extensions/with-environment"

export const GamesStoreModel = types
  .model("GamesStore")
  .props({
    games: types.optional(types.array(GameModel), []),
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
      const id = self.games.length ? Math.max(...self.games.map((g) => g.id)) : 0
      self.games.push({ id: id + 1, name: newGameName })
    },
  }))
// .actions((self) => ({
//   getCharacters: async () => {
//     const characterApi = new CharacterApi(self.environment.api)
//     const result = await characterApi.getCharacters()

//     if (result.kind === "ok") {
//       // self.saveCharacters(result.characters)
//     } else {
//       __DEV__ && console.tron.log(result.kind)
//     }
//   },
// }))

type GameStoreType = Instance<typeof GamesStoreModel>
export interface GameStore extends GameStoreType {}
type GameStoreSnapshotType = SnapshotOut<typeof GamesStoreModel>
export interface GameStoreSnapshot extends GameStoreSnapshotType {}
export const createGamesStoreDefaultModel = () => types.optional(GamesStoreModel, {})
