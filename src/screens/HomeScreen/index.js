import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import CategoryList from '../../components/CategoryList';
import DiscountItemList from '../../components/DiscountItemList';
import Header from '../../components/Header';
import NewArrivalList from '../../components/NewArrivalList';
import PromotionList from '../../components/PromotionList';
import {
  fetchCategories,
  fetchDiscountItems,
  fetchLatestProducts,
  fetchPromotions,
} from '../../shared/api';
import { icons, routes } from '../../shared/constants';
import { getInitials } from '../../shared/utils';
import styles from './styles';

export default function HomeScreen({ navigation }) {
  const [promotions, setPromotions] = useState(null);
  const [categories, setCategories] = useState(null);
  const [productList, setProductList] = useState(null);
  const [discountItems, setDiscountItems] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const { items } = useSelector(state => state.root.cart);
  const { user } = useSelector(state => state.root.user);

  function onProfilePress() {
    if (user) {
      navigation.navigate(routes.PROFILE_SCREEN);
    } else {
      navigation.navigate(routes.LOGIN_SCREEN);
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

  async function getLatestProducts() {
    try {
      const result = await fetchLatestProducts();
      setProductList(result);
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
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <Header
        navigation={navigation}
        title={'Mandii Express'}
        leftComponent={false}
        titleStyle={styles.headerTitleStyle}
        rightComponent={
          <AuthContainer user={user} onProfilePress={onProfilePress} />
        }
      />
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Promotions */}
        <PromotionList navigation={navigation} promotions={promotions} />

        <View style={styles.divider} />

        {/* Categories */}
        <CategoryList navigation={navigation} categories={categories} />

        {/* Discount Items */}
        <DiscountItemList
          cartItems={items}
          discountItems={discountItems}
          navigation={navigation}
          onItemPress={item => {
            navigation.navigate(routes.ITEM_DETAIL_SCREEN, item);
          }}
        />

        {/* New Arrivals */}
        <NewArrivalList
          cartItems={items}
          navigation={navigation}
          productList={productList}
          onItemPress={item => {
            navigation.navigate(routes.ITEM_DETAIL_SCREEN, item);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function AuthContainer({ user, onProfilePress }) {
  if (user) {
    return (
      <ProfileImage
        image={user.image}
        title={getInitials(user.name)}
        onPress={onProfilePress}
      />
    );
  } else {
    return (
      <Pressable onPress={onProfilePress} style={styles.authContainer}>
        <Image source={icons.PROFILE} style={styles.profileImage} />
      </Pressable>
    );
  }
}

function ProfileImage({ image, title, onPress }) {
  if (image) {
    return (
      <Avatar
        rounded
        source={{ uri: image }}
        size={'small'}
        onPress={onPress}
        containerStyle={styles.avatarContainerStyle}
      />
    );
  } else {
    return (
      <Avatar
        rounded
        title={title}
        size={'small'}
        onPress={onPress}
        containerStyle={styles.avatarContainerStyle}
        titleStyle={styles.avatarTitleStyle}
      />
    );
  }
}
