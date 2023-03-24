import React, { useEffect, useState } from "react";
import { Image, Platform, SafeAreaView, StatusBar, View } from "react-native";
import StyleGlobal from "../../theme/StyleGlobal";
import { img_images_logo } from "../../assets/images";
import CommonText from "../../CommonView/CommonText/CommonText";
import { translate } from "../../Translations/Translate";
import { MenuItem } from "../../CommonView/Menu/MenuItem";
import ModalLanguage from "./ModalLanguage";
import { isIos } from "../../Common/PermissionApp";
import DeviceInfo from "react-native-device-info";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerProps } from "../../redux/reducer";
// import codePush from "react-native-code-push";
import CodePush, { LocalPackage } from "react-native-code-push";
import codePush from "react-native-code-push";
import { isTextEmpty } from "../../Common/FunctionCommon";
import { showMessageDanger } from "../../Common/FlashMessageCommon";
import { DeviceProps } from "../../redux/reducer/DeviceReducer";
import { CONTEXT_DEVICE_DEFAULT, CONTEXT_DEVICE_DEFAULT_W, STATUS_DEVICES, TYPE_DEVICES } from "../../const/Const";
import _ from "lodash";
import { getTopicStatusByMac } from "../../const/Mqtt";
import { setDevice } from "../../redux/action/DeviceAction";

export function getBuildNumber() {
    let build: string | number = DeviceInfo.getBuildNumber();

    // android when enableSeparateBuildPerCPUArchitecture = true, build number will diff for each abi
    if (!isIos()) {
        build = parseInt(build);
        build = build % 10000;
    }
    return build;
}


function InfoScreen() {

    const [modalVisible, setModalVisible] = React.useState(false);
    const lang = useSelector((s: RootReducerProps) => s.lang.lang); // no remove
    const [build, setBuild] = useState<LocalPackage | null>(null);
    const [countAddDeviceTest, setCountAddDeviceTest] = useState<number>(0);
    const listDevice = useSelector((state: RootReducerProps) => state.devices.device);

    const dispatch = useDispatch();


    useEffect(() => {
        codePush.getUpdateMetadata().then(data => {
            console.log("🐛🐛🐛 line 36 -> InfoScreen.tsx ->  :", data);
            setBuild(data);
        });
    }, []);


    const onAddDeviceTest = () => {
        let temp_: DeviceProps = {
            "name": "DEemo 01",
            "status": "online",
            "timer": [
                // @ts-ignore
                {
                    "R": 24,
                    "G": 0,
                    "B": 90,
                    "W": 0,
                    "UV": 0,
                    "P": 0,
                    "T": 390,
                    "RP": 127
                },
                // @ts-ignore
                {
                    "R": 0,
                    "G": 50,
                    "B": 0,
                    "W": 0,
                    "UV": 0,
                    "P": 0,
                    "T": 630,
                    "RP": 127
                }
            ],
            "context": [
                {
                    "id": 1,
                    "name": "Red fish",
                    "cmd": "{\"control\": {\"R\":100,\"G\":60,\"B\":100,\"UV\":0,\"P\":1}}"
                },
                {
                    "id": 2,
                    "name": "Red plant",
                    "cmd": "{\"control\": {\"R\":100,\"G\":70,\"B\":100,\"UV\":0,\"P\":1}}"
                },
                {
                    "id": 3,
                    "name": "Green plant",
                    "cmd": "{\"control\": {\"R\":80,\"G\":100,\"B\":100,\"UV\":0,\"P\":1}}"
                },
                {
                    "id": 4,
                    "name": "Clear water",
                    "cmd": "{\"control\": {\"R\":70,\"G\":70,\"B\":100,\"UV\":0,\"P\":1}}"
                },
                {
                    "id": 5,
                    "name": "Nature",
                    "cmd": "{\"control\": {\"R\":100,\"G\":70,\"B\":80,\"UV\":0,\"P\":1}}"
                }
            ],
            "id": 123123,
            "R": 0,
            "G": 50,
            "B": 0,
            "W": 0,
            "UV": 0,
            "P": 0,
            "T": 21,
            "Y": 0,
            "DB": 0,
            "V": 0,
            "type": 2,
            "mac": "helloabc123123",
            "timeResponse": 1672936876821
        };
        temp_.context = CONTEXT_DEVICE_DEFAULT_W;
        let listDeviceNew = _.cloneDeep(listDevice);
        listDeviceNew.push(temp_);
        dispatch(setDevice(listDeviceNew));

    };

    return <>
        <SafeAreaView style={StyleGlobal.container}>
            <View style={{
                justifyContent: "center",
                alignItems: "center",
                margin: 14,
                padding: 10,
                // borderRadius: 80,
                marginTop: Platform.OS === "android" ? (!StatusBar.currentHeight ? StatusBar.currentHeight : StatusBar.currentHeight + 14) : 0
            }}>
                <Image source={img_images_logo} style={{ width: 140, height: 140, borderRadius: 80 }} />
                <CommonText value={translate("nameApp")} style={{ fontSize: 20, marginTop: 20 }} />
            </View>

            <MenuItem text={translate("language")}
                      textRight={translate(`${lang}`)}
                      onPress={() => setModalVisible(true)} />
            <MenuItem text={"Website"}
                      textRight={"----"} />
            <MenuItem text={translate("version")}
                      textRight={DeviceInfo.getVersion() + " - build " + getBuildNumber()} />
            <MenuItem text={"Build"}
                      onPress={() => {
                          setCountAddDeviceTest(countAddDeviceTest + 1);
                          if (countAddDeviceTest === 30) {
                              onAddDeviceTest();
                              showMessageDanger("ok");
                          }
                      }}
                      textRight={build ? `${build?.label} - ${build?.appVersion}` : "---"} />

        </SafeAreaView>
        <ModalLanguage isShowModal={modalVisible} onHideModal={() => setModalVisible(false)} />
    </>;
}

export default React.memo(InfoScreen);
