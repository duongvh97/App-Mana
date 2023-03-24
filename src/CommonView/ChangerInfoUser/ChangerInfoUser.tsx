import React from "react";
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import StyleGlobal from "../../theme/StyleGlobal";
import HeaderSimple from "../Header/HeaderSimple";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CommonInput } from "../Input";
import Colors from "../../theme/Colors";
import CommonButton from "../Button/CommonButton";
import { img_images_avatar } from "../../assets/images";
import useChangerInfoUser from "./useChangerInfoUser";
import { MaterialIcon } from "../NativeModules/Icon/MaterialIcon";
import CommonText from "../CommonText/CommonText";

const styles = StyleSheet.create({
    btnSelectAvatar: {
        justifyContent: "center",
        alignItems: "center"
    },
    txtBtnSelectAvatar: {
        color: Colors.subText

    }
});

function ChangerInfoUser() {
    const infoUser = useChangerInfoUser();
    console.log(infoUser);


    return <SafeAreaView style={StyleGlobal.containerMainWhite}>
        <HeaderSimple name={"Cập nhật thông tin".toUpperCase()} icon={"chevron-left"} isNoShadow={true}
                      isNameCenter={true}
                      styleContainer={{ height: 60, marginBottom: 14 }} />

        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginHorizontal: 14 }}
        >
            <View style={{ alignItems: "center", marginBottom: 30 }}>
                <Image source={infoUser.avatar} style={{ width: 150, height: 150, borderRadius : 75 }} />
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: 200, marginTop: 14 }}>
                    <TouchableOpacity style={styles.btnSelectAvatar} onPress={infoUser.selectCamera}>
                        <MaterialIcon name={"camera"} size={28} color={Colors.primary} />
                        <CommonText value={"Từ máy ảnh"} style={styles.txtBtnSelectAvatar} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSelectAvatar} onPress={infoUser.selectImage}>
                        <MaterialIcon name={"image-multiple"} size={28} color={Colors.primary} />
                        <CommonText value={"Từ thư viện"} style={styles.txtBtnSelectAvatar} />
                    </TouchableOpacity>
                </View>
            </View>

            <CommonInput
                titleInput={"Tên người dùng"}
                placeholder={"Tên người dùng"}
                value={infoUser.name}
                onChangeText={(text) => infoUser.setName(text)}
                colorIconLeft={Colors.colorIconInput}
                styleInput={{
                    borderRadius: 10,
                    borderWidth: 1.5,
                    borderColor: Colors.primary,
                    overflow: "hidden",
                    marginBottom: 35
                }}
            />

            <CommonInput
                titleInput={"Giới thiệu về tôi"}
                value={infoUser.description}
                onChangeText={(text) => infoUser.setDescription(text)}
                isTextarea={true}
                placeholder={"Giới thiệu về tôi"}
                colorIconLeft={Colors.colorIconInput}
                styleInput={{
                    borderRadius: 10,
                    borderWidth: 1.5,
                    borderColor: Colors.primary,
                    overflow: "hidden",
                    marginBottom: 15,
                    padding: 10
                }}
            />

            <CommonButton
                isLoading={infoUser.isLoading}
                onPress={infoUser.onSubmit}
                text={"Lưu"}
                style={{ backgroundColor: Colors.primary, height: 50, marginTop: 40 }}
            />
        </KeyboardAwareScrollView>
    </SafeAreaView>;
}

export default React.memo(ChangerInfoUser);
