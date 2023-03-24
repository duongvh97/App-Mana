import { TYPE_ADD_WIFI } from "../action/WifiAction";

export interface WifiProps {
    name: string,
    password: string
}


const defaultState: { data: [WifiProps] } = {
    // @ts-ignore
    data: []
};

const WifiReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case TYPE_ADD_WIFI : {
            let data = state.data;
            console.log("WifiReducer1: ", data);
            if (data.length <= 0) {
                data.push(action.wifi);
            } else {
                let index = data.findIndex(w => w.name === action.wifi.name);
                console.log(data, index);
                if (index >= 0) {
                    data[index] = action.wifi;
                } else {
                    data.push(action.wifi);
                }
            }
            console.log("WifiReducer: ", data);
            return {
                ...state,
                data: data
            };
        }


        default:
            return state;
    }
};

export default WifiReducer;
