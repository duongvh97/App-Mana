// import Slider, { SliderProps } from "@react-native-community/slider";
import { Slider } from "@miblanchard/react-native-slider";
import { View } from "react-native";
import CommonText from "../../CommonView/CommonText/CommonText";
import Colors from "../../theme/Colors";
import React, { useEffect } from "react";
import styles from "./DetailSceen.style";
import { SliderProps } from "@miblanchard/react-native-slider/lib/types";

interface ViewSliderProps extends SliderProps {
    color: string;
    title: string;
    value: number;
}

export function ViewSlider(props: ViewSliderProps) {


    const [value, setValue] = React.useState(props.value);


    useEffect(() => {
        setValue(props.value);
    }, [props.value]);


    const getColorText = () => {
        if (props.title === "R") {
            return Colors.R;
        }

        if (props.title === "G") {
            return Colors.G;
        }

        if (props.title === "B") {
            return Colors.B;
        }

        return Colors.text;
    };

    return <View style={{ flexDirection: "row", marginHorizontal: 14 }}>
        <View style={{ alignItems: "center", flex: 2, justifyContent: "center" }}>
            <CommonText value={props.title} style={{ fontWeight: "bold", fontSize: 25, color: getColorText() }} />
        </View>
        <View style={styles.wrapSlider}>
            {/*<Slider*/}
            {/*    style={{ height: 40, flex: 1 }}*/}
            {/*    minimumValue={0}*/}
            {/*    maximumValue={255}*/}
            {/*    minimumTrackTintColor={props.color}*/}
            {/*    maximumTrackTintColor={"#bebebe"}*/}
            {/*    thumbTintColor={props.color}*/}

            {/*    // value={lightState.val}*/}
            {/*    // onValueChange={e => lightState.setVal(parseInt(e))}*/}
            {/*    // onSlidingComplete={onSlidingComplete}*/}
            {/*    {...props}*/}
            {/*/>*/}
            <View style={{
                marginLeft: 10,
                marginRight: 10,
                alignItems: "stretch",
                justifyContent: "center",
                flex: 8
            }}>

                <Slider
                    // style={{ height: 40, flex: 1 }}
                    {...props}
                    minimumValue={0}
                    maximumValue={255}
                    minimumTrackTintColor={props.color}
                    maximumTrackTintColor={"#bebebe"}
                    thumbTintColor={props.color}
                    thumbStyle={{ width: 30, height: 30, borderRadius: 15 }}
                    trackStyle={{ height: 13 }}
                    value={value}
                    onValueChange={e => {
                        console.log(e);
                        setValue(e);
                    }}
                    // onSlidingComplete={onSlidingComplete}
                />
            </View>

            <CommonText value={`${Math.floor((Math.floor(value) / 255) * 100)}%`} style={{
                color: Colors.primary,
                fontSize: 15,
                flex: 2
            }} />
        </View>
    </View>;
}
