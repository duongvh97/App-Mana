// @ts-ignore
import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import React from "react";
import { IconProps } from "./IconProps";


export const MaterialIcon = React.memo((props: IconProps) => {
    return <Icon {...props} />
});
