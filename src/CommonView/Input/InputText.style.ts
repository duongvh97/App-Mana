import { Platform, StyleSheet } from "react-native";
import colors from "../../theme/Colors";



export default StyleSheet.create({
    textarea: {
        height: 200,
        // marginTop: heightResponsive(31),
        // marginBottom: heightResponsive(22),
        // borderColor: colors.inputText.border,
        // borderWidth: 0.5,
        // borderRadius: 8,
        backgroundColor: colors.white,
        paddingBottom: Platform.OS === "android" ? 7 : 0,
        padding: 12,
        justifyContent: "flex-start",
        textAlignVertical: "top",

        paddingLeft: 14,
        borderRadius: 8,
        fontSize: 15,
        color: colors.black,
        flex: 1
    },
    input: {},
    title: {
        fontWeight: "700",
        fontSize: 15,
        marginVertical: 4

    },
    err: {
        fontSize: 12,
        color: colors.red,
        textAlign: "left"
    },
    styleInput: {
        // fontFamily: 'Poppins-Regular',
        height: 48,
        paddingLeft: 14,
        borderRadius: 8,
        fontSize: 15,
        color: colors.black,
        flex: 1,
        paddingBottom: Platform.OS === "android" ? 7 : 0,
        backgroundColor: colors.white
    },
    edge: {
        backgroundColor: colors.white,
        width: 48,
        height: 48,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    wrapInput: {
        flexDirection: "row",
        borderColor: colors.grey01,
        borderBottomWidth : 0.5,
        borderRadius: 8,
        backgroundColor: colors.white
    }

});
