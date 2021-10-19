import React, { useState } from 'react';
import WebView from 'react-native-webview';
import Loader from '../../components/Loader';

export default function TermsAndConditions() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <WebView
        source={{ uri: 'https://www.airliftexpress.com/terms-conditions' }}
        onLoadEnd={() => setLoading(false)}
      />
      <Loader visible={loading} text={'Loading...'} />
    </>
  );
}
