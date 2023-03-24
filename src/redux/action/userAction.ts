import {
    TYPE_ACTION_LOGOUT,
    TYPE_ACTION_SAVE_ACCOUNT,
    TYPE_ACTION_SAVE_TOKEN,
    TYPE_ACTION_SAVE_USER
} from "../reducer/UserReducer";

export function setDataUser(data: any) {
    return { type: TYPE_ACTION_SAVE_USER, data };
}

export function setAccountUser(account: any) {
    return { type: TYPE_ACTION_SAVE_ACCOUNT, account };
}

export function setDataToken(token: any) {
    return { type: TYPE_ACTION_SAVE_TOKEN, token };
}

export function logout() {
    return { type: TYPE_ACTION_LOGOUT };
}
