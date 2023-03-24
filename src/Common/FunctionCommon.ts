import { store } from "../redux";
import _ from "lodash";
import { DeviceProps } from "../redux/reducer/DeviceReducer";

export function formatNickname(text: string) {
    return text.replace(/\+/g, " ");
}

export function isJson(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const padNumber = (num: number) : string => {
    let temp = num.toString();
    if (temp.length >= 2) return temp;
    return `0${temp}`;
};

export const formatTime = (second: number | null | undefined) => {
    if (!second) return "00:00:00";
    let h = Math.floor(second / 3600);
    let temp = second % 3600;
    let m = Math.floor(temp / 60);
    let s = Math.floor(temp % 60);
    return `${padNumber(h)}:${padNumber(m)}:${padNumber(s)}`;
};


export function isTextEmpty(text: string | undefined | null) {
    if (!text) return true;
    return text.length <= 0;
}

export function equalVal(o1: any, o2: any) {
    // noinspection EqualityComparisonWithCoercionJS
    return o1 == o2;
}

/**
 * return new object
 * @param mac
 */
export function getDeviceByMac(mac: string): DeviceProps | null {
    let devices = store.getState().devices.device;
    if (!mac || devices.length <= 0) return null;
    for (let i = 0; i < devices.length; i++) {
        if (devices[i].mac === mac) {
            return _.cloneDeep(devices[i]);
        }
    }
    return null;
}

export function convertToBinary(x: number): string {
    let bin = 0;
    let rem, i = 1, step = 1;
    while (x != 0) {
        rem = x % 2;
        // console.log(
        //     `Step ${step++}: ${x}/2, Remainder = ${rem}, Quotient = ${parseInt(x/2)}`
        // );
        // @ts-ignore
        x = parseInt(x / 2);
        bin = bin + rem * i;
        i = i * 10;
    }
    // console.log(`Binary: ${bin}`);
    return `${bin}`;
}

export function getDaysArrayByDecNumber(x: number): number[] {
    try {
        let textBin = convertToBinary(x);
        let arr = textBin.split("").map(item => parseInt(item));
        arr = arr.reverse();
        return arr;
    } catch (e) {
        __DEV__ && console.log(e);
        return [0, 0, 0, 0, 0, 0, 0, 0];
    }
}

export function getTimerByIdTimer(device: DeviceProps, idTimer: number): number {
    let timer = device.timer;
    if (!timer || timer.length <= 0) return -1;
    return timer.findIndex(item => item.id === idTimer);
}

export function isUndefined(x: number | undefined | null) : boolean {
    return x === undefined;

}
