import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import DetailContainer from '../../components/DetailContainer';
import styles from './styles';

const HomeScreen = ({navigation}) => {
  const [productList, setProductList] = useState([]);

  const {items} = useSelector(state => state.root.cart);

  function onLogout() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  function onResult(QuerySnapshot) {
    const documents = QuerySnapshot.docs;
    const products = [];
    for (const product of documents) {
      products.push({...product.data(), id: product.id});
    }
    setProductList(products);
  }

  function onError(error) {
    console.error(error);
  }

  useEffect(() => {
    const subscriber = firestore()
      .collection('Products')
      .orderBy('title', 'asc')
      .onSnapshot({includeMetadataChanges: true}, onResult, onError);

    return () => subscriber();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Urdu Content</Text>
      </View>
      <FlatList
        data={productList}
        contentContainerStyle={
          productList.length === 0 ? {height: '100%'} : {marginVertical: 12}
        }
        ItemSeparatorComponent={() => <View style={styles.seperatorStyle} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${item}_${index}`}
        renderItem={({item}) => {
          return <DetailContainer item={item} cartItems={items} />;
        }}
      />
    </View>
  );
};

export default HomeScreen;
