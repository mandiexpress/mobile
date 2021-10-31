import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from './styles';

export default function OrderDetailContainer({ item }) {
  const { title, price, unit, image, quantity, subtotal } = item;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.imageStyle} />
      </View>
      <View style={styles.contextContainer}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <Text style={styles.itemName}>{title}</Text>
            <Text style={styles.itemPrice}>
              Rs. {price}/{unit}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
            <Text>x{quantity}</Text>
            <Text>Rs. {subtotal}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
