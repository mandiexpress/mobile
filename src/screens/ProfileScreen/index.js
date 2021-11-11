import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Linking,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import { fonts, icons, routes } from '../../shared/constants';
import { fetchInfo, logout } from '../../store/reducers/user';

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(state => state.root.user);

  const items = [
    {
      icon: icons.EDIT,
      title: 'Edit Profile',
      subtitle: 'Update your profile',
      onPress: () => navigation.navigate(routes.EDIT_PROFILE_SCREEN),
    },
    {
      icon: icons.ADDRESS,
      title: 'Address Management',
      subtitle: 'Locations you want us to devliver',
      onPress: () => navigation.navigate(routes.LIST_ADDRESS_SCREEN),
    },
    {
      icon: icons.ORDER,
      title: 'My Orders',
      subtitle: 'Track your orders',
      onPress: () => navigation.navigate(routes.ORDER_SCREEN),
    },
    {
      icon: icons.LIKE,
      title: 'Favorite Items',
      subtitle: 'All your favorite items in a single place',
      onPress: () => navigation.navigate(routes.FAVORITE_LIST),
    },
    {
      icon: icons.STATISTICS,
      title: 'Statistics',
      subtitle: 'Know your statistics',
      onPress: () => navigation.navigate(routes.STATISTICS_SCREEN),
    },
    {
      icon: icons.TERMS_AND_CONDITIONS,
      title: 'Terms and Conditions',
      subtitle: 'What and how Mandii Express operates',
      onPress: () => navigation.navigate(routes.TERMS_AND_CONDITIONS),
    },
    {
      icon: icons.PRIVACY_POLICY,
      title: 'Privacy Policy',
      subtitle: 'How your data is secured with us',
      onPress: () => navigation.navigate(routes.PRIVACY_POLICY),
    },
  ];

  async function onLogout() {
    try {
      setLoading(true);
      await auth().signOut();
      dispatch(logout());
      navigation.pop();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(true);
    }
  }

  function onLogoutPressed() {
    const title = 'Logout';
    const message = 'Are you sure, you want to logout?';
    const yes = {
      text: 'Yes',
      onPress: onLogout,
      style: 'destructive',
    };
    const cancel = {
      text: 'Cancel',
      style: 'cancel',
    };
    Alert.alert(title, message, [cancel, yes], { cancelable: true });
  }

  async function onRefresh() {
    try {
      setRefreshing(true);
      await dispatch(fetchInfo(user.id)).unwrap();
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  }

  if (!user) {
    return <></>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Header
        navigation={navigation}
        title={'Profile'}
        rightComponent={
          <Pressable
            onPress={onLogoutPressed}
            style={{
              height: 40,
              width: 40,
              marginEnd: 12,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{ height: 24, width: 24, resizeMode: 'contain' }}
              source={icons.LOG_OUT}
            />
          </Pressable>
        }
      />
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 16, backgroundColor: 'white' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 12,
          }}>
          <Image
            source={
              user.image ? { uri: user.image } : icons.DEFAULT_PROFILE_IMAGE
            }
            style={{
              height: 85,
              width: 85,
              borderRadius: 100,
              borderColor: 'rgba(0, 0, 0, 0.05)',
              borderWidth: 2,
            }}
          />
          <View
            style={{
              flex: 1,
              marginHorizontal: 12,
              justifyContent: 'space-evenly',
            }}>
            <Text
              style={{ fontFamily: fonts.BOLD, fontSize: 18, color: 'black' }}>
              {user.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontFamily: fonts.REGULAR,
              }}>
              {user.contact.international}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontFamily: fonts.REGULAR,
              }}>
              {user.address}
            </Text>
          </View>
        </View>
        <FlatList
          keyExtractor={(_, index) => `_${index}`}
          data={items}
          renderItem={({ item, index }) => {
            return (
              <SectionItem
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                onPress={item.onPress}
                lastItem={index === items.length - 1}
              />
            );
          }}
        />
      </ScrollView>
      <Pressable
        onPress={() => Linking.openURL('http://devden.org/')}
        style={{
          marginTop: 18,
          justifyContent: 'flex-end',
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 12,
            fontFamily: fonts.REGULAR,
            color: 'gray',
          }}>
          Powered by DevDen
        </Text>
      </Pressable>
      {loading && <Loader visible={loading} text={'Logging out'} />}
    </SafeAreaView>
  );
}

function SectionItem({ icon, title, subtitle, lastItem = false, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        flex: 1,
        paddingVertical: 18,
        borderBottomColor: 'rgba(0, 0, 0, 0.05)',
        borderBottomWidth: lastItem ? 0 : 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={icon}
        style={{
          height: 24,
          width: 24,
          marginHorizontal: 12,
          resizeMode: 'contain',
        }}
      />
      <View style={{ flex: 1, paddingHorizontal: 12 }}>
        <Text
          style={{
            fontFamily: fonts.BOLD,
            fontSize: 16,
          }}>
          {title}
        </Text>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 12,
            color: 'gray',
            fontFamily: fonts.REGULAR,
          }}>
          {subtitle}
        </Text>
      </View>
      <Image
        source={icons.NEXT_ARROW}
        style={{
          height: 16,
          width: 16,
          resizeMode: 'contain',
          opacity: 0.2,
          tintColor: 'black',
          marginEnd: 12,
        }}
      />
    </Pressable>
  );
}
