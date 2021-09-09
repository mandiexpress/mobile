/* eslint-disable react/jsx-no-duplicate-props */
import React, {useEffect, useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {KeyboardAvoidingView, Text, Modal, Pressable} from 'react-native';
import styles from './styles';
import ResetPasswordModal from '../ResetPasswordModal';

const OtpModal = ({visibleOtp, setOtpModal, setModal}) => {
  const [OtpCode, setOtpCode] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [resetModal, setResetModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setButtonDisabled(false);
    }, 60000);
  }, []);
  console.log(OtpCode);

  function handleOtp() {
    setResetModal(true);
  }

  return (
    <Modal visibleOtp={visibleOtp} animationType={'slide'} transparent={true}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.headText}>
          Enter the 4 digit code we sent to your number
        </Text>
        <OTPInputView
          style={styles.otpContainer}
          pinCount={4}
          code={OtpCode}
          keyboardType="number-pad"
          keyboardAppearance="default"
          autoFocusOnLoad={true}
          placeholderTextColor={'red'}
          // codeInputHighlightStyle={styles.borderStyleHighLighted}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeChanged={setOtpCode}
          onCodeFilled={handleOtp}
        />
        <Text style={styles.expireText}>
          Code Expires in: <TimerOTP />
        </Text>
        <Text style={styles.resendText}>
          Did not get the code?
          <Pressable style={styles.resendContainer} disabled={buttonDisabled}>
            <Text
              style={
                buttonDisabled === true ? styles.textvalid : styles.textinvalid
              }>
              Resend
            </Text>
          </Pressable>
        </Text>
      </KeyboardAvoidingView>
      <Pressable style={styles.backButton} onPress={() => setOtpModal(false)}>
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
      {resetModal && (
        <ResetPasswordModal
          resetVisible={resetModal}
          setResetModal={setResetModal}
          setOtpModal={setOtpModal}
          setModal={setModal}
        />
      )}
    </Modal>
  );
};

const TimerOTP = () => {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
  return (
    <Text>
      {minutes === 0 && seconds === 0 ? (
        '0s'
      ) : (
        <Text style={styles.time}>
          {minutes}:{seconds < 10 ? `0${seconds}s` : `${seconds}s`}
        </Text>
      )}
    </Text>
  );
};

export default OtpModal;
