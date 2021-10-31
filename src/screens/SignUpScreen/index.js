import firestore from '@react-native-firebase/firestore';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDown from '../../components/DropDown';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import { collections, icons, images, routes } from '../../shared/constants';
import towns from '../../shared/data/towns';
import User from '../../shared/models/User';
import {
  capitalize,
  formatPhone,
  getBlocks,
  getSectors,
} from '../../shared/utils';
import styles from './styles';
import validation from './validations';

// import {LoginManager, AccessToken} from 'react-native-fbsdk';

// GoogleSignin.configure({
//   webClientId:
//     '47802233773-igje6t0aguvge2pqoi7srp418sqiqthn.apps.googleusercontent.com',
// });

// async function onGoogleButtonPress() {
//   // Get the users ID token
//   const {idToken} = await GoogleSignin.signIn();

//   // Create a Google credential with the token
//   const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//   // Sign-in the user with the credential
//   return auth().signInWithCredential(googleCredential);
// }

const initialValues = {
  name: '',
  phone: '',
  house: '',
};

export default function SignUpScreen({ navigation }) {
  // const dispatch = useDispatch();

  const [areasOpen, setAreasOpen] = useState(false);
  const [area, setArea] = useState(null);
  const [areas, setAreas] = useState(towns);

  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [sector, setSector] = useState(null);
  const [sectors, setSectors] = useState([]);

  const [blocksOpen, setBlocksOpen] = useState(false);
  const [block, setBlock] = useState(null);
  const [blocks, setBlocks] = useState([]);

  const [loading, setLoading] = useState(false);

  async function validateUser(phone) {
    try {
      const { size } = await firestore()
        .collection(collections.USERS)
        .where('contact.local', '==', phone)
        .get();
      return size > 0;
    } catch (err) {
      console.error(err);
    }
  }

  async function onSignUp({ name, phone, house }, actions) {
    try {
      if (!area) {
        Alert.alert('Select an Area');
        return;
      }

      if (!sector && !block) {
        Alert.alert('Select a Sector');
        return;
      }

      if (!block) {
        Alert.alert('Select a Block');
        return;
      }

      setLoading(true);
      const isUserAvailable = await validateUser(phone);
      if (isUserAvailable) {
        actions.setFieldError('phone', 'Already a member, kindly login');
        return;
      }

      const address = `${house}, ${capitalize(block, '-')},${
        sector ? ` ${capitalize(sector, '_')},` : ''
      } ${capitalize(area, '-')}, Lahore, Punjab, Pakistan`;

      const model = {
        name,
        gender: null,
        contact: {
          local: phone,
          international: formatPhone(phone),
          country: 'PK',
          code: '+92',
        },
        address: {
          area,
          sector,
          block,
          house,
          complete: address,
          type: 'default',
        },
      };
      const user = new User(model);
      navigation.navigate(routes.REGISTER_VERIFY_SCREEN, { user });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.scrollViewStyle}>
      <Header
        navigation={navigation}
        title={'Register'}
        placement={'center'}
        backNavStyle={styles.headerBackNavStyle}
      />
      <KeyboardAwareScrollView>
        <Formik
          initialValues={initialValues}
          onSubmit={onSignUp}
          validationSchema={validation}>
          {({
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
            handleSubmit,
          }) => (
            <View style={styles.inputContainer}>
              <Image
                style={{ width: '100%', height: 200, resizeMode: 'contain' }}
                source={images.WELCOME}
              />

              {/* Name */}
              <View style={styles.inputContentContainer}>
                <Image source={icons.PERSON} style={styles.inputIconStyle} />
                <TextInput
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  placeholder={'Full Name'}
                  placeholderTextColor={'gray'}
                  style={styles.inputStyle}
                  spellCheck={false}
                  autoCorrect={false}
                  maxLength={40}
                />
              </View>
              <Text style={styles.errorText}>
                {touched.name && errors.name ? errors.name : ''}
              </Text>

              {/* Phone Number */}
              <View style={styles.inputContentContainer}>
                <Image source={icons.PHONE} style={styles.inputIconStyle} />
                <TextInput
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  placeholder={'03XX XXX XX XX'}
                  placeholderTextColor={'gray'}
                  style={styles.inputStyle}
                  spellCheck={false}
                  autoCorrect={false}
                  maxLength={40}
                  keyboardType={'number-pad'}
                />
              </View>
              <Text style={styles.errorText}>
                {touched.phone && errors.phone ? errors.phone : ''}
              </Text>

              <Text style={styles.headerText}>Delivery Address</Text>

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
                    onChangeValue={value => setBlocks(getBlocks(area, value))}
                  />
                </>
              )}

              {blocks && blocks.length > 0 && (
                <>
                  <View style={styles.bottomDivider} />
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

              <View style={styles.maxBottomDivider} />

              <View style={styles.inputContentContainer}>
                <Image
                  source={icons.HOME_NUMBER}
                  style={styles.inputIconStyle}
                />
                <TextInput
                  disabled={true}
                  onChangeText={handleChange('house')}
                  onBlur={handleBlur('house')}
                  value={values.house}
                  placeholder={'House Number'}
                  placeholderTextColor={'gray'}
                  style={styles.inputStyle}
                  spellCheck={false}
                  autoCorrect={false}
                  maxLength={40}
                  keyboardType={'default'}
                />
              </View>
              <Text style={styles.errorText}>
                {touched.house && errors.house ? errors.house : ''}
              </Text>

              <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.registerButton}>Register</Text>
              </Pressable>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
      {loading && (
        <Loader visible={loading} text={'Registering your account...'} />
      )}
    </ScrollView>
  );
}
