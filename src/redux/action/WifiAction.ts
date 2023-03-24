import { WifiProps } from "../reducer/WifiReducer";

export const TYPE_ADD_WIFI = "TYPE_ADD_WIFI";

export function addWifiAction(wifi: WifiProps) {
    return { type: TYPE_ADD_WIFI, wifi };
}
