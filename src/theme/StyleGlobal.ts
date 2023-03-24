import { Platform, StatusBar, StyleSheet } from "react-native";
import Colors from "./Colors";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

const colors = Colors;

export default StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1
    },
    containerMain: {
        backgroundColor: colors.background,
        flex: 1
    },
    containerMainWhite: {
        backgroundColor: colors.white,
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    containerMainColor: {
        backgroundColor: colors.primary,
        flex: 1
    },
    card: {
        shadowColor: colors.grey02,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 8
    },
    flexRow: {
        flexDirection: "row"
    },
    fontBold: {
        fontWeight: "bold"
    },
    positionRelative: {
        position: "relative"
    },
    textCenter: {
        textAlign: "center"
    },
    flex1: {
        flex: 1
    },
    jusCenter: { justifyContent: "center" },
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
    subCard: {
        marginHorizontal: 14,
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 10
    },
    containerHeader: {
        backgroundColor: colors.transparent,
        paddingTop: getStatusBarHeight(true) + 10
        // height: !getStatusBarHeight(true) ? 0 : getStatusBarHeight(true) + 50,
        // justifyContent: "center"
    }
});
