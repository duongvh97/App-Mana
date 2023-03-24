import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import StyleGlobal from "../../theme/StyleGlobal";
import HeaderSimple from "../../CommonView/Header/HeaderSimple";
import { translate } from "../../Translations/Translate";
import Colors from "../../theme/Colors";
import colors from "../../theme/Colors";
import GroupSlider from "../DetailScreen/GroupSlider";
import DatePicker from "react-native-date-picker";
import CommonText from "../../CommonView/CommonText/CommonText";
import { routeCustomProps, useDevice } from "../../Common/hook/useDevice";
import _, { isUndefined } from "lodash";
import { MqttControl } from "../../Common/mqtt/MqttControl";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DeviceProps, timerProps } from "../../redux/reducer/DeviceReducer";
import { getDaysArrayByDecNumber } from "../../Common/FunctionCommon";
import { Cmd } from "../../Common/mqtt/Cmd";
import { DialogCustom } from "../../Common/DialogCustom";
import { showMessageWarning } from "../../Common/FlashMessageCommon";
import { WIDTH_SCREEN } from "../../theme/Demension";
import CommonButton from "../../CommonView/Button/CommonButton";

export type DayViewProps = {
    isDisable?: boolean;
    data?: number[] | null
};

export const DayView = React.forwardRef((props: DayViewProps, ref) => {

    const [dataSelected, setDataSelected] = useState(props.data ? props.data : [1, 1, 1, 1, 1, 1, 1]);

    useEffect((): void => {
        if (props.data) {
            setDataSelected(props.data);
        }
    }, [props.data]);

    useImperativeHandle(ref, () => ({
        getDataSelected: () => {
            return dataSelected;
        },
        getDataSelectedTypeDec: () => {
            let d = _.cloneDeep(dataSelected).reverse();
            let str = d.toString();
            str = str.replace(/,/g, "");
            return parseInt(str, 2);
        }
    }));

    return <View style={{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        backgroundColor: Colors.white,
        justifyContent: "space-between",
        marginHorizontal: 14,
        borderRadius: 12
    }}>
        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((item, index) => {

            let colorText = dataSelected[index] === 1 ? Colors.white : Colors.black;
            let colorBackground = dataSelected[index] === 1 ? Colors.primary : Colors.white;

            return <TouchableOpacity
                disabled={props.isDisable}
                onPress={() => {
                    let newData = [...dataSelected];
                    newData[index] = newData[index] === 1 ? 0 : 1;
                    setDataSelected(newData);
                }}
                style={{ flex: 1 }}
                key={index + "_DayViewItem"}>
                <View style={{
                    backgroundColor: colorBackground,
                    margin: 5,
                    width: 30,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 15
                }}>
                    <CommonText value={item} style={{
                        color: colorText
                    }} />
                </View>
            </TouchableOpacity>;
        })}
    </View>;
});


let lengthTimer = 0;
let deviceOld: DeviceProps | null = null;
// @ts-ignore
let timeout: NodeJS.Timeout | null = null;

