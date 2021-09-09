/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Pressable, Text, View, Image, Modal} from 'react-native';
import {TextInput} from 'react-native-paper';
import * as Yup from 'yup';
import {colors, icons} from '../../shared/constants';
import styles from './styles';
import {Formik} from 'formik';
import OtpModal from '../OtpModal';

const initialValues = {
  phone: '',
};

const textInputTheme = {
  mode: 'exact',
  colors: {
    placeholder: '#50556A',
    background: 'transparent',
    text: 'black',
    accent: 'black',
    primary: 'black',
    underlineColor: 'grey',
  },
  roundness: 12,
};

function ForgetPasswordModal({visible, setModal, onResetPassword}) {
  const [otpModal, setOtpModal] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .required('Phone number is required')
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(11, 'Phone number is not valid')
      .max(11, 'Phone number is not valid'),
  });
  function handleResetPassword() {
    setOtpModal(true);
  }

  return (
    <Modal visible={visible} animationType={'slide'} transparent={true}>
      <View style={{flex: 1, backgroundColor: colors.WHITE}}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleResetPassword}
          validationSchema={validationSchema}>
          {({
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
            handleSubmit,
          }) => (
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginHorizontal: '5%',
                  }}>
                  Reset Password
                </Text>
                <Text
                  style={{
                    textAlign: 'left',
                    marginVertical: 12,
                    marginHorizontal: '5%',
                  }}>
                  Enter your phone number for verification
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={{flex: 1, marginHorizontal: '5%'}}>
                    <TextInput
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                      placeholder={'03XX XXX XX XX'}
                      mode={'outlined'}
                      keyboardType={'number-pad'}
                      autoCorrect={false}
                      theme={textInputTheme}
                    />
                    <Text style={styles.errorText}>
                      {touched.phone && errors.phone ? errors.phone : ''}
                    </Text>
                  </View>
                  <Pressable style={styles.button} onPress={handleSubmit}>
                    <Image
                      source={icons.NEXT_ICON}
                      style={{width: 32, height: 32}}
                    />
                  </Pressable>
                </View>
              </View>
              <Pressable
                style={styles.backButton}
                onPress={() => setModal(false)}>
                <Text style={styles.backButtonText}>Back</Text>
              </Pressable>
              {otpModal && (
                <OtpModal
                  visibleOtp={otpModal}
                  setOtpModal={setOtpModal}
                  setModal={setModal}
                  onResetPassword={onResetPassword}
                />
              )}
            </>
          )}
        </Formik>
      </View>
    </Modal>
  );
}
export default ForgetPasswordModal;
