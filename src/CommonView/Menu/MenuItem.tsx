import { StyleSheet, TouchableOpacity, View } from "react-native";
import CommonText from "../CommonText/CommonText";
import React from "react";
import { MenuItemProps } from "./MenuItem.Props";

import { FeatherIcon } from "../NativeModules/Icon/FeatherIcon";
import { MaterialIcon } from "../NativeModules/Icon/MaterialIcon";
import Colors from "../../theme/Colors";

const colors = Colors;

export function MenuItem(props: MenuItemProps) {

    const { isBorderBottom = true } = props;

    const handlerText = () => {
        if (props.textRight && props.textRight.length > 20) {
            // console.log(props.textRight, props.textRight.substr(0, 20));
            return props.textRight.substr(0, 20) + "...";
        }
        return props.textRight;
    };

    return <TouchableOpacity
        {...props}
        disabled={!props.onPress || props.disabled}
        style={styles.container}>
        <View style={styles.wrapContent}>
            <View style={{ flexDirection: "row", alignContent: "center" }}>
                {props.nameIcon && props.isFeatherIcon &&
                  <FeatherIcon name={props.nameIcon} size={23} color={props.colorIcon} />}

                {props.nameIcon && !props.isFeatherIcon &&
                  <MaterialIcon name={props.nameIcon} size={23} color={props.colorIcon} />}
                <CommonText value={props.text ? props.text : "Chưa có thông tin"}
                            style={[styles.textRight1, props.styleText]} />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                {props.textRight ? <CommonText value={handlerText()} style={[styles.textRight]} /> : null}
                {props.iconRight || !props.isDisableIconRight ? null :
                    <FeatherIcon name={"chevron-right"} size={25} color={Colors.textGrey} />}
                {props.iconRight && props.iconRight}
            </View>
        </View>
        {isBorderBottom && <View style={styles.borderBottom} />}
    </TouchableOpacity>;
}

const styles = StyleSheet.create({
    textRight: {
        justifyContent: "center",
        fontSize: 14,
        marginLeft: 7,
        color: colors.grey01, marginRight: 7
    },
    textRight1: {
        justifyContent: "center",
        fontSize: 16,
        marginLeft: 7
    },
    wrapContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10
    },
    container: {
        backgroundColor: colors.white,
        paddingVertical: 10,
        marginHorizontal: 14,
        marginBottom: 12,
        borderRadius: 12,
        paddingHorizontal: 12
    },
    borderBottom: {
        // borderBottomWidth: 0.5,
        // borderBottomColor: colors.grey01
    }
});
