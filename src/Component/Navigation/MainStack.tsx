import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationKey } from "../../const/NavigationKey";
import { HomeTabBar } from "./HomeTabBar";
import { setI18nConfig } from "../../Translations/Translate";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerProps } from "../../redux/reducer";
import ConfigScreen from "../Config/ConfigScreen";
import DetailScreen from "../DetailScreen/DetailScreen";
import AlarmScreen from "../Alarm/AlarmScreen";
import AddAlarm from "../AddAlarm/AddAlarm";
import SetupNewDevice from "../SetupNewDevice/SetupNewDevice";
import InfoDevice from "../InfoDevice/InfoDevice";
import { connectSocket } from "../../redux/action/SocketAction";
import SplashScreen from 'react-native-splash-screen'

const Stack = createNativeStackNavigator();

export const MainStack = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state: RootReducerProps) => state.lang.lang);
    // console.log("MainStack", lang);
    setI18nConfig(lang);

    useEffect(() => {
        SplashScreen.hide();
        dispatch(connectSocket());
    }, []);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NavigationKey.homeTab} component={HomeTabBar} />
            <Stack.Screen name={NavigationKey.config} component={ConfigScreen} />
            <Stack.Screen name={NavigationKey.DetailScreen} component={DetailScreen} />
            <Stack.Screen name={NavigationKey.AlarmScreen} component={AlarmScreen} />
            <Stack.Screen name={NavigationKey.AddAlarm} component={AddAlarm} />
            <Stack.Screen name={NavigationKey.SetupNewDevice} component={SetupNewDevice} />
            <Stack.Screen name={NavigationKey.InfoDevice} component={InfoDevice} />
        </Stack.Navigator>
    );
};
