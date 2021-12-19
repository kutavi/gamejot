// For more info on how to write Detox tests, see the official docs:
// https://github.com/wix/Detox/blob/master/docs/README.md

const { reloadApp } = require("./reload")

describe("Example", () => {
  beforeEach(async () => {
    await reloadApp()
  })

  it("should have main screen", async () => {
    await expect(element(by.id("MainScreen"))).toBeVisible()
  })

  it("should go to next screen after tap", async () => {
    await element(by.id("next-screen-button")).tap()
    await expect(element(by.id("DemoScreen"))).toBeVisible()
  })
})
