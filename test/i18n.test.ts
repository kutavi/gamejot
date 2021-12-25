const en = require("../app/i18n/en.json")
const { exec } = require("child_process")

const EXCEPTIONS = [
  // "welcomeScreen.readyForLaunch",
]

function iterate(obj, stack, array) {
  for (const property in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      if (typeof obj[property] === "object") {
        iterate(obj[property], `${stack}.${property}`, array)
      } else {
        array.push(`${stack.slice(1)}.${property}`)
      }
    }
  }

  return array
}

describe("i18n", () => {
  test("There are no missing keys", (done) => {
    // Actual command output:
    // grep "Tx=\"\S*\"\|tx=\"\S*\"\|translate(\"\S*\"" -ohr './app' | grep -o "\".*\""
    const command = `grep "Tx=\\"\\S*\\"\\|tx=\\"\\S*\\"\\|translate(\\"\\S*\\"" -ohr './app' | grep -o "\\".*\\""`
    exec(command, (_, stdout) => {
      const allTranslationsDefined = iterate(en, "", [])
      const allTranslationsUsed = stdout.replace(/"/g, "").split("\n")
      allTranslationsUsed.splice(-1, 1)

      for (let i = 0; i < allTranslationsUsed.length; i += 1) {
        if (!EXCEPTIONS.includes(allTranslationsUsed[i])) {
          // You can add keys to EXCEPTIONS (above) if you don't want them included in the test
          expect(allTranslationsDefined).toContainEqual(allTranslationsUsed[i])
        }
      }
      done()
    })
  }, 240000)
})
