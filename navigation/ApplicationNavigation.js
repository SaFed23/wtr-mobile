import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ReportsNavigation from "./ReportsNavigation";
import AccountNavigation from "./AccountNavigation";
import SearchNavigation from "./SearchNavigation";

const Drawer = createDrawerNavigator();

export default function Application() {
    return (
        <Drawer.Navigator initialRouteName="Reports">
            <Drawer.Screen name="Reports" component={ReportsNavigation} />
            <Drawer.Screen name="Search" component={SearchNavigation} />
            <Drawer.Screen name="Account" component={AccountNavigation} />
        </Drawer.Navigator>
    );
}