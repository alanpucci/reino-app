import React, { createContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ReportSalesDetail from '../../components/ReportSalesDetail/ReportSalesDetail';
import { Icon } from 'native-base';
import ReportExpensesDetail from '../../components/ReportExpensesDetail/ReportExpensesDetail';
export const TabsContext = createContext();

const Tabs = createBottomTabNavigator();

const ReportTabs = ({ navigation, route }) => {

    return (
        <TabsContext.Provider value={route.params}>
            <Tabs.Navigator initialRouteName="Ventas" screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    return (
                        <Icon name={route.name === "Ventas" ? focused ? 'cash' : 'cash-outline' : focused ? 'wallet' : 'wallet-outline'} style={{ color: focused ? '#176EB6' : 'gray' }} />)
                }
            })}>
                <Tabs.Screen name="Ventas" component={ReportSalesDetail} />
                <Tabs.Screen name="Gastos" component={ReportExpensesDetail} />
            </Tabs.Navigator>
        </TabsContext.Provider>
    )
}

export default ReportTabs
