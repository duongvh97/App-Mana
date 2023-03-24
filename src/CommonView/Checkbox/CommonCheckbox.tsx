import React, { useState } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { MaterialIcon } from "../NativeModules/Icon/MaterialIcon";
import Colors from "../../theme/Colors";

export interface CommonCheckboxProps extends TouchableOpacityProps {
    // onChangerState?: (state: boolean) => void;
    sizeIcon?: number;
    value: boolean;
}

function CommonCheckbox(props: CommonCheckboxProps) {
    return <TouchableOpacity  {...props}>
        <MaterialIcon name={!props.value ? "checkbox-blank-outline" : "checkbox-marked"} color={Colors.primary}
                      size={props.sizeIcon ? props.sizeIcon : 30} />
    </TouchableOpacity>;
}

export default React.memo(CommonCheckbox);
// export default CommonCheckbox;
