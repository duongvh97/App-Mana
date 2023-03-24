import Geolocation from "react-native-geolocation-service";
import { Linking, PermissionsAndroid, Platform } from "react-native";

export function isIos() {
    return Platform.OS === "ios";
}

export function isAndroid() {
    return Platform.OS === "android";
}


export function requestLocationPermission(onFinish: (allow: boolean) => void) {
    let allow = false;
    if (isIos()) {
        console.log("request Location Permission ios");
        console.log(Geolocation);
        // Geolocation.setRNConfiguration({
        //     skipPermissionRequests: false,
        //     authorizationLevel: 'whenInUse',
        // });
        Geolocation.requestAuthorization("whenInUse").then(res => {
            console.log("res", res);
            onFinish(res === "granted");
        }).catch(e => {
            console.log("error", e);
            onFinish(false);
        });
    } else {
        try {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(granted => {
                allow = granted === PermissionsAndroid.RESULTS.GRANTED;
                onFinish(allow);
            });
        } catch (err) {
            onFinish(false);
        }
    }
}


function openSettingIos() {
    Linking.openURL("App-Prefs:root=WIFI");
}

export function openLocationSetting() {
    if (isIos()) {
        openSettingIos();
    } else {
        // AndroidOpenSettings.locationSourceSettings();
    }
}
