import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../../components/Home/Home';
import Sales from '../../components/Sales/Sales';
import Expenses from '../../components/Expenses/Expenses';
import ReportStack from '../ReportStack/ReportStack';

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
    return (
        <Drawer.Navigator initialRouteName="Ganancias" drawerContentOptions={{
            activeTintColor: 'blue',
        }} >
            <Drawer.Screen name="Ganancias" component={Home} />
            <Drawer.Screen name="Ventas" component={Sales} />
            <Drawer.Screen name="Gastos" component={Expenses} />
            <Drawer.Screen name="Reporte" component={ReportStack} />
        </Drawer.Navigator>
    )
}

export default HomeScreen;