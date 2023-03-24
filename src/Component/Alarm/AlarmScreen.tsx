import React, { useEffect, useImperativeHandle, useMemo, useState } from "react";
import { Dimensions, FlatList, ListRenderItem, RefreshControl, TouchableOpacity, View, Text } from "react-native";
import StyleGlobal from "../../theme/StyleGlobal";
import HeaderSimple from "../../CommonView/Header/HeaderSimple";
import Colors from "../../theme/Colors";
import { translate } from "../../Translations/Translate";

import CommonText from "../../CommonView/CommonText/CommonText";
import { useNavigation } from "@react-navigation/native";
import { NavigationKey } from "../../const/NavigationKey";
import { useDevice } from "../../Common/hook/useDevice";
import { DeviceProps, timerProps } from "../../redux/reducer/DeviceReducer";
import { MqttControl } from "../../Common/mqtt/MqttControl";
import { Cmd } from "../../Common/mqtt/Cmd";
import _ from "lodash";
import { equalVal, getDaysArrayByDecNumber, padNumber } from "../../Common/FunctionCommon";
import { TYPE_DEVICES } from "../../const/Const";
import { showMessageWarning } from "../../Common/FlashMessageCommon";
import { DayViewProps } from "../AddAlarm/AddAlarm";
import LinearGradient from "react-native-linear-gradient";
import colors from "../../theme/Colors";
import { LineChart } from "react-native-chart-kit";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import { Dataset } from "react-native-chart-kit/dist/HelperTypes";


const DayView = React.forwardRef((props: DayViewProps, ref) => {

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

    return <View
        style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center"
        }}>
        {[translate("T2"), translate("T3"), translate("T4"), translate("T5"), translate("T6"), translate("T7"), translate("CN")].map((item, index) => {

            let colorText = dataSelected[index] === 1 ? Colors.white : Colors.black;
            let colorBackground = dataSelected[index] === 1 ? Colors.primary : Colors.white;

            if (dataSelected[index] === 1) {
                return <View style={{
                    paddingHorizontal: 3,
                    paddingVertical: 4,
                    borderBottomWidth: 1,
                    borderColor: colors.white,
                    marginBottom: 12
                }}>
                    <CommonText value={item}
                                style={{ color: colors.white }} />
                </View>;
            }
        })}
    </View>;
});

function ViewColor({ color, text, value }: { color: string, text?: string, value: number }) {
    return <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View>
            <CommonText value={`${Math.floor((value / 255) * 100)}%`} style={{ fontSize: 10, color: colors.white }} />
        </View>
        <View style={{
            width: 30,
            height: 30,
            backgroundColor: color,
            margin: 5,
            justifyContent: "center",
            alignItems: "center"
        }}>
            {text ? <CommonText value={text} style={{ fontSize: 8, color: Colors.white }} /> : null}
        </View>
    </View>;
}


function getData(device: DeviceProps): { datasetsRaw: { r: number[], g: number[], b: number[] } | null; labels: string[], datasets: Dataset[] } {
    let labels: string[] = [];
    let datasetsRaw: { r: number[], g: number[], b: number[] } = { r: [], b: [], g: [] };

    let listTimer: timerProps[] = device.timer;


    listTimer.forEach((t) => {
        datasetsRaw.r.push(Math.floor((t.R / 255) * 100));
        datasetsRaw.g.push(Math.floor((t.G / 255) * 100));
        datasetsRaw.b.push(Math.floor((t.B / 255) * 100));

        labels.push(`${padNumber(Math.floor((t.T) / 60))}:${padNumber((t.T % 60))}`);
    });


    let datasets: Dataset[] = [];

    datasets.push({
        data: datasetsRaw.r,
        strokeWidth: 2,
        color: () => colors.R
    });

    datasets.push({
        data: datasetsRaw.g,
        strokeWidth: 2,
        color: () => colors.G
    });

    datasets.push({
        data: datasetsRaw.b,
        strokeWidth: 2,
        color: () => colors.B
    });

    console.log("🐛🐛🐛 line 131 -> AlarmScreen.tsx -> getData :", datasets);

    return {
        labels, datasetsRaw, datasets
    };
}

