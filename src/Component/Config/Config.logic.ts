import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerProps } from "../../redux/reducer";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { NetworkInfo } from "react-native-network-info";
import { useNavigation, useRoute } from "@react-navigation/native";


// @ts-ignore
import SmartConfig from "react-native-smartconfig-quan";
import { requestLocationPermission } from "../../Common/PermissionApp";
import { equalVal, isJson, isTextEmpty } from "../../Common/FunctionCommon";
import { addWifiAction } from "../../redux/action/WifiAction";
import { showMessageDanger, showMessageSuccess, showMessageWarning } from "../../Common/FlashMessageCommon";
import { NavigationKey } from "../../const/NavigationKey";
import { translate } from "../../Translations/Translate";
import SystemSetting from "react-native-system-setting";


const TIME_OUT_SMART_CONFIG = 60 * 1000;
let foundDevice = false;

interface routeProps {
    name: string,
    key: string,
    params: { onLoadListHome: () => void }
}

interface EventSmConfig {
    "data": string,
    "eventName": "onFinishScan" | "onFoundDevice"
}


function ConfigLogic() {
    // const [data, setData] = useState<string>("");
    const listWifi = useSelector((state: RootReducerProps) => state.wifi);
    const [ssid, setSSID] = useState<string>("");
    const [wifiPass, setWifiPass] = useState<string>("");
    const [isScan, setScan] = useState<boolean>(false);
    const [wifiBssid, setWifiBssid] = useState<string | null>("8a:29:9c:69:af:9b");
    const [isConnectWifi, setConnectWifi] = useState<boolean | null>(false);
    const [locationEnable, setLocationEnable] = useState(false);

    const navigation = useNavigation<any>();
    const route = useRoute<routeProps>();
    const dispatch = useDispatch();

    console.log("listWifi: ", listWifi);
    useEffect(() => {
        requestLocationPermission(allow => {
            if (allow) {
                getInfoWifi();
            }
            console.log(allow);
        });
        // getInfoWifi();
        NetInfo.addEventListener(state => checkNetInfoState(state).then());

        let locationListener: any;
        SystemSetting.addLocationListener((_) => {
            checkInfoToGetWifi();
        }).then(res => locationListener = res);

        checkInfoToGetWifi();

        return () => SystemSetting.removeListener(locationListener);

    }, []);


    function checkInfoToGetWifi() {
        checkLocationTurnOn();
        getInfoWifi();
    }

    console.log("locationEnable: ", locationEnable);

    function checkLocationTurnOn() {
        SystemSetting.isLocationEnabled().then(res => setLocationEnable(res));
    }

    function getInfoWifi() {
        NetInfo.fetch().then(state => checkNetInfoState(state).then());
    }

    async function checkNetInfoState(state: NetInfoState) {
        let ssid = await NetworkInfo.getSSID();
        let bssid = await NetworkInfo.getBSSID();
        let isConnectWifi = equalVal(state.type, "wifi") && state.isConnected;
        setConnectWifi(isConnectWifi);
        if (!isTextEmpty(ssid)) {
            let data = listWifi.data.find(w => w.name === ssid);
            if (data) setWifiPass(data.password);
        }

        if (!ssid) return;

        if (isConnectWifi) {
            setSSID(ssid);
            setWifiBssid(bssid);

            // getPasswordSaveWifi(ssid).then(pass => {
            //     setWifiPass(pass);
            // })
        }

    }

    let onStartConfig = () => {
        // navigation.replace(NavigationKey.SetupNewDevice);

        dispatch(addWifiAction({ name: ssid ? ssid : "", password: wifiPass }));

        if (!isConnectWifi) {
            showMessageDanger(translate("connectToWifiUsingFunction"));
            return;
        }
        if (!locationEnable) {
            showMessageDanger(translate("locationEnable"));
            return;
        }

        if (!isTextEmpty(ssid)) {
            SmartConfig.start(ssid, wifiBssid, wifiPass, TIME_OUT_SMART_CONFIG, (event: EventSmConfig) => {
                let { eventName, data } = event;
                console.log("event", event, data);
                if (eventName === "onFoundDevice") {
                    if (isJson(data)) {
                        let _data = JSON.parse(data);

                        foundDevice = true;
                        showMessageSuccess(translate("configDeviceDone", { data: _data.ip }));
                        navigation.replace(NavigationKey.SetupNewDevice, { mac: _data.bssid });
                    } else {
                        showMessageSuccess(translate("configDeviceDone", { data: "" }));
                        navigation.replace(NavigationKey.SetupNewDevice);
                    }
                    setScan(false);
                } else {
                    if (!foundDevice) {
                        showMessageWarning(translate("deviceNotFound"));
                        console.log("not found");
                        setScan(false);
                    }
                }
            });

            setScan(true);
        } else {
            showMessageDanger(translate("nameWifiNotEmpty"));
            setScan(false);
        }
    };

    const stopScan = () => {
        SmartConfig?.stop();
        setScan(false);
    };


    return {
        onStartConfig,
        getInfoWifi,
        ssid, setSSID,
        wifiPass, setWifiPass,
        isScan, setScan,
        navigation,
        stopScan,
        isConnectWifi,
        locationEnable
    };
}

export default ConfigLogic;
