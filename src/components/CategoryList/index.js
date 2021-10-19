import React from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import SectionHeader from '../../components/SectionHeader';
import { icons, routes } from '../../shared/constants';
import styles from './styles';

export default function CategoryList({ navigation, categories = [] }) {
  return (
    <View style={styles.container}>
      <SectionHeader title={'Shop by Category'} />
      <FlatList
        data={categories}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        horizontal={true}
        ListFooterComponent={() => <CategoryFooter navigation={navigation} />}
        renderItem={({ item }) => (
          <CategoryItem item={item} navigation={navigation} />
        )}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />
    </View>
  );
}

function CategoryItem({ item, navigation }) {
  function onPress(id, title) {
    navigation.navigate(routes.PRODUCTS_LIST_SCREEN, {
      query: {
        fieldPath: 'category',
        operator: '==',
        value: id,
      },
      title,
    });
  }

  return (
    <Pressable onPress={() => onPress(item.id, item.english)}>
      <Image
        source={{ uri: item.image }}
        resizeMethod={'auto'}
        resizeMode={'contain'}
        style={styles.image}
      />
      <Text style={styles.title}>{item.english}</Text>
      <Text style={styles.discount}>{item.items} Items</Text>
    </Pressable>
  );
}

function CategoryFooter({ navigation }) {
  return (
    <Pressable
      onPress={() => navigation.navigate(routes.CATEGORIES_LIST_SCREEN)}
      style={styles.footerContainer}>
      <Image source={icons.BACK} style={styles.nextIcon} />
      <Text style={styles.moreText}>MORE</Text>
    </Pressable>
  );
}
