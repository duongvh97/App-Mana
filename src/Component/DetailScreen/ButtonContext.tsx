import CommonButton, {CommonButtonProps} from "../../CommonView/Button/CommonButton";
import Colors from "../../theme/Colors";
import React from "react";

export const ButtonContext = (props: CommonButtonProps) => {
    return <CommonButton
        style={{
            height: 40,
            backgroundColor: Colors.mainBlack,
            width: "80%",
            marginVertical: 5,
            alignSelf: "center"
        }}
        {...props}
    />;
};
