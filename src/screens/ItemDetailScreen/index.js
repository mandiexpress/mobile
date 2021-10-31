import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Share,
  Text,
  View,
} from 'react-native';
import { AirbnbRating } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import { fonts, icons, routes } from '../../shared/constants';
import {
  calculateDiscount,
  calculateSavePrice,
  getQuantity,
} from '../../shared/utils';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from '../../store/reducers/cart';
import user, {
  addToFavorites,
  removeFromFavorites,
} from '../../store/reducers/user';
import {
  fetchProductDetail,
  fetchProductReviews,
  fetchSimilarItems,
} from './api';
import styles from './styles';
import ProductItem from '../../components/ProductItem';

// TODO: Start with Adding Add to Cart
export default function ItemDetailScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { params } = route;

  const [product, setProduct] = useState(params);
  const [refreshing, setRefreshing] = useState(false);
  const [similar, setSimilar] = useState([]);
  const [reviews, setReviews] = useState([]);

  console.log('Reviews', reviews);
  // console.log('Similar', similar);

  useEffect(() => {
    getProductData();
  }, [product]);

  async function getProductData() {
    try {
      const similarData = await fetchSimilarItems(product.category);
      setSimilar(similarData);

      const reviewsData = await fetchProductReviews(product.id);
      setReviews(reviewsData);
    } catch (err) {
      console.error('getSimilarItems', err);
    }
  }

  async function onRefresh() {
    try {
      setRefreshing(true);
      const productData = await fetchProductDetail(product.id);
      setProduct(productData);
      getProductData();
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  }

  const { favorites, isLoggedIn } = useSelector(state => state.root.user);
  const { items } = useSelector(state => state.root.cart);

  const quantity = getQuantity(items, product.id);

  function searchFavorite(itemId) {
    return favorites.find(item => item.id === itemId);
  }

  function searchCartItem(itemId) {
    return items.find(item => item.id === itemId);
  }

  function onFavoritePress() {
    if (!isLoggedIn) {
      navigation.navigate(routes.LOGIN_SCREEN);
      return;
    }
    if (searchFavorite(product.id)) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(params));
    }
  }

  function onCartUpdate() {
    const model = { ...params, quantity: 1 };
    if (product.discount > 0) {
      model.subtotal = calculateDiscount(product.discount, product.price) * 1;
    } else {
      model.subtotal = product.price * 1;
    }
    dispatch(addToCart(model));
  }

  function onIncrement() {
    const model = {
      id: product.id,
      quantity: quantity + 1,
    };
    dispatch(updateQuantity(model));
  }

  function onDecrement() {
    if (quantity - 1 === 0) {
      dispatch(removeFromCart(product.id));
    } else {
      const model = {
        id: product.id,
        quantity: quantity - 1,
      };
      dispatch(updateQuantity(model));
    }
  }

  async function onShare() {
    try {
      await Share.share({
        title: 'Mandii Express',
        message: `Buy ${product.title} at Rs.${
          product.discount > 0
            ? calculateDiscount(product.discount, product.price)
            : product.price
        }/${product.unit}${
          product.discount > 0
            ? ` and save Rs. ${calculateSavePrice(
                product.discount,
                product.price,
              )} with ${product.discount}% off`
            : '.'
        }`,
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        title={product.title}
        rightComponent={() => {
          return (
            <Pressable style={styles.cartButtonContainer} onPress={onShare}>
              <Image style={styles.cartImage} source={icons.SHARE} />
            </Pressable>
          );
        }}
      />
      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Image style={styles.productImage} source={{ uri: product.image }} />
        <View style={styles.contentContainer}>
          <View style={styles.contentDetailContainer}>
            <View style={styles.initialContentContainer}>
              <Text style={styles.productTitle}>{product.title}</Text>
              <View style={styles.ratingContainer}>
                <AirbnbRating
                  count={5}
                  defaultRating={parseFloat(product.ratings)}
                  selectedColor={'#FF9B3F'}
                  isDisabled={true}
                  showRating={false}
                  size={16}
                  starContainerStyle={styles.ratingStarContainerStyle}
                />
                <Text style={styles.ratingText}>({product.ratings})</Text>
              </View>
              {product.discount > 0 && (
                <View>
                  <Text style={styles.discountText}>
                    {product.discount}% off
                  </Text>
                  <Text style={styles.savingText}>
                    You save Rs.
                    {calculateSavePrice(product.discount, product.price)}
                  </Text>
                </View>
              )}
            </View>
            <Pressable
              onPress={onFavoritePress}
              style={styles.favoriteContainer}>
              <Image
                source={icons.LIKE}
                style={
                  searchFavorite(product.id)
                    ? styles.favoriteIcon
                    : [styles.favoriteIcon, styles.unclickedFavoriteIcon]
                }
              />
            </Pressable>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Similar Items</Text>
            <FlatList
              data={similar}
              contentContainerStyle={{ marginTop: 6 }}
              keyExtractor={item => item.id}
              horizontal
              renderItem={({ item }) => {
                if (item.id === product.id) {
                  return null;
                } else {
                  return (
                    <ProductItem
                      cartItems={items}
                      item={item}
                      onItemPress={() => {
                        setProduct(item);
                      }}
                    />
                  );
                }
              }}
            />
          </View>
          <View style={[styles.sectionContainer, { height: 200 }]}>
            <Text style={styles.sectionTitle}>
              Reviews {reviews ? `(${reviews.length})` : ''}
            </Text>
            <FlatList
              data={reviews}
              contentContainerStyle={{ paddingVertical: 12 }}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    marginVertical: 12,
                    width: '85%',
                    backgroundColor: 'rgba(0 ,0, 0, 0.1)',
                    height: 1,
                    alignSelf: 'flex-end',
                  }}
                />
              )}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      paddingHorizontal: 12,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          flex: 1,
                          fontSize: 14,
                          fontFamily: fonts.REGULAR,
                          fontStyle: 'italic',
                        }}>
                        {item.username ? item.username : 'Anonymous'}
                      </Text>
                      <AirbnbRating
                        count={5}
                        defaultRating={item.rating}
                        selectedColor={'#FF9B3F'}
                        isDisabled={true}
                        showRating={false}
                        size={12}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        alignSelf: 'flex-start',
                        color: 'gray',
                        marginTop: 2,
                        fontStyle: item.comment ? 'normal' : 'italic',
                      }}>
                      {item.comment ? item.comment : 'No comment'}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View style={styles.priceContainer}>
          <Text
            style={[
              styles.priceText,
              product.discount > 0
                ? styles.discountPriceColor
                : styles.normalPriceColor,
            ]}>
            {product.discount > 0
              ? `Rs. ${calculateDiscount(product.discount, product.price)}`
              : `Rs. ${product.price} / ${product.unit}`}
          </Text>
          {product.discount > 0 && (
            <Text style={styles.withoutDiscountPrice}>
              Rs.{product.price} / {product.unit}
            </Text>
          )}
        </View>
        <View style={styles.quantityContainer}>
          {searchCartItem(product.id) ? (
            <View style={styles.selectionContainer}>
              <Pressable
                style={styles.decrementContainer}
                onPress={onDecrement}>
                <Image source={icons.MINUS} style={styles.quantityIcon} />
              </Pressable>
              <Text style={styles.quantityText}>
                {getQuantity(items, product.id)}
              </Text>
              <Pressable
                style={styles.incrementContainer}
                onPress={onIncrement}>
                <Image source={icons.ADD} style={styles.quantityIcon} />
              </Pressable>
            </View>
          ) : (
            <Pressable onPress={onCartUpdate} style={styles.addToCartContainer}>
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
