// @ts-ignore
import Icon from "react-native-vector-icons/Ionicons";

import { IconProps } from "./IconProps";
import React from "react";

export const Ionicons = React.memo((props: IconProps) => {
    return <Icon {...props} />
});
