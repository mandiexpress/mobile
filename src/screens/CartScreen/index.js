import React, { useState } from 'react';
import { Alert, FlatList, Image, Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors, fonts, icons, routes } from '../../shared/constants';
import {
  emptyCart,
  removeFromCart,
  updateQuantity,
} from '../../store/reducers/cart';
import Header from '../../components/Header';
import styles from './styles';

export default function CartScreen({ navigation }) {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.root.cart);

  const subtotal = function () {
    let total = 0;
    for (const item of items) {
      total += item.subtotal;
    }
    return total;
  };

  function onEmptyCart() {
    const alertTitle = 'Are you sure';
    const description = 'Do you want to remove all items from cart';
    const yes = {
      text: 'Yes',
      style: 'destructive',
      onPress: () => dispatch(emptyCart()),
    };
    const cancel = {
      text: 'Cancel',
      style: 'cancel',
    };
    Alert.alert(alertTitle, description, [yes, cancel], { cancelable: true });
  }

  function onNavigateToCheckout() {
    const payload = {
      subtotal: subtotal(),
    };
    navigation.navigate(routes.CHECKOUT_SCREEN, payload);
  }

  return (
    <View style={styles.container}>
      {items.length > 0 && (
        <Header
          navigation={navigation}
          titleStyle={{ fontSize: 21, fontFamily: fonts.BOLD }}
          backNavStyle={{ display: 'none' }}
          title={'Cart'}
          rightComponent={() => {
            return (
              <Pressable
                onPress={onEmptyCart}
                style={styles.emptyCartContainer}>
                <Image style={styles.deleteIcon} source={icons.DELETE} />
              </Pressable>
            );
          }}
        />
      )}
      <View style={styles.singleFlex}>
        <FlatList
          keyExtractor={item => item.id}
          data={items}
          contentContainerStyle={
            items.length === 0
              ? styles.emptyListContent
              : styles.populatedListContent
          }
          ListEmptyComponent={EmptyListContent}
          ItemSeparatorComponent={ListContentDivider}
          renderItem={({ item }) => {
            return <CartItem item={item} />;
          }}
        />
      </View>
      {items.length > 0 && (
        <View>
          <View style={styles.footerContainer}>
            <View style={styles.singleFlex}>
              <View style={styles.row}>
                <Text style={styles.singleFlex}>Subtotal</Text>
                <Text style={styles.subtotal}>Rs. {subtotal()}</Text>
              </View>
              <View style={[styles.row, { marginVertical: 2 }]}>
                <Text style={styles.singleFlex}>Delivery Charges</Text>
                <Text style={styles.totalItems}>
                  {subtotal() > 500 ? 'Free' : 'Rs.30'}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.singleFlex}>Total Items</Text>
                <Text style={styles.totalItems}>x{items.length}</Text>
              </View>
            </View>
          </View>
          <Pressable
            onPress={onNavigateToCheckout}
            style={{
              marginVertical: 12,
              marginHorizontal: 6,
              padding: 12,
              borderRadius: 6,
              backgroundColor: colors.DARK_BLUE,
            }}>
            <Text
              style={{
                fontFamily: fonts.BOLD,
                color: 'white',
                textAlign: 'center',
              }}>
              Proceed to Checkout
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

function EmptyListContent() {
  return (
    <View style={styles.emptyListContainer}>
      <Image source={icons.EMPTY_CART} style={styles.emptyListImage} />
      <Text style={styles.emptyListHeader}>Empty Cart</Text>
      <Text style={styles.emptyListSubtitle}>Add items to your cart</Text>
    </View>
  );
}

function ListContentDivider() {
  return <View style={styles.listDivider} />;
}

function CartItem({ item }) {
  const dispatch = useDispatch();
  const { title, image, unit, price, stock, quantity, subtotal } = item;
  // const [count, setCount] = useState(quantity);

  function onQuantityIncrease() {
    // setCount(prevState => prevState + 1);
    dispatch(updateQuantity({ id: item.id, quantity: quantity + 1 }));
  }

  function onQuantityDecrease() {
    if (quantity - 1 === 0) {
      dispatch(removeFromCart(item.id));
    }
    // setCount(prevState => prevState - 1);
    dispatch(updateQuantity({ id: item.id, quantity: quantity - 1 }));
  }

  function onRemoveItem() {
    const alertTitle = 'Are you sure';
    const description = `Do you want to remove ${item.title} from cart?`;
    const yes = {
      text: 'Yes',
      style: 'destructive',
      onPress: () => dispatch(removeFromCart(item.id)),
    };
    const cancel = {
      text: 'Cancel',
      style: 'cancel',
    };
    Alert.alert(alertTitle, description, [yes, cancel], { cancelable: true });
  }

  return (
    <Pressable style={styles.listItemContainer} onLongPress={onRemoveItem}>
      <Image source={{ uri: image }} style={styles.listItemImage} />
      <View style={styles.listItemContentContainer}>
        <View style={styles.row}>
          <View style={styles.singleFlex}>
            <Text style={styles.listItemTitle}>{title}</Text>
            <Text style={styles.listItemPrice}>
              Rs. {price} / {unit}
            </Text>
          </View>
          <Text style={styles.listItemSubtotal}>Rs. {subtotal}</Text>
        </View>
        <View style={styles.counterStyle}>
          <Pressable onPress={onQuantityDecrease}>
            <Image style={styles.plusCount} source={icons.MINUS} />
          </Pressable>

          <View style={styles.countStyle}>
            <Text style={styles.countTextStyle}>{quantity}</Text>
          </View>

          <Pressable disabled={quantity === stock} onPress={onQuantityIncrease}>
            <Image style={styles.minusCount} source={icons.ADD} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
