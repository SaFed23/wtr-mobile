import { createStackNavigator } from '@react-navigation/stack';
import Reports from "../containers/Reports";
import React from "react";
import AllReportForms from "../containers/AllReportForms";

const Stack = createStackNavigator();

function ReportsNavigation() {
    return (
        <Stack.Navigator initialRouteName="Reports" headerMode='none'>
            <Stack.Screen
                name="Reports"
                component={Reports}/>
            <Stack.Screen
                name="ReportForm"
                component={AllReportForms}/>
        </Stack.Navigator>
    )
}

export default ReportsNavigation;