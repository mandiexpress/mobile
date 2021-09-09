import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {Alert, Image, Pressable, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import Loader from '../../components/Loader';
import ForgetPasswordModal from '../../modal/ForgetPasswordModal';
import {colors, icons, routes} from '../../shared/constants';
import {loginUser} from '../../store/reducers/user';
import styles from './styles';
import validation from './validations';

// import {LoginManager, AccessToken} from 'react-native-fbsdk';

// GoogleSignin.configure({
//   webClientId:
//     '47802233773-igje6t0aguvge2pqoi7srp418sqiqthn.apps.googleusercontent.com',
// });

// async function onGoogleButtonPress() {
//   const {idToken} = await GoogleSignin.signIn();
//   const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//   return auth().signInWithCredential(googleCredential);
// }

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

export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const [isSecure, setIsSecure] = useState(true);
  const [modal, setModal] = useState(false);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const [loading, setLoading] = useState(false);

  async function onLogin(values, actions) {
    try {
      setLoading(true);
      await dispatch(loginUser(values)).unwrap();
      navigation.navigate('Home');
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          actions.setFieldError(
            'email',
            'That email address is already in use!',
          );
          break;
        case 'auth/user-not-found':
          actions.setFieldError('email', 'No account found, Register?');
          break;
        case 'auth/wrong-password':
          actions.setErrors({
            email: 'Invalid Credentials',
            password: 'Invalid Credentials',
          });
          break;
        case 'auth/invalid-email':
          actions.setFieldError('email', 'Email Address is invalid!');
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
    <View style={styles.container}>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={onLogin}
        validationSchema={validation}>
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
              <View style={{marginBottom: '5%', marginHorizontal: 12}}>
                <Image
                  source={icons.LOGO_WHITE}
                  style={{
                    width: 150,
                    height: 150,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 32,
                  }}>
                  LOGIN
                </Text>
                <Text style={{textAlign: 'center', fontSize: 12, marginTop: 2}}>
                  Login to keep track of your orders{'\n'}and maintain your
                  profile.
                </Text>
              </View>
              <TextInput
                ref={emailInput}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder={'johndoe@email.com'}
                mode={'outlined'}
                spellCheck={false}
                autoCorrect={false}
                autoCapitalize={'none'}
                keyboardAppearance={'default'}
                error={touched.email && errors.email}
                keyboardType={'email-address'}
                theme={inputTheme}
                returnKeyType={'next'}
                blurOnSubmit={false}
                onSubmitEditing={() => passwordInput.current.focus()}
              />
              <Text style={styles.errorText}>
                {touched.email && errors.email ? errors.email : ''}
              </Text>
              <TextInput
                ref={passwordInput}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder={'Password'}
                mode={'outlined'}
                keyboardType={'default'}
                autoCorrect={false}
                error={touched.password && errors.password}
                secureTextEntry={isSecure}
                returnKeyType={'done'}
                onSubmitEditing={handleSubmit}
                right={
                  <TextInput.Icon
                    name={isSecure ? icons.SHOW_PASSWORD : icons.HIDE_PASSWORD}
                    color={'gray'}
                    onPress={() => {
                      setIsSecure(prevState => !prevState);
                    }}
                  />
                }
                theme={inputTheme}
              />
              <Text style={styles.errorText}>
                {touched.password && errors.password ? errors.password : ''}
              </Text>

              <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.loginButton}>LOGIN</Text>
              </Pressable>

              <View
                style={{
                  height: '20%',
                  justifyContent: 'space-evenly',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Pressable onPress={() => setModal(true)}>
                  <Text style={styles.forgetButton}>Forgot Password?</Text>
                </Pressable>

                <View
                  style={{
                    width: '40%',
                    height: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  }}
                />

                <Pressable
                  style={styles.alreadyTextContainer}
                  onPress={() =>
                    navigation.navigate(routes.REGISTRATION_SCREEN)
                  }>
                  <Text style={styles.alreadyButtonText}>
                    Don't have an account?{' '}
                    <Text style={styles.registerText}>Register</Text>
                  </Text>
                </Pressable>
              </View>
              {/* <View style={styles.iconContainer}>
                <Pressable
                  onPress={() =>
                    onGoogleButtonPress().then(() =>
                      console.log('Signed in with Google!'),
                    )
                  }>
                  <Image style={styles.loginIcon} source={icons.GOOGLE} />
                </Pressable>
                <Pressable>
                  <Image style={styles.loginIcon} source={icons.FACEBOOK} />
                </Pressable>
              </View> */}
            </View>
            {modal && (
              <ForgetPasswordModal visible={modal} setModal={setModal} />
            )}
            {loading && <Loader visible={loading} text={'Logging in'} />}
          </>
        )}
      </Formik>
    </View>
  );
}
