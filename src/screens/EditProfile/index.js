import firestore from '@react-native-firebase/firestore';
import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import DialogBox from '../../components/DialogBox';
import Header from '../../components/Header';
import ListModal from '../../components/ListModal';
import Loader from '../../components/Loader';
import validation from '../../screens/SignUpScreen/validations';
import { colors, fonts, icons, images } from '../../shared/constants';
import { capitalize } from '../../shared/utils';
import { updateLocalUser } from '../../store/reducers/user';
import styles from './styles';
import ImagePicker from 'react-native-image-crop-picker';
import { updateUser, uploadImage } from './api';

const genderList = [
  {
    label: 'Male',
    value: 'male',
    icon: icons.MALE,
  },
  {
    label: 'Female',
    value: 'Female',
    icon: icons.FEMALE,
  },
  {
    label: 'Others',
    value: 'others',
    icon: icons.OTHER,
  },
];

const imagePickerOptions = {
  avoidEmptySpaceAroundImage: true,
  cropping: true,
  height: 512,
  width: 512,
};

export default function EditProfile({ navigation }) {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.root.user);

  const [loading, setLoading] = useState(false);

  const [imagePicker, setImagePicker] = useState(false);
  const [genderModal, setGenderModal] = useState(false);
  const [imgExt, setImgExt] = useState(null);

  function onImagePress() {
    setImagePicker(true);
  }

  async function onUpdatePress(values, actions) {
    try {
      setLoading(true);
      let image = values.image;

      if (values.image !== user.image) {
        const payload = {
          uri: values.image,
          ext: imgExt,
          userId: user.id,
        };
        image = await uploadImage(payload);
      }

      const model = {
        updatedAt: firestore.FieldValue.serverTimestamp(),
        image,
        name: values.name,
        gender: values.gender,
      };
      await updateUser(user.id, model);
      dispatch(updateLocalUser(model));
      navigation.pop();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function onImagePick(res, setFieldValue) {
    const content = res.mime;
    const splittedExt = content.split('/');
    const extenstion = splittedExt[splittedExt.length - 1];

    setImgExt(extenstion);
    setFieldValue('image', res.sourceURL);
  }

  async function onGalleryPress(setFieldValue) {
    try {
      setImagePicker(false);
      const res = await ImagePicker.openPicker(imagePickerOptions);
      onImagePick(res, setFieldValue);
    } catch (err) {
      console.error(err);
    }
  }

  async function onCameraPress(setFieldValue) {
    try {
      setImagePicker(false);
      const res = await ImagePicker.openCamera(imagePickerOptions);
      onImagePick(res, setFieldValue);
    } catch (err) {
      console.error(err);
    }
  }

  const initialValues = {
    name: user ? user.name : '',
    phone: user ? user.contact.local : '',
    house: user ? user.address.house : '',
    gender: user ? user.gender : null,
    image: user ? user.image : null,
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header navigation={navigation} title={'Edit Profile'} />
      <Formik
        initialValues={initialValues}
        onSubmit={onUpdatePress}
        validationSchema={validation}>
        {({
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
          handleSubmit,
          dirty,
          setFieldValue,
        }) => (
          <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flex: 1 }}>
            <View style={styles.inputContainer}>
              <Pressable
                onPress={onImagePress}
                style={{
                  alignSelf: 'center',
                  marginBottom: 18,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={
                    values.image || user.image
                      ? { uri: values.image ? values.image : user.image }
                      : icons.DEFAULT_PROFILE_IMAGE
                  }
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 100,
                    borderColor: 'rgba(0, 0, 0, 0.05)',
                    borderWidth: 2,
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    marginVertical: 6,
                    fontFamily: fonts.REGULAR,
                  }}>
                  Edit Profile Picture
                </Text>
              </Pressable>

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
              <View
                style={[
                  styles.inputContentContainer,
                  {
                    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                  },
                ]}>
                <Image
                  source={icons.PHONE}
                  style={[
                    styles.inputIconStyle,
                    { opacity: 0.2, tintColor: 'black' },
                  ]}
                />
                <TextInput
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  editable={false}
                  placeholder={'03XX XXX XX XX'}
                  placeholderTextColor={'gray'}
                  style={[styles.inputStyle, { color: 'rgba(0, 0, 0, 0.5)' }]}
                  spellCheck={false}
                  autoCorrect={false}
                  maxLength={40}
                  keyboardType={'number-pad'}
                />
              </View>
              <Text style={styles.errorText}>
                {touched.phone && errors.phone ? errors.phone : ''}
              </Text>

              <Text style={styles.headerText}>Gender</Text>
              <Pressable
                onPress={() => setGenderModal(true)}
                style={{
                  padding: 12,
                  borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                  borderBottomWidth: 1,
                  marginBottom: 12,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: values.gender ? 'black' : 'gray',
                    fontFamily: fonts.REGULAR,
                    flex: 1,
                  }}>
                  {values.gender
                    ? capitalize(values.gender)
                    : 'Select a Gender'}
                </Text>
                <Image
                  source={icons.DROP_DOWN}
                  style={{
                    height: 24,
                    width: 24,
                    resizeMode: 'contain',
                    tintColor: colors.DARK_BLUE,
                  }}
                />
              </Pressable>

              {/* <View style={styles.inputContentContainer}>
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
              </Text> */}

              <Pressable
                disabled={!dirty}
                style={[
                  styles.button,
                  {
                    backgroundColor: dirty
                      ? colors.DARK_BLUE
                      : 'rgba(0, 0, 0, 0.1)',
                  },
                ]}
                onPress={handleSubmit}>
                <Text
                  style={[
                    styles.registerButton,
                    { color: dirty ? 'white' : 'gray' },
                  ]}>
                  Update
                </Text>
              </Pressable>
            </View>
            <DialogBox
              image={images.IMAGE_PICKER}
              title={'Pick an Image'}
              message={
                'Kindly, select an option from where you would like to pick the image from'
              }
              setVisibility={setImagePicker}
              visibile={imagePicker}
              enableLeftButton={true}
              enableRightButton={true}
              leftButtonText={'Gallery'}
              rightButtonText={'Camera'}
              onLeftButtonPress={() => onGalleryPress(setFieldValue)}
              onRightButtonPress={() => onCameraPress(setFieldValue)}
              onDismissButtonPress={() => setImagePicker(false)}
            />
            <ListModal
              heading={'Pick a Gender'}
              items={genderList}
              onDismiss={() => setGenderModal(false)}
              visible={genderModal}
              selectedItem={values.gender ? values.gender : null}
              onItemSelect={item => setFieldValue('gender', item.value)}
            />
          </KeyboardAwareScrollView>
        )}
      </Formik>
      {loading && <Loader visible={loading} text={'Updating your profile'} />}
    </SafeAreaView>
  );
}
