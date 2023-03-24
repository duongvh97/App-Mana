import React from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";

import styles from "./Header.style";
import CommonText from "../CommonText/CommonText";
import { HeaderBase } from "./HeaderBase";
import StyleGlobal from "../../theme/StyleGlobal";
import Colors from "../../theme/Colors";
import { MaterialIcon } from "../NativeModules/Icon/MaterialIcon";
import { useNavigation } from "@react-navigation/native";

const colors = Colors;

interface HeaderSimple {
    name?: string,
    isNoShadow?: boolean,
    onPressIconLeft?: () => void,
    onPressButtonRight?: () => void | null,
    iconRight?: string | null,
    iconRightColor?: string,
    icon?: string,
    isNameCenter?: boolean,
    styleContainer?: ViewStyle,
    sizeIcon?: number,
    isDisableOnPressLeft?: boolean,
    requireChangerBgColor?: string

}

function HeaderSimple(props: HeaderSimple) {

    const navigation = useNavigation<any>();

    if (props.isNameCenter) {
        return <View style={[!props.isNoShadow && styles.shadow]}>
            <HeaderBase barStyle={"dark-content"} />
            <View style={{
                ...StyleGlobal.flexRow,
                justifyContent: "space-between",
                ...props?.styleContainer
                // backgroundColor: Colors.grey03,
            }}>
                <TouchableOpacity
                    style={{ justifyContent: "center" }}
                    onPress={props.onPressIconLeft ? props.onPressIconLeft : () => navigation.goBack()}>
                    {props?.icon && <MaterialIcon name={props.icon} size={34} color={colors.primary} />}
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                    <CommonText
                        value={props.name}
                        style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            color: colors.textBlack
                        }} />
                </View>

                <TouchableOpacity style={styles.wrapContent} onPress={props.onPressButtonRight}>
                    {props?.iconRight && <MaterialIcon name={props?.iconRight} size={24} color={colors.primary} />}
                </TouchableOpacity>
            </View>
        </View>;
    }

    return <View style={{}}>
        <HeaderBase barStyle={"dark-content"} />
        <View style={{
            ...StyleGlobal.flexRow,
            justifyContent: "space-between",
            // backgroundColor: Colors.grey03,
            paddingVertical: 20,
            ...props?.styleContainer,
            backgroundColor: props.requireChangerBgColor ? props.requireChangerBgColor : colors.background
        }}>
            <TouchableOpacity disabled={props.isDisableOnPressLeft}
                              onPress={props.onPressIconLeft ? props.onPressIconLeft : () => navigation.goBack()}
                              style={styles.wrapContent}>
                {props?.icon &&
                  <View style={{ backgroundColor: colors.primary, borderRadius: 30, padding: 7, ...StyleGlobal.card }}>
                    <MaterialIcon name={props.icon} size={props.sizeIcon ? props.sizeIcon : 24}
                                  color={colors.white} />
                  </View>}
                {/*{props?.image && <Image source={props.image} style={{ width: 30, height: 30 }} />}*/}
                <CommonText value={props.name}
                            style={{
                                fontWeight: "bold",
                                fontSize: 18,
                                marginLeft: 7,
                                color: colors.textBlack,
                                textAlign: "center"
                            }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.wrapContent} onPress={props.onPressButtonRight}>
                {props?.iconRight &&
                  <View style={{ backgroundColor: colors.primary, borderRadius: 30, padding: 7, ...StyleGlobal.card }}>
                    <MaterialIcon name={props?.iconRight} size={24}
                                  color={props.iconRightColor ? props.iconRightColor : colors.white} />
                  </View>}
            </TouchableOpacity>
        </View>
    </View>;
}

export default React.memo(HeaderSimple);
