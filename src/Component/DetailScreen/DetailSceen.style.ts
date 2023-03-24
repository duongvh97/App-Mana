import { StyleSheet } from "react-native";
import StyleGlobal from "../../theme/StyleGlobal";
import Colors from "../../theme/Colors";

export default StyleSheet.create({
    wrapSlider: {
        ...StyleGlobal.subCard,
        marginTop: 12,
        padding: 5,
        flex: 8,
        marginHorizontal: 0,
        flexDirection: "row",
        alignItems: "center"

    },
    wrapListContext: {
        // flexDirection: "row",
        // flexWrap: "wrap",
        // alignItems: "flex-start",
        backgroundColor: Colors.white,
        // justifyContent: "space-between",
        marginHorizontal: 14,
        padding: 10,
        borderRadius: 12,
        marginBottom: 40
    }
});