function AddAlarm() {

    const [open, setOpen] = useState(false);


    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    const device = useDevice().deviceNew;
    const deviceChanger = useDevice().device;

    const [p, setP] = React.useState<boolean>(true);
    // console.log(device);

    const router = useRoute<routeCustomProps<{ indexTimer?: number, onRefresh?: () => void }>>();
    const indexTimer = router.params?.indexTimer;
    const onRefresh = router.params?.onRefresh;

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState({ hour: date.getHours(), minute: date.getMinutes() });

    const refGroupSlider = React.useRef<{ getValue: () => string, getObject: () => object }>(null);
    const refDayView = React.useRef<{ getDataSelectedTypeDec: () => number }>(null);
    const [days, setDays] = useState<null | number[]>(null);
    const firstRender = useRef(true);

    // function checkArrValue(arrKeys: any, cmd: any, item: any) {
    //     for (let j = 0; j < arrKeys.length; j++) {
    //         // @ts-ignore
    //         if (item[arrKeys[j]] !== cmd[arrKeys[j]]) { // nếu có 1 thuộc tính khác thì không phải là cùng 1 timer
    //             return false; // không phải là cùng 1 timer
    //         }
    //     }
    //     return true;
    // }

    function findTimerSametimeByTAndDays(timer: number, days: number, cmd: timerProps): boolean {
        console.log("device.timer", device.timer, cmd);

        // for (let i = 0; i < device.timer.length; i++) {
        //     let item = device.timer[i];
        //     let arrKeys = Object.keys(item);
        //     console.log("device.timer", item, cmd);
        //
        //     if (checkArrValue(arrKeys, cmd, item)) {
        //         return true;
        //     }
        // }
        // return false;

        let timerSametime = device.timer.filter(item => (item.T === timer && item.RP === days));
        return timerSametime.length > 0;
    }

    const getDateUpdateByPram = () => {
        if (indexTimer && firstRender.current) {
            firstRender.current = false;
            let crDate = new Date();
            let timer = device.timer[indexTimer];
            let h = (Math.floor(timer.T / 60));
            let m = timer.T % 60;

            // crDate.setTime((h * 60 * 60 * 1000) + (m * 60 * 1000) + crDate.getTime())
            crDate.setHours(h, m);
            setDate(crDate);
        }
    };

    useEffect(() => {
        // code here
        if (typeof indexTimer !== "undefined" && indexTimer >= 0) {
            getDateUpdateByPram();
        }
    }, [firstRender]);

    useEffect(() => {
        lengthTimer = deviceChanger.timer.length;

        if (typeof indexTimer !== "undefined" && indexTimer >= 0) {
            deviceOld = _.cloneDeep(device);
            let timer = deviceOld.timer[indexTimer];
            __DEV__ && console.log("indexTimer", indexTimer, timer, Math.floor(timer.T));
            setTime({ hour: (Math.floor(timer.T / 60)), minute: timer.T % 60 });

            let _days = getDaysArrayByDecNumber(timer.RP);
            setDays(_days);
        }


        return () => {
            lengthTimer = 0;
            deviceOld = null;
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, []);

    useEffect(() => {
        if (typeof indexTimer !== "undefined" && indexTimer >= 0 && isLoading && deviceChanger.timer[indexTimer]) {

            // console.log("indexTimer", indexTimer, deviceOld?.timer[indexTimer], deviceChanger.timer[indexTimer]);
            let arrKey: any = Object.keys(deviceChanger.timer[indexTimer]);
            for (let i = 0; i < arrKey.length; i++) {
                //@ts-ignore
                if (deviceOld?.timer[indexTimer][arrKey[i]] !== deviceChanger.timer[indexTimer][arrKey[i]]) {
                    navigation.goBack();
                    setIsLoading(false);
                    break;
                }
            }
        } else if (deviceChanger.timer.length !== lengthTimer && isLoading) {
            navigation.goBack();
            setIsLoading(false);
        }
    }, [deviceChanger.timer]);

    const onSubmit = () => {
        setIsLoading(true);
        let cmd: any = refGroupSlider.current?.getObject();
        let rp = refDayView.current?.getDataSelectedTypeDec();
        let _rp: number = isUndefined(rp) ? 0 : rp;
        // console.log("🐛🐛🐛 line 219 -> AddAlarm.tsx -> onSubmit :", cmd);
        cmd.W = 0;
        cmd.UV = 0;
        cmd.T = time.hour * 60 + time.minute;
        cmd.RP = _rp;
        // MqttControl.send(JSON.stringify(cmd), device.mac);
        if (typeof indexTimer !== "undefined" && indexTimer >= 0) {
            MqttControl.sendObj(Cmd.cmdUpdateTimer(indexTimer, cmd), device.mac);
        } else {
            if (findTimerSametimeByTAndDays(cmd.T, _rp, cmd)) {
                showMessageWarning(translate("timerExits"));
                setIsLoading(false);
                return;
            }
            MqttControl.sendObj(Cmd.cmdAddAlarm(cmd), device.mac);
        }

    };

    const onRemove = () => {
        if (typeof indexTimer !== "undefined" && indexTimer >= 0) {
            // MqttControl.sendObj(Cmd.cmdDeleteTimer(indexTimer), device.mac);
            DialogCustom.dialogFunctionOk(translate("removeAlarm"), translate("messageRemoveAlarm"), () => {
                setIsLoading(true);
                MqttControl.sendObj(Cmd.cmdRemoveTimer(indexTimer), device.mac);

                timeout = setTimeout(() => {
                    if (deviceOld !== null) {
                        setIsLoading(false);
                        showMessageWarning(translate("timeout"));
                    }
                }, 3000);
            });
        }
    };

    const dateView = useMemo(() => {
        console.log("🐛🐛🐛 line 252 -> AddAlarm.tsx ->  :", firstRender, date);
        // firstRender.current = false;
        return <DatePicker
            style={{ width: WIDTH_SCREEN - 28, backgroundColor: colors.transparent }}
            confirmText={translate("confirm")}
            cancelText={translate("cancel")}
            title={translate("selectTime")}
            androidVariant={"nativeAndroid"}
            open={open}
            date={date}
            mode={"time"}
            is24hourSource={"locale"}
            onDateChange={(_date) => {
                __DEV__ && console.log(_date.getHours(), _date.getMinutes());
                setTime({ hour: _date.getHours(), minute: _date.getMinutes() });
                setOpen(false);
                setDate(_date);
            }}
            // onConfirm={(_date) => {
            //     __DEV__ && console.log(_date.getHours(), _date.getMinutes());
            //     setTime({hour: _date.getHours(), minute: _date.getMinutes()});
            //     setOpen(false);
            //     setDate(_date);
            // }}
            onCancel={() => {
                setOpen(false);
            }}
        />;
    }, [firstRender, date]);

    return <View style={StyleGlobal.container}>
        <HeaderSimple
            icon={"arrow-left"}
            name={translate("alarm")}
            iconRight={typeof indexTimer !== "undefined" && indexTimer >= 0 ? (isLoading ? null : "delete-outline") : null}
            onPressButtonRight={!isLoading ? onRemove : undefined}

            styleContainer={{
                ...StyleGlobal.containerHeader,
                backgroundColor: Colors.white
            }} />

        <ScrollView showsVerticalScrollIndicator={false}>
            <CommonText value={translate("selectTime")}
                        style={{ fontWeight: "bold", fontSize: 18, margin: 14, textTransform: "uppercase" }} />
            <View style={{ justifyContent: "center", margin: 14, alignItems: "center" }}>
                {dateView}
            </View>

            <View style={{ ...StyleGlobal.subCard, marginTop: 0 }}>
                <CommonText value={translate("selectDay")}
                            style={{
                                fontWeight: "bold",
                                fontSize: 14,
                                marginHorizontal: 14,
                                marginBottom: 10,
                                textTransform: "uppercase"
                            }} />
                <DayView ref={refDayView} data={days} />
            </View>

            <View
                style={{
                    backgroundColor: colors.white,
                    borderRadius: 24,
                    margin: 14,
                    ...StyleGlobal.card,
                    paddingVertical: 29
                }}>


                <GroupSlider
                    p={p}
                    setP={setP}
                    indexTimer={indexTimer}
                    type={device.type}
                    device={device}
                    isSendMqtt={false}
                    ref={refGroupSlider}
                    isShowSwitch={true}
                    isAddAlarm={isUndefined(indexTimer) ? "add" : "update"}
                />
            </View>

            {/*<View style={{marginTop: 20}}>*/}
            {/*    <MenuItem*/}
            {/*        text={translate("time")}*/}
            {/*        textRight={`${padNumber(time.hour)}:${padNumber(time.minute)}`}*/}
            {/*        onPress={() => setOpen(true)}/>*/}
            {/*</View>*/}


            <View style={{ marginBottom: 30 }} />
            <View style={{ width: "100%", height: 60 }} />
        </ScrollView>

        <View style={{ position: "absolute", bottom: 20, width: "100%", left: 0, right: 0 }}>
            <CommonButton
                onPress={onSubmit}
                isLoading={isLoading}
                text={translate("save")}
                style={{
                    height: 45,
                    width: "70%",
                    backgroundColor: Colors.primary,
                    alignSelf: "center",
                    marginTop: 20
                }} />
        </View>

    </View>;
}

export default React.memo(AddAlarm);
