import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function HorizontalDivider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: '100%',
    height: 1,
    marginVertical: 8,
  },
});
