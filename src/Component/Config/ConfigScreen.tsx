import React from "react";
import { ScrollView, View } from "react-native";
import StyleGlobal from "../../theme/StyleGlobal";
import HeaderSimple from "../../CommonView/Header/HeaderSimple";
import CommonText from "../../CommonView/CommonText/CommonText";
import { CommonInput } from "../../CommonView/Input";
import CommonButton from "../../CommonView/Button/CommonButton";
import styles from "./Config.style";
import ConfigLogic from "./Config.logic";
import colors from "../../theme/Colors";
import Colors from "../../theme/Colors";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { translate } from "../../Translations/Translate";
import { NavigationKey } from "../../const/NavigationKey";

function ConfigScreen() {

    const useConfig = ConfigLogic();

    return <ScrollView style={StyleGlobal.containerMainWhite}>
        <HeaderSimple
            icon={"arrow-left"}
            isNoShadow={true}
            sizeIcon={20}
            requireChangerBgColor={colors.white}
            styleContainer={{
                backgroundColor: colors.white,
                paddingTop: getStatusBarHeight(true),
                height: !getStatusBarHeight(true) ? 0 : getStatusBarHeight(true) + 50
            }}
        />


        <View style={styles.wrapContent}>
            <CommonText value={translate("config.title1")} style={styles.title1} />
            <CommonText value={translate("config.title2")} style={styles.title2} />

            {!useConfig.isConnectWifi ? <View style={{
                justifyContent: "center",
                backgroundColor: Colors.red,
                paddingVertical: 11,
                borderRadius: 12,
                marginBottom: 10
            }}>
                <CommonText value={translate("deviceNotConnectWifi").toUpperCase()}
                            style={{ textAlign: "center", color: "white" }} />
            </View> : null}

            {!useConfig.locationEnable ? <View style={{
                justifyContent: "center",
                backgroundColor: Colors.red,
                paddingVertical: 11,
                borderRadius: 12
            }}>
                <CommonText value={translate("locationEnable").toUpperCase()}
                            style={{ textAlign: "center", color: "white" }} />
            </View> : null}

            <CommonInput
                editable={!useConfig.isScan}
                placeholder={"Wifi name"}
                value={useConfig.ssid}
                onChangeText={e => useConfig.setSSID(e)}
            />
            <CommonInput
                editable={!useConfig.isScan}
                placeholder={"Password"}
                value={useConfig.wifiPass}
                secureTextEntry={true}
                isPassword={true}
                onChangeText={e => useConfig.setWifiPass(e)}
            />

            <CommonText
                style={styles.textDescription}
                value={translate("config.description")}
            />

            <CommonButton
                isLoading={useConfig.isScan}
                text={translate("config.scan")}
                style={styles.btnSearch}
                // isShowIconArrowRight={true}
                onPress={useConfig.isScan ? useConfig.stopScan : useConfig.onStartConfig}
                disabled={false}
            />

            {
                __DEV__ && !useConfig.isScan ? <CommonButton
                    isLoading={useConfig.isScan}
                    text={translate("apConfig")}
                    style={{
                        marginVertical: 0,
                        width: "67%",
                        backgroundColor: colors.primary,
                        paddingVertical: 10
                    }}

                    onPress={() => useConfig.navigation.replace(NavigationKey.SetupNewDevice)}
                    disabled={false}
                /> : null
            }

        </View>
    </ScrollView>;

}

export default React.memo(ConfigScreen);
