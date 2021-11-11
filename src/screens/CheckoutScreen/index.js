import firestore from '@react-native-firebase/firestore';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DataTable, Modal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from '../../components/DropDown';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import { colors, fonts, icons, images, routes } from '../../shared/constants';
import towns from '../../shared/data/towns';
import { capitalize, getBlocks, getSectors } from '../../shared/utils';
import styles from './styles';
import validation from './validations';
import { emptyCart } from '../../store/reducers/cart';
import DialogBox from '../../components/DialogBox';

export default function CheckoutScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { subtotal } = route.params;
  const { items } = useSelector(state => state.root.cart);
  const { user, isLoggedIn } = useSelector(state => state.root.user);

  const [authModal, setAuthModal] = useState(false);

  // Areas
  const [areasOpen, setAreasOpen] = useState(false);
  const [area, setArea] = useState(user ? user.address.area : null);
  const [areas, setAreas] = useState(towns);

  // Sectors
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [sector, setSector] = useState(user ? user.address.sector : null);
  const [sectors, setSectors] = useState(
    user ? getSectors(user.address.area) : [],
  );

  // Blocks
  const [blocksOpen, setBlocksOpen] = useState(false);
  const [block, setBlock] = useState(user ? user.address.block : null);
  const [blocks, setBlocks] = useState(
    user ? getBlocks(user.address.area, user.address.sector) : [],
  );

  const fullNameInput = useRef();
  const phoneNumberInput = useRef();

  const [loading, setLoading] = useState(false);
  const [listAddress, setListAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  async function USERS_ALL_ADDRESS() {
    let result = [];
    let data = await firestore()
      .collection('Users')
      .doc(user.id)
      .collection('addresses')
      .get();
    let temp;
    for (var i of data._docs) {
      temp = i.data();
      temp['id'] = i.id;
      result.push(temp);
    }
    setListAddress(result);
  }

  useEffect(() => {
    USERS_ALL_ADDRESS();
  }, []);

  async function onPlaceOrder({ name, phone, house }) {
    try {
      if (!isLoggedIn) {
        setAuthModal(true);
        return;
      }
      console.log(name, phone, house, area);
      if (!area) {
        Alert.alert('Select an Area');
        return;
      }

      if (
        area === 'model-town' ||
        area === 'valencia' ||
        area === 'iqbal-town'
      ) {
        if (!block) {
          Alert.alert('Select a Block');
          return;
        }
      } else if (!sector) {
        Alert.alert('Select a Sector');
        return;
      }

      setLoading(true);

      const address = `${house}, ${capitalize(block, '-')},${
        sector ? ` ${capitalize(sector, '_')},` : ''
      } ${capitalize(area, '-')}, Lahore, Punjab, Pakistan`;

      const model = {
        name,
        phone,
        createdAt: firestore.FieldValue.serverTimestamp(),
        status: 'confirmation',
        placedBy: user ? user.id : null,
        total: subtotal > 500 ? subtotal : subtotal + 30,
        subtotal,
        address: {
          area,
          sector,
          block,
          house,
          complete: address,
        },
        delivery_charges: subtotal > 500 ? false : true,
        totalItems: items.length,
      };
      const orderRef = firestore().collection('Orders');
      const { id } = await orderRef.add(model);
      for (const item of items) {
        await orderRef.doc(id).collection('Items').add(item);
      }
      dispatch(emptyCart());
      navigation.pop();
      navigation.navigate(routes.ORDER_SCREEN);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  console.log(area);

  return (
    <>
      <KeyboardAwareScrollView>
        <Header navigation={navigation} title={'Checkout'} />
        <View style={{ padding: 18 }}>
          <DataTable style={{ backgroundColor: 'white', borderRadius: 6 }}>
            <DataTable.Row>
              <DataTable.Cell>
                <Text style={{ fontFamily: fonts.REGULAR }}>Items</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ justifyContent: 'flex-end' }}>
                <Text style={{ fontFamily: fonts.REGULAR }}>
                  x{items.length}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>
                <Text style={{ fontFamily: fonts.REGULAR }}>Subtotal</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ justifyContent: 'flex-end' }}>
                <Text style={{ fontFamily: fonts.REGULAR }}>
                  x{items.length}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>
                <Text style={{ fontFamily: fonts.REGULAR }}>
                  Delivery Charges
                </Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ justifyContent: 'flex-end' }}>
                <Text style={{ fontFamily: fonts.REGULAR }}>
                  {subtotal > 500 ? 'Free' : 'Rs.30'}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row
              style={{
                backgroundColor: colors.DARK_BLUE,
                borderBottomEndRadius: 6,
                borderBottomStartRadius: 6,
              }}>
              <DataTable.Cell>
                <Text
                  style={{
                    fontFamily: fonts.BOLD,
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  Total
                </Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ justifyContent: 'flex-end' }}>
                <Text
                  style={{
                    fontFamily: fonts.BOLD,
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  Rs. {subtotal > 500 ? subtotal : subtotal + 30}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
          <Text
            style={{
              fontSize: 12,
              fontStyle: 'italic',
              color: 'gray',
              marginTop: 6,
            }}>
            Taxes are included within the price
          </Text>

          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              height: 1,
              backgroundColor: colors.DARK_BLUE,
              opacity: 0.1,
              marginTop: 12,
            }}
          />

          {user ? (
            <View style={{ flex: 1, marginVertical: 12 }}>
              <Text style={{ fontSize: 21, fontWeight: 'bold' }}>
                Delivery Information
              </Text>
              <Text style={{ fontSize: 12, color: 'gray', marginBottom: 12 }}>
                Information regarding where to deliver your products
              </Text>
              <View style={styles.inputContainer}>
                <View
                  style={[
                    {
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      backgroundColor: 'white',
                      borderTopEndRadius: 4,
                      borderTopStartRadius: 4,
                      marginVertical: 14,
                    },
                    styles.normalUnderline,
                  ]}>
                  <Image
                    style={{
                      width: 18,
                      height: 18,
                      resizeMode: 'contain',
                      alignSelf: 'center',
                      marginStart: 8,
                      tintColor: colors.DARK_BLUE,
                    }}
                    source={icons.PERSON}
                  />
                  <TextInput
                    ref={fullNameInput}
                    // onChangeText={handleChange('name')}
                    // onBlur={handleBlur('name')}
                    value={user.name}
                    editable={false}
                    placeholder={'Full Name'}
                    returnKeyType={'next'}
                    placeholderTextColor={'gray'}
                    style={[styles.textInputStyle]}
                    onSubmitEditing={() => phoneNumberInput.current.focus()}
                    spellCheck={false}
                    autoCorrect={false}
                    maxLength={40}
                    keyboardType={'default'}
                  />
                </View>

                <View
                  style={[
                    {
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      backgroundColor: 'white',
                      borderTopEndRadius: 4,
                      borderTopStartRadius: 4,
                      marginBottom: 14,
                    },
                    styles.normalUnderline,
                  ]}>
                  <Image
                    style={{
                      width: 18,
                      height: 18,
                      resizeMode: 'contain',
                      alignSelf: 'center',
                      marginStart: 8,
                      tintColor: colors.DARK_BLUE,
                    }}
                    source={icons.PHONE}
                  />
                  <TextInput
                    ref={phoneNumberInput}
                    // onChangeText={handleChange('phone')}
                    // onBlur={handleBlur('phone')}
                    value={user.contact.local}
                    editable={false}
                    placeholder={'Phone number'}
                    placeholderTextColor={'gray'}
                    style={[styles.textInputStyle, styles.normalUnderline]}
                    spellCheck={false}
                    autoCorrect={false}
                    maxLength={40}
                    keyboardType={'number-pad'}
                  />
                </View>

                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginBottom: 12,
                  }}>
                  Address Information
                </Text>
                <FlatList
                  data={listAddress}
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
                      <Text
                        style={{
                          width: selectedAddress
                            ? selectedAddress.id === item.id
                              ? '100%'
                              : '60%'
                            : '60%',
                        }}>
                        {item.complete}
                      </Text>
                      {selectedAddress ? (
                        selectedAddress.id === item.id ? null : (
                          <Pressable
                            style={[styles.button, { flexGrow: 1 }]}
                            onPress={() => {
                              setSelectedAddress(item);
                            }}>
                            <Text style={styles.buttonText}>SELECT</Text>
                          </Pressable>
                        )
                      ) : (
                        <Pressable
                          style={[styles.button, { flexGrow: 1 }]}
                          onPress={() => {
                            setSelectedAddress(item);
                          }}>
                          <Text style={styles.buttonText}>SELECT</Text>
                        </Pressable>
                      )}
                    </View>
                  )}
                />
              </View>
              <Pressable
                onPress={() => {
                  let data = {
                    name: user.name,
                    phone: user.contact.local,
                    house: selectedAddress.house,
                  };
                  console.log(selectedAddress.area);
                  setArea(selectedAddress.area);
                  setBlock(selectedAddress.block);
                  setSector(selectedAddress.sector);
                  onPlaceOrder(data);
                }}
                style={styles.button}>
                <Text style={styles.buttonText}>Place Order</Text>
              </Pressable>
            </View>
          ) : (
            <Formik
              initialValues={{
                name: '',
                phone: '',
                house: '',
              }}
              onSubmit={onPlaceOrder}
              validationSchema={validation}>
              {({
                handleChange,
                handleBlur,
                values,
                touched,
                errors,
                handleSubmit,
              }) => (
                <View style={{ flex: 1, marginVertical: 12 }}>
                  <Text style={{ fontSize: 21, fontWeight: 'bold' }}>
                    Delivery Information
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: 'gray', marginBottom: 12 }}>
                    Information regarding where to deliver your products
                  </Text>
                  <View style={styles.inputContainer}>
                    <View
                      style={[
                        {
                          flexDirection: 'row',
                          borderBottomWidth: 1,
                          backgroundColor: 'white',
                          borderTopEndRadius: 4,
                          borderTopStartRadius: 4,
                        },
                        touched.name && errors.name
                          ? styles.errorUnderline
                          : styles.normalUnderline,
                      ]}>
                      <Image
                        style={{
                          width: 18,
                          height: 18,
                          resizeMode: 'contain',
                          alignSelf: 'center',
                          marginStart: 8,
                          tintColor: colors.DARK_BLUE,
                        }}
                        source={icons.PERSON}
                      />
                      <TextInput
                        ref={fullNameInput}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        placeholder={'Full Name'}
                        returnKeyType={'next'}
                        placeholderTextColor={'gray'}
                        style={[styles.textInputStyle]}
                        onSubmitEditing={() => phoneNumberInput.current.focus()}
                        spellCheck={false}
                        autoCorrect={false}
                        maxLength={40}
                        keyboardType={'default'}
                      />
                    </View>
                    <Text style={styles.errorText}>
                      {touched.name && errors.name ? errors.name : ''}
                    </Text>

                    <View
                      style={[
                        {
                          flexDirection: 'row',
                          borderBottomWidth: 1,
                          backgroundColor: 'white',
                          borderTopEndRadius: 4,
                          borderTopStartRadius: 4,
                        },
                        touched.name && errors.name
                          ? styles.errorUnderline
                          : styles.normalUnderline,
                      ]}>
                      <Image
                        style={{
                          width: 18,
                          height: 18,
                          resizeMode: 'contain',
                          alignSelf: 'center',
                          marginStart: 8,
                          tintColor: colors.DARK_BLUE,
                        }}
                        source={icons.PHONE}
                      />
                      <TextInput
                        ref={phoneNumberInput}
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        value={values.phone}
                        placeholder={'Phone number'}
                        placeholderTextColor={'gray'}
                        style={[
                          styles.textInputStyle,
                          touched.phone && errors.phone
                            ? styles.errorUnderline
                            : styles.normalUnderline,
                        ]}
                        spellCheck={false}
                        autoCorrect={false}
                        maxLength={40}
                        keyboardType={'number-pad'}
                      />
                    </View>
                    <Text style={styles.errorText}>
                      {touched.phone && errors.phone ? errors.phone : ''}
                    </Text>

                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginBottom: 12,
                      }}>
                      Address Information
                    </Text>

                    {/* Area Selection */}
                    <DropDown
                      open={areasOpen}
                      value={area}
                      items={areas}
                      setOpen={setAreasOpen}
                      setValue={setArea}
                      setItems={setAreas}
                      placeholder={'Select Area'}
                      zIndex={3}
                      searchPlaceholder={'Search Areas...'}
                      textStyle={styles.dropdownEnabledTextStyle}
                      onChangeValue={value => {
                        if (
                          value === 'model-town' ||
                          value === 'valencia' ||
                          value === 'iqbal-town'
                        ) {
                          console.log('Only load blocks');
                          setBlocks(getBlocks(value, null));
                        } else {
                          setSectors(getSectors(value));
                        }
                      }}
                    />

                    {/* Sector Selection */}
                    {sectors && sectors.length > 0 && (
                      <>
                        <View style={styles.divider} />
                        <DropDown
                          open={sectorsOpen}
                          value={sector}
                          items={sectors}
                          disabled={sectors && sectors.length === 0}
                          setOpen={setSectorsOpen}
                          setValue={setSector}
                          setItems={setSectors}
                          placeholder={'Select Sector'}
                          zIndex={2}
                          searchPlaceholder={'Search Areas...'}
                          textStyle={
                            sectors && sectors.length === 0
                              ? styles.dropdownDisabledTextStyle
                              : styles.dropdownEnabledTextStyle
                          }
                          onChangeValue={value =>
                            setBlocks(getBlocks(area, value))
                          }
                        />
                      </>
                    )}

                    {/* Block Selection */}
                    {blocks && (
                      <>
                        <View style={styles.divider} />
                        <DropDown
                          open={blocksOpen}
                          value={block}
                          items={blocks}
                          disabled={blocks && blocks.length === 0}
                          setOpen={setBlocksOpen}
                          setValue={setBlock}
                          setItems={setBlocks}
                          placeholder={'Select Block'}
                          zIndex={1}
                          textStyle={
                            blocks && blocks.length === 0
                              ? styles.dropdownDisabledTextStyle
                              : styles.dropdownEnabledTextStyle
                          }
                          searchPlaceholder={'Search Areas...'}
                        />
                      </>
                    )}

                    <View style={styles.bottomDivider} />

                    <View
                      style={[
                        {
                          flexDirection: 'row',
                          borderBottomWidth: 1,
                          backgroundColor: 'white',
                          borderTopEndRadius: 4,
                          borderTopStartRadius: 4,
                        },
                        touched.name && errors.name
                          ? styles.errorUnderline
                          : styles.normalUnderline,
                      ]}>
                      <Image
                        style={{
                          width: 18,
                          height: 18,
                          resizeMode: 'contain',
                          alignSelf: 'center',
                          marginStart: 8,
                          tintColor: colors.DARK_BLUE,
                        }}
                        source={icons.HOME_NUMBER}
                      />
                      <TextInput
                        onChangeText={handleChange('house')}
                        onBlur={handleBlur('house')}
                        value={values.house}
                        placeholder={'House Number'}
                        placeholderTextColor={'gray'}
                        style={[
                          styles.textInputStyle,
                          touched.house && errors.house
                            ? styles.errorUnderline
                            : styles.normalUnderline,
                        ]}
                        spellCheck={false}
                        autoCorrect={false}
                        maxLength={40}
                        keyboardType={'default'}
                      />
                    </View>
                    <Text style={styles.errorText}>
                      {touched.house && errors.house ? errors.house : ''}
                    </Text>
                  </View>
                  <Pressable onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Place Order</Text>
                  </Pressable>
                </View>
              )}
            </Formik>
          )}
        </View>
        {loading && <Loader visible={loading} text={'Placing your order...'} />}
      </KeyboardAwareScrollView>
      <DialogBox
        visibile={authModal}
        setVisibility={setAuthModal}
        image={images.AUTH}
        title={'Login Required'}
        message={
          'To place an order, kindly either login or create an account on Mandii Express'
        }
        enableLeftButton
        onLeftButtonPress={() => {
          setAuthModal(false);
          navigation.navigate(routes.REGISTRATION_SCREEN);
        }}
        leftButtonText={'Sign up'}
        enableRightButton
        onRightButtonPress={() => {
          setAuthModal(false);
          navigation.navigate(routes.LOGIN_SCREEN);
        }}
        rightButtonText={'Login'}
        onDismissButtonPress={() => setAuthModal(false)}
      />
    </>
  );
}

