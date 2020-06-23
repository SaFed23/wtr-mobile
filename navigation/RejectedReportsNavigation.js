import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import ReportForm from "../containers/ReportForm";
import RejectedReports from "../containers/RejectedReports";

const Stack = createStackNavigator();

function RejectedReportsNavigation() {
    return (
        <Stack.Navigator initialRouteName="RejectedReports" headerMode='none'>
            <Stack.Screen
                name="RejectedReports"
                component={RejectedReports}/>
            <Stack.Screen
                name="RejectedReportForm"
                component={ReportForm}/>
        </Stack.Navigator>
    )
}

export default RejectedReportsNavigation;