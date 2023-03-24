import React, { useEffect, useRef } from "react";
import { ScrollView, Switch, View } from "react-native";
import HeaderSimple from "../../CommonView/Header/HeaderSimple";
import StyleGlobal from "../../theme/StyleGlobal";
import Colors from "../../theme/Colors";
import { translate } from "../../Translations/Translate";
import { ButtonContext } from "./ButtonContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NavigationKey } from "../../const/NavigationKey";
import GroupSlider from "./GroupSlider";
import { DeviceProps } from "../../redux/reducer/DeviceReducer";
import ModalSaveContext from "./ModalSaveContext";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerProps } from "../../redux/reducer";
import { MqttControl } from "../../Common/mqtt/MqttControl";
import { isUndefined } from "lodash";
import CommonText from "../../CommonView/CommonText/CommonText";
import MyBottomSheetFlatList from "../../CommonView/CommonBottomSheet/MyBottomSheetFlatList";
import BottomSheet from "@gorhom/bottom-sheet";


interface routeProps {
    name: string,
    key: string,
    params: { device: DeviceProps, index: number }
}

let data: string | undefined = "";

function DetailScreen() {
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    const navigation = useNavigation<any>();
    const router = useRoute<routeProps>();
    const dispatch = useDispatch();

    const index = router.params.index;
    const refGroupSlider = useRef<{ getValue: () => string, getObject: () => string }>();
    const devices = useSelector((state: RootReducerProps) => state.devices.device);
    const device: DeviceProps = devices[index];
    const [p, setP] = React.useState<boolean>(true);


    const bottomSheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
        if (Number(p) != device.P) {
            setP(Boolean(device.P));
        }
    }, [device]);

    // const renderListContext = useCallback(() => {
    //     let dataContext = _.cloneDeep(device.context);
    //     console.log("dataContext.length", dataContext.length);
    //     if (dataContext.length > 0) {
    //         if (dataContext.length % 3 !== 0) {
    //             dataContext.push({
    //                 isNull: true,
    //                 "cmd": "",
    //                 "id": -1,
    //                 "name": ""
    //             });
    //         }
    //
    //         return <View style={styles.wrapListContext}>
    //             {dataContext.map((item: contextProps, index: number) => {
    //                 if (item.isNull) return <CommonButton
    //                     key={"empty1"}
    //                     disabled={true}
    //                     text={""}
    //                     style={{
    //                         height: 40,
    //                         backgroundColor: Colors.white,
    //                         width: "80%",
    //                         marginVertical: 5
    //                     }}
    //                 />;
    //
    //                 return ;
    //             })}
    //         </View>;
    //     }
    //     return null;
    // }, [device.context]);

    // console.log("🐛🐛🐛 line 85 -> DetailScreen.tsx -> DetailScreen :", device);
    return <View style={StyleGlobal.container}>
        <HeaderSimple
            icon={"arrow-left"}
            name={device.name}
            iconRight={"alarm"}
            onPressButtonRight={() => navigation.navigate(NavigationKey.AlarmScreen, { device, index })}
            styleContainer={{
                ...StyleGlobal.containerHeader,
                backgroundColor: Colors.white
            }} />
        <ScrollView style={StyleGlobal.flex1}>
            <View style={{
                ...StyleGlobal.subCard,
                marginTop: 14, ...StyleGlobal.shadow,
                marginHorizontal: 25,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
            }}>
                {/*<CommonText value={`${!isUndefined(device?.T) ? device?.T : 0}°C`}*/}
                {/*            style={{textAlign: "center", fontSize: 20, fontWeight: "bold", paddingHorizontal: 14}}/>*/}

                <CommonText value={p ? translate("on") : translate("off")} style={{ marginHorizontal: 14 }} />

                <Switch value={p}
                        onValueChange={(e) => {
                            let obj = refGroupSlider.current?.getObject();
                            //@ts-ignore
                            obj.P = Number(e);
                            MqttControl.sendObj({ "control": obj }, device.mac);
                            setP(e);

                        }} />
            </View>

            <GroupSlider type={device.type} device={device} isSendMqtt={true} ref={refGroupSlider} p={p} setP={setP} />

            <View style={{
                marginVertical: 14,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                marginHorizontal: 14
            }}>
                <ButtonContext
                    style={{
                        height: 40,
                        backgroundColor: Colors.primary,
                        width: "40%",
                        marginVertical: 5,
                        margin: 7
                    }}
                    text={translate("saveContext")}
                    onPress={() => {
                        data = refGroupSlider.current?.getValue();
                        console.log("data", data);
                        setModalVisible(true);
                    }} />

                <ButtonContext
                    style={{
                        height: 40,
                        backgroundColor: Colors.primary,
                        width: "40%",
                        marginVertical: 5,
                        margin: 7
                    }}
                    text={translate("context")}
                    onPress={() => {
                        data = refGroupSlider.current?.getValue();
                        console.log("data", data);
                        bottomSheetRef.current?.expand();
                    }} />
            </View>
        </ScrollView>

        <MyBottomSheetFlatList

            device={device}
            label={translate("listContext")}
            ref={bottomSheetRef}
            maxHeight={300}
            data={device.context}
        >
            <View>

            </View>
        </MyBottomSheetFlatList>

        <ModalSaveContext
            device={device}
            data={data ? data : ""}
            onHideModal={() => setModalVisible(false)}
            isShowModal={modalVisible}
            nameDevice={""}
        />
    </View>;
}


export default React.memo(DetailScreen);
