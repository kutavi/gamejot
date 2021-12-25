import { Api } from "../api"

let ReactotronDev
if (__DEV__) {
  const { Reactotron } = require("../reactotron")
  ReactotronDev = Reactotron
}

export class Environment {
  constructor() {
    if (__DEV__) {
      this.reactotron = new ReactotronDev()
    }
    this.api = new Api()
  }

  async setup() {
    if (__DEV__) {
      await this.reactotron.setup()
    }
    await this.api.setup()
  }

  reactotron: typeof ReactotronDev
  api: Api
}
