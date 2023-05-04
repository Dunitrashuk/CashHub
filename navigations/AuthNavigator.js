import BottomTabNavigator from './BottomTabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { selectUser } from '../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import React from 'react';
import Landing from '../screens/Landing';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

const Stack = createStackNavigator();

export default function AuthNavigator() {
    const signedIn = useSelector(selectUser).isSignedIn;
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Landing'>
            {(!signedIn) ?
                <>
                    <Stack.Screen name="Landing" component={Landing} />
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                </>
                : <Stack.Screen name="Main" component={BottomTabNavigator} />}
            {/* <Stack.Screen name="Loading" component={LoadingScreen} /> */}
        </Stack.Navigator>
    );
}