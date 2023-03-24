import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { MaterialIcon } from "../../CommonView/NativeModules/Icon/MaterialIcon";
import Colors from "../../theme/Colors";
import { NavigationKey } from "../../const/NavigationKey";
import HomeScreen from "../Home/HomeScreen";
import InfoScreen from "../Info/InfoScreen";
import React from "react";

const Tab = createBottomTabNavigator();

export const HomeTabBar = () => {
    return <Tab.Navigator screenOptions={tabOption}>
        <Tab.Screen name={NavigationKey.home} component={HomeScreen} options={{ title: "Trang chủ" }} />
        <Tab.Screen name={NavigationKey.info} component={InfoScreen} options={{ title: "Cài đặt" }} />
    </Tab.Navigator>;
};


const tabOption = ({ route }: { route: RouteProp<any>; navigation: any; }) => ({
    tabBarIcon: ({ focused, color, size }: any) => {
        let iconName = "home-outline";

        if (route.name === NavigationKey.home) {
            iconName = "home-outline";
        } else if (route.name === NavigationKey.info) {
            iconName = "account-outline";
        }

        // You can return any component that you like here!
        return <MaterialIcon name={iconName} size={28} color={color} />;
    },
    tabBarActiveTintColor: Colors.primary,
    tabBarInactiveTintColor: "gray",
    headerShown: false,
    tabBarShowLabel: false
});
