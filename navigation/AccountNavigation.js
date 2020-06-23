import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PrivateReportsView from "../components/PrivateReportsView";
import RejectedReportsView from "../components/RejectedReportsView";
import Icon from "react-native-vector-icons/FontAwesome";
import Settings from "../containers/Settings";

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
            <Tab.Screen name="Private" component={PrivateReportsView} />
            <Tab.Screen name="Rejected" component={RejectedReportsView} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}