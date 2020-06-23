import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import ReportForm from "../containers/ReportForm";
import PrivateReports from "../containers/PrivateReports";

const Stack = createStackNavigator();

function PrivateReportsNavigation() {
    return (
        <Stack.Navigator initialRouteName="PrivateReports" headerMode='none'>
            <Stack.Screen
                name="PrivateReports"
                component={PrivateReports}/>
            <Stack.Screen
                name="PrivateReportForm"
                component={ReportForm}/>
        </Stack.Navigator>
    )
}

export default PrivateReportsNavigation;