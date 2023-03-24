export const ENGLISH = "en";
export const VIETNAM = "vi";

export const STATUS_DEVICES = {
    ONLINE: "online",
    OFFLINE: "offline",
    UNKNOWN: "unknown"
};

export const TYPE_DEVICES = {
    DEV_RGBWUV: 1,
    DEV_RGBUV: 2,
    DEV_RGBUV_Y_DB: 3
};

export const MQTT_CONTROL_TYPE = "control";
export const MQTT_STATUS_TYPE = "status";
export const MQTT_ALARM_TYPE = "timer";

export const CONTEXT_DEVICE_DEFAULT_ID = [1, 2, 3, 4, 5];
export const CONTEXT_DEVICE_DEFAULT = [
    {
        id: 1,
        name: "Fish",
        cmd: "{\"control\": {\"R\":204,\"G\":102,\"B\":156,\"W\":153,\"UV\":77,\"P\":1}}"

    },
    {
        id: 2,
        name: "Shrimp",
        cmd: "{\"control\": {\"R\":255,\"G\":215,\"B\":202,\"W\":153,\"UV\":102,\"P\":1}}"

    },
    {
        id: 3,
        name: "Moss",
        cmd: "{\"control\": {\"R\":153,\"G\":255,\"B\":230,\"W\":204,\"UV\":102,\"P\":1}}"
    },
    {
        id: 4,
        name: "Nature",
        cmd: "{\"control\": {\"R\":255,\"G\":180,\"B\":204,\"W\":204,\"UV\":102,\"P\":1}}"
    },
    {
        id: 5,
        name: "Bucep",
        cmd: "{\"control\": {\"R\":207,\"G\":166,\"B\":255,\"W\":153,\"UV\":230,\"P\":1}}"
    }
];

export const CONTEXT_DEVICE_DEFAULT_W = [
    {
        id: 1,
        name: "Red fish",
        cmd: "{\"control\": {\"R\":100,\"G\":60,\"B\":100,\"UV\":0,\"P\":1}}"

    },
    {
        id: 2,
        name: "Red plant",
        cmd: "{\"control\": {\"R\":100,\"G\":70,\"B\":100,\"UV\":0,\"P\":1}}"

    },
    {
        id: 3,
        name: "Green plant",
        cmd: "{\"control\": {\"R\":80,\"G\":100,\"B\":100,\"UV\":0,\"P\":1}}"
    },
    {
        id: 4,
        name: "Clear water",
        cmd: "{\"control\": {\"R\":70,\"G\":70,\"B\":100,\"UV\":0,\"P\":1}}"
    },
    {
        id: 5,
        name: "Nature",
        cmd: "{\"control\": {\"R\":100,\"G\":70,\"B\":80,\"UV\":0,\"P\":1}}"
    }
];


export const dataEx = [
    {
        name: "123",
        status: STATUS_DEVICES.ONLINE,
        timer: [],
        context: [],
        id: 0,
        "R": 0,
        "G": 0,
        "B": 0,
        "W": 0,
        "UV": 0,
        "P": 0,
        "T": 0,
        "Y": 0,
        "V": 0,
        "DB": 0,
        type: TYPE_DEVICES.DEV_RGBUV_Y_DB,
        mac: "12312"
    },
    {
        name: "123",
        status: STATUS_DEVICES.ONLINE,
        timer: [],
        context: [],
        id: 0,
        "R": 0,
        "G": 0,
        "B": 0,
        "W": 0,
        "UV": 0,
        "P": 0,
        "T": 0,
        "Y": 0,
        "V": 0,
        "DB": 0,
        type: TYPE_DEVICES.DEV_RGBWUV,
        mac: "e8db84934387"
    },
    {
        name: "123",
        status: STATUS_DEVICES.ONLINE,
        timer: [],
        context: [],
        id: 0,
        "R": 0,
        "G": 0,
        "B": 0,
        "W": 0,
        "UV": 0,
        "P": 0,
        "T": 0,
        "Y": 0,
        "V": 0,
        "DB": 0,
        type: TYPE_DEVICES.DEV_RGBUV,
        mac: "12344"
    }];
