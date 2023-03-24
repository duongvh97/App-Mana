import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import StyleGlobal from "../../theme/StyleGlobal";
import HeaderSimple from "../../CommonView/Header/HeaderSimple";
import { translate } from "../../Translations/Translate";
import Colors from "../../theme/Colors";
import { CommonInput } from "../../CommonView/Input";
import CommonText from "../../CommonView/CommonText/CommonText";
import { img_icon_device1, img_icon_device2, img_icon_device3 } from "../../assets/images/icon";
import { MaterialIcon } from "../../CommonView/NativeModules/Icon/MaterialIcon";
import { CONTEXT_DEVICE_DEFAULT, CONTEXT_DEVICE_DEFAULT_W, STATUS_DEVICES, TYPE_DEVICES } from "../../const/Const";
import CommonButton from "../../CommonView/Button/CommonButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DeviceProps } from "../../redux/reducer/DeviceReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerProps } from "../../redux/reducer";
import _, { isUndefined } from "lodash";
import { setDevice } from "../../redux/action/DeviceAction";
import { isTextEmpty } from "../../Common/FunctionCommon";
import { showMessageDanger } from "../../Common/FlashMessageCommon";
import { getTopicStatusByMac } from "../../const/Mqtt";


function checkExistMac(mac: string, listDevice: DeviceProps[]) {
    let result = false;
    listDevice.forEach(item => {
        if (item.mac === mac) {
            result = true;
        }
    });
    return result;
}

