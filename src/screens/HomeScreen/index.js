import auth from '@react-native-firebase/auth';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Image } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import HorizontalDivider from '../../components/HorizontalDivider';
import { globalStyles, icons } from '../../shared/constants';
import { calculateDiscount, calculateSavePrice } from '../../shared/utils';
import { addToCart, removeFromCart } from '../../store/reducers/cart';
import {
  fetchCategories,
  fetchDiscountItems,
  fetchLatestProducts,
  fetchPromotions,
} from './api';
import {
  categoryListItemStyle,
  promotionsListItemStyle,
  screen,
  sectionHeaderStyles,
  productListStyle,
} from './styles';

export default function HomeScreen({ navigation }) {
  const [productList, setProductList] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [discountItems, setDiscountItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const { items } = useSelector(state => state.root.cart);

  function onLogout() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  async function getLatestProducts() {
    try {
      const result = await fetchLatestProducts();
      console.log(result);
      setProductList(result);
    } catch (err) {
      console.error(err);
    }
  }

  async function getPromotions() {
    try {
      const result = await fetchPromotions();
      setPromotions(result);
    } catch (err) {
      console.error(err);
    }
  }

  async function getCategories() {
    try {
      const result = await fetchCategories();
      setCategories(result);
    } catch (err) {
      console.error(err);
    }
  }

  async function getDiscountItems() {
    try {
      const result = await fetchDiscountItems();
      setDiscountItems(result);
    } catch (err) {
      console.error(err);
    }
  }

  async function onRefresh() {
    try {
      setRefreshing(true);
      await getPromotions();
      await getCategories();
      await getDiscountItems();
      await getLatestProducts();
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    getPromotions();
    getCategories();
    getDiscountItems();
    getLatestProducts();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={screen.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {/* App Name */}
      <Text style={screen.appName}>Mandii Express</Text>

      {/* Promotions */}
      <View style={screen.sectionContainer}>
        {/* <Text style={screen.title}>PROMOTIONS / OFFERS</Text> */}
        <SectionHeader
          title={'Promotions / Offers'}
          viewMoreText={'Explore Promotions'}
        />
        <FlatList
          data={promotions}
          renderItem={_promotionRenderItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          horizontal={true}
          ItemSeparatorComponent={() => (
            <View style={promotionsListItemStyle.divider} />
          )}
        />
      </View>

      {/* Categories */}
      <View style={screen.sectionContainer}>
        <SectionHeader
          title={'Shop by Category'}
          viewMoreText={'Explore Categories'}
        />
        <FlatList
          data={categories}
          renderItem={_categoryRenderItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          horizontal={true}
          ItemSeparatorComponent={() => (
            <View style={categoryListItemStyle.divider} />
          )}
          ListFooterComponent={_categoryFooter}
        />
      </View>

      {/* Discount Items */}
      <View style={screen.sectionContainer}>
        <SectionHeader
          title={'Items on Discount'}
          viewMoreText={'Explore More'}
        />
        <FlatList
          data={discountItems}
          renderItem={({ item }) => (
            <ProductItem item={item} cartItems={items} />
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          horizontal={true}
          ItemSeparatorComponent={() => (
            <View style={{ marginHorizontal: 6 }} />
          )}
        />
      </View>

      {/* Discount Items */}
      <View style={screen.sectionContainer}>
        <SectionHeader title={'new Arrivals'} viewMoreText={'Explore Items'} />
        <FlatList
          data={productList}
          renderItem={({ item }) => (
            <ProductItem item={item} cartItems={items} />
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          horizontal={true}
          ItemSeparatorComponent={() => (
            <View style={{ marginHorizontal: 6 }} />
          )}
        />
      </View>
    </ScrollView>
  );
}

function _promotionRenderItem({ item }) {
  return (
    <Pressable style={promotionsListItemStyle.container}>
      <Image
        source={{ uri: item.image }}
        resizeMethod={'auto'}
        resizeMode={'contain'}
        style={promotionsListItemStyle.image}
      />
      <View style={promotionsListItemStyle.detailContainer}>
        <View style={promotionsListItemStyle.textContainer}>
          <Text style={promotionsListItemStyle.title}>{item.title.en}</Text>
          <Text style={promotionsListItemStyle.validity}>
            Valid till{' '}
            {dayjs(item.validTill.toDate()).format(globalStyles.dateTimeFormat)}
          </Text>
        </View>
        <Image source={icons.BACK} style={promotionsListItemStyle.nextIcon} />
      </View>
    </Pressable>
  );
}

function _categoryRenderItem({ item }) {
  return (
    <View>
      <Image
        source={{ uri: item.image }}
        resizeMethod={'auto'}
        resizeMode={'contain'}
        style={categoryListItemStyle.image}
      />
      <Text style={categoryListItemStyle.title}>{item.english}</Text>
      <Text style={categoryListItemStyle.discount}>{item.items} Items</Text>
    </View>
  );
}

function _categoryFooter() {
  return (
    <View style={categoryListItemStyle.footerContainer}>
      <Image source={icons.BACK} style={categoryListItemStyle.nextIcon} />
      <Text style={categoryListItemStyle.moreText}>MORE</Text>
    </View>
  );
}

function ProductItem({ item, cartItems }) {
  const dispatch = useDispatch();
  const isAvailable = cartItems.find(cartItem => cartItem.id === item.id);

  function onCartUpdate() {
    if (isAvailable) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(addToCart({ ...item, quantity: 1, subtotal: item.price }));
    }
  }

  return (
    <View style={productListStyle.container}>
      <Image
        source={{ uri: item.image }}
        resizeMethod={'auto'}
        resizeMode={'contain'}
        style={productListStyle.image}
      />
      {item.discount > 0 && (
        <View style={productListStyle.discountContainer}>
          <Text style={productListStyle.discount}>{item.discount}% off</Text>
        </View>
      )}
      <Text style={productListStyle.title}>{item.title}</Text>
      <View style={productListStyle.priceContainer}>
        {item.discount > 0 && (
          <Text style={productListStyle.discountedPrice}>
            Rs.{calculateDiscount(item.discount, item.price)}
          </Text>
        )}
        <Text
          style={
            item.discount > 0
              ? productListStyle.price
              : productListStyle.withoutDiscountPrice
          }>
          Rs.{item.price}
        </Text>
      </View>
      <HorizontalDivider />
      <Text style={productListStyle.saved}>
        {item.discount > 0
          ? `You save Rs.${calculateSavePrice(
              item.discount,
              item.price,
            ).toFixed(2)}`
          : ''}
      </Text>
      <Pressable
        onPress={onCartUpdate}
        style={[
          productListStyle.addToCartContainer,
          isAvailable
            ? productListStyle.cartIncludedItemBG
            : productListStyle.cartExcludedItemBG,
        ]}>
        <Text style={productListStyle.addToCartText}>
          {isAvailable ? 'Remove from Cart' : 'Add to Cart'}
        </Text>
      </Pressable>
    </View>
  );
}

function SectionHeader({ title, viewMoreText, onPress }) {
  return (
    <View style={sectionHeaderStyles.container}>
      <Text style={sectionHeaderStyles.title}>{title}</Text>
      <Pressable onPress={onPress}>
        <Text style={sectionHeaderStyles.viewMoreText}>{viewMoreText}</Text>
      </Pressable>
    </View>
  );
}
