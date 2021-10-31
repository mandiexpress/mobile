import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from '../../store/reducers/cart';
import HorizontalDivider from '../HorizontalDivider';
import {
  calculateDiscount,
  calculateSavePrice,
  getQuantity,
} from '../../shared/utils';
import styles from './styles';
import { icons } from '../../shared/constants';

export default function ProductItem({
  item,
  cartItems,
  containerStyle = {},
  onItemPress,
}) {
  const dispatch = useDispatch();
  const isAvailable = cartItems.find(cartItem => cartItem.id === item.id);
  const quantity = getQuantity(cartItems, item.id);

  function onCartUpdate() {
    const model = { ...item, quantity: 1 };
    if (item.discount > 0) {
      model.subtotal = calculateDiscount(item.discount, item.price) * 1;
    } else {
      model.subtotal = item.price * 1;
    }
    dispatch(addToCart(model));
  }

  function onIncrement() {
    const model = {
      id: item.id,
      quantity: quantity + 1,
    };
    dispatch(updateQuantity(model));
  }

  function onDecrement() {
    if (quantity - 1 === 0) {
      dispatch(removeFromCart(item.id));
    } else {
      const model = {
        id: item.id,
        quantity: quantity - 1,
      };
      dispatch(updateQuantity(model));
    }
  }

  return (
    <Pressable onPress={onItemPress} style={[styles.container, containerStyle]}>
      <Image
        source={{ uri: item.image }}
        resizeMethod={'auto'}
        resizeMode={'contain'}
        style={styles.image}
      />
      {item.discount > 0 && (
        <View style={styles.discountContainer}>
          <Text style={styles.discount}>{item.discount}% off</Text>
        </View>
      )}
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.priceContainer}>
        {item.discount > 0 && (
          <Text style={styles.discountedPrice}>
            Rs. {calculateDiscount(item.discount, item.price)}
          </Text>
        )}
        <Text
          style={
            item.discount > 0 ? styles.price : styles.withoutDiscountPrice
          }>
          Rs. {item.price}
        </Text>
      </View>
      <HorizontalDivider />
      <Text style={styles.saved}>
        {item.discount > 0
          ? `You save Rs. ${calculateSavePrice(item.discount, item.price)}`
          : ''}
      </Text>
      {isAvailable ? (
        <View style={styles.cartIncludedContainer}>
          <Pressable
            style={[
              styles.quantityActionContainer,
              styles.decrementActionContainer,
            ]}
            onPress={onDecrement}>
            <Image source={icons.MINUS} style={styles.quantityActionImage} />
          </Pressable>
          <Text style={styles.quantityText}>
            {getQuantity(cartItems, item.id)}
          </Text>
          <Pressable
            style={styles.quantityActionContainer}
            onPress={onIncrement}>
            <Image source={icons.ADD} style={styles.quantityActionImage} />
          </Pressable>
        </View>
      ) : (
        <Pressable onPress={onCartUpdate} style={styles.addToCartContainer}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </Pressable>
      )}
    </Pressable>
  );
}
