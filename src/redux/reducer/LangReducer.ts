import { VIETNAM } from "../../const/Const";

export const TYPE_ACTION_SET_LANG = "TYPE_ACTION_SET_LANG";

const defaultState = {
    lang: VIETNAM
};

const LangReducer = (state = defaultState, action: any) => {

    switch (action.type) {
        case TYPE_ACTION_SET_LANG : {
            return {
                ...state,
                lang: action.lang
            };
        }
        default:
            return state;
    }
};

export default LangReducer;
