import React, { useEffect } from "react";
import {
    AppState,
    FlatList,
    Image,
    ListRenderItem,
    RefreshControl,
    Switch,
    TouchableOpacity,
    View
} from "react-native";
import HeaderSimple from "../../CommonView/Header/HeaderSimple";
import { translate } from "../../Translations/Translate";
import StyleGlobal from "../../theme/StyleGlobal";
import Colors from "../../theme/Colors";
import colors from "../../theme/Colors";
import { STATUS_DEVICES, TYPE_DEVICES } from "../../const/Const";
import CommonText from "../../CommonView/CommonText/CommonText";
import { img_icon_device1, img_icon_device2, img_icon_device3 } from "../../assets/images/icon";
import { useNavigation } from "@react-navigation/native";
import { NavigationKey } from "../../const/NavigationKey";
import { MaterialIcon } from "../../CommonView/NativeModules/Icon/MaterialIcon";
import { DeviceProps } from "../../redux/reducer/DeviceReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerProps } from "../../redux/reducer";
import { equalVal } from "../../Common/FunctionCommon";
import { useInterval } from "usehooks-ts";
import { updateDevice } from "../../redux/action/DeviceAction";
import _ from "lodash";
import { connectSocket, setTimeInBackground } from "../../redux/action/SocketAction";
import NetInfo from "@react-native-community/netinfo";
import { FlagGlobal } from "../../Common/FlagGlobal";
import { store } from "../../redux";
import LinearGradient from "react-native-linear-gradient";

const TIME_REFRESH_DEVICE = 15000;

export function ViewColorHome({ color, text, value }: { color: string, text?: string, value: number }) {
    return <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View>
            <CommonText value={`${Math.floor((value / 255) * 100)}%`} style={{ fontSize: 10, color: colors.white }} />
        </View>
        <View
            style={{
                width: 20,
                height: 20,
                backgroundColor: color,
                margin: 3,
                justifyContent: "center",
                alignItems: "center"
            }}>
            {text ? <CommonText value={text} style={{ fontSize: 6, color: Colors.white }} /> : null}
        </View>
    </View>;
}


