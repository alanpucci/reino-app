import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Report from '../../components/Report/Report';
import ReportTabs from '../ReportTabs/ReportTabs';

const Stack = createStackNavigator();

const ReportStack = () => {
    return (
        <Stack.Navigator initialRouteName="MonthsList" headerMode="none">
            <Stack.Screen name="MonthsList" component={Report} />
            <Stack.Screen name="ReportStack" component={ReportTabs} />
        </Stack.Navigator>
    )
}

export default ReportStack
