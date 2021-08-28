/* eslint-disable react-native/no-inline-styles */
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import MainBottomNavigator from './src/routes/MainBottomNavigator';
import MainNavigator from './src/routes/MainNavigator';
import {store} from './src/store';

// import MainNavigator from './src/routes/MainNavigator';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

export default App;
