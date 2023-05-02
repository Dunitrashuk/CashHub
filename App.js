import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNativator from './navigations/AuthNavigator';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux'
import { store } from './redux/store';

export default function App() {
  console.log(store.getState())
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthNativator />
      </NavigationContainer>
    </Provider>
  );
}

