import firestore from '@react-native-firebase/firestore';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import {colors, icons, routes} from '../../shared/constants';
import {emptyCart} from '../../store/reducers/cart';
import styles from './styles';
import validation from './validations';

const inputTheme = {
  mode: 'exact',
  colors: {
    placeholder: 'gray',
    background: 'transparent',
    text: 'black',
    primary: colors.DARK_BLUE,
    error: 'darkred',
  },
  roundness: 6,
};

export default function CheckoutScreen({navigation, route}) {
  const dispatch = useDispatch();
  const {subtotal} = route.params;
  const {items} = useSelector(state => state.root.cart);
  const {user} = useSelector(state => state.root.user);

  const [loading, setLoading] = useState(false);

  async function onPlaceOrder(values) {
    try {
      setLoading(true);
      const model = {
        ...values,
        createdAt: firestore.FieldValue.serverTimestamp(),
        status: 'confirmation',
        placedBy: user ? user.id : null,
        total: subtotal > 500 ? subtotal : subtotal + 30,
        delivery_charges: subtotal > 500 ? false : true,
        totalItems: items.length,
      };
      const orderRef = firestore().collection('Orders');
      const {id} = await orderRef.add(model);
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Pressable
          onPress={() => navigation.pop()}
          style={{
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={icons.BACK}
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
            }}
          />
        </Pressable>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>
      <View style={styles.headContainer}>
        <View style={styles.headerDetail}>
          <Text style={{fontWeight: '300'}}>Total Items</Text>
          <Text>x{items.length}</Text>
        </View>
        <Divider />
        <View style={styles.headerDetail}>
          <Text style={{fontWeight: '300'}}>Subtotal</Text>
          <Text>Rs. {subtotal}</Text>
        </View>
        <Divider />
        <View style={styles.headerDetail}>
          <Text style={{fontWeight: '300'}}>Delivery Fees</Text>
          <Text>{subtotal > 500 ? 'Free' : 'Rs. 30'}</Text>
        </View>
        <Divider />
        <View style={styles.headerDetail}>
          <Text style={{fontWeight: '300', fontSize: 12, color: 'gray'}}>
            Taxes are included within the price
          </Text>
        </View>
      </View>
      <View style={styles.totalAmountContainer}>
        <Text style={styles.total}>Total</Text>
        <Text style={styles.totalValue}>
          Rs. {subtotal > 500 ? subtotal : subtotal + 30}
        </Text>
      </View>
      <Formik
        initialValues={{
          name: user ? user.name : '',
          email: user ? user.email : '',
          phone: user ? user.phone : '',
          address: user ? user.address : '',
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
          <View style={{flex: 1, marginVertical: 12}}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>
              Delivery Information
            </Text>
            <Text style={{fontSize: 12, color: 'gray', marginBottom: 12}}>
              Information regarding where to deliver your products
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                placeholder={'Name'}
                mode={'outlined'}
                spellCheck={false}
                autoCorrect={false}
                error={touched.name && errors.name}
                theme={inputTheme}
              />
              <Text style={styles.errorText}>
                {touched.name && errors.name ? errors.name : ''}
              </Text>

              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder={'Email (Optional)'}
                autoCapitalize={'none'}
                textContentType={'emailAddress'}
                mode={'outlined'}
                spellCheck={false}
                autoCorrect={false}
                theme={inputTheme}
                error={touched.email && errors.email}
              />
              <Text style={styles.errorText}>
                {touched.email && errors.email ? errors.email : ''}
              </Text>

              <TextInput
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                placeholder={'Phone'}
                mode={'outlined'}
                keyboardType={'number-pad'}
                autoCorrect={false}
                theme={inputTheme}
                error={touched.phone && errors.phone}
              />
              <Text style={styles.errorText}>
                {touched.phone && errors.phone ? errors.phone : ''}
              </Text>

              <TextInput
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
                placeholder={'Address'}
                mode={'outlined'}
                keyboardType={'default'}
                autoCorrect={false}
                theme={inputTheme}
                error={touched.address && errors.address}
              />
              <Text style={styles.errorText}>
                {touched.address && errors.address ? errors.address : ''}
              </Text>
            </View>

            <Pressable onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Place Order</Text>
            </Pressable>
          </View>
        )}
      </Formik>
      {loading && <Loader visible={loading} text={'Placing your order...'} />}
    </ScrollView>
  );
}

function Divider() {
  return (
    <View
      style={{
        width: '95%',
        alignSelf: 'center',
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        marginVertical: 6,
      }}
    />
  );
}
