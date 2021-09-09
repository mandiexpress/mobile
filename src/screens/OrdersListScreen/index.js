import firestore from '@react-native-firebase/firestore';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {icons, routes, status} from '../../shared/constants';
import {
  getOrderStatus,
  getOrderStatusColor,
  getOrderStatusGraphic,
} from '../../shared/utils';
import styles from './styles';

export default function OrdersScreen({navigation}) {
  const {user} = useSelector(state => state.root.user);
  const [orders, setOrders] = useState([]);

  function onResult(QuerySnapshot) {
    const documents = QuerySnapshot.docs;
    const data = [];
    for (const order of documents) {
      data.push({...order.data(), id: order.id});
    }
    setOrders(data);
  }

  function onError(error) {
    console.error(error);
  }

  useEffect(() => {
    const subscriber = firestore()
      .collection('Orders')
      .where('placedBy', '==', user.id)
      .onSnapshot({includeMetadataChanges: true}, onResult, onError);

    return () => subscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.id}
        data={orders}
        contentContainerStyle={
          orders.length === 0 ? styles.listContainer : styles.emptyListContainer
        }
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        renderItem={({item}) => {
          return (
            <Pressable
              style={styles.itemContainer}
              onPress={() =>
                navigation.navigate(routes.ORDER_DETAIL_SCREEN, item)
              }>
              <View style={styles.itemContentContainer}>
                <Image
                  source={getOrderStatusGraphic(item.status)}
                  style={styles.orderStatusIcon}
                />
              </View>
              <View style={styles.orderStatusContainer}>
                <Text style={styles.bold}>{item.totalItems} Items</Text>
                <Text
                  numberOfLines={2}
                  style={[
                    styles.orderStatusText,
                    {color: getOrderStatusColor(item.status)},
                  ]}>
                  {getOrderStatus(item.status)}
                </Text>
                <Text numberOfLines={2} style={styles.orderAddressText}>
                  {item.address}
                </Text>
              </View>
              <View style={styles.orderTimeAndPriceContainer}>
                <Text style={styles.smallText}>
                  {dayjs(item.createdAt.toDate()).format('MMM DD, YYYY')}
                </Text>
                <Text style={styles.orderTotalText}>Rs. {item.total}</Text>
                <Text style={styles.orderMoreInfo}>More Info</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
