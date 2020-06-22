import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SearchView from "../components/SearchView";
import ReportsNavigation from "./ReportsNavigation";
import AccountNavigation from "./AccountNavigation";

const Drawer = createDrawerNavigator();

export default function Application() {
    return (
        <Drawer.Navigator initialRouteName="Reports">
            <Drawer.Screen name="Reports" component={ReportsNavigation} />
            <Drawer.Screen name="Search" component={SearchView} />
            <Drawer.Screen name="Account" component={AccountNavigation} />
        </Drawer.Navigator>
    );
}