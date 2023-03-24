import { I18nManager } from "react-native";
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize";

export const translationGetters = {
    vi: () => require("./Language/vi.json"),
    en: () => require("./Language/en.json")

};
export const translate = memoize(
    (key, config?) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
);
export const setI18nConfig = (languageTag: any) => {
    // fallback if no available language fits
    const fallback = { languageTag: "en", isRTL: false };

    const { isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

    // clear translation cache
    // @ts-ignore
    translate.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isRTL);
    // set i18n-js config
    // @ts-ignore
    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;
};
