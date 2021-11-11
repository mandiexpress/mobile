import React, { useEffect, useState } from 'react';
import {
  Text,
  SafeAreaView,
  Pressable,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import { routes } from '../../shared/constants';
import Loader from '../../components/Loader';
export default function AddressManagementScreen({ navigation }) {
  const {
    user: { id },
  } = useSelector(state => state.root.user);
  const [result, setResult] = useState([]);
  const [defaultAddressID, setDefaultAddressID] = useState('');
  const [loading, setLoading] = useState(false);

  async function USERS_ALL_ADDRESS() {
    let result = [];
    let data = await firestore()
      .collection('Users')
      .doc(id)
      .collection('addresses')
      .get();
    let temp;
    for (var i of data._docs) {
      if (i.data().isDefault) {
        setDefaultAddressID(i.id);
      }
      temp = i.data();
      temp['id'] = i.id;
      result.push(temp);
    }
    setResult(result);
  }

  useEffect(() => {
    navigation.addListener('focus', USERS_ALL_ADDRESS);
    return navigation.removeListener();
    // USERS_ALL_ADDRESS();
  }, []);
  function handleAddAddress() {
    navigation.navigate(routes.ADD_ADDRESS);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title={'Address Management'} />
      {loading && <Loader visible={loading} text={'Updating...'} />}
      <View style={{ margin: 20 }}>
        <Text>
          This screen includes addresses and allows users to enter an address
        </Text>

        <Pressable style={styles.button} onPress={handleAddAddress}>
          <Text style={styles.registerButton}>Add Address</Text>
        </Pressable>
        <FlatList
          data={result}
          keyExtractor={item => item.id}
          nestedScrollEnabled
          renderItem={({ item }) => (
            <View
              style={{
                marginVertical: 14,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{ width: item.isDefault ? '100%' : '60%' }}>
                {item.complete}
              </Text>
              {!item.isDefault && (
                <Pressable
                  style={[styles.button, { flexGrow: 1 }]}
                  onPress={async () => {
                    setLoading(true);
                    let batch = await firestore().batch();
                    let newAddress = firestore()
                      .collection('Users')
                      .doc(id)
                      .collection('addresses')
                      .doc(item.id);
                    let oldAddress = firestore()
                      .collection('Users')
                      .doc(id)
                      .collection('addresses')
                      .doc(defaultAddressID);
                    batch.update(newAddress, { isDefault: true });
                    batch.update(oldAddress, { isDefault: false });
                    await batch.commit();
                    let a = result;
                    for (var i in a) {
                      if (a[i].id === item.id) {
                        a[i].isDefault = true;
                        setDefaultAddressID(a[i].id);
                      }
                      if (a[i].id === defaultAddressID) {
                        a[i].isDefault = false;
                      }
                    }

                    setResult(a);
                    setLoading(false);
                  }}>
                  <Text style={styles.registerButton}>Set Default</Text>
                </Pressable>
              )}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
