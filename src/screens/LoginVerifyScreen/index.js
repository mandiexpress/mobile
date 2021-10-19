import auth from '@react-native-firebase/auth';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import OtpVerify from 'react-native-otp-verify';
import { useDispatch } from 'react-redux';
import Loader from '../../components/Loader';
import { colors, icons, routes } from '../../shared/constants';
import { formatPhone } from '../../shared/utils';
import { loginUser } from '../../store/reducers/user';

export default function LoginVerifyScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { phone } = route.params;

  const [otp, setOTP] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resend, setResend] = useState(false);
  const [invalidCode, setInvalidCode] = useState(false);

  async function onFetchOTPConfirmation(phoneNumber) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function onResendCode() {
    setResend(false);
    setTimer(60);
    onFetchOTPConfirmation(formatPhone(phone));
  }

  function onCancel() {
    navigation.pop();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevState => prevState - 1);
    }, 1000);

    if (timer === 0) {
      setResend(true);
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        onLoginComplete(currentUser);
      }
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onLoginComplete(user) {
    try {
      await dispatch(loginUser(user.uid)).unwrap();
      navigation.navigate(routes.HOME_NAVIGATOR);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    onFetchOTPConfirmation(formatPhone(phone));
    if (Platform.OS === 'android') {
      // onGetHash();
      onStartListenerForOTP();
      return () => {
        OtpVerify.removeListener();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // async function onGetHash() {
  //   try {
  //     const hash = await OtpVerify.getHash();
  //     console.log(hash);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async function onStartListenerForOTP() {
    try {
      const response = await OtpVerify.getOtp();
      if (response) {
        OtpVerify.addListener(onOTPListener);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function onOTPListener(message) {
    try {
      const code = /(\d{6})/g.exec(message)[1];
      if (code) {
        setOTP(code);
        OtpVerify.removeListener();
        Keyboard.dismiss();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function onCodeFilled(code) {
    try {
      setInvalidCode(null);
      setLoading(true);
      if (!code || !confirm) {
        throw new Error('Something went wrong, try again');
      }
      await confirm.confirm(code);
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/invalid-verification-code') {
        setInvalidCode(true);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.scrollView}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={icons.OTP}
          style={{
            width: 125,
            height: 125,
            resizeMode: 'contain',
            marginBottom: 18,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Text>A verification code is sent at {formatPhone(phone)}</Text>
        <OTPInputView
          code={otp}
          pinCount={6}
          autoFocusOnLoad={true}
          style={{ width: '80%', height: 100 }}
          codeInputFieldStyle={{
            borderRadius: 6,
            borderWidth: 0.2,
            borderColor: invalidCode ? 'red' : colors.DARK_BLUE,
            backgroundColor: invalidCode
              ? 'rgba(255, 0, 0, 0.1)'
              : colors.LIGHT_BLUE,
            color: colors.DARK_BLUE,
            fontWeight: 'bold',
          }}
          codeInputHighlightStyle={{ color: colors.BLACK }}
          secureTextEntry={false}
          clearInputs={false}
          onCodeFilled={onCodeFilled}
          onCodeChanged={setOTP}
          keyboardType={'number-pad'}
        />
        {invalidCode && (
          <Text style={{ marginBottom: 12, fontSize: 12, color: 'red' }}>
            Incorrect Code. Try Again
          </Text>
        )}
        {resend ? (
          <View>
            <Text style={{ fontSize: 12 }}>Didn't receive any code? </Text>
            <Pressable
              onPress={onResendCode}
              style={{
                backgroundColor: colors.DARK_BLUE,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 4,
                alignSelf: 'center',
                marginTop: 12,
              }}>
              <Text style={{ fontSize: 12, color: 'white' }}>RESEND</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            <Text style={{ fontSize: 12 }}>Resend code in </Text>
            <Text
              style={{
                fontSize: 12,
                color: 'gray',
                alignSelf: 'center',
                marginTop: 12,
              }}>
              00:{timer < 10 ? `0${timer}` : timer}
            </Text>
          </View>
        )}
        <View
          style={{
            marginVertical: 24,
            width: 200,
            height: 1,
            backgroundColor: 'rgba(0 ,0 ,0, 0.1)',
          }}
        />
        <Pressable
          onPress={onCancel}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            paddingHorizontal: 12,
            paddingVertical: 10,
            borderRadius: 4,
          }}>
          <Text
            style={{
              fontSize: 12,
              textTransform: 'uppercase',
              color: 'gray',
            }}>
            Cancel
          </Text>
        </Pressable>
      </View>
      {loading && <Loader visible={loading} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    marginTop: 20,
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