const ViewValue = ({ item, device }: { item: any, device: any }) => {
    return <LinearGradient
        colors={["rgba(72,85,107,1)", "rgba(69,80,81,1)"]}
        locations={[0.09, 0.98]}
        style={{
            marginTop: 7,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 4
        }}>
        <View
            style={{
                ...StyleGlobal.card,
                borderRadius: 12
            }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <ViewColorHome color={Colors.R} value={item.R} text={"R"} />
                <ViewColorHome color={Colors.G} value={item.G} text={"G"} />
                <ViewColorHome color={Colors.B} value={item.B} text={"B"} />
                {/*{equalVal(device.type, TYPE_DEVICES.DEV_RGBUV_Y_DB) ? <>*/}
                {/*    <ViewColorHome color={Colors.Y} value={item.Y} text={"Y"} />*/}
                {/*    <ViewColorHome color={Colors.DB} value={item.DB} text={"DB"} />*/}
                {/*    <ViewColorHome color={Colors.V} value={item.V} text={"V"} />*/}
                {/*</> : null}*/}
                {/*<ViewColorHome color={Colors.black} text={"W"} value={item.W} />*/}
                {/*<ViewColorHome color={Colors.UV} text={"UV"} value={item.UV} />*/}
            </View>
        </View>
    </LinearGradient>;
};

function HomeScreen() {
    const [refreshing, setRefreshing] = React.useState(false);
    const dispatch = useDispatch();
    const lang = useSelector((s: RootReducerProps) => s.lang.lang); // no remove
    const navigation = useNavigation<any>();
    const data: DeviceProps[] = useSelector((state: RootReducerProps) => state.devices.device);
    const client = useSelector((state: RootReducerProps) => state.socket.socket);

    //@ts-ignore
    const timeInBackground = useSelector((state: RootReducerProps) => state.socket.timeInBackground);
    // console.log(data);


    const itemList: ListRenderItem<DeviceProps> = ({ item, index }) => {
        function getImg() {
            if (equalVal(item.type, TYPE_DEVICES.DEV_RGBWUV)) {
                return img_icon_device1;
            } else if (equalVal(item.type, TYPE_DEVICES.DEV_RGBUV_Y_DB)) {
                return img_icon_device3;
            } else {
                return img_icon_device2;
            }
        }

        return <TouchableOpacity
            onPress={() => navigation.navigate(NavigationKey.DetailScreen, { device: item, index: index })}
            style={{
                ...StyleGlobal.subCard,

                marginBottom: 12,
                flexDirection: "row",
                marginTop: index === 0 ? 14 : 0,
                backgroundColor: Colors.white,
                shadowColor: colors.grey02,
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowOpacity: 0.1,
                shadowRadius: 30,

                elevation: 5,
                padding: 14,
                marginHorizontal: 24

                // alignItems: "center"


            }}>
            <View style={{ flex: 2, justifyContent: "center" }}>
                <Image source={getImg()} style={{ width: 50, height: 50, borderRadius: 12 }} />
            </View>
            <View style={{ flex: 6, paddingLeft: 10, justifyContent: "center", alignItems: "center" }}>
                <CommonText value={item.name} style={{ fontSize: 16 }} />
                <ViewValue item={item} device={item} />
            </View>

            <View style={{ flex: 2, justifyContent: "center", paddingLeft: 14 }}>
                <View style={{
                    // alignSelf: "center",
                    marginRight: 10,
                    borderRadius: 10,
                    justifyContent: "center"
                }}>
                    <Switch value={item.status === STATUS_DEVICES.ONLINE} />
                </View>
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate(NavigationKey.InfoDevice, { device: item, index: index })}
                style={{
                    position: "absolute",
                    right: -20,
                    top: 0,
                    backgroundColor: colors.white,
                    padding: 12,
                    borderRadius: 50,
                    ...StyleGlobal.card
                }}>
                <MaterialIcon name={"cog"} size={20} color={Colors.primary} />
            </TouchableOpacity>

        </TouchableOpacity>;
    };

    useInterval(() => {
        console.log("refresh");
        // let __data = store.getState().devices.device;
        // console.log("__data", __data, data);

        if (data.length > 0) {
            data.forEach((item, index) => {
                if (item.status === STATUS_DEVICES.ONLINE) {
                    let deviceNew = _.cloneDeep(item);
                    let crTime = new Date().getTime();
                    if (!deviceNew.timeResponse) {
                        deviceNew.timeResponse = crTime;
                    } else {
                        // __DEV__ && console.log("crTime", crTime, deviceNew.timeResponse, crTime - deviceNew.timeResponse, crTime - deviceNew.timeResponse > TIME_REFRESH_DEVICE);
                        if (crTime - deviceNew.timeResponse > TIME_REFRESH_DEVICE) {
                            deviceNew.status = STATUS_DEVICES.OFFLINE;
                            // console.log("Device offline", deviceNew);
                        }
                    }

                    dispatch(updateDevice(deviceNew));
                }
            });
        }

        // }, 4500);
    }, 4500);


    useEffect(() => {
        // console.log('useEffect')
        AppState.addEventListener("change", onAppStateChange);
        NetInfo.addEventListener(onInternetChange);
        _onRefresh();
    }, []);

    function onInternetChange(state: any) {
        // console.log('NetInfo state', state)
        let isChange = !equalVal(JSON.stringify(FlagGlobal.netInfo), JSON.stringify(state));
        if (state.isInternetReachable && isChange) {
            // console.log('call connectSocket from from internet change')
            _onRefresh();
        }
        FlagGlobal.netInfo = state;
    }

    function onAppStateChange(nextAppState: any) {
        if (equalVal(nextAppState, "background")) {
            console.log("app go to background", new Date().getTime());
            setTimeInBackground(new Date().getTime());
            return;
        }

        let client = store.getState().socket.socket;
        // console.log('client', client)

        console.log("timeInBackground - new Date().getTime()", new Date().getTime() - timeInBackground, timeInBackground, new Date().getTime());

        if ((new Date().getTime() - timeInBackground) > 30000 && client !== null && client.isConnected()) {
            console.log("refreshHome");
            FlagGlobal.isConnectingMqtt = false;
            _onRefresh();
        }
    }

    const _onRefresh = () => {
        FlagGlobal.isConnectingMqtt = false;
        dispatch(connectSocket());
    };

    useEffect(() => {
        // refreshing
        if (client !== null && client.isConnected()) {
            setRefreshing(false);
        }
    }, [client]);

    return <View
        // colors={["rgb(150,156,164)", "rgb(149,156,157)"]}
        // locations={[0.09, 0.98]}
        style={StyleGlobal.container}>
        <FlatList
            ListHeaderComponent={<HeaderSimple
                isNameCenter
                isNoShadow
                name={translate("home").toUpperCase()}
                styleContainer={{
                    ...StyleGlobal.containerHeader,
                    margin: 14
                    // backgroundColor: Colors.white
                }}
                // onPressButtonRight={() => navigation.navigate(NavigationKey.config)}
            />}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={_onRefresh}
                />
            }
            style={{ width: "100%", height: "100%" }}
            contentContainerStyle={{ flexGrow: 1 }}
            data={data}
            renderItem={itemList}
            keyExtractor={(e, i) => i + "itemList"}
            ListEmptyComponent={<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <CommonText value={translate("noDevice")} style={{ fontSize: 18, marginTop: 20 }} />
            </View>}
            ListFooterComponent={
                <View style={{ alignItems: "center", margin: 14 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(NavigationKey.config)}
                        style={{
                            ...StyleGlobal.card,
                            backgroundColor: colors.white,
                            borderRadius: 4,
                            padding: 4,
                            width: 50,
                            height: 50,
                            alignSelf: "center",
                            justifyContent: "center",
                            alignItems: "center", marginBottom: 12
                        }}>
                        <MaterialIcon name={"plus"} color={colors.primary} size={35} />
                    </TouchableOpacity>
                    <CommonText value={translate("addDevice")} style={{ fontWeight: "100" }} />
                </View>
            }
        />


    </View>;
}

export default React.memo(HomeScreen);
