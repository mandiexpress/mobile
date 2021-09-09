import {Formik} from 'formik';
import React, {useState} from 'react';
import {Alert, Image, Pressable, ScrollView, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import validation from './validations';
import {colors, icons} from '../../shared/constants';
import Loader from '../../components/Loader';
import {registerUser} from '../../store/reducers/user';
import styles from './styles';
import {useDispatch} from 'react-redux';
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
  email: '',
  phone: '',
  address: '',
  password: '',
  confirmPassword: '',
};

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

function SignUpScreen({navigation}) {
  const dispatch = useDispatch();
  const [passwordSecure, setPasswordSecure] = useState(true);
  const [confirmPasswordSecure, setConfirmPasswordSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  async function onSignUp(values, actions) {
    try {
      setLoading(true);
      await dispatch(registerUser(values)).unwrap();
      navigation.pop();
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
    <ScrollView contentContainerStyle={styles.container}>
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
          <>
            <View style={styles.inputContainer}>
              <View style={{flexDirection: 'row'}}>
                <Pressable onPress={() => navigation.pop()}>
                  <Image
                    source={icons.BACK}
                    style={{
                      width: 24,
                      height: 24,
                      resizeMode: 'contain',
                      marginTop: 8,
                    }}
                  />
                </Pressable>
                <View style={{marginStart: 12}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 32,
                    }}>
                    Registration
                  </Text>
                  <Text style={{fontSize: 12}}>
                    Become a Mandi user and enjoy more...
                  </Text>
                </View>
              </View>
              <View>
                {/* Name */}
                <TextInput
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  placeholder={'John Doe'}
                  mode={'outlined'}
                  spellCheck={false}
                  autoCorrect={false}
                  theme={inputTheme}
                  maxLength={40}
                  error={touched.name && errors.name}
                />
                <Text style={styles.errorText}>
                  {touched.name && errors.name ? errors.name : ''}
                </Text>

                {/* Email Address */}
                <TextInput
                  maxLength={40}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder={'johndoe@email.com'}
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

                {/* Phone Number */}
                <TextInput
                  maxLength={11}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  placeholder={'03XX XXX XX XX'}
                  mode={'outlined'}
                  keyboardType={'number-pad'}
                  autoCorrect={false}
                  theme={inputTheme}
                  error={touched.phone && errors.phone}
                />
                <Text style={styles.errorText}>
                  {touched.phone && errors.phone ? errors.phone : ''}
                </Text>

                {/* Address */}
                <TextInput
                  maxLength={1024}
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

                {/* Password */}
                <TextInput
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder={'Password'}
                  mode={'outlined'}
                  keyboardType={'default'}
                  autoCorrect={false}
                  theme={inputTheme}
                  secureTextEntry={passwordSecure}
                  error={touched.password && errors.password}
                  right={
                    <TextInput.Icon
                      name={
                        passwordSecure
                          ? icons.SHOW_PASSWORD
                          : icons.HIDE_PASSWORD
                      }
                      color={'gray'}
                      onPress={() => {
                        setPasswordSecure(prevState => !prevState);
                      }}
                    />
                  }
                />
                <Text style={styles.errorText}>
                  {touched.password && errors.password ? errors.password : ''}
                </Text>

                {/* Confirm Password */}
                <TextInput
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  placeholder={'Confirm Password'}
                  mode={'outlined'}
                  keyboardType={'default'}
                  autoCorrect={false}
                  theme={inputTheme}
                  secureTextEntry={confirmPasswordSecure}
                  error={touched.confirmPassword && errors.confirmPassword}
                  right={
                    <TextInput.Icon
                      name={
                        confirmPasswordSecure
                          ? icons.SHOW_PASSWORD
                          : icons.HIDE_PASSWORD
                      }
                      color={'gray'}
                      onPress={() => {
                        setConfirmPasswordSecure(prevState => !prevState);
                      }}
                    />
                  }
                />
                <Text style={styles.errorText}>
                  {touched.confirmPassword && errors.confirmPassword
                    ? errors.confirmPassword
                    : ''}
                </Text>

                <Pressable style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.registerButton}>Register</Text>
                </Pressable>
              </View>
              <Pressable
                style={styles.alreadyTextContainer}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.alreadyButtonText}>
                  Already have an account?{' '}
                  <Text style={styles.loginText}>Login</Text>
                </Text>
              </Pressable>
              {/* <View style={styles.iconContainer}>
                <Pressable
                  onPress={() =>
                    onGoogleButtonPress().then(() =>
                      console.log('Signed in with Google!'),
                    )
                  }>
                  <Image style={styles.signUpIcon} source={icons.GOOGLE} />
                </Pressable>
                <Pressable>
                  <Image style={styles.signUpIcon} source={icons.FACEBOOK} />
                </Pressable>
              </View> */}
            </View>
          </>
        )}
      </Formik>
      {loading && (
        <Loader visible={loading} text={'Registering your account...'} />
      )}
    </ScrollView>
  );
}

export default SignUpScreen;