function SetupNewDevice() {

    const route = useRoute<{
        name: string,
        key: string,
        params: { device: DeviceProps, index: number, mac: string }
    }>();


    const macDevice = route.params?.mac;
    console.log("macDevice", macDevice);

    const [typeDevice, setTypeDevice] = React.useState(TYPE_DEVICES.DEV_RGBUV);
    const [macAddress, setMacAddress] = React.useState(isUndefined(macDevice) ? "" : macDevice);
    const listDevice = useSelector((state: RootReducerProps) => state.devices.device);
    const [nameDevice, setNameDevice] = React.useState(listDevice.length >= 1 ? `MANA Light ${listDevice.length + 1}` : "MANA Light ");
    const dispatch = useDispatch();
    const navigation = useNavigation();
    let client = useSelector((state: RootReducerProps) => state.socket.socket);


    const onSubmit = () => {

        if (isTextEmpty(macAddress)) {
            showMessageDanger(translate("macNotEmpty"));
            return;
        }
        if (isTextEmpty(nameDevice.trim())) {
            showMessageDanger(translate("nameNotEmpty"));
            return;
        }
        if (checkExistMac(macAddress, listDevice)) {
            showMessageDanger(translate("macExist"));
            return;
        }


        let device: DeviceProps = {
            name: nameDevice.trim(),
            status: STATUS_DEVICES.ONLINE,
            timer: [],
            context: [],
            id: new Date().getTime(),
            "R": 0,
            "G": 0,
            "B": 0,
            "W": 0,
            "UV": 0,
            "P": 0,
            "T": 0,

            "Y": 0,
            "DB": 0,
            "V": 0,

            type: typeDevice,
            mac: macAddress,
            timeResponse: new Date().getTime()

        };

        if (typeDevice !== TYPE_DEVICES.DEV_RGBUV) {
            device.context = CONTEXT_DEVICE_DEFAULT_W;
        } else if (typeDevice === TYPE_DEVICES.DEV_RGBUV) {
            device.context = CONTEXT_DEVICE_DEFAULT_W;
        }

        let listDeviceNew = _.cloneDeep(listDevice);
        listDeviceNew.push(device);


        client.subscribe(getTopicStatusByMac(device.mac), 0);
        dispatch(setDevice(listDeviceNew));


        navigation.goBack();
    };

    return <View style={StyleGlobal.container}>
        <HeaderSimple
            icon={"arrow-left"}
            name={translate("setupDevice")}
            styleContainer={{
                ...StyleGlobal.containerHeader,
                backgroundColor: Colors.white
            }} />


        <ScrollView
            showsVerticalScrollIndicator={true}>
            <View style={{
                ...StyleGlobal.card,
                marginHorizontal: 14,
                padding: 12,
                backgroundColor: Colors.white,
                marginTop: 14,
                borderRadius: 12
            }}>
                <CommonText value={translate("setup.info")} style={{ fontWeight: "bold", fontSize: 18 }} />
                <CommonInput
                    value={nameDevice}
                    title={translate("setup.name")}
                    placeholder={translate("setup.name")}
                    onChangeText={e => setNameDevice(e)}
                />

                <CommonInput
                    editable={!!isUndefined(macDevice)}
                    value={macAddress}
                    title={translate("setup.serial")}
                    placeholder={translate("setup.serial")}
                    onChangeText={e => setMacAddress(e)}
                />
            </View>

            <View style={{
                ...StyleGlobal.card,
                marginHorizontal: 14,
                padding: 12,
                backgroundColor: Colors.white,
                marginTop: 14,
                borderRadius: 12
            }}>
                <CommonText value={translate("setup.chooseType")} style={{ fontWeight: "bold", fontSize: 18 }} />
                <View style={{ ...StyleGlobal.flexRow, justifyContent: "center" }}>
                    {/*<TouchableOpacity*/}
                    {/*    onPress={() => setTypeDevice(TYPE_DEVICES.DEV_RGBWUV)}*/}
                    {/*    style={{ justifyContent: "center", alignItems: "center", marginTop: 14, marginRight: 10 }}>*/}
                    {/*    <Image source={img_icon_device1}*/}
                    {/*           style={{ width: 100, height: 80, marginBottom: 5 }} />*/}
                    {/*    <MaterialIcon*/}
                    {/*        name={typeDevice === TYPE_DEVICES.DEV_RGBWUV ? "check-circle" : "checkbox-blank-circle-outline"}*/}
                    {/*        size={24} color={Colors.primary} />*/}
                    {/*</TouchableOpacity>*/}
                    <TouchableOpacity
                        onPress={() => setTypeDevice(TYPE_DEVICES.DEV_RGBUV)}
                        style={{ justifyContent: "center", alignItems: "center", marginTop: 14, marginLeft: 10 }}>
                        <Image source={img_icon_device2}
                               style={{ width: 100, height: 80, marginBottom: 5 }} />
                        <MaterialIcon
                            name={typeDevice === TYPE_DEVICES.DEV_RGBUV ? "check-circle" : "checkbox-blank-circle-outline"}
                            size={24} color={Colors.primary} />
                    </TouchableOpacity>
                    {/*<TouchableOpacity*/}
                    {/*    onPress={() => setTypeDevice(TYPE_DEVICES.DEV_RGBUV_Y_DB)}*/}
                    {/*    style={{ justifyContent: "center", alignItems: "center", marginTop: 14, marginLeft: 10 }}>*/}
                    {/*    <Image source={img_icon_device3}*/}
                    {/*           style={{ width: 100, height: 80, marginBottom: 5 }} />*/}
                    {/*    <MaterialIcon*/}
                    {/*        name={typeDevice === TYPE_DEVICES.DEV_RGBUV_Y_DB ? "check-circle" : "checkbox-blank-circle-outline"}*/}
                    {/*        size={24} color={Colors.primary} />*/}
                    {/*</TouchableOpacity>*/}
                </View>
            </View>

            <CommonButton
                onPress={onSubmit}
                text={translate("save")}
                style={{
                    height: 45,
                    width: "65%",
                    backgroundColor: Colors.primary,
                    alignSelf: "center",
                    marginTop: 20
                }} />
        </ScrollView>
    </View>;
}

export default React.memo(SetupNewDevice);
