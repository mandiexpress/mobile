import React, {useState} from 'react';
import {Alert, FlatList, Image, Pressable, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {colors, icons, routes} from '../../shared/constants';
import {
  emptyCart,
  removeFromCart,
  updateQuantity,
} from '../../store/reducers/cart';
import styles from './styles';

function CartScreen({navigation}) {
  const dispatch = useDispatch();
  const {items} = useSelector(state => state.root.cart);

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
    Alert.alert(alertTitle, description, [yes, cancel], {cancelable: true});
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
        <View style={styles.headerContainer}>
          <View style={styles.singleFlex}>
            <Text style={styles.headerTitle}>Cart</Text>
            <Text style={styles.headerSubtitle}>
              Long Press to remove an item
            </Text>
          </View>
          <Pressable onPress={onEmptyCart} style={styles.centerContent}>
            <Image style={styles.deleteIcon} source={icons.DELETE} />
          </Pressable>
        </View>
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
          renderItem={({item}) => {
            return <CartItem item={item} />;
          }}
        />
      </View>
      {items.length > 0 && (
        <View>
          <View
            style={[
              styles.footerContainer,
              {
                backgroundColor:
                  subtotal() > 500
                    ? styles.footerSuccessBG.backgroundColor
                    : styles.footerContainer.backgroundColor,
              },
            ]}>
            <Text style={{fontSize: 12}}>
              {subtotal() > 500
                ? 'Yay! you get free delivery'
                : 'Order more than 500 gets free delivery'}
            </Text>
          </View>
          <Pressable
            style={styles.footerContainer}
            onPress={onNavigateToCheckout}>
            <View style={styles.singleFlex}>
              <View style={styles.row}>
                <Text style={styles.singleFlex}>Subtotal</Text>
                <Text style={styles.subtotal}>Rs. {subtotal()}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.singleFlex}>Total Items</Text>
                <Text style={styles.totalItems}>x{items.length}</Text>
              </View>
            </View>

            <Image source={icons.NEXT_FILLED} style={styles.nextButton} />
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

function CartItem({item}) {
  const dispatch = useDispatch();
  const {title, image, unit, price, stock, quantity, subtotal} = item;
  const [count, setCount] = useState(quantity);

  function onQuantityIncrease() {
    setCount(prevState => prevState + 1);
    dispatch(updateQuantity({id: item.id, quantity: count + 1}));
  }

  function onQuantityDecrease() {
    if (count - 1 === 0) {
      dispatch(removeFromCart(item.id));
    }
    setCount(prevState => prevState - 1);
    dispatch(updateQuantity({id: item.id, quantity: count - 1}));
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
    Alert.alert(alertTitle, description, [yes, cancel], {cancelable: true});
  }

  return (
    <Pressable style={styles.listItemContainer} onLongPress={onRemoveItem}>
      <Image source={{uri: image}} style={styles.listItemImage} />
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
            <Text style={styles.countTextStyle}>{count}</Text>
          </View>

          <Pressable disabled={count === stock} onPress={onQuantityIncrease}>
            <Image style={styles.minusCount} source={icons.ADD} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

export default CartScreen;
