import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";
import Colors from "../../theme/Colors";
import { useSelector } from "react-redux";
import { RootReducerProps } from "../../redux/reducer";


const colors = Colors;

interface Props extends TextProps {
    children?: JSX.Element | JSX.Element[] | string | React.ReactNode | number,
    style?: StyleProp<TextStyle>,
    value?: string
}

function CommonText(props: Props) {
    const lang = useSelector((s: RootReducerProps) => s.lang.lang);

    const {
        children,
        ...rest
    } = props;

    return <Text
        {...rest}
        allowFontScaling={false}
        style={[{ fontSize: 14, color: colors.textBlack }, props?.style]}
    >

        {children || props.value}
    </Text>;
}

export default React.memo(CommonText);
