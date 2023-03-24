import { TYPE_ACTION_SET_LANG } from "../reducer/LangReducer";

export function changerLanguage(lang: string) {
    return { type: TYPE_ACTION_SET_LANG, lang };
}
