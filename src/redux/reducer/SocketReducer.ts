export const CONNECT_COMPLETE = "CONNECT_COMPLETE";
export const SET_CLIENTID = "SET_CLIENTID";
export const DISCONNECT = "DISCONNECT";
export const SET_TIME_IN_BACKGROUND = "SET_TIME_IN_BACKGROUND";

const defaultState = {
    socket: null,
    clientID: "",
    timeInBackground: 0
};
const socketReducer = (state: {
    socket: any | null,
    clientID: string,
    // timeInBackground: number
} = defaultState, action: any) => {
    switch (action.type) {
        case CONNECT_COMPLETE:
            return {
                ...state,
                socket: action.socket
            };

        case SET_CLIENTID:
            return {
                ...state,
                clientID: action.clientID
            };
        case SET_TIME_IN_BACKGROUND:
            return {
                ...state,
                timeInBackground: action.time
            };

        case DISCONNECT:
            return {
                socket: null,
                clientID: ""
            };
        default:
            return state;
    }
};

export default socketReducer;
