import { TextStyle, TouchableOpacityProps } from "react-native";
import React from "react";

export interface MenuItemProps extends TouchableOpacityProps {
    text: string,
    styleText?: TextStyle,
    nameIcon?: string,
    colorIcon?: string,
    textRight?: string,
    isDisableIconRight?: boolean
    isBorderBottom?: boolean
    iconRight?: React.ReactElement | null
    isFeatherIcon?: boolean
}

export interface MenuItemTwoLineProps extends TouchableOpacityProps {
    text: string,
    subText: string

}
