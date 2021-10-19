import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import { icons, routes } from '../../shared/constants';
import { fetchInfo, logout } from '../../store/reducers/user';

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(state => state.root.user);

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
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: 'white',
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Header
        navigation={navigation}
        title={'Profile'}
        rightComponent={
          <Pressable
            onPress={onLogoutPressed}
            style={{
              height: 40,
              width: 40,
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
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>
            {user.name}
          </Text>
          <Text style={{ fontSize: 14, color: 'black' }}>
            {user.contact.international}
          </Text>
          <Text style={{ fontSize: 14, color: 'black' }}>
            {user.address.complete}
          </Text>
        </View>
      </View>
      <View>
        <SectionItem
          icon={icons.EDIT}
          title={'Edit Profile'}
          subtitle={'Update your profile'}
          onPress={() => navigation.navigate(routes.EDIT_PROFILE_SCREEN)}
        />
        <SectionItem
          icon={icons.ORDER}
          title={'My Orders'}
          subtitle={'Track your orders'}
          onPress={() => navigation.navigate(routes.ORDER_SCREEN)}
        />
        <SectionItem
          icon={icons.STATISTICS}
          title={'Statistics'}
          subtitle={'Know your statistics'}
          onPress={() => navigation.navigate(routes.STATISTICS_SCREEN)}
        />
        <SectionItem
          icon={icons.TERMS_AND_CONDITIONS}
          title={'Terms and Conditions'}
          subtitle={'What and how Mandii Express operates'}
          onPress={() => navigation.navigate(routes.TERMS_AND_CONDITIONS)}
        />
        <SectionItem
          icon={icons.PRIVACY_POLICY}
          title={'Privacy Policy'}
          subtitle={'How your data is secured with us'}
          onPress={() => navigation.navigate(routes.PRIVACY_POLICY)}
          lastItem={true}
        />
      </View>
      {loading && <Loader visible={loading} text={'Logging out'} />}
    </ScrollView>
  );
}

function SectionItem({ icon, title, subtitle, lastItem = false, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        flex: 1,
        paddingVertical: 24,
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
          resizeMode: 'contain',
        }}
      />
      <View style={{ flex: 1, paddingHorizontal: 12 }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          {title}
        </Text>
        <Text
          style={{
            fontWeight: '600',
            fontSize: 12,
            color: 'gray',
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
          opacity: 0.1,
          tintColor: 'black',
        }}
      />
    </Pressable>
  );
}
