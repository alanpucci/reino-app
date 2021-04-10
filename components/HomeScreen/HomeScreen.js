import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../Home/Home';
import Sales from '../Sales/Sales';
import Expenses from '../Expenses/Expenses';

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
    return (
        <Drawer.Navigator initialRouteName="G" drawerContentOptions={{
            activeTintColor: 'blue',
        }} >
            <Drawer.Screen name="Ganancias" component={Home} />
            <Drawer.Screen name="Ventas" component={Sales} />
            <Drawer.Screen name="Gastos" component={Expenses} />
        </Drawer.Navigator>
    )
}

export default HomeScreen;