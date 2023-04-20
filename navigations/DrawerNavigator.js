import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Transactions from '../screens/Transactions';
import Home from '../screens/Home';
import Forecasting from '../screens/Forecasting';
import Budget from '../screens/Budget';

const Drawer = createDrawerNavigator();

export default function DrawerNativator() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Transactions" component={Transactions} />
            <Drawer.Screen name="Forecasting" component={Forecasting} />
            <Drawer.Screen name="Budget" component={Budget} />
        </Drawer.Navigator>
    );
}