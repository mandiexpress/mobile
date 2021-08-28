import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {icons} from '../../shared/constants';
import styles from './styles';
import {addToCart, removeFromCart} from '../../store/reducers/cart';

const DetailContainer = ({item, cartItems}) => {
  const dispatch = useDispatch();
  const {title, price, unit, image} = item;
  const isAvailable = cartItems.find(cartItem => cartItem.id === item.id);

  function onCartUpdate() {
    if (isAvailable) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(addToCart({...item, quantity: 1, subtotal: price}));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{uri: image}} style={styles.imageStyle} />
      </View>
      <View style={styles.contextContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <Text style={styles.itemName}>{title}</Text>
            <Text style={styles.itemPrice}>
              Rs. {price}/{unit}
            </Text>
          </View>
          <Pressable
            onPress={onCartUpdate}
            style={{
              alignSelf: 'center',
              backgroundColor: isAvailable ? 'green' : 'rgba(0, 0, 0, 0.2)',
              padding: 12,
              borderRadius: 6,
            }}>
            <Image
              source={icons.CART}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                tintColor: 'white',
              }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
export default DetailContainer;
