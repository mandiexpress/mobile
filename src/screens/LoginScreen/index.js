import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import ForgetPasswordModal from '../../modal/ForgetPasswordModal';
import { colors, globalStyles, icons, routes } from '../../shared/constants';
import { fetchUser } from './api';
import styles from './styles';
import validation from './validations';

export default function LoginScreen({ navigation }) {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onLogin(values, actions) {
    try {
      setLoading(true);
      const response = await fetchUser(values.phoneNumber);
      if (response) {
        navigation.navigate(routes.LOGIN_VERIFY_SCREEN, {
          phone: values.phoneNumber,
        });
      }
    } catch (err) {
      console.error(err);
      if (err === 'auth/user-not-found') {
        actions.setFieldError('phoneNumber', 'Not a user. Register?');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} title={'Login'} />
      <KeyboardAvoidingView style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={icons.LOGO_WHITE}
            style={{ width: 200, height: 200, resizeMode: 'contain' }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}>
            For True Gourmets
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: 'gray',
              marginTop: 12,
              fontStyle: 'italic',
            }}>
            Groceries and more, delivered straight to your door!
          </Text>
        </View>
        <Formik
          initialValues={{ phoneNumber: '' }}
          onSubmit={onLogin}
          validationSchema={validation}>
          {({ handleChange, handleBlur, touched, errors, handleSubmit }) => (
            <>
              <View style={{ flex: 1, padding: '5%' }}>
                <View style={globalStyles.row}>
                  <View
                    style={{
                      paddingHorizontal: 18,
                      justifyContent: 'center',
                      paddingVertical: 16,
                      borderBottomColor: colors.DARK_BLUE,
                      borderBottomWidth: 0.5,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: 'rgba(0, 0, 0, 0.5)',
                      }}>
                      +92
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      borderBottomColor: colors.DARK_BLUE,
                      borderBottomWidth: 0.5,
                      marginStart: 8,
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}>
                    <TextInput
                      placeholder={'03XX XXX XX XX'}
                      style={{
                        marginHorizontal: 12,
                        color: colors.BLACK,
                        fontWeight: 'bold',
                      }}
                      placeholderTextColor={'gray'}
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      keyboardAppearance={'default'}
                      keyboardType={'number-pad'}
                      returnKeyType={'done'}
                      onSubmitEditing={handleSubmit}
                    />
                  </View>
                </View>

                <Text style={styles.errorText}>
                  {touched.phoneNumber && errors.phoneNumber
                    ? errors.phoneNumber
                    : ''}
                </Text>

                <Text
                  style={{ marginVertical: 12, fontSize: 12, color: 'gray' }}>
                  Note: Service is only available in Lahore, Punjab, Pakistan
                </Text>

                <Pressable style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.loginButton}>LOGIN</Text>
                </Pressable>

                <Pressable
                  style={{ marginTop: 24 }}
                  onPress={() =>
                    navigation.navigate(routes.REGISTRATION_SCREEN)
                  }>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontStyle: 'italic',
                      color: 'gray',
                    }}>
                    Not a user?{' '}
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontStyle: 'normal',
                        color: colors.DARK_BLUE,
                      }}>
                      Register
                    </Text>
                  </Text>
                </Pressable>
              </View>

              {modal && (
                <ForgetPasswordModal visible={modal} setModal={setModal} />
              )}
              {loading && <Loader visible={loading} text={'Logging in'} />}
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </View>
  );
}
