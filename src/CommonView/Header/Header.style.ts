import { StyleSheet } from "react-native";

import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Colors from "../../theme/Colors";

const colors = Colors;

export default StyleSheet.create({
    containerHeader: {
        backgroundColor: colors.primary,
        paddingTop: getStatusBarHeight(true),
        height: !getStatusBarHeight(true) ? 0 : getStatusBarHeight(true) + 50,
        justifyContent: "center"
    },
    shadow: {
        shadowColor: colors.grey02,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.50,
        shadowRadius: 5.35,

        elevation: 19
    },
    wrapContent: {
        // backgroundColor: colors.white,
        marginHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 35,
    },
    titleHeader: {
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 7,
        color: colors.white
    }
});
