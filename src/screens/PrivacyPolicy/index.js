import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
import Loader from '../../components/Loader';
import Header from '../../components/Header';

export default function PrivacyPolicy({ navigation }) {
  const [loading, setLoading] = useState(true);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header navigation={navigation} title={'Privacy Policy'} />
      <WebView
        source={{ uri: 'https://www.airliftexpress.com/terms-conditions' }}
        onLoadEnd={() => setLoading(false)}
      />
      {loading && <Loader visible={loading} text={'Loading...'} />}
    </SafeAreaView>
  );
}
