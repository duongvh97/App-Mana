import { StatusBar } from "react-native";
import React, { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux";
import { NavigationContainer } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import { MainStack } from "./src/Component/Navigation/MainStack";
import "react-native-gesture-handler";
// @ts-ignore
console.ignoredYellowBox = true;
import codePush from "react-native-code-push";

import { GestureHandlerRootView, NativeViewGestureHandler } from "react-native-gesture-handler";

function MyApp() {
    // async function checkCodePushAndSync() {
    //     try {
    //         await codePush.sync({
    //                 updateDialog: {
    //                     title: "Thông báo",
    //                     optionalUpdateMessage: "Bạn đang có bản cập nhật mới bạn có muốn nâng cấp không?",
    //                     mandatoryContinueButtonLabel: "Đồng ý",
    //                     optionalIgnoreButtonLabel: "Bỏ qua"
    //                 }
    //             },
    //             status => {
    //                 console.log("status", status);
    //             },
    //             (e) => {
    //                 console.log("🐛🐛🐛 line 34 -> App.tsx -> downloadProgressCallback :", e);
    //                 // setProcess({ p: e.receivedBytes, t: e.totalBytes });
    //             }
    //         );
    //     } catch (error) {
    //         console.log("error", error);
    //     }
    //
    //
    //     codePush.notifyAppReady().then(e => {
    //         console.log("🐛🐛🐛 line 60 -> App.js -> e :", e);
    //     });
    // }
    //
    //
    // useEffect(() => {
    //     // code here
    //     checkCodePushAndSync().then(r => {
    //         console.log("🐛🐛🐛 line 46 -> App.tsx -> r :", r);
    //     });
    // }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <MainStack />
                    </GestureHandlerRootView>
                    {/*<FlashMessage position="top" />*/}
                </NavigationContainer>
                <FlashMessage
                    position="top"
                    style={{ paddingTop: StatusBar.currentHeight }}
                    animated={true}
                    autoHide={true}
                />
            </PersistGate>
        </Provider>
    );
}

// export default MyApp;

export default codePush({
    updateDialog: false,
    installMode: codePush.InstallMode.IMMEDIATE,
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME

})(MyApp);

