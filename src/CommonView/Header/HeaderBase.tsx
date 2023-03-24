import React from "react";
import { StatusBar, StatusBarStyle } from "react-native";

interface HeaderBaseProps {
    barStyle?: null | StatusBarStyle
}

export function HeaderBase({ barStyle }: HeaderBaseProps) {
    return <StatusBar translucent backgroundColor="transparent" barStyle={barStyle} />;
}
