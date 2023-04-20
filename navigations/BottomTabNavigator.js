import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import React from 'react'
import Transactions from '../screens/Transactions';
import Home from '../screens/Home';
import Forecasting from '../screens/Forecasting';
import Budget from '../screens/Budget';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: "rgba(217, 217, 217, 0.15)",
        position: "absolute",
        borderRadius: 20,
        borderTopWidth: 0,
        paddingTop: 10,
    }
});

export default function BottomTabNativator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                // tabBarInactiveTintColor: "#00000",
                tabBarStyle: styles.tabBarStyle,
                tabBarActiveTintColor: "#7DA747",
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused ? 'ios-home' : 'ios-home-outline';
                    } else if (route.name === "Transactions") {
                        iconName = focused ? 'document' : 'document-outline';
                    } else if (route.name === "Forecasting") {
                        iconName = focused ? 'bar-chart' : 'bar-chart-outline';
                    } else if (route.name === "Budget") {
                        iconName = focused ? 'wallet' : 'wallet-outline';
                    }
                    return <Icon name={iconName} size={30} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Transactions" component={Transactions} />
            <Tab.Screen name="Forecasting" component={Forecasting} />
            <Tab.Screen name="Budget" component={Budget} />
        </ Tab.Navigator>
    );
}