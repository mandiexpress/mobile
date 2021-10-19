import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import ProductItem from '../../components/ProductItem';
import { collections } from '../../shared/constants';

export default function ProductList({ navigation, route }) {
  const { params } = route;
  const [products, setProducts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);

  const { items } = useSelector(state => state.root.cart);

  async function fetchCategories() {
    try {
      if (params.query) {
        const { fieldPath, operator, value } = params.query;
        const { docs, size } = await firestore()
          .collection(collections.PRODUCTS)
          .where(fieldPath, operator, value)
          .limit(10)
          .get();
        updateState(docs, size);
      } else {
        const { docs, size } = await firestore()
          .collection(collections.PRODUCTS)
          .orderBy('createdAt', 'desc')
          .limit(10)
          .get();
        updateState(docs, size);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchMore() {
    try {
      if (params.query) {
        const { fieldPath, operator, value } = params.query;
        const { docs, size } = await firestore()
          .collection(collections.PRODUCTS)
          .where(fieldPath, operator, value)
          .startAfter(lastDoc)
          .limit(10)
          .get();
        updateState(docs, size);
      } else {
        const { docs, size } = await firestore()
          .collection(collections.PRODUCTS)
          .orderBy('createdAt', 'desc')
          .startAfter(lastDoc)
          .limit(10)
          .get();
        updateState(docs, size);
      }
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
    setProducts(listOfProducts => listOfProducts.concat(list));
    setLastDoc(docs[docs.length - 1]);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} title={params.title} />
      <FlatList
        numColumns={2}
        data={products}
        columnWrapperStyle={{
          marginVertical: 4,
        }}
        renderItem={({ item }) => {
          return (
            <ProductItem
              item={item}
              cartItems={items}
              containerStyle={{
                flex: 1,
                backgroundColor: 'white',
                marginHorizontal: 4,
              }}
            />
          );
        }}
        keyExtractor={item => item.id}
        onEndReached={fetchMore}
      />
    </View>
  );
}
