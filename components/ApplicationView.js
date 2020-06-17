import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ReportsView from "./ReportsView";
import SearchView from "./SearchView";

const Drawer = createDrawerNavigator();

export default function Application() {
    return (
        <Drawer.Navigator initialRouteName="Reports">
            <Drawer.Screen name="Reports" component={ReportsView} />
            <Drawer.Screen name="Search" component={SearchView} />
        </Drawer.Navigator>
    );
}