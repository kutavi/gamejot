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
  }

  async setup() {
    if (__DEV__) {
      await this.reactotron.setup()
    }
  }

  reactotron: typeof ReactotronDev
}
