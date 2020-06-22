import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PrivateReportsView from "../components/PrivateReportsView";
import RejectedReportsView from "../components/RejectedReportsView";

const Tab = createBottomTabNavigator();

export default function AccountNavigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Private" component={PrivateReportsView} />
            <Tab.Screen name="Rejected" component={RejectedReportsView} />
        </Tab.Navigator>
    );
}