import { equalVal, getDeviceByMac, isJson } from "../../Common/FunctionCommon";
import { RootReducerProps } from "../reducer";
import { CONNECT_COMPLETE, SET_CLIENTID, SET_TIME_IN_BACKGROUND } from "../reducer/SocketReducer";
import { FlagGlobal } from "../../Common/FlagGlobal";
import { getMacFromTopic, getTopicStatusByMac, MQTT_BROKER_URL, MQTT_PASSWORD, MQTT_USERNAME } from "../../const/Mqtt";
import { getClientID } from "../../Common/mqtt/getClientID";
import MQTT, { QoS } from "sp-react-native-mqtt";
import { store } from "../index";
import { DeviceProps } from "../reducer/DeviceReducer";
import { MQTT_ALARM_TYPE, MQTT_STATUS_TYPE, STATUS_DEVICES } from "../../const/Const";
import { updateDevice } from "./DeviceAction";

export function initSocket(socket: any) {
    return { type: CONNECT_COMPLETE, socket };
}

export function setClientID(clientID: any) {
    return { type: SET_CLIENTID, clientID };
}

export function setTimeInBackground(time: any) {
    return { type: SET_TIME_IN_BACKGROUND, time };
}

export function connectSocket() {
    console.log("call connectSocket", FlagGlobal.isConnectingMqtt);
    // @ts-ignore
    return async (dispatch, getState) => {
        if (FlagGlobal.isConnectingMqtt) {
            console.log("mqtt connecting, not request connect again");
            return;
        }

        let clientID = getState().socket.clientID;
        let client = getState().socket.socket;
        // console.log("🐛🐛🐛 line 36 -> SocketAction.ts ->  :", client);
        if (client) {
            client.disconnect();
        }

        const myStorage = {
            // @ts-ignore
            setItem: (key, item) => {
                // @ts-ignore
                myStorage[key] = item;
            },
            // @ts-ignore
            getItem: key => myStorage[key],
            // @ts-ignore
            removeItem: key => {
                // @ts-ignore
                delete myStorage[key];
            }
        };

        // if (client && client.isConnected()) {
        //     console.log("client was connected");
        //     // return dispatch(fetchListRoom());
        //     return onFinishConnectMqtt(client, dispatch);
        // }
        console.log("🐛🐛🐛 line 61 -> SocketAction.ts ->  : --------");
        FlagGlobal.isConnectingMqtt = true;

        if (equalVal(clientID, "")) {
            clientID = await getClientID({ id: new Date().getTime() });
            dispatch(setClientID(clientID));
        }


        /* create mqtt client */
        console.log("clientID: ", clientID);
        MQTT.createClient({
            uri: `mqtt://${MQTT_BROKER_URL}:1883`,
            clientId: clientID,
            // @ts-ignore
            user: MQTT_USERNAME,
            pass: MQTT_PASSWORD,
            auth: true
        }).then(function(client) {
            client.on("closed", function() {
                console.log("mqtt.event.closed");
            });

            client.on("error", function(msg) {
                console.log("mqtt.event.error", msg);
            });

            client.on("message", function(msg) {
                // console.log("mqtt.event.message", msg);
                // console.log("mqtt.event.message");
                onMessageReceived(dispatch, getState, msg);
            });

            client.on("connect", function() {
                console.log("connected -----");
                dispatch(initSocket(client));
                FlagGlobal.isConnectingMqtt = false;
                getDeviceState(client, dispatch, null, "socket action");
            });

            client.connect();
        }).catch(function(err) {
            console.log(err);
        }).finally(() => {
            console.log("-----------------finally");
            // FlagGlobal.isConnectingMqtt = false;
        });


    };
}

// function onFinishConnectMqtt(client: any, dispatch: any) {
//     FlagGlobal.isConnectingMqtt = false;
//     getDeviceState(client, dispatch, null, "socket action");
// }

export function getDeviceState(client: any, dispatch: any, listDeviceSuggest: any, tag: any) {
    let loadingMqtt = FlagGlobal.isConnectingMqtt;

    // console.log("🐛🐛🐛 line 119 -> SocketAction.ts -> getDeviceState :", loadingMqtt);

    if (loadingMqtt) {
        return;
    }

    const devices = store.getState().devices.device;

    // console.log("🐛🐛🐛 line 128 -> SocketAction.ts -> getDeviceState :", devices);
    if (client) {
        devices.forEach((device: DeviceProps) => {
            // console.log("-----------------getDeviceState", getTopicStatusByMac(device.mac));
            client.subscribe(getTopicStatusByMac(device.mac), 0);
            // client.subscribe(getTopicAlarmByMac(device.mac), 0);
        });
    }

    // getStateDeviceList();
}


interface mgsControlResponse {
    "sw_wifi": number,
    "pos": number,
    "status": 1 | 0
}


type  MqttMessage = {
    data: string;
    qos: QoS;
    retain: boolean;
    topic: string;
}

function onMessageReceived(dispatch: any, getState: () => RootReducerProps, message: MqttMessage) {
    try {
        if (isJson(message.data)) {
            let mac = getMacFromTopic(message.topic);
            let device = getDeviceByMac(mac);
            let data = JSON.parse(message.data);
            console.log("onMessageReceived", data);

            // console.log("onMessageReceived type -------- ");
            let type = Object.keys(data)[0];
            // console.log("onMessageReceived type -------- ", type, device, mac);

            if (device) {
                device.status = STATUS_DEVICES.ONLINE;
                device.timeResponse = new Date().getTime();
            }


            switch (type) {
                case MQTT_STATUS_TYPE:
                    if (device) {
                        console.log("data.status", data);
                        device.R = data.status.R;
                        device.G = data.status.G;
                        device.B = data.status.B;
                        device.W = data.status.W;
                        device.UV = data.status.UV;
                        device.P = data.status.P;
                        device.T = data.status.T;

                        if (data.status.Y) {
                            device.Y = data.status.Y;
                        }
                        if (data.status.B) {
                            device.B = data.status.B;
                        }
                        if (data.status.DB) {
                            device.DB = data.status.DB;
                        }


                        // console.log(device);
                        dispatch(updateDevice(device));
                    }
                    break;
                case MQTT_ALARM_TYPE:
                    if (device) {
                        // let timer = _.cloneDeep(device.timer);
                        // let indexTimer = getTimerByIdTimer(device, data.id);
                        // if (indexTimer < 0) {
                        //     timer.push(data);
                        // } else {
                        //     timer[indexTimer] = data;
                        // }
                        // device.timer = timer;
                        // console.log("onMessageReceived device.timer", device.timer);
                        // dispatch(updateDevice(device));

                        device.timer = data.timer.param;
                        console.log(device);
                        dispatch(updateDevice(device));

                    }

                    break;
                default:
                    break;
            }
        } else {
            console.log("onMessageReceived not json", message.data);
        }


    } catch (e) {
        console.log("onMessageReceived Error", e, message);

    }
}
