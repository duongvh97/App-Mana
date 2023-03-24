import React, { useEffect, useImperativeHandle } from "react";
import { View } from "react-native";
import { ViewSlider } from "./ViewSlider";
import Colors from "../../theme/Colors";
import { DeviceProps } from "../../redux/reducer/DeviceReducer";
import _, { isUndefined } from "lodash";
import { TYPE_DEVICES } from "../../const/Const";
import { MqttControl } from "../../Common/mqtt/MqttControl";

type GroupSliderProps = {
    isSendMqtt?: boolean;
    device: DeviceProps,
    type: number,
    indexTimer?: number,
    p: boolean,
    setP: React.Dispatch<React.SetStateAction<boolean>>,
    isShowSwitch?: boolean,
    isAddAlarm?: string,
}


const value: number[] = [0, 0, 0, 0];
let key: string[] = ["R", "G", "B", "P"];
// 0,   1,   2,   3,    4,   5,   6,    7,   8
let colors: string[] = [Colors.R, Colors.G, Colors.B, Colors.white];
let indexMax = 0;

let dataRunning: number[] = [0, 0, 0, 0];

let timeoutId: NodeJS.Timeout | null = null;
const timeoutSend = 100;

function convertArrayToObject(keys: string[], values: number[]) {
    console.log("🐛🐛🐛 line 34 -> GroupSlider.tsx -> convertArrayToObject send:", keys, values);
    let obj: any = {};
    for (let i = 0; i < 4; i++) {
        obj[keys[i]] = values[i];
    }
    return obj;
}

function findMax(data: number []) {
    let max = data[0];
    let index = 0;
    let pIsZero = true;

    for (let i = 0; i < 4; i++) {
        if (data[i] > max) {
            max = data[i];
            index = i;
        }
        if (data[i] !== 0 && i !== 3) {
            pIsZero = false;
        }
    }


    // console.log("🐛🐛🐛 line 57 -> GroupSlider.tsx -> findMax :", pIsZero, data);

    return { max, index, pIsZero };
}

const GroupSlider = React.forwardRef<any, GroupSliderProps>((props: GroupSliderProps, ref) => {

    const [data, _setData] = React.useState<number[]>(_.cloneDeep(value));
    const [all, setAll] = React.useState<number>(0);

    function setData(value: any) {
        _setData(value);
        dataRunning = value;
    }

    // const deviceOld = useRef(_.cloneDeep(props.device));

    function findMaxAndSet(data: number[]): boolean {
        let f = findMax(data);
        indexMax = f.index;
        if (f.pIsZero) {
            props.setP(false);
        }
        setAll(f.max);
        return f.pIsZero;
    }

    useEffect(() => {
        indexMax = 0;


        if (!isUndefined(props.indexTimer)) {
            let arr: any = [0, 0, 0, 0, 0];
            let timer = props.device.timer[props.indexTimer];
            //     __DEV__ && console.log(timer);
            for (let i = 0; i < key.length; i++) {
                //@ts-ignore
                if (!isUndefined(timer[key[i]])) {
                    //@ts-ignore
                    arr[i] = timer[key[i]];
                }
            }
            setData(arr);
            findMaxAndSet(arr);
            // __DEV__ && console.log("arr", arr);
        } else {
            if (props.isAddAlarm !== "add") {
                let arr: any = [0, 0, 0, 0, 0];
                setData(arr);
            } else
                findMaxAndSet(data);
        }
        return () => {
            setAll(0);
            indexMax = 0;
            dataRunning = [0, 0, 0, 0, 0];
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        };
    }, []);

    //__DEV__ && console.log("dataNew -------", data, props.p);


    useImperativeHandle(ref, () => ({
        getValue: () => {
            return JSON.stringify({ "control": convertArrayToObject(key, data) });
        },
        getObject: () => convertArrayToObject(key, data)
    }));

    // No timer ----------------------
    if (isUndefined(props.indexTimer) && isUndefined(props.isAddAlarm) && props.isAddAlarm !== "add") {
        // console.log("oke");
        useEffect(() => {
            let __data = [props.device.R, props.device.G, props.device.B, props.device.P];
            setData(__data);
            findMaxAndSet(__data);
            // console.log("Update GroupSlider", __data);
        }, [props.device]);

        useEffect(() => {
            //   __DEV__ && console.log("useEffect", props.p);
            let dataNew = _.cloneDeep(dataRunning);
            dataNew[3] = Number(props.p);
            setData(dataNew);

        }, [props.p]);
    }

    // end No  timer ----------------------


    function onChangerValue(index: number, value: any) {
        value = Math.floor(value);
        let _dataChanger = _.cloneDeep(data);
        _dataChanger[index] = value;

        if (value > 0) {
            props.setP(true);
            _dataChanger[3] = 1;
        }

        if (all < value) {
            setAll(value);
            indexMax = index;
        } else {
            // findMaxAndSet(_dataChanger);
            let pIsZero = findMaxAndSet(_dataChanger);
            if (pIsZero) {
                _dataChanger[3] = 0;
            }
        }
        setData(_dataChanger);
        let obj = convertArrayToObject(key, _dataChanger);
        //  __DEV__ && console.log("onChangerValue", value, index, _dataChanger, obj);

        if (props.isSendMqtt) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                MqttControl.sendObj({ "control": obj }, props.device.mac);
            }, timeoutSend);

        }
    }

    const onChangeAll = (e: number) => {
        let v = Math.floor(e);
        let changer = v - all;
        let __data = _.cloneDeep(data);


        if (v > 0) {
            props.setP(true);
            __data[3] = 1;
        }

        for (let i = 0; i < __data.length - 1; i++) {
            if (TYPE_DEVICES.DEV_RGBWUV === props.type && (i === 5 || i === 5 || i === 6)) {
                continue;
            }
            if (TYPE_DEVICES.DEV_RGBUV === props.type && (i === 4 || i === 5 || i === 6 || i === 3)) {
                continue;
            }
            __data[i] = (__data[i] + changer > 255) ? 255 : (__data[i] + changer);
            __data[i] = __data[i] < 0 ? 0 : __data[i];
        }

        let pIsZero = findMaxAndSet(__data);
        if (pIsZero) {
            //      __DEV__ && console.log("onChangeAll __data", __data);
            __data[3] = 0;
        }


        if (props.isSendMqtt) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                let obj = convertArrayToObject(key, __data);
                MqttControl.sendObj({ "control": obj }, props.device.mac);
            }, timeoutSend);
        }

        setData(__data);
        setAll(v);

    };

    return <View>
        {key.map((e, i) => {
            if (e === "P" ||
                ((e === "Y" || e === "V" || e === "DB") && props.type !== TYPE_DEVICES.DEV_RGBUV_Y_DB) ||
                (e === "W" && props.type === TYPE_DEVICES.DEV_RGBUV)
            ) return null;
            return <ViewSlider
                key={"GroupSlider_" + i}
                color={colors[i]}
                title={e}
                value={data[i]}
                onSlidingComplete={(e) => onChangerValue(i, e)}
            />;
        })}

        <ViewSlider
            color={Colors.primary}
            title={"ALL"}
            value={all}
            // onValueChange={e => setAll(e)}
            onSlidingComplete={onChangeAll}
        />
    </View>;
});

export default React.memo(GroupSlider);
// export default GroupSlider;
