/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import { store } from './src/store/app/rootReducer';

import { ShopNavigator } from './src/navigation/ShopNavigator';
import { AuthentificationNavigator } from './src/navigation/AuthNavigator';
import { OrdersNavigator } from './src/navigation/OrdersNavigator';
import { AppNavigator } from './src/navigation/AppNavigator';

const s = StyleSheet.create({
  gestureWrapper: { flex: 1 },
});

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={s.gestureWrapper}>
        <AppNavigator />
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
