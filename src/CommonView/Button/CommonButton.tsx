import React, { forwardRef } from "react";
import { StyleSheet, TextStyle, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from "react-native";
import CommonText from "../CommonText/CommonText";
// @ts-ignore
import Icon from "react-native-vector-icons/Feather";
import { BallIndicator } from "react-native-indicators";
import Colors from "../../theme/Colors";


const colors = Colors;

export interface CommonButtonProps extends TouchableOpacityProps {
    style?: ViewStyle,
    isShowIconArrowRight?: boolean,
    text: string,
    isLoading?: boolean,
    textStyle?: TextStyle
}

const CommonButton = forwardRef<TouchableOpacity, CommonButtonProps>((props, ref) => {
    const { style, ...res } = props;

    return <TouchableOpacity
        ref={ref}
        style={[styles.wrapInput, props.style, props.isLoading && { opacity: 0.8 }]}
        disabled={props.isLoading}
        {...res}
    >
        {props.isShowIconArrowRight ? <View style={styles.wrapContent}>
                <CommonText value={props.text}
                            style={{
                                color: colors.white,
                                fontSize: 17,
                                textTransform: "uppercase",
                                marginHorizontal: 14,
                                ...res.textStyle
                            }} />
                {!props.isLoading ? <Icon name={"arrow-right"} size={25} color={colors.white} /> :
                    <BallIndicator color={colors.white} size={25} style={{ justifyContent: "flex-end" }} />}
            </View> :
            <>
                {props.isLoading ? <View style={{ ...styles.centerSelf, height: 30 }}>
                        <BallIndicator color={colors.white} size={25} style={styles.ballIndicator} />
                    </View> :
                    <CommonText value={props.text}
                                style={{
                                    color: colors.white,
                                    fontSize: 17,
                                    textTransform: "uppercase",
                                    marginHorizontal: 14,
                                    justifyContent: "center",
                                    alignSelf: "center",
                                    ...res.textStyle
                                }} />}
            </>
        }


    </TouchableOpacity>;
});


const styles = StyleSheet.create({
    wrapInput: {
        backgroundColor: colors.red,
        borderRadius: 7,
        justifyContent: "center",
        alignSelf: "center"
    },
    ballIndicator: {
        justifyContent: "flex-end"
    },
    wrapContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 14
    },
    centerSelf: {
        alignSelf: "center"
    }
});


export default React.memo(CommonButton);
