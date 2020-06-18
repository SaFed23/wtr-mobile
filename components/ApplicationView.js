import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Reports from "../containers/Reports";
import SearchView from "./SearchView";
import AccountView from "./AccountView";

const Drawer = createDrawerNavigator();

export default function Application(props) {
    return (
        <Drawer.Navigator initialRouteName="Reports">
            <Drawer.Screen name="Reports" component={Reports} />
            <Drawer.Screen name="Search" component={SearchView} />
            <Drawer.Screen name="Account" component={AccountView} />
        </Drawer.Navigator>
    );
}