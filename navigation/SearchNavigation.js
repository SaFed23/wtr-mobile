import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import Search from "../containers/Search";

const Stack = createStackNavigator();

function SearchNavigation() {
    return (
        <Stack.Navigator initialRouteName="Search" headerMode='none'>
            <Stack.Screen
                name="Search"
                component={Search}/>
        </Stack.Navigator>
    )
}

export default SearchNavigation;