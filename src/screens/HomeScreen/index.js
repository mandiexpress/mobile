import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import CategoryList from '../../components/CategoryList';
import DiscountItemList from '../../components/DiscountItemList';
import ItemDetailView from '../../components/ItemDetailView';
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
import { screen } from './styles';

export default function HomeScreen({ navigation }) {
  const [promotions, setPromotions] = useState(null);
  const [categories, setCategories] = useState(null);
  const [productList, setProductList] = useState(null);
  const [discountItems, setDiscountItems] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

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
    <ScrollView
      contentContainerStyle={screen.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {/* App Name */}
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
        }}>
        <Text style={screen.appName}>Mandii Express</Text>

        {user ? (
          <ProfileImage
            image={user.image}
            title={getInitials(user.name)}
            onPress={onProfilePress}
          />
        ) : (
          <Pressable
            onPress={onProfilePress}
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={icons.PROFILE}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </Pressable>
        )}
      </View>

      {/* Promotions */}
      <PromotionList navigation={navigation} promotions={promotions} />

      <View style={{ marginVertical: 6 }} />

      {/* Categories */}
      <CategoryList navigation={navigation} categories={categories} />

      {/* Discount Items */}
      <DiscountItemList
        cartItems={items}
        discountItems={discountItems}
        navigation={navigation}
        onItemPress={item => {
          setCurrentItem(item);
          setDetailModal(true);
        }}
      />

      {/* New Arrivals */}
      <NewArrivalList
        cartItems={items}
        navigation={navigation}
        productList={productList}
      />

      {currentItem && detailModal && (
        <ItemDetailView
          onRequestClose={() => setDetailModal(false)}
          visible={detailModal}
          item={currentItem}
        />
      )}
    </ScrollView>
  );
}

function ProfileImage({ image, title, onPress }) {
  if (image) {
    return (
      <Avatar
        rounded
        source={{ uri: image }}
        size={'small'}
        onPress={onPress}
      />
    );
  } else {
    return (
      <Avatar
        rounded
        title={title}
        size={'small'}
        onPress={onPress}
        containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
        titleStyle={{ color: '#212121', fontWeight: 'bold', fontSize: 12 }}
      />
    );
  }
}
