import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNativator from './navigations/AuthNavigator';
import 'react-native-gesture-handler';

export default function App() {

  return (
    <NavigationContainer>
      <AuthNativator />
    </NavigationContainer>
  );
}

