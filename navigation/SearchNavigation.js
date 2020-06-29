import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import Search from "../containers/Search";
import SearchResultView from "../components/SearchResultView";
import AllReportForms from "../containers/AllReportForms";

const Stack = createStackNavigator();

function SearchNavigation() {
    return (
        <Stack.Navigator initialRouteName="Search" headerMode='none'>
            <Stack.Screen
                name="Search"
                component={Search}/>
            <Stack.Screen
                name="SearchResult"
                component={SearchResultView}/>
            <Stack.Screen
                name="ResultDetails"
                component={AllReportForms}/>
        </Stack.Navigator>
    )
}

export default SearchNavigation;