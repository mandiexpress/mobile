import React from 'react';
import { FlatList, View } from 'react-native';
import ProductItem from '../../components/ProductItem';
import SectionHeader from '../../components/SectionHeader';
import { routes } from '../../shared/constants';
import ItemFooter from '../ItemFooter';
import styles from './styles';

export default function DiscountItemList({
  navigation,
  discountItems,
  cartItems,
  onItemPress,
}) {
  function onFooterPress() {
    const model = {
      query: {
        fieldPath: 'discount',
        operator: '>',
        value: 0,
      },
      title: 'Items on Discount',
    };
    navigation.navigate(routes.PRODUCTS_LIST_SCREEN, model);
  }

  return (
    <View style={styles.container}>
      <SectionHeader title={'Items on Discount'} />
      <FlatList
        data={discountItems}
        renderItem={({ item }) => (
          <ProductItem
            item={item}
            cartItems={cartItems}
            onItemPress={() => onItemPress(item)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        horizontal={true}
        ListFooterComponent={() => (
          <ItemFooter
            navigation={navigation}
            onPress={onFooterPress}
            title={'See All Items on Discount'}
          />
        )}
      />
    </View>
  );
}
