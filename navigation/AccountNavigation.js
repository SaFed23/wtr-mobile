import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/FontAwesome";
import Settings from "../containers/Settings";

const Tab = createBottomTabNavigator();

export default function AccountNavigation() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Settings') {
                        iconName = 'cogs';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}