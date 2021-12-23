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
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { combineReducers, createStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { productsReducer } from './src/store/reducers/products';
import { ShopNavigator } from './src/navigation/ShopNavigator';

const rootReducer = combineReducers({
  products: productsReducer,
});

const store = createStore(rootReducer);

const s = StyleSheet.create({
  gestureWrapper: { flex: 1 },
});

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={s.gestureWrapper}>
        <NavigationContainer>
          <ShopNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
