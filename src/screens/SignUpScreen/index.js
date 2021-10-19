import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
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
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch } from 'react-redux';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import { collections, icons, routes } from '../../shared/constants';
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
import firestore from '@react-native-firebase/firestore';

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
  houseNumber: '',
};

export default function SignUpScreen({ navigation }) {
  // const dispatch = useDispatch();

  const [areasOpen, setAreasOpen] = useState(false);
  const [area, setArea] = useState(null);
  const [areas, setAreas] = useState(towns);

  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [sector, setSector] = useState(null);
  const [sectors, setSectors] = useState(getSectors(area));

  const [blocksOpen, setBlocksOpen] = useState(false);
  const [block, setBlock] = useState(null);
  const [blocks, setBlocks] = useState(getBlocks(area, sector));

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSectors(getSectors(area));
  }, [area]);

  useEffect(() => {
    setBlocks(getBlocks(area, sector));
  }, [area, sector]);

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

  async function onSignUp({ name, phone, houseNumber }, actions) {
    try {
      if (!area) {
        Alert.alert('Select an Area');
        return;
      }

      if (!sector) {
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

      const address = `${houseNumber}, ${capitalize(block, '-')}, ${capitalize(
        sector,
        '_',
      )}, ${capitalize(area, ' ')}, Punjab, Pakistan`;

      const model = {
        name,
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
          house: houseNumber,
          complete: address,
        },
      };
      const user = new User(model);
      navigation.navigate(routes.REGISTER_VERIFY_SCREEN, { user });
    } catch (err) {
      console.log(err);
      switch (err.code) {
        case 'auth/email-already-in-use':
          actions.setFieldError('email', 'Email address is already in use!');
          break;
        case 'auth/invalid-email':
          actions.setFieldError('email', 'Invalid Email Address');
          break;
        default:
          Alert.alert('Something went wrong', 'Try again in a moment');
          break;
      }
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
            <ImageBackground
              source={icons.REGISTER_BG}
              style={styles.backgroundStyle}>
              <View style={styles.inputContainer}>
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
                <DropDownPicker
                  open={areasOpen}
                  value={area}
                  items={areas}
                  setOpen={setAreasOpen}
                  setValue={setArea}
                  setItems={setAreas}
                  placeholder={'Select Area'}
                  zIndex={3}
                  textStyle={styles.dropdownEnabledTextStyle}
                  listItemLabelStyle={styles.dropdownListItemLabelStyle}
                  listMode={'MODAL'}
                  style={styles.dropdownStyle}
                  searchContainerStyle={styles.dropdownSearchContainerStyle}
                  modalContentContainerStyle={
                    styles.dropdownModalContentContainerStyle
                  }
                  searchable={true}
                  searchPlaceholder={'Search Areas...'}
                  searchTextInputStyle={styles.dropdownSearchTextInputStyle}
                  listItemContainerStyle={styles.dropdownListItemContainerStyle}
                />

                <View style={styles.divider} />

                {/* Sector Selection */}
                <DropDownPicker
                  open={sectorsOpen}
                  value={sector}
                  items={sectors}
                  disabled={sectors && sectors.length === 0}
                  setOpen={setSectorsOpen}
                  setValue={setSector}
                  setItems={setSectors}
                  disabledItemLabelStyle={styles.disabledItemLabelStyle}
                  placeholder={'Select Sector'}
                  zIndex={2}
                  textStyle={
                    sectors && sectors.length === 0
                      ? styles.dropdownDisabledTextStyle
                      : styles.dropdownEnabledTextStyle
                  }
                  listItemLabelStyle={styles.dropdownListItemLabelStyle}
                  listMode={'MODAL'}
                  style={styles.dropdownStyle}
                  searchContainerStyle={styles.dropdownSearchContainerStyle}
                  modalContentContainerStyle={
                    styles.dropdownModalContentContainerStyle
                  }
                  searchable={true}
                  searchPlaceholder={'Search Areas...'}
                  searchTextInputStyle={styles.dropdownSearchTextInputStyle}
                  listItemContainerStyle={styles.dropdownListItemContainerStyle}
                />

                <View style={styles.bottomDivider} />

                {/* Block Selection */}
                <DropDownPicker
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
                  listItemLabelStyle={styles.dropdownListItemLabelStyle}
                  listMode={'MODAL'}
                  style={styles.dropdownStyle}
                  searchContainerStyle={styles.dropdownSearchContainerStyle}
                  modalContentContainerStyle={
                    styles.dropdownModalContentContainerStyle
                  }
                  searchable={true}
                  searchPlaceholder={'Search Areas...'}
                  searchTextInputStyle={styles.dropdownSearchTextInputStyle}
                  listItemContainerStyle={styles.dropdownListItemContainerStyle}
                />

                <View style={styles.maxBottomDivider} />

                <View style={styles.inputContentContainer}>
                  <Image
                    source={icons.HOME_NUMBER}
                    style={styles.inputIconStyle}
                  />
                  <TextInput
                    disabled={true}
                    onChangeText={handleChange('houseNumber')}
                    onBlur={handleBlur('houseNumber')}
                    value={values.houseNumber}
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
                  {touched.houseNumber && errors.houseNumber
                    ? errors.houseNumber
                    : ''}
                </Text>

                <Pressable style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.registerButton}>Register</Text>
                </Pressable>
                <Pressable
                  style={styles.alreadyTextContainer}
                  onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.alreadyButtonText}>
                    Already have an account?{' '}
                    <Text style={styles.loginText}>Login</Text>
                  </Text>
                </Pressable>
              </View>
            </ImageBackground>
          )}
        </Formik>
      </KeyboardAvoidingView>
      {loading && (
        <Loader visible={loading} text={'Registering your account...'} />
      )}
    </ScrollView>
  );
}
