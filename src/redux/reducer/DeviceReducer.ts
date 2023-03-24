import _ from "lodash";
import { dataEx, STATUS_DEVICES, TYPE_DEVICES } from "../../const/Const";

export const TYPE_ACTION_ADD_DEVICE = "TYPE_ACTION_ADD_DEVICE";
export const TYPE_ACTION_ADD_DEVICE_ALARM = "TYPE_ACTION_ADD_DEVICE_ALARM";
export const TYPE_ACTION_UPDATE_DEVICE_BY_INDEX = "TYPE_ACTION_UPDATE_DEVICE_BY_INDEX";
export const TYPE_ACTION_UPDATE_DEVICE_BY_MAC = "TYPE_ACTION_UPDATE_DEVICE_BY_MAC";


export type timerProps = {
    "R": number, "G": number, "B": number, "W": number, "UV": number, "P": number, "T": number, "RP": number, id: number, "Y": number;
    "V": number;
    "DB": number;
}

export type contextProps = {
    "cmd": string
    "id": number,
    "name": string,
    isNull?: boolean,
}

export type DeviceProps = {
    name: string;
    status: string;
    timer: timerProps[];
    context: contextProps[];
    id: number;
    "R": number;
    "G": number;
    "B": number;
    "W": number;
    "UV": number;
    "P": number;
    "T": number;

    "Y": number;
    "V": number;
    "DB": number;

    type: number;
    mac: string;

    timeResponse?: number;
};


interface DeviceReducerProps {
    device: DeviceProps[] | [],
    alarm: []
}

const defaultState: DeviceReducerProps = {
    // device: dataEx,
    device: [],
    alarm: []
};

const DeviceReducer = (state = defaultState, action: any) => {
    // console.log(action);
    switch (action.type) {
        case TYPE_ACTION_ADD_DEVICE : {
            return {
                ...state,
                device: _.cloneDeep(action.device)
            };
        }
        case TYPE_ACTION_UPDATE_DEVICE_BY_INDEX : {
            let devices = _.cloneDeep(state.device);
            devices[action.index] = action.device;
            return {
                ...state,
                device: devices
            };
        }

        case TYPE_ACTION_UPDATE_DEVICE_BY_MAC : {
            let devices = _.cloneDeep(state.device);

            let index = _.findIndex(devices, (item: DeviceProps) => {
                return item.mac === action.device.mac;
            });

            if (index !== -1) {
                devices[index] = action.device;
            }


            return {
                ...state,
                device: devices
            };
        }

        case TYPE_ACTION_ADD_DEVICE_ALARM : {
            return action.alarm;
        }

        default:
            return state;
    }
};

export default DeviceReducer;

