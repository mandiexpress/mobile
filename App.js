import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Loader from './src/components/Loader';
import MainNavigator from './src/routes/MainNavigator';
import { globalStyles } from './src/shared/constants';
import { persist, store } from './src/store';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  function onBeforeLift() {
    setLoading(false);
  }

  return (
    <Provider store={store}>
      <PersistGate
        loading={<Loader visible={loading} text={'Loading...'} />}
        persistor={persist}
        onBeforeLift={onBeforeLift}>
        <SafeAreaView style={styles.safeAreaView}>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: globalStyles.singleFlex,
  },
});
