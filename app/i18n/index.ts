import i18n from "i18n-js"
import * as Localization from "expo-localization"
import en from "./en.json"

i18n.fallbacks = true
i18n.translations = { en }

i18n.locale = Localization.locale || "en"

/**
 * Builds up valid keypaths for translations.
 * Update to your default locale of choice if not English.
 */
type DefaultLocale = typeof en
export type TransKeyPath = RecursiveKeyOf<DefaultLocale>

type RecursiveKeyOf<TObj extends Record<string, any>> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`
}[keyof TObj & string]

export function translate(key: TransKeyPath, options?: i18n.TranslateOptions) {
  return key ? i18n.t(key, options) : null
}
