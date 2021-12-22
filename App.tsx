/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const s = StyleSheet.create({
  gestureWrapper: { flex: 1 },
});

const App = () => {
  return (
    <GestureHandlerRootView style={s.gestureWrapper}>
      <NavigationContainer>
        <SafeAreaView>
          <Text>123</Text>
        </SafeAreaView>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
