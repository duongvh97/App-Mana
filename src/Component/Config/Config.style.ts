import { StyleSheet } from "react-native";
import colors from "../../theme/Colors";


export default StyleSheet.create({
    container: {
        flex: 1,

        justifyContent: "center"
    },
    box: {
        width: 60,
        height: 60,
        marginVertical: 20
    },
    buttonStyle: {
        backgroundColor: "#bebebe",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: "60%",
        borderRadius: 4,
        alignSelf: "center",

        shadowColor: "grey",

        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3
    }, inputStyle: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#bebebe",
        marginBottom: 10,
        paddingHorizontal: 14
    },
    btnSearch: {
        marginVertical: 40,
        width: "67%",
        backgroundColor: colors.primary,
        paddingVertical: 10
    },
    textDescription: {
        color: colors.grey01,
        marginVertical: 14,
        paddingHorizontal: 5,
        marginTop: 30,
        fontSize: 14,
        lineHeight: 21,
        fontStyle: "italic"
    },
    title2: {
        fontSize: 39,
        color: colors.grey01,
        fontWeight: "bold",
        marginBottom: 30,
        lineHeight: 50
    },
    title1: { fontSize: 35, color: colors.grey01, fontWeight: "bold" },
    wrapContent: {
        backgroundColor: colors.white,
        flex: 1,
        marginHorizontal: 28,
        marginTop: 30
    }


});
