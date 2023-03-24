import React from "react";
import { StyleSheet, View } from "react-native";
import CommonText from "../../CommonView/CommonText/CommonText";
import { translate } from "../../Translations/Translate";
import Modal from "react-native-modal";
import colors from "../../theme/Colors";
import Colors from "../../theme/Colors";
import StyleGlobal from "../../theme/StyleGlobal";
import { MenuItem } from "../../CommonView/Menu/MenuItem";
import { MaterialIcon } from "../../CommonView/NativeModules/Icon/MaterialIcon";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerProps } from "../../redux/reducer";
import { ENGLISH, VIETNAM } from "../../const/Const";
import { changerLanguage } from "../../redux/action/LangAction";

interface ModalLanguageProps {
    isShowModal: boolean,
    onHideModal: () => void,
}

function ModalLanguage(props: ModalLanguageProps) {

    const lang = useSelector((state: RootReducerProps) => state.lang.lang);
    const dispatch = useDispatch();

    return <Modal
        isVisible={props.isShowModal}
        onModalHide={props.onHideModal}
        onBackdropPress={props.onHideModal}
    >
        <View style={styles.container}>
            <CommonText value={translate("language").toUpperCase()} style={styles.title} />
            <MenuItem
                text={translate("vi")}
                iconRight={
                    <MaterialIcon
                        name={lang === VIETNAM ? "checkbox-marked-circle" : "checkbox-blank-circle-outline"}
                        size={23} color={Colors.primary}
                    />
                }
                onPress={() => dispatch(changerLanguage(VIETNAM))}
            />
            <MenuItem
                text={translate("en")}
                iconRight={
                    <MaterialIcon name={lang === ENGLISH ? "checkbox-marked-circle" : "checkbox-blank-circle-outline"}
                                  size={23}
                    />
                }
                onPress={() => dispatch(changerLanguage(ENGLISH))}
            />


        </View>
    </Modal>;
}

export default React.memo(ModalLanguage);


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background, padding: 14,
        borderRadius: 10, ...StyleGlobal.shadow
    },
    title: {
        fontWeight: "bold", fontSize: 16, marginBottom: 14,
        textAlign: "center"
    },
    textError: {
        fontSize: 13, marginVertical: 7, color: colors.red
        , textAlign: "center"
    },
    wrapButton: { flexDirection: "row", justifyContent: "flex-end", marginVertical: 12 },
    btnCancel: { width: "27%", height: 40 },
    textCancel: { fontSize: 12, textTransform: "none" },
    btnOk: {
        width: "27%",
        height: 40,
        backgroundColor: colors.success,
        paddingVertical: 0,
        marginLeft: 10
    },
    textOke: { fontSize: 13 },
    time: {
        fontWeight: "bold",
        fontSize: 20,
        padding: 10,
        backgroundColor: colors.success,
        margin: 10,
        borderRadius: 10,
        color: colors.white
    }
});
