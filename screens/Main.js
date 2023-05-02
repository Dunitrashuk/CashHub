import React from 'react';
import { View, SafeAreaView, Text, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ioicons from 'react-native-ionicons';

import Home from './Home';
import Transactions from './Transactions';



const styles = StyleSheet.create({

});

const Tab = createBottomTabNavigator();

export default function Main({ navigation }) {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === "Home") {
                            iconName = focused ? 'home' : 'home-outline'
                        } else if (rn === "Transactions") {
                            iconName = focused ? 'list' : 'list-outline'
                        }
                        return <Ioicons name={iconName} size={size} color={color} />
                    }
                })}

                tabBarOptions={{
                    activeTintColor: 'green',
                    inactiveTintColor: 'grey',
                    labelStyle: { paddingBotton: 10, fontSize: 10 },
                    style: { padding: 10, height: 70 }
                }}>

                <Tab.Screen name={"Home"} component={Home} />
                <Tab.Screen name={"Transactions"} component={Transactions} />

            </Tab.Navigator>
        </NavigationContainer>
    );
}