// function AuthModal({ visibile, setVisibility, navigation }) {
//   return (
//     <Modal
//       visible={visibile}
//       style={{ marginHorizontal: '5%' }}
//       onDismiss={() => setVisibility(false)}
//       dismissable={true}>
//       <View style={{ backgroundColor: 'white', borderRadius: 6 }}>
//         <Image
//           source={images.AUTH}
//           style={{ width: '100%', height: 200, resizeMode: 'contain' }}
//         />
//         <Text
//           style={{
//             textAlign: 'center',
//             fontSize: 16,
//             textTransform: 'uppercase',
//             fontFamily: fonts.BOLD,
//           }}>
//
//         </Text>
//         <Text
//           style={{
//             marginTop: 6,
//             marginBottom: 18,
//             marginHorizontal: 21,
//             textAlign: 'center',
//             fontSize: 12,
//             fontFamily: fonts.REGULAR,
//           }}>
//         </Text>
//         <View style={{ flexDirection: 'row' }}>
//           <Pressable
//             onPress={() => }
//             style={{
//               flex: 1,
//               paddingVertical: 12,
//               borderTopWidth: 1,
//               borderEndWidth: 1,
//               borderTopColor: colors.LIGHT_BLUE,
//               borderEndColor: colors.LIGHT_BLUE,
//               borderBottomColor: colors.LIGHT_BLUE,
//               borderBottomWidth: 1,
//             }}>
//             <Text
//               style={{
//                 color: colors.DARK_BLUE,
//                 fontFamily: fonts.BOLD,
//                 fontSize: 12,
//                 textAlign: 'center',
//                 textTransform: 'uppercase',
//               }}>
//
//             </Text>
//           </Pressable>
//           <Pressable
//             onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
//             style={{
//               flex: 1,
//               paddingVertical: 12,
//               borderTopWidth: 1,
//               borderTopColor: colors.LIGHT_BLUE,
//               borderBottomColor: colors.LIGHT_BLUE,
//               borderBottomWidth: 1,
//             }}>
//             <Text
//               style={{
//                 color: colors.DARK_BLUE,
//                 fontFamily: fonts.BOLD,
//                 fontSize: 12,
//                 textAlign: 'center',
//                 textTransform: 'uppercase',
//               }}>
//               Login
//             </Text>
//           </Pressable>
//         </View>
//         <Pressable
//           style={{ paddingVertical: 16 }}
//           onPress={() => setVisibility(false)}>
//           <Text
//             style={{
//               fontFamily: fonts.BOLD,
//               color: 'gray',
//               fontSize: 12,
//               textAlign: 'center',
//               textTransform: 'uppercase',
//             }}>
//             Cancel
//           </Text>
//         </Pressable>
//       </View>
//     </Modal>
//   );
// }
