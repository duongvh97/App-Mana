import { useRoute } from "@react-navigation/native";
import { DeviceProps } from "../../redux/reducer/DeviceReducer";
import { useSelector } from "react-redux";
import { RootReducerProps } from "../../redux/reducer";
import _ from "lodash";
import { useEffect, useRef } from "react";


export type routeCustomProps<T> = {
    name: string,
    key: string,
    params: { device: DeviceProps, index: number, } & T
}


export function useDevice<T>() {
    const router = useRoute<routeCustomProps<T>>();
    const index = router.params.index;
    const devices = useSelector((state: RootReducerProps) => state.devices.device);

    const device: DeviceProps = devices[index];
    const deviceNew = useRef(_.cloneDeep(device));

    // console.log("useDevice", index, device);

    return {
        device,
        index,
        deviceNew: deviceNew.current
    };
}