function AlarmScreen() {
    const navigation = useNavigation<any>();
    const useDeviceHook = useDevice();
    const device = _.cloneDeep(useDeviceHook.device);
    const indexDevice = useDeviceHook.index;
    const [refreshing, setRefreshing] = React.useState(false);
    const itemList: ListRenderItem<timerProps> = ({ item, index }) => {
        return <LinearGradient
            colors={["rgba(72,85,107,1)", "rgba(69,80,81,1)"]}
            locations={[0.09, 0.98]}
            style={{
                marginTop: index === 0 ? 14 : 0,
                marginBottom: 12,
                padding: 10,
                paddingHorizontal: 14,
                marginHorizontal: 14,
                borderRadius: 4
            }}>
            <TouchableOpacity
                onPress={() => navigation.navigate(NavigationKey.AddAlarm, {
                    device: item,
                    index: indexDevice,
                    indexTimer: index,
                    onRefresh: _onRefresh
                })}
                style={{
                    flexDirection: "row",
                    ...StyleGlobal.card,
                    // backgroundColor: Colors.white,
                    borderRadius: 12

                }}>
                <View
                    style={{ padding: 7, justifyContent: "center", alignItems: "center", flex: 3 }}>
                    {/*<CommonText value={`${padNumber(Math.floor((item.T) / 60))}`}*/}
                    {/*            style={{ fontWeight: "bold", fontSize: 40, color: colors.white }} />*/}
                    {/*<CommonText value={`${padNumber((item.T % 60))}`}*/}
                    {/*            style={{ fontWeight: "bold", fontSize: 40, color: colors.white }} />*/}
                    <CommonText value={`${padNumber(Math.floor((item.T) / 60))}:${padNumber((item.T % 60))}`}
                                style={{ fontWeight: "bold", fontSize: 29, color: colors.white }} />
                </View>
                <View style={{ flex: 7 }}>
                    <DayView isDisable={true} data={getDaysArrayByDecNumber(item.RP)} />
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <ViewColor color={Colors.R} value={item.R} text={"R"} />
                        <ViewColor color={Colors.G} value={item.G} text={"G"} />
                        <ViewColor color={Colors.B} value={item.B} text={"B"} />
                        {equalVal(device.type, TYPE_DEVICES.DEV_RGBUV_Y_DB) ? <>
                            <ViewColor color={Colors.Y} value={item.Y} text={"Y"} />
                            <ViewColor color={Colors.DB} value={item.DB} text={"DB"} />
                            <ViewColor color={Colors.V} value={item.V} text={"V"} />
                        </> : null}
                        {/*<ViewColor color={Colors.black} text={"W"} value={item.W} />*/}
                        {/*<ViewColor color={Colors.UV} text={"UV"} value={item.UV} />*/}
                    </View>
                </View>

            </TouchableOpacity>
        </LinearGradient>;
    };

    const _onRefresh = () => {
        MqttControl.sendObj(Cmd.cmdGetAlarm(), device.mac);
    };

    useEffect(() => {
        _onRefresh();
    }, []);


    const chartView = useMemo(() => {

        let data = getData(device);


        if (_.isEmpty(data.datasets) || _.isEmpty(data.labels)) {
            return <View />;
        }

        return <LineChart
            data={{
                labels: data.labels,
                datasets: data.datasets,
                legend: ["R", "G", "B"]
            }}
            width={Dimensions.get("window").width - 24} // from react-native
            height={WINDOW_HEIGHT / 2 - 100}
            yAxisLabel="%"
            verticalLabelRotation={88}
            chartConfig={{
                backgroundColor: colors.primary,
                backgroundGradientFrom: colors.primary,
                backgroundGradientTo: colors.primary,
                decimalPlaces: 1, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6"
                    // strokeWidth: "2",
                    // stroke: "#ffa726"
                },
                verticalLabelRotation: 400,
                verticalLabelsHeightPercentage: 250,
                propsForVerticalLabels: {
                    transform: [{ translateY: 3 }]
                },
                propsForHorizontalLabels: {
                    transform: [{ translateY: 3 }]
                }
            }}
            bezier
            style={{
                // marginVertical: 8,
                borderRadius: 16

            }}
        />;

    }, [device]);


    return <View style={StyleGlobal.container}>
        <HeaderSimple
            icon={"arrow-left"}
            name={translate("alarm")}
            iconRight={"plus"}
            onPressButtonRight={() => {
                if (device.timer.length <= 16)
                    navigation.navigate(NavigationKey.AddAlarm, {
                        device: device,
                        index: indexDevice,
                        onRefresh: _onRefresh
                    });
                else {
                    showMessageWarning(translate("max16Alarm"));
                }
            }}
            styleContainer={{
                ...StyleGlobal.containerHeader,
                backgroundColor: Colors.white
            }} />
        <View style={{ flex: 1, margin: 14 }}>
            {chartView}
        </View>
        <FlatList
            showsVerticalScrollIndicator={true}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={_onRefresh}
                />
            }
            style={{ width: "100%", height: "100%", flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            data={device.timer}
            renderItem={itemList}
            keyExtractor={(item, index) => `${index}itemListTimer`}
            ListEmptyComponent={<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <CommonText value={translate("noAlarm")} style={{ fontSize: 18, marginTop: 20 }} />
            </View>}
        />


    </View>;
}

export default React.memo(AlarmScreen);
