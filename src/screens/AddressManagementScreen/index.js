import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import Header from '../../components/Header';

export default function AddressManagementScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header navigation={navigation} title={'Address Management'} />
      <Text>
        This screen includes addresses and allows users to enter an address
      </Text>
    </SafeAreaView>
  );
}
