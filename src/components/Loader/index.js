import React from 'react';
import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {colors} from '../../shared/constants';

export default function Loader({visible, text = 'Loading...'}) {
  return (
    <View style={styles.container}>
      <Spinner
        visible={visible}
        color={colors.DARK_BLUE}
        textContent={text}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFFFFF',
  },
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
});
