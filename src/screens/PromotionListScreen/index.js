import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import Header from '../../components/Header';
import PromotionItem from '../../components/PromotionItem';
import styles from './styles';
import { collections } from '../../shared/constants';

const promotionsRef = firestore()
  .collection(collections.PROMOTIONS)
  .orderBy('createdAt', 'desc');

export default function PromotionListScreen({ navigation }) {
  const [promotions, setPromotions] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);

  async function fetchPromotions() {
    try {
      const { docs, size } = await promotionsRef.limit(5).get();
      updateState(docs, size);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchMore() {
    try {
      const { docs, size } = promotionsRef.startAfter(lastDoc).limit(5).get();
      if (size === 0) {
        return;
      }
      updateState(docs);
    } catch (err) {
      console.error(err);
    }
  }

  function updateState(docs) {
    if (!docs) {
      return;
    }
    const list = [];
    for (const doc of docs) {
      list.push({ ...doc.data(), id: doc.id });
    }
    setPromotions(listOfPromotions => [...listOfPromotions, ...list]);
    setLastDoc(docs[docs.length - 1]);
  }

  useEffect(() => {
    fetchPromotions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={'Promotions'} />
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        data={promotions}
        renderItem={({ item }) => (
          <PromotionItem item={item} navigation={navigation} fullWidth={true} />
        )}
        keyExtractor={item => item.id}
        onEndReached={fetchMore}
      />
    </View>
  );
}
