import React from "react";
import { View } from "react-native";
import StyleGlobal from "../../theme/StyleGlobal";
import HeaderSimple from "../../CommonView/Header/HeaderSimple";
import Colors from "../../theme/Colors";
import CommonText from "../../CommonView/CommonText/CommonText";
import { translate } from "../../Translations/Translate";
import { CommonInput } from "../../CommonView/Input";
import CommonButton from "../../CommonView/Button/CommonButton";
import { useDevice } from "../../Common/hook/useDevice";
import { DialogCustom } from "../../Common/DialogCustom";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerProps } from "../../redux/reducer";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
import { setDevice, updateDevice } from "../../redux/action/DeviceAction";
import { showMessageSuccess, showMessageWarning } from "../../Common/FlashMessageCommon";
import { isTextEmpty } from "../../Common/FunctionCommon";
import { MenuItem } from "../../CommonView/Menu/MenuItem";
import { MqttControl } from "../../Common/mqtt/MqttControl";
import { Cmd } from "../../Common/mqtt/Cmd";

function InfoDevice() {

    const { device, index } = useDevice();
    const [name, setName] = React.useState(device.name);
    const listDevice = useSelector((state: RootReducerProps) => state.devices.device);
    const navigation = useNavigation();
    const dispatch = useDispatch();


    const onSave = () => {
        if (isTextEmpty(name)) {
            showMessageWarning(translate("nameDeviceNotEmpty"));
            return;
        }
        let _device = _.cloneDeep(device);
        _device.name = name;
        dispatch(updateDevice(_device));
        showMessageSuccess(translate("updateDeviceSuccess"));
    };

    const onResetDevice = () => {
        DialogCustom.dialogFunctionOk(translate("warning"), translate("confirmResetDevice"), () => {
            MqttControl.sendObj(Cmd.cmdReset(0), device.mac);
        });
    };


    return <View style={StyleGlobal.container}>
        <HeaderSimple
            icon={"arrow-left"}
            name={device.name}
            styleContainer={{
                ...StyleGlobal.containerHeader,
                backgroundColor: Colors.white
            }}
            iconRightColor={Colors.red}
            iconRight={"delete-outline"}
            onPressButtonRight={() => {
                DialogCustom.dialogFunctionOk(translate("messageRemoveDevice.title"), translate("messageRemoveDevice.message"), () => {
                    MqttControl.sendObj(Cmd.cmdReset(1), device.mac);
                    navigation.goBack();
                    console.log("remove device", listDevice);
                    let _listDevice = _.cloneDeep(listDevice);
                    _listDevice.splice(index, 1);
                    dispatch(setDevice(_listDevice));
                });
            }}
        />

        <View style={{ flex: 1 }}>
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
                    title={translate("setup.name")}
                    placeholder={translate("setup.name")}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
            </View>

            <View style={{ marginTop: 12 }}>
                <MenuItem text={"Mac"} textRight={device.mac} />
                <MenuItem text={translate("resetDevice")} onPress={onResetDevice} />
            </View>
        </View>
        <View style={{ marginBottom: 60 }}>
            <CommonButton
                onPress={onSave}
                text={translate("save")}
                style={{
                    height: 45,
                    width: "60%",
                    alignSelf: "center",
                    marginTop: 20,
                    backgroundColor: Colors.primary
                }} />
        </View>
    </View>;
}

export default React.memo(InfoDevice);
