import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import Header from '../../components/Header';

export default function Statistics({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header navigation={navigation} title={'Statistics'} />
      <Text>Statistics</Text>
    </SafeAreaView>
  );
}
