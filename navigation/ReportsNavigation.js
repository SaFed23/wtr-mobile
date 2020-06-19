import { createStackNavigator } from '@react-navigation/stack';
import Reports from "../containers/Reports";
import React from "react";
import ReportForm from "../containers/ReportForm";

const Stack = createStackNavigator();

function ReportsNavigation() {
    return (
        <Stack.Navigator initialRouteName="Reports" headerMode='none'>
            <Stack.Screen
                name="Reports"
                component={Reports}/>
            <Stack.Screen
                name="ReportForm"
                component={ReportForm}/>
        </Stack.Navigator>
    )
}

export default ReportsNavigation;