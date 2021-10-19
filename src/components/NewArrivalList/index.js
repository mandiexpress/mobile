import React from 'react';
import { View, FlatList } from 'react-native';
import { routes } from '../../shared/constants';
import SectionHeader from '../SectionHeader';
import ProductItem from '../ProductItem';
import ItemFooter from '../ItemFooter';
import styles from './styles';

export default function NewArrivalList({ navigation, productList, cartItems }) {
  function onFooterPress() {
    const model = {
      query: null,
      title: 'New Arrived Items',
    };
    navigation.navigate(routes.PRODUCTS_LIST_SCREEN, model);
  }

  return (
    <View style={styles.container}>
      <SectionHeader title={'New Arrivals'} />
      <FlatList
        data={productList}
        renderItem={({ item }) => {
          return <ProductItem item={item} cartItems={cartItems} />;
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={{ marginHorizontal: 6 }} />}
        ListFooterComponent={() => (
          <ItemFooter
            navigation={navigation}
            onPress={onFooterPress}
            title={'See All New Arrived Items'}
          />
        )}
      />
    </View>
  );
}
