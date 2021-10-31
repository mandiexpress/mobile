import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Header from '../../components/Header';

export default function FavoriteListScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header navigation={navigation} title={'Favorites'} />
      <Text>Favorites</Text>
    </SafeAreaView>
  );
}
