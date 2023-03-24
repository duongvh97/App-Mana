// @ts-ignore
import Icon from "react-native-vector-icons/Feather";

import React from "react";
import { IconProps } from "./IconProps";

export const FeatherIcon = React.memo((props: IconProps) => {
    return <Icon {...props} />;
});
