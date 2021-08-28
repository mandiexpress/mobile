import {Formik} from 'formik';
import React, {useState} from 'react';
import {Alert} from 'react-native';
import {Pressable, Text, View, Modal} from 'react-native';
import {TextInput} from 'react-native-paper';
import * as Yup from 'yup';
import {icons} from '../../shared/constants';
import styles from './styles';

const ResetPasswordModal = ({
  resetVisible,
  setResetModal,
  setOtpModal,
  setModal,
}) => {
  const [isSecure, setIsSecure] = useState(true);
  const [isConfirmSecure, setIsConfirmSecure] = useState(true);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(5, 'minimum 5 characters required'),

    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .min(5, 'minimum 5 characters required'),
  });

  function onResetPassword(values) {
    try {
      if (values.password === values.confirmPassword) {
        setResetModal(false);
        setOtpModal(false);
        setModal(false);
      } else {
        Alert.alert('Confirm Password do not match!');
      }
    } catch (err) {
      console.log(err);
    }
  }

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

  return (
    <Modal visibleOtp={resetVisible} animationType={'slide'} transparent={true}>
      <View style={styles.container}>
        <Formik
          initialValues={{password: '', confirmPassword: ''}}
          onSubmit={onResetPassword}
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
              <View style={styles.inputContainer}>
                <View>
                  <TextInput
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder={'New Password'}
                    mode={'outlined'}
                    keyboardType={'default'}
                    autoCorrect={false}
                    secureTextEntry={isSecure}
                    right={
                      <TextInput.Icon
                        name={
                          isSecure ? icons.SHOW_PASSWORD : icons.HIDE_PASSWORD
                        }
                        color={'gray'}
                        onPress={() => {
                          setIsSecure(prevState => !prevState);
                        }}
                      />
                    }
                    theme={textInputTheme}
                  />
                  <Text style={styles.errorText}>
                    {touched.password && errors.password ? errors.password : ''}
                  </Text>
                  <TextInput
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    placeholder={'Confrim Password'}
                    mode={'outlined'}
                    keyboardType={'default'}
                    autoCorrect={false}
                    secureTextEntry={isConfirmSecure}
                    right={
                      <TextInput.Icon
                        name={
                          isConfirmSecure
                            ? icons.SHOW_PASSWORD
                            : icons.HIDE_PASSWORD
                        }
                        color={'gray'}
                        onPress={() => {
                          setIsConfirmSecure(prevState => !prevState);
                        }}
                      />
                    }
                    theme={textInputTheme}
                  />
                  <Text style={styles.errorText}>
                    {touched.confirmPassword && errors.confirmPassword
                      ? errors.confirmPassword
                      : ''}
                  </Text>

                  <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.loginButton}>RESET Password</Text>
                  </Pressable>
                </View>
              </View>
            </>
          )}
        </Formik>
      </View>
    </Modal>
  );
};

export default ResetPasswordModal;
