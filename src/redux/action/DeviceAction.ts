import {
    DeviceProps,
    TYPE_ACTION_ADD_DEVICE,
    TYPE_ACTION_UPDATE_DEVICE_BY_INDEX,
    TYPE_ACTION_UPDATE_DEVICE_BY_MAC
} from "../reducer/DeviceReducer";


export function setDevice(device: DeviceProps[]) {
    return { type: TYPE_ACTION_ADD_DEVICE, device };
}

export function updateDeviceByIndex(device: DeviceProps, index: number) {
    return { type: TYPE_ACTION_UPDATE_DEVICE_BY_INDEX, device, index };
}

export function updateDevice(device: DeviceProps) {
    return { type: TYPE_ACTION_UPDATE_DEVICE_BY_MAC, device };
}
