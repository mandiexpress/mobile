import React, { useEffect, useState } from 'react';
import { Pressable, Image, Text, View, FlatList } from 'react-native';
import { colors, icons } from '../../shared/constants';
import HorizontalDivider from '../../components/HorizontalDivider';
import { getOrderStatus, getOrderStatusColor } from '../../shared/utils';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import OrderDetailContainer from '../../components/OrderDetailContainer';
import { Divider } from 'react-native-elements/dist/divider/Divider';

export default function OrderDetailScreen({ navigation, route }) {
  const { params } = route;
  const [order, setOrder] = useState(params);
  const [items, setItems] = useState(null);

  function onOrderResult(QuerySnapshot) {
    const document = QuerySnapshot.data();
    setOrder({ ...document, id: QuerySnapshot.id });
  }

  function onOrderError(error) {
    console.error(error);
  }

  async function fetchItems() {
    try {
      const { docs } = await firestore()
        .collection('Orders')
        .doc(params.id)
        .collection('Items')
        .get();
      const data = [];
      for (const item of docs) {
        data.push({ ...item.data(), id: item.id });
      }
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const subscriber = firestore()
      .collection('Orders')
      .doc(params.id)
      .onSnapshot(
        { includeMetadataChanges: true },
        onOrderResult,
        onOrderError,
      );

    return () => subscriber();
  }, []);

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: colors.WHITE }}>
      <View style={{ flexDirection: 'row' }}>
        <Pressable
          onPress={() => navigation.pop()}
          style={{
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={icons.BACK}
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
            }}
          />
        </Pressable>
        <Text style={styles.headerTitle}>Order Detail</Text>
      </View>
      <View style={{ marginTop: 24 }}>
        <TextItem title={'Order #'} value={order.id.substring(0, 6)} divider />
        <TextItem
          title={'Status'}
          value={getOrderStatus(order.status)}
          valueStyle={{
            color: getOrderStatusColor(order.status),
            fontWeight: 'bold',
          }}
          divider
        />
        <TextItem title={'Address'} value={order.address.complete} divider />
        <TextItem title={'Contact'} value={order.phone} divider />
        <TextItem
          title={'Total Charges'}
          value={`Rs. ${order.total}`}
          divider
          currency
        />
        <TextItem title={'Total Items'} value={`x${order.totalItems}`} />
      </View>
      <FlatList
        data={items}
        contentContainerStyle={{ marginTop: 12 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <HorizontalDivider />}
        ListHeaderComponent={() => {
          return (
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Items</Text>
          );
        }}
        renderItem={({ item }) => {
          return <OrderDetailContainer item={item} />;
        }}
      />
    </View>
  );
}

function TextItem({ title, value, valueStyle = {}, divider = false }) {
  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ flex: 0.5, fontSize: 12 }}>{title}</Text>
        <Text style={[{ flex: 1 }, valueStyle]}>{value}</Text>
      </View>
      {divider && <HorizontalDivider />}
    </View>
  );
}
