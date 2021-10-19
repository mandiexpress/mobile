import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../../../shared/constants';

export default function ActionButton({ title }) {
  let color = '#212121';
  let fontFamily = fonts.REGULAR;

  if (title === 'Shop') {
    color = 'green';
    fontFamily = fonts.BOLD;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color, fontFamily }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    overflow: 'hidden',
    fontSize: 12,
    textTransform: 'uppercase',
  },
});
