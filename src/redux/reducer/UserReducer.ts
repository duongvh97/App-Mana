// UserReducer
import { Reducer } from "redux";

export const TYPE_ACTION_SAVE_USER = "TYPE_ACTION_SAVE_USER";
export const TYPE_ACTION_SAVE_TOKEN = "TYPE_ACTION_SAVE_TOKEN";
export const TYPE_ACTION_SAVE_ACCOUNT= "TYPE_ACTION_SAVE_ACCOUNT";
export const TYPE_ACTION_LOGOUT = "TYPE_ACTION_LOGOUT";

export type UserPropsAction = {
    "id": number,
    "name": string,
    "description": string,
    "email": string,
    "email_verified_at": null | any,
    "created_at": string,
    "updated_at": string
    "avatar"?: string,
}

export type TokenPropsAction = {
    "code": number,
    "success": boolean,
    "access_token": string,
    "token_type": string
}

interface AccountReducerProps {
    username: string,
    password: string,
}

interface UserReducerProps {
    data: UserPropsAction | null;
    token: TokenPropsAction | null;
    account: AccountReducerProps | null;
}

const defaultState = {
    data: null,
    token: null,
    account: null
};

const UserReducer: Reducer<UserReducerProps> = (state = defaultState, action: any) => {
    switch (action.type) {
        case TYPE_ACTION_SAVE_USER : {
            return {
                ...state,
                data: action.data
            };
        }
        case TYPE_ACTION_SAVE_ACCOUNT : {
            return {
                ...state,
                account: action.account
            };
        }
        case TYPE_ACTION_SAVE_TOKEN : {
            return {
                ...state,
                token: action.token
            };
        }
        case TYPE_ACTION_LOGOUT : {
            return defaultState;
        }

        default:
            return state;
    }
};

export default UserReducer;
