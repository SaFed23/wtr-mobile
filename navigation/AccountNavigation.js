import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/FontAwesome";
import Settings from "../containers/Settings";
import PrivateReportsNavigation from "./PrivateReportsNavigation";
import RejectedReportsNavigation from "./RejectedReportsNavigation";

const Tab = createBottomTabNavigator();

export default function AccountNavigation() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Private') {
                        iconName = 'lock';
                    } else if (route.name === 'Rejected') {
                        iconName = 'times-circle';
                    } else if (route.name === 'Settings') {
                        iconName = 'cogs';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Private" component={PrivateReportsNavigation} />
            <Tab.Screen name="Rejected" component={RejectedReportsNavigation} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}