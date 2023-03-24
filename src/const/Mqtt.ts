// ip:103.221.221.12
// user: Kingaquavn
// pass: @King123

import { MQTT_ALARM_TYPE } from "./Const";

export const MQTT_BROKER_URL = "103.221.221.12";
export const MQTT_BROKER_PORT = "1883";
export const MQTT_USERNAME = "Kingaquavn";
export const MQTT_PASSWORD = "@King123890";


export function getTopicControlByMac(mac_addr: string) {
    // console.log("🐛🐛🐛 line 14 -> Mqtt.ts -> getTopicControlByMac :", mac_addr);
    return `rgb/control/${mac_addr}`;
}

export function getTopicStatusByMac(mac_addr: string) {
    // console.log("🐛🐛🐛 line 18 -> Mqtt.ts -> getTopicStatusByMac :", mac_addr);
    return `rgb/status/${mac_addr}`;
}

export function getTopicAlarmByMac(mac_addr: string) {
    return `rgb/${MQTT_ALARM_TYPE}/${mac_addr}`;
}

export function getMacFromTopic(topic: string): string {
    return topic.split("/")[2];
}

export function getTypeFromTopic(topic: string): string {
    return topic.split("/")[1];
}
