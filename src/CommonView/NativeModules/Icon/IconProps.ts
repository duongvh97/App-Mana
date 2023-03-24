import { ViewStyle } from "react-native";

export type IconProps = {
    name: string,
    size?: number,
    color?: string,
    iconStyle?: ViewStyle,
    backgroundColor?: string,
    borderRadius?: number,
    onPress?: () => void
};
