import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../../components/Header';
import { collections, routes } from '../../shared/constants';

const categoriesRef = firestore()
  .collection(collections.CATEGORIES)
  .orderBy('english', 'asc');

export default function CategoriesListScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);

  async function fetchCategories() {
    try {
      const { docs, size } = await categoriesRef.limit(10).get();
      updateState(docs, size);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchMore() {
    try {
      const { docs, size } = await categoriesRef
        .startAfter(lastDoc)
        .limit(10)
        .get();
      updateState(docs, size);
    } catch (err) {
      console.error(err);
    }
  }

  function updateState(docs, size) {
    if (size === 0) {
      return;
    }

    const list = [];
    for (const doc of docs) {
      list.push({ ...doc.data(), id: doc.id });
    }
    setCategories(listOfCategories => listOfCategories.concat(list));
    setLastDoc(docs[docs.length - 1]);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

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
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} title={'Categories'} />
      <FlatList
        numColumns={3}
        data={categories}
        columnWrapperStyle={{
          marginVertical: 4,
        }}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => onPress(item.id, item.english)}
              style={{
                width: Dimensions.get('screen').width / 3 - 8,
                marginHorizontal: 4,
              }}>
              <Image
                source={{ uri: item.image }}
                resizeMethod={'auto'}
                style={styles.image}
              />
              <Text style={styles.title}>
                {item.english} ({item.items})
              </Text>
            </Pressable>
          );
        }}
        keyExtractor={item => item.id}
        onEndReached={fetchMore}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 100,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#212121',
    paddingVertical: 6,
  },
  discount: {
    marginTop: 1,
    fontSize: 12,
    color: 'black',
    opacity: 0.4,
    textAlign: 'center',
  },
});
