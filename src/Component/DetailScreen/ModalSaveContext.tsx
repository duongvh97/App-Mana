import { isTextEmpty } from "../../Common/FunctionCommon";
import React from "react";
import Modal from "react-native-modal";
import { StyleSheet, View } from "react-native";
import CommonText from "../../CommonView/CommonText/CommonText";
import { CommonInput } from "../../CommonView/Input";
import CommonButton from "../../CommonView/Button/CommonButton";
import colors from "../../theme/Colors";
import StyleGlobal from "../../theme/StyleGlobal";
import * as Animatable from "react-native-animatable";
import { useStateHook } from "../../Common/CommonHook";
import { translate } from "../../Translations/Translate";
import { DeviceProps } from "../../redux/reducer/DeviceReducer";
import { useDispatch } from "react-redux";
import { updateDevice } from "../../redux/action/DeviceAction";
import _ from "lodash";

interface ModalChangerNameProps {
    isShowModal: boolean,
    // onSubmit: () => void,
    nameDevice?: string,
    onHideModal: () => void,
    data: string,
    device: DeviceProps
}


const ModalSaveContext = React.forwardRef<any, ModalChangerNameProps>((props, ref) => {
    const nameContext = useStateHook<any>(isTextEmpty(props.nameDevice) ? "" : props.nameDevice);
    const error = useStateHook<any>("");
    const dispatch = useDispatch();

    const onChangeText = (e: string) => {
        nameContext.setValue(e);
        if (!isTextEmpty(error.value)) error.setValue("");
    };

    const onSubmit = () => {

        if (isTextEmpty(nameContext.value)) {
            error.setValue(translate("nameContextNotEmpty"));
            return;
        }

        console.log("onSubmit");
        let dataSave = {
            id: new Date().getTime(),
            name: nameContext.value,
            cmd: props.data
        };
        let device = _.cloneDeep(props.device);
        device.context.push(dataSave);
        console.log(device);

        dispatch(updateDevice(device));
        props.onHideModal();
    };

    return <Modal
        isVisible={props.isShowModal}
        onModalHide={props.onHideModal}
        onBackdropPress={props.onHideModal}
    >
        <View style={styles.container}>
            <CommonText value={translate("saveContext").toUpperCase()} style={styles.title} />
            <CommonInput
                placeholder={translate("nameContext")}
                value={nameContext.value}
                onChangeText={onChangeText}
            />

            {!isTextEmpty(error.value) ? <Animatable.View animation={"bounceIn"}>
                <CommonText value={error.value} style={styles.textError} />
            </Animatable.View> : null}
            <View style={styles.wrapButton}>
                <CommonButton
                    onPress={props.onHideModal}
                    text={translate("cancel")}
                    style={styles.btnCancel}
                    textStyle={styles.textCancel} />
                <CommonButton
                    onPress={onSubmit}
                    text={"Ok"}
                    style={styles.btnOk}
                    textStyle={styles.textOke} />
            </View>
        </View>
    </Modal>;
});


export default React.memo(ModalSaveContext);


const styles = StyleSheet.create({
    container: { backgroundColor: colors.white, padding: 14, borderRadius: 10, ...StyleGlobal.shadow },
    title: { fontWeight: "bold", fontSize: 16 },
    textError: { fontSize: 13, marginVertical: 7, color: colors.red, textAlign: "center" },
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
